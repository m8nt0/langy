// Caching interface

export interface CacheOptions {
  ttl?: number;  // Time to live in milliseconds
  tags?: string[];
  priority?: number;
  background?: boolean;  // Allow background refresh
}

export interface CacheEntry<T> {
  key: string;
  value: T;
  createdAt: Date;
  expiresAt?: Date;
  hits: number;
  tags: string[];
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
  memory: number;
}

export interface CachePort {
  // Basic operations
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
  delete(key: string): Promise<void>;
  has(key: string): Promise<boolean>;

  // Batch operations
  getMany<T>(keys: string[]): Promise<Map<string, T>>;
  setMany<T>(entries: Map<string, T>, options?: CacheOptions): Promise<void>;
  deleteMany(keys: string[]): Promise<void>;

  // Advanced operations
  getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T>;

  // Pattern operations
  deleteByPattern(pattern: string): Promise<void>;
  getByPattern<T>(pattern: string): Promise<Map<string, T>>;

  // Tag operations
  getByTag<T>(tag: string): Promise<Map<string, T>>;
  deleteByTag(tag: string): Promise<void>;
  addTags(key: string, tags: string[]): Promise<void>;
  removeTags(key: string, tags: string[]): Promise<void>;

  // Monitoring
  getStats(): Promise<CacheStats>;
  getEntry<T>(key: string): Promise<CacheEntry<T> | null>;
  keys(pattern?: string): Promise<string[]>;

  // Maintenance
  clear(): Promise<void>;
  prune(): Promise<void>;  // Remove expired entries
  optimize(): Promise<void>;  // Optimize memory usage
} 