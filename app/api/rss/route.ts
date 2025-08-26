export const runtime = 'edge'
export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0"><channel><title>Alto Property Group</title></channel></rss>`
  return new Response(rss, { headers: { 'content-type': 'application/rss+xml' } })
}