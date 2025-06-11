// src/core/infrastructure/compute/adapters/LocalCompute.ts

import { ComputeTask, ComputeResult } from './index';

export class LocalComputerAdapter {
    private workers: Worker[] = [];
    private taskQueue: ComputeTask[] = [];
    private maxWorkers: number;

    constructor(maxWorkers = 4) {
        this.maxWorkers = maxWorkers
        this.initializeWorkers();
    }

    private initializeWorkers() {
        // initialize web workers or worker threads
        for (let i = 0; i < this.maxWorkers; i++) {
            // TODO: Worker initialization would go here
        }
    }

    async execute(task: ComputeTask): Promise<ComputeResult> {
        const startTime = Date.now();

        try {
            const result = await this.executeTask(task);
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
                error: error.message,
                duration: Date.now() - startTime,
                computeEnd: Date.now()
            };
        }
    }

    private async executeTask(task: ComputeTask): Promise<any> {
        // Execute task locally
        const fn = this.getFunctionByName(task.function);
        return await fn(...task.args);
    }

    private async getFunctionByName(name: string) {
        // Registry of available functions
        const functions = {
            'filter': (data: any[], predicate: Function) => data.filter(predicate),
            'map': (data: any[], mapper: Function) => data.map(mapper),
            'reduce': (data: any[], reducer: Function) => data.reduce(reducer),
            'sort': (data: any[], compareFn?: Function) => data.sort(compareFn),
        };

        return functions[name] || (() => { throw new Error(`Function not found": ${name}`)});
    }

    async cancel(taskId: string): Promise<void> {
        // Cancel task if possible 
        this.taskQueue = this.taskQueue.filter(task => task.id != taskId)
    }
}