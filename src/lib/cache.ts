// lib/graphql/cache.ts
type CacheEntry<T> = { key: string; value: T; ts: number };

export class SimpleCache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;

  constructor(maxSize = 10) {
    this.maxSize = maxSize;
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    return entry.value;
  }

  set(key: string, value: T) {
    if (this.store.size >= this.maxSize) {
      const oldestKey = [...this.store.entries()].sort(
        (a, b) => a[1].ts - b[1].ts
      )[0][0];
      this.store.delete(oldestKey);
    }
    this.store.set(key, { key, value, ts: Date.now() });
  }
}
