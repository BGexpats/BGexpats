export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  })
  const data = await response.json()
  // Forward Anthropic's real status (previously this always returned 200, even
  // on failure, which hid errors like an invalid model name or missing API key
  // behind a generic "Error generating response." on the frontend). Logging
  // here means a bad request shows up in Vercel's function logs immediately.
  if (!response.ok) {
    console.error('Anthropic API error:', response.status, JSON.stringify(data))
  }
  res.status(response.status).json(data)
}
