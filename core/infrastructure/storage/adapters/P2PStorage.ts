interface P2PConfig {
    nodeId: string;
    bootstrapPeers: string[];
    replicationFactor: number;
}

export class P2PStorageAdapter {
    private config: P2PConfig;
    // dht stands for Distributed Hash Table, used as a lookup just like IPFS
    private dht: Map<string, any> = new Map();
    private peers: Set<string> = new Set();

    constructor(config: P2PConfig) {
        this.config = config;
        this.initializeP2P();
    }

    private async initializeP2P() {
        for (const peer of this.config.bootstrapPeers) {
            await this.connectToPeer(peer);
        }
    }

    private async connectToPeer(peerId: string) {
        this.peers.add(peerId);
        // TODO: Actual P2P connection logic would go here
    }

    async store(key: string, data: any): Promise<void> {
        const dataWithMeta = {
            data, 
            timestamp: Date.now(),
            nodeId: this.config.nodeId,
            replicas: []
        }

        // Store locally
        this.dht.set(key, dataWithMeta);

        // Replicate to peers
        const peerArray = Array.from(this.peers);
        const replicaPeers = peerArray.slice(0, this.config.replicationFactor);

        for (const peer of replicaPeers) {
            await this.replicateToPeer(peer, key, dataWithMeta);
        }
    }

    private async replicateToPeer(peerId: string, key: string, data: any) {
        // TODO: Send data to peer for replication
        // This would use actual P2P protocol 
    }

    async retrieve(key: string): Promise< any> {
        // Try local first
        if (this.dht.has(key)) {
            return this.dht.get(key).data
        }

        // Query peers
        for (const peer of this.peers) {
            try {
                const data = await this.queryPeer(peer, key);
                if (data) {
                    // Cache it locally
                    this.dht.set(key, { data, timeStamp: Date.now() });
                    return data;
                }
            } catch (error) {
                // throw new Error()
                continue;
            }
        }

        throw new Error(`Key not found: ${key}`);
    }

    private async queryPeer(peerId: string, key: string): Promise<any> {
        // TODO: Query peer for data
        // this would use actual P2P protocol
        return null;
    }

    async delete(key: string): Promise<void> {
        this.dht.delete(key)
        // TODO: send delete message to peers
    }

    async list(): Promise<string[]> {
        return Array.from(this.dht.keys());
    }
}