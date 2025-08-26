export const runtime = 'edge'
export async function POST() {
  return new Response(JSON.stringify({ status: 'ok' }), { headers: { 'content-type': 'application/json' } })
}