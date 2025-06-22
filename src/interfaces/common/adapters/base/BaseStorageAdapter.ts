/**
 * Defines a platform-agnostic contract for key-value storage.
 */
export interface BaseStorageAdapter {
    getItem<T>(key: string): Promise<T | null>;
    setItem<T>(key: string, value: T): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}