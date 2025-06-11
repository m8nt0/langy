export * from './CloudCompute';
export * from './EdgeCompute';
export * from './LocalCompute';
export * from './P2PCompute';


export interface ComputeTask {
    id: string,
    function: string,
    // TODO: Figure out the args purpose
    args: any[];
    timeout?: number;
}

export interface ComputeResult {
    taskId: string;
    result: any;
    error?: string;
    duration: number;
    // Maybe when it finished
    computeEnd: number;
}