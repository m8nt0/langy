// src/core/infrastructure/persistence/adapters/FileSystemAdapter.ts
import { promises as fs } from 'fs';
import path from 'path';

export interface FileSystemAdapter {
    read(filePath: string): Promise<string>;
    write(filePath: string, data: string): Promise<void>;
    exists(filePath: string): Promise<boolean>;
    list(dirPath: string): Promise<string[]>;
    delete(filePath: string): Promise<void>;
    mkdir(dirPath: string): Promise<void>;
}

export class LocalFileSystemAdapter implements FileSystemAdapter {
    constructor(private basePath: string = './data') { }

    private getFullPath(filePath: string): string {
        return path.join(this.basePath, filePath);
    }

    async read(filePath: string): Promise<string> {
        return await fs.readFile(this.getFullPath(filePath), 'utf-8');
    }

    async write(filePath: string, data: string): Promise<void> {
        const fullPath = this.getFullPath(filePath);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, data, 'utf-8');
    }

    async exists(filePath: string): Promise<boolean> {
        try {
            await fs.access(this.getFullPath(filePath));
            return true;
        } catch {
            return false;
        }
    }

    async list(dirPath: string): Promise<string[]> {
        return await fs.readdir(this.getFullPath(dirPath));
    }

    async delete(filePath: string): Promise<void> {
        await fs.unlink(this.getFullPath(filePath));
    }

    async mkdir(dirPath: string): Promise<void> {
        await fs.mkdir(this.getFullPath(dirPath), { recursive: true });
    }
}
