// src/core/infrastructure/persistence/adapters/IPFSAdapter.ts
export interface IPFSAdapter {
    add(data: string | Buffer): Promise<string>;
    get(hash: string): Promise<Buffer>;
    pin(hash: string): Promise<void>;
    unpin(hash: string): Promise<void>;
    ls(hash: string): Promise<any[]>;
}

export class IPFSNodeAdapter implements IPFSAdapter {
    private ipfs: any;

    constructor() {
        this.init();
    }

    private async init() {
        try {
            const { create } = await import('ipfs-core');
            this.ipfs = await create();
        } catch {
            // Fallback to HTTP API
            const { create } = await import('ipfs-http-client');
            this.ipfs = create({ url: 'http://localhost:5001' });
        }
    }

    async add(data: string | Buffer): Promise<string> {
        const result = await this.ipfs.add(data);
        return result.cid.toString();
    }

    async get(hash: string): Promise<Buffer> {
        const chunks = [];
        for await (const chunk of this.ipfs.cat(hash)) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }

    async pin(hash: string): Promise<void> {
        await this.ipfs.pin.add(hash);
    }

    async unpin(hash: string): Promise<void> {
        await this.ipfs.pin.rm(hash);
    }

    async ls(hash: string): Promise<any[]> {
        const links = [];
        for await (const link of this.ipfs.ls(hash)) {
            links.push(link);
        }
        return links;
    }
}
