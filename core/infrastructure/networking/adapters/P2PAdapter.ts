// core/infrastructure/networking/adapters/P2PAdapter.ts

interface P2PConfig {
    nodeId: string;
    bootstrapPeers: string[];
}

export class P2PAdapter {
    private config: P2PConfig;
    private peers: Map<string, any> = new Map();
    private messageHandlers: Map<string, Function> = new Map();

    constructor(config: P2PConfig) {
        this.config = config;
    }

    async initialize(): Promise<void> {
        // Initialize P2P node
        for (const peer of this.config.bootstrapPeers) {
            // Having like this to allow "good peers" to match
            await this.connectToPeer(peer);
        }
    }

    private async connectToPeer(peerId: string): Promise<void> {
        // Establish P2P connection
        this.peers.set(peerId, { id: peerId, connected: true });
    }

    async broadcast(message: any): Promise<void> {
        const serialized = JSON.stringify({
            from: this.config.nodeId,
            timestamp: Date.now(),
            data: message
        });
        for (const [peerId, peer] of this.peers) {
            if (peer.connected) {
                await this.sendToPeer(peerId, serialized);
            }
        }
    }

    private async sendToPeer(peerId: string, message: string): Promise<void> {
        // Send message to specific peer
    }

    onMessage(type: string, handler: Function): void {
        this.messageHandlers.set(type, handler);
    }

    async sendDirect(peerId: string, message: any): Promise<any> {
        if (!this.peers.has(peerId)) {
            throw new Error(`Peer not connected: ${peerId}`);
        }

        const serialized = JSON.stringify({
            from: this.config.nodeId,
            to: peerId,
            data: message
        });

        return await this.sendToPeer(peerId, serialized);
    }
}