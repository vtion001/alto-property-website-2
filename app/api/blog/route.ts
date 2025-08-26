export const runtime = 'edge'
export async function GET() {
  return new Response(JSON.stringify({ message: 'Deprecated. Use /api/blog-posts' }), {
    headers: { 'content-type': 'application/json' },
  })
}