// src/core/infrastructure/storage/adapters/LocalFileStorage.ts
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

// TODO: need to use this as interface for implementation accross the different storage types
export interface StorageAdapter {
    store(key: string, data: Buffer | string): Promise<string>;
    retrieve(key: string): Promise<Buffer>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    list(prefix?: string): Promise<string[]>;
    getMetadata(key: string): Promise<any>;
}

export class LocalFileStorage implements StorageAdapter {
    constructor(private basePath: string = './storage') { }

    private getFilePath(key: string): string {
        // Create a hash-based directory structure to avoid too many files in one directory
        const hash = crypto.createHash('md5').update(key).digest('hex');
        const subDir = hash.substring(0, 2);
        return path.join(this.basePath, subDir, `${hash}.data`);
    }

    private getMetadataPath(key: string): string {
        const dataPath = this.getFilePath(key);
        return dataPath.replace('.data', '.meta');
    }

    async store(key: string, data: Buffer | string): Promise<string> {
        const filePath = this.getFilePath(key);
        const metaPath = this.getMetadataPath(key);

        await fs.mkdir(path.dirname(filePath), { recursive: true });

        const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
        await fs.writeFile(filePath, buffer);

        const metadata = {
            key,
            size: buffer.length,
            contentType: this.detectContentType(buffer),
            hash: crypto.createHash('sha256').update(buffer).digest('hex'),
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        await fs.writeFile(metaPath, JSON.stringify(metadata, null, 2));

        return metadata.hash;
    }

    async retrieve(key: string): Promise<Buffer> {
        const filePath = this.getFilePath(key);
        return await fs.readFile(filePath);
    }

    async delete(key: string): Promise<void> {
        const filePath = this.getFilePath(key);
        const metaPath = this.getMetadataPath(key);

        try {
            await fs.unlink(filePath);
            await fs.unlink(metaPath);
        } catch (error: any) {
            if (error.code !== 'ENOENT') throw error;
        }
    }

    async exists(key: string): Promise<boolean> {
        try {
            await fs.access(this.getFilePath(key));
            return true;
        } catch {
            return false;
        }
    }

    async list(prefix?: string): Promise<string[]> {
        const keys: string[] = [];

        const scanDirectory = async (dir: string) => {
            try {
                const entries = await fs.readdir(dir, { withFileTypes: true });

                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);

                    if (entry.isDirectory()) {
                        await scanDirectory(fullPath);
                    } else if (entry.name.endsWith('.meta')) {
                        const metadata = JSON.parse(await fs.readFile(fullPath, 'utf-8'));
                        if (!prefix || metadata.key.startsWith(prefix)) {
                            keys.push(metadata.key);
                        }
                    }
                }
            } catch (error: any) {
                if (error.code !== 'ENOENT') throw error;
            }
        };

        await scanDirectory(this.basePath);
        return keys;
    }

    async getMetadata(key: string): Promise<any> {
        const metaPath = this.getMetadataPath(key);
        const metadata = await fs.readFile(metaPath, 'utf-8');
        return JSON.parse(metadata);
    }

    private detectContentType(buffer: Buffer): string {
        // Simple content type detection based on file signatures
        const header = buffer.toString('hex').substring(0, 8).toUpperCase();

        if (header.startsWith('89504E47')) return 'image/png';
        if (header.startsWith('FFD8FF')) return 'image/jpeg';
        if (header.startsWith('47494638')) return 'image/gif';
        if (header.startsWith('504B0304')) return 'application/zip';
        if (header.startsWith('25504446')) return 'application/pdf';

        // Try to detect text content
        try {
            buffer.toString('utf-8');
            return 'text/plain';
        } catch {
            return 'application/octet-stream';
        }
    }
}