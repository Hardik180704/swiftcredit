type RateLimitInfo = {
  count: number;
  resetTime: number;
};

// Use a global variable to preserve the map across hot-reloads in development
declare const globalThis: {
  rateLimitMapGlobal: Map<string, RateLimitInfo>;
} & typeof global;

const rateLimitMap = globalThis.rateLimitMapGlobal ?? new Map<string, RateLimitInfo>();

if (process.env.NODE_ENV !== 'production') {
  globalThis.rateLimitMapGlobal = rateLimitMap;
}

/**
 * A simple in-memory rate limiter.
 * @param identifier The unique identifier (e.g., IP address).
 * @param limit The maximum number of requests allowed in the window.
 * @param windowMs The time window in milliseconds.
 * @returns An object containing { success: boolean }
 */
export default function rateLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }

  if (now > record.resetTime) {
    // Time window has passed, reset the counter
    record.count = 1;
    record.resetTime = now + windowMs;
    return { success: true };
  }

  record.count += 1;

  if (record.count > limit) {
    // Rate limit exceeded
    return { success: false };
  }

  return { success: true };
}
