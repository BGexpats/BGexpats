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
