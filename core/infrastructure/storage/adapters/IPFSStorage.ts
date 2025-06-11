// src/core/infrastructure/storage/adapters/IPFSStorage.ts

interface IPFSConfig {
    apiUrl: string; // For programmatic access to the IPFS node's functionalities (developer-facing)
    gatewayUrl: string; //For accessing IPFS content via HTTP (user-facing)
    pinningService?: string; //helps ensure that specific content remains available on the IPFS network
}

export class IPFSStorageAdapter {
    private config: IPFSConfig;
    private ipfs: any;

    constructor(config: IPFSConfig) {
        this.config = config;
        this.initializeIPFS();
    }

    private async initializeIPFS() {
        // Initialize IPFS client
        this.ipfs = await import('ipfs-http-client').then(module => module.create({ url: this.config.apiUrl }))
    }

    async store(key: string, data: any): Promise<string> {
        try {
            const content = JSON.stringify({ key, data, timestamp: Date.now()});
            const result = await this.ipfs.add(content);
            // Content Identifier (CID)
            const hash = result.cid.toString();

            // Pin to ensure persistence
            if (this.config.pinningService) {
                await this.ipfs.pin.add(hash);
            }

            return hash;
        } catch (error) {
            throw new Error (`IPFS storage failed: ${error.message}`);
        }
    }

    async retrieve(hash: string): Promise<any> {
        try {
            const chunks: Uint8Array[] = [];
    
            // Stream chunks from IPFS
            for await (const chunk of this.ipfs.cat(hash)) {
                // Normalize to Uint8Array
                const uintChunk = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
                chunks.push(uintChunk);
            }
    
            // Concatenate all chunks into a single Uint8Array
            const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
            const concatenated = new Uint8Array(totalLength);
    
            let offset = 0;
            for (const chunk of chunks) {
                concatenated.set(chunk, offset);
                offset += chunk.length;
            }
    
            // Decode binary to text
            const content = new TextDecoder().decode(concatenated);
    
            // Try to parse as JSON — fallback if needed
            try {
                const parsed = JSON.parse(content);
                return parsed?.data ?? parsed;
            } catch (jsonError) {
                // Not JSON — return raw text or buffer
                return content;
            }
    
        } catch (error: any) {
            throw new Error(`IPFS retrieval failed: ${error.message}`);
        }
    }
    

    async delete(hash: string): Promise<void> {
        // IPFS is immutable, but we can unpin
        try {
            await this.ipfs.pin.rm(hash);
        } catch (error) {
            // ignore if not pinned
        }
    }

    async search(query: string): Promise<string[]> {
        throw new Error('Search not implemented for IPFS')
    }
}


