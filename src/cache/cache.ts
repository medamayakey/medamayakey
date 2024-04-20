interface CacheItem<T> {
    value: T;
    expiresAt: number;
}

const cache = new Map<string, CacheItem<any>>();
// default TTL is 1 hour (spoonacular API: a maximum of 1 hour)
const defaultTTL: number = 3600;

export function setCache<T>(key: string, value: T, ttl: number = defaultTTL) {
    cache.set(key, {
        value,
        expiresAt: Date.now() + ttl * 1000,
    });
}

export function getCache<T>(key: string): T | undefined {
    const item = cache.get(key);
    if (item && item.expiresAt > Date.now()) {
        return item.value;
    } else {
        cache.delete(key);
        return undefined;
    }
}

export function clearCache() {
    cache.clear();
}
