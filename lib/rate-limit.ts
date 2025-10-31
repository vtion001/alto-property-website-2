type Bucket = { tokens: number; lastRefill: number }

const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, maxPerWindow: number, windowMs: number) {
  const now = Date.now()
  const b = buckets.get(key) || { tokens: maxPerWindow, lastRefill: now }

  // Refill tokens based on elapsed time
  const elapsed = now - b.lastRefill
  const refill = Math.floor((elapsed / windowMs) * maxPerWindow)
  if (refill > 0) {
    b.tokens = Math.min(maxPerWindow, b.tokens + refill)
    b.lastRefill = now
  }

  if (b.tokens <= 0) {
    buckets.set(key, b)
    return { allowed: false, remaining: 0 }
  }

  b.tokens -= 1
  buckets.set(key, b)
  return { allowed: true, remaining: b.tokens }
}