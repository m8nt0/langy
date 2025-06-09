// src/core/infrastructure/persistence/adapters/LocalStorageAdapter.ts
export interface LocalStorageAdapter {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    keys(): string[];
}

export class BrowserLocalStorageAdapter implements LocalStorageAdapter {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    keys(): string[] {
        return Object.keys(localStorage);
    }
}

export class MemoryStorageAdapter implements LocalStorageAdapter {
    private storage = new Map<string, any>();

    get<T>(key: string): T | null {
        return this.storage.get(key) || null;
    }

    set<T>(key: string, value: T): void {
        this.storage.set(key, value);
    }

    remove(key: string): void {
        this.storage.delete(key);
    }

    clear(): void {
        this.storage.clear();
    }

    keys(): string[] {
        return Array.from(this.storage.keys());
    }
}