import { createClient } from '@supabase/supabase-js'

// These come from Vercel environment variables (VITE_ prefix = exposed to browser).
// The anon/publishable key is safe in frontend code BECAUSE Row Level Security
// is enabled on every table — the database itself refuses unauthorised reads.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase env vars missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Auth helpers ────────────────────────────────────────────────────

// Register a new user. Supabase hashes the password; we never see or store it.
export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }   // saved to user metadata; the DB trigger copies it to profiles
  })
  return { data, error }
}

// Log an existing user in.
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

// Log out.
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Fetch the current session's user, merged with their profile row.
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session || !session.user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return {
    id: session.user.id,
    email: session.user.email,
    name: (profile && profile.name) || session.user.email.split('@')[0],
    av: (profile && profile.av) || session.user.email.slice(0, 2).toUpperCase(),
    isAdmin: (profile && profile.is_admin) || false,
    accountType: (profile && profile.account_type) || 'expat',
    inCommunity: !!(profile && profile.in_community),
    businessName: (profile && profile.business_name) || '',
    businessCategory: (profile && profile.business_category) || '',
    joined: (profile && profile.created_at)
      ? new Date(profile.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
      : ''
  }
}

// Send a password-reset email.
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin
  })
  return { error }
}

// ─── Profile helpers ─────────────────────────────────────────────────

// Fetch a full profile row (used by the account page and for viewing others).
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

// Save changes to the signed-in user's own profile.
// RLS ensures a user can only ever update their own row.
export async function updateProfile(userId, fields) {
  const { data, error } = await supabase
    .from('profiles')
    .update(fields)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// Upload an avatar image and return its public URL.
// Files are stored under a folder named after the user's ID, which is what the
// storage policy checks — so nobody can overwrite someone else's picture.
export async function uploadAvatar(userId, file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `${userId}/avatar.${ext}`

  const { error: upErr } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, cacheControl: '3600' })

  if (upErr) return { url: null, error: upErr }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  // Cache-bust so the new image shows immediately instead of the old cached one.
  const url = `${data.publicUrl}?t=${Date.now()}`

  const { error: dbErr } = await supabase
    .from('profiles')
    .update({ avatar_url: url })
    .eq('id', userId)

  return { url, error: dbErr }
}

// List member profiles (for the Connect page). Requires being signed in.
export async function listProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, av, avatar_url, bio, city, interests, languages, looking_for, created_at, in_connect, origin')
    .eq('in_connect', true)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ─── Map pins (Basic+ subscribers' custom saved pins) ─────────────────
// Synced to the account via the map_pins table (RLS-protected — each user can
// only ever read/write their own rows). Replaces the old localStorage-only version.

// Fetch all pins saved by the signed-in user, newest first.
export async function getPins() {
  const { data, error } = await supabase
    .from('map_pins')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

// Save a new custom pin for the signed-in user.
// user_id is set explicitly (not inferred) so RLS's "with check" can verify it
// matches the caller's own auth.uid().
export async function savePin(userId, lat, lng, label) {
  const { data, error } = await supabase
    .from('map_pins')
    .insert({ user_id: userId, lat, lng, label })
    .select()
    .single()
  return { data, error }
}

// Update one of the signed-in user's own pins — used to rename its label
// and/or move it to new coordinates after dragging on the map. RLS blocks
// updating anyone else's pin, same as deletePin below.
export async function updatePin(pinId, fields) {
  const { data, error } = await supabase
    .from('map_pins')
    .update(fields)
    .eq('id', pinId)
    .select()
    .single()
  return { data, error }
}

// Delete one of the signed-in user's own pins. RLS blocks deleting anyone else's.
export async function deletePin(pinId) {
  const { error } = await supabase
    .from('map_pins')
    .delete()
    .eq('id', pinId)
  return { error }
}

// ─── Trip plans (Premium subscribers' saved itineraries) ───────────────
// Synced via the trip_plans table (RLS-protected — same pattern as map_pins:
// each user can only ever read/write their own rows). The itinerary itself
// (days -> stops, each with a note) is stored as one JSONB column rather than
// separate day/stop tables — simpler to version and matches how the app
// already treats a trip as a single editable document, not relational data.

// Fetch all trips saved by the signed-in user, newest first.
export async function getTrips() {
  const { data, error } = await supabase
    .from('trip_plans')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

// Save a new trip for the signed-in user.
export async function saveTrip(userId, fields) {
  const { data, error } = await supabase
    .from('trip_plans')
    .insert({ user_id: userId, ...fields })
    .select()
    .single()
  return { data, error }
}

// Update one of the signed-in user's own trips (title, dates, or itinerary).
export async function updateTrip(tripId, fields) {
  const { data, error } = await supabase
    .from('trip_plans')
    .update(fields)
    .eq('id', tripId)
    .select()
    .single()
  return { data, error }
}

// Delete one of the signed-in user's own trips. RLS blocks deleting anyone else's.
export async function deleteTrip(tripId) {
  const { error } = await supabase
    .from('trip_plans')
    .delete()
    .eq('id', tripId)
  return { error }
}
