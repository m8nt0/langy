// core/infrastructure/compute/adapters/CloudCompute.ts

import { ComputeTask, ComputeResult } from './index';

interface CloudComputeConfig {
    provider: 'aws' | 'gcp' | 'azure';
    instanceOf: string;
    region: string;
    credentials: any;
    additionalOptions?: {
        [key: string]: any;
    }
}

export class CloudComputeAdapter {
    private config: CloudComputeConfig;
    // This might refer to the provider? or cloud function client?
    // TODO: figure out the type
    private client: any;

    constructor(config: CloudComputeConfig) {
        this.config = config;
        this.initializeClient();
    }

    private initializeClient() {
        // TODO: Will have to initialize for cloud function client
    }

    async execute(task: ComputeTask): Promise<ComputeResult> {
        const startTime = Date.now();
        try {
            const result = await this.invokeCloudFunction(task);
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

    private async invokeCloudFunction(task: ComputeTask): Promise<any> {
        // Invoke cloud functions (e.g. Lambdas, Cloud Functions, etc.)
        return await this.client.invoke() ({
            FunctionName: task.function,
            Payload: JSON.stringify(task.args)
        });
    }

    async schedule(task: ComputeTask, when: Date): Promise<string> {
        // Underscored as a joining method for full string
        const scheduleId = `schedule_${Date.now()}_${Math.random()}`;
        return scheduleId;
    }
    
}