import { CloudStorageAdapter, IPFSStorageAdapter, P2PStorageAdapter, LocalFileStorage } from "../adapters";

type StorageType = 'cloud' | 'ipfs' | 'p2p' | 'local' | 'hybrid'

export interface StorageConfig {
    type: StorageType;
    primary?: any;
    failback?: any;
    cloud?: any;
    ipfs?: any;
    p2p?: any;
    local?: any;
}

export class StorageProvider {
    private adapters: Map<string, any> = new Map();
    private config: StorageConfig;

    constructor(config: StorageConfig) {
        this.config = config;
        this.initializeAdapters();
    }

    private initializeAdapters() {
        if (this.config.cloud) {
            this.adapters.set('cloud', new CloudStorageAdapter(this.config.cloud));
        }
        if (this.config.ipfs) {
            this.adapters.set('ipfs', new IPFSStorageAdapter(this.config.ipfs))
        }
        if (this.config.p2p) {
            this.adapters.set('p2p', new P2PStorageAdapter(this.config.p2p))
        }
        if (this.config.local) {
            this.adapters.set('local', new LocalFileStorage(this.config.local))
        }
    }

    async store(key: string, data: any): Promise<void> {
        const adapter = this.getAdapter();
        return adapter.store(key, data);
    }

    private getAdapter() {
        return this.adapters.get(this.config.type) || this.adapters.values().next().value;
    }

    async delete(key: string): Promise<void> {
        const adapter = this.getAdapter()
        await adapter.delete(key);
    }
}