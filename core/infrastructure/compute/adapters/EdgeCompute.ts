// core/infrastructure/compute/adapters/EdgeComputer.ts

import { ComputeTask, ComputeResult } from './index';

export class EdgeComputeAdapter {
    private edgeNodes: string[] = [];

    constructor(edgeNodes: string[]) {
        this.edgeNodes = edgeNodes;
    }

    async execute(task: ComputeTask): Promise<ComputeResult> {
        const startTime = Date.now();
        const node = this.selectBestNode();

        try {
            const result = await this.executeOnEdge(node, task);
            return {
                taskId: task.id,
                result,
                duration: Date.now() - startTime,
                computeEnd: Date.now()
            };
        } catch (error) {
            return {
                taskId: task.id,
                result: null,
                duration: Date.now() - startTime,
                computeEnd: Date.now()
            };
        }
    }

    private selectBestNode(): string {
        // TODO: have the ability to select the best node based on latency, load, etc. 
        // Unless we use priority based as we push for each one from the start!
        return this.edgeNodes[0]
    }

    private async executeOnEdge(node: string, task: ComputeTask): Promise<any> {
        // Execute on edge node
        const response = await fetch(`${node}/compute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        return await response.json()
    }   
}