import { BaseStorageAdapter } from "../base";

/**
 * An in-memory implementation of the storage adapter. Data is lost on refersh.
 */
export class MemoryStorageAdapter implements BaseStorageAdapter {
    private store: Map<string, any> = new Map();

    /**
     * 
     * @param key Item's index from temp store
     * @returns state? not sure
     */
    async getItem<T>(key: string): Promise<T | null> {
        return this.store.get(key) ||null;
    }

    /**
     * 
     * @param key Item's index from temp store
     * @param value item's value from temp store
     */
    async setItem<T>(key: string, value: T): Promise<void> {
        this.store.set(key, value);
    }

    async removeItem(key: string): Promise<void> {
        this.store.delete(key);
    }

    async clear(): Promise<void> {
        this.store.clear();
    }
}