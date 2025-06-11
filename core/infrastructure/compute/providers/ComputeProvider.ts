import { LocalComputeAdapter, CloudComputeAdapter, EdgeComputeAdapter, P2PComputeAdapter } from "../adapters";
import { ComputeTask, ComputeResult } from '../adapters/index';

type ComputeType = 'local' | 'cloud' | 'edge' | 'p2p' | 'hybrid';

interface ComputeConfig {
    type: ComputeType;
    local?: any;
    cloud?: any;
    edge?: any;
    p2p?: any;
}

export class ComputeAdapter {
    private adapters: Map<string, any> = new Map();
    private config: ComputeConfig;

    constructor(config: ComputeConfig) {
        this.config = config;
        this.initializeAdapters();
    }

    private initializeAdapters() {
        // Logic of adapters initi. for each
        // TODO: implement how they will be processed and intercepted
        if (this.config.local) {
            this.adapters.set('local', new LocalComputeAdapter(this.config.local.maxWorkers));
        }
        if (this.config.cloud) {
            this.adapters.set('cloud', new CloudComputeAdapter(this.config.cloud));
        }
        if (this.config.edge) {
            this.adapters.set('edge', new EdgeComputeAdapter(this.config.edge.nodes));
        }
        if (this.config.p2p) {
            this.adapters.set('p2p', new P2PComputeAdapter(this.config.p2p.maxWorkers));
        }
    }

    async execute(task: ComputeTask): Promise<ComputeResult> {
        // TODO: implement execute function or somehow tie it with the compute infra
        const adapter = this.getAdapter();
        return await adapter.execute(task);
    }

    private getAdapter() {
        return this.adapters.get(this.config.type) || this.adapters.values().next().value;
    }
}