type RateLimitInfo = {
  timestamps: number[];
};

const store = new Map<string, RateLimitInfo>();

/**
 * Cleans up timestamps older than the window
 */
function cleanup(now: number, windowMs: number) {
  for (const [key, info] of store.entries()) {
    info.timestamps = info.timestamps.filter((ts) => now - ts < windowMs);
    if (info.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Basic in-memory rate limit for Server Actions.
 * @param actionName name of the action to limit
 * @param identifier unique user identifier (e.g., clerkUserId)
 * @param limit max requests allowed in the window
 * @param windowMs time window in milliseconds
 * @returns Object indicating success and time until reset if failed
 */
export function rateLimit(
  actionName: string, 
  identifier: string, 
  limit: number = 10, 
  windowMs: number = 60000
): { success: boolean; retryAfter?: number } {
  const now = Date.now();
  cleanup(now, windowMs);

  const key = `${actionName}:${identifier}`;
  const info = store.get(key) || { timestamps: [] };

  if (info.timestamps.length >= limit) {
    const oldest = info.timestamps[0];
    const retryAfter = Math.ceil((windowMs - (now - oldest)) / 1000);
    return { success: false, retryAfter };
  }

  info.timestamps.push(now);
  store.set(key, info);

  return { success: true };
}
