import { BaseStorageAdapter } from '../../../common/adapters/base';

/**
 * An implementation of the storage adapter using the browser's localStorage.
 * Data will persist between sessions.
 */
export class WebStorageAdapter implements BaseStorageAdapter {
    async getItem<T>(key: string): Promise<T | null> {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    async setItem<T>(key: string, value: T): Promise<void> {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    async removeItem(key: string): Promise<void> {
        window.localStorage.removeItem(key);
    }

    async clear(): Promise<void> {
        window.localStorage.clear();
    }
}