// Vercel Serverless Function — secure Anthropic API proxy
// ------------------------------------------------------------------
// Why this exists: the browser must NEVER hold your Anthropic API key.
// The frontend calls THIS endpoint (/api/chat); this function adds the
// secret key server-side and forwards the request to Anthropic.
//
// SETUP (one-time):
//   1. In Vercel → Project → Settings → Environment Variables, add:
//        ANTHROPIC_API_KEY = sk-ant-...   (your real key, kept secret)
//   2. Redeploy. That's it — the key stays on the server, never shipped
//      to the browser.
//
// This file runs on Vercel automatically for any request to /api/chat.
// No extra routing/config needed — Vercel maps /api/*.js by convention.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "Server not configured. Set ANTHROPIC_API_KEY in Vercel env vars.",
    });
    return;
  }

  try {
    // Body may arrive parsed (object) or raw (string) depending on runtime
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Basic guardrails: enforce a model + sane token ceiling regardless of client input
    const safeBody = {
      model: payload.model || "claude-sonnet-4-6",
      max_tokens: Math.min(payload.max_tokens || 1000, 2000),
      messages: payload.messages || [],
    };
    if (payload.system) safeBody.system = payload.system;

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(safeBody),
    });

    const data = await upstream.json();

    // Pass through Anthropic's status so client error handling still works
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: String(err) });
  }
}
