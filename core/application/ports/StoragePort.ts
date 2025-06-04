export interface StorageOptions {
  expiration?: number;  // Time in milliseconds
  compression?: boolean;
  encryption?: boolean;
  tags?: string[];
}

export interface StorageStats {
  size: number;
  lastModified: Date;
  metadata: Record<string, any>;
}

export interface StoragePort {
  // Basic operations
  read(key: string): Promise<any>;
  write(key: string, data: any, options?: StorageOptions): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;

  // Batch operations
  readMany(keys: string[]): Promise<Map<string, any>>;
  writeMany(items: Map<string, any>, options?: StorageOptions): Promise<void>;
  deleteMany(keys: string[]): Promise<void>;

  // Pattern operations
  readByPattern(pattern: string): Promise<Map<string, any>>;
  deleteByPattern(pattern: string): Promise<void>;

  // Metadata operations
  getStats(key: string): Promise<StorageStats>;
  updateMetadata(key: string, metadata: Record<string, any>): Promise<void>;
  listKeys(prefix?: string): Promise<string[]>;

  // Tag operations
  findByTag(tag: string): Promise<string[]>;
  addTags(key: string, tags: string[]): Promise<void>;
  removeTags(key: string, tags: string[]): Promise<void>;

  // Maintenance
  vacuum(): Promise<void>;  // Clean up expired/invalid entries
  compact(): Promise<void>; // Optimize storage space
} 