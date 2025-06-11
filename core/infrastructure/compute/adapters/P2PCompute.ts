// core/infrastructure/compute/adapters/P2PCompute.ts

import { ComputeTask, ComputeResult } from './index';

// interface P2PComputeConfig {
//     peerId: string;
//     bucket: string[];
//     additionalInfo?: {
//         [key: string]: number[]
//     }
// }

export class P2PComputeAdapter {
    private peers: Set<string> = new Set();

    constructor(peers: string[]) {
        peers.forEach(peer => this.peers.add(peer));
    }

    async execute(task: ComputeTask): Promise<ComputeResult> {
        const startTime = Date.now();

        // Distribute task to available peers       
        const availablePeers = Array.from(this.peers);
        if (availablePeers.length === 0) {
            throw new Error('No peers available fro computation');
        }

        try {
            const result = await this.distributeTask(task, availablePeers);
            return {
                taskId: task.id,
                result,
                duration: Date.now() - startTime,
                computeEnd: Date.now()
            }
        } catch (error) {
            return {
                taskId: task.id,
                result: null,
                error: error.message,
                duration: Date.now() - startTime,
                computeEnd: Date.now()
            }
        }
    }

    private async distributeTask(task: ComputeTask, peers: string[]): Promise<any> {
        // Simple round-robin distribution
        const peer = peers[0];
        // Send task to peer and wait for result
        return await this.sendToPeer(peer, task);
    }

    private async sendToPeer(peer: string, task: ComputeTask): Promise<any> {
        // P2P communication to send task; simple
        return { compute: true, peer}
    }
}