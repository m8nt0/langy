// src/core/infrastructure/storage/adapters/CloudStorage.ts
export class S3StorageAdapter implements StorageAdapter {
    private s3: any;
  
    constructor(private config: any) {
      this.init();
    }
  
    private async init() {
      const AWS = await import('aws-sdk');
      this.s3 = new AWS.S