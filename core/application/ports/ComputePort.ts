// Heavy computation handling

export interface ComputeJob {
  id: string;
  type: string;
  input: any;
  config: ComputeConfig;
  status: ComputeStatus;
  progress: number;
  result?: any;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface ComputeConfig {
  priority?: 'low' | 'medium' | 'high';
  timeout?: number;
  retries?: number;
  maxMemory?: number;
  maxCpu?: number;
  async?: boolean;
}

export enum ComputeStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface ComputeMetrics {
  cpuUsage: number;
  memoryUsage: number;
  duration: number;
  startTime: Date;
  endTime?: Date;
}

export interface ComputePort {
  // Job management
  submit(type: string, input: any, config?: ComputeConfig): Promise<string>;
  cancel(jobId: string): Promise<void>;
  getStatus(jobId: string): Promise<ComputeStatus>;
  getResult(jobId: string): Promise<any>;
  getJob(jobId: string): Promise<ComputeJob>;

  // Batch operations
  submitBatch(jobs: Array<{ type: string; input: any; config?: ComputeConfig }>): Promise<string[]>;
  cancelBatch(jobIds: string[]): Promise<void>;
  getBatchStatus(jobIds: string[]): Promise<Map<string, ComputeStatus>>;
  getBatchResults(jobIds: string[]): Promise<Map<string, any>>;

  // Monitoring
  getMetrics(jobId: string): Promise<ComputeMetrics>;
  listJobs(status?: ComputeStatus): Promise<ComputeJob[]>;
  getQueueStats(): Promise<{
    pending: number;
    running: number;
    completed: number;
    failed: number;
  }>;

  // Resource management
  scaleResources(config: {
    minInstances?: number;
    maxInstances?: number;
    cpuThreshold?: number;
    memoryThreshold?: number;
  }): Promise<void>;

  // Cleanup
  cleanup(olderThan?: Date): Promise<void>;
} 