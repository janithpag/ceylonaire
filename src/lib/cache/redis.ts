import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Get a value from cache. Returns null if not found.
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  return redis.get<T>(key);
}

/**
 * Set a value in cache with an optional TTL in seconds.
 */
export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds?: number,
): Promise<void> {
  if (ttlSeconds !== undefined) {
    await redis.set(key, value, { ex: ttlSeconds });
  } else {
    await redis.set(key, value);
  }
}

/**
 * Delete a key from cache.
 */
export async function cacheDel(key: string): Promise<void> {
  await redis.del(key);
}

// Common TTL constants (in seconds)
export const TTL = {
  PLACES: 86400, // 24 hours
  DIRECTIONS: 86400, // 24 hours
  CURRENCY_RATES: 21600, // 6 hours
} as const;
