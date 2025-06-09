// src/core/infrastructure/persistence/repositories/LevelRepository.ts
import { ILevelRepository } from '../../../domain/repositories/ILevelRepository';
import { Level } from '../../../domain/entities/Level';
import { DatabaseAdapter } from '../adapters/DatabaseAdapter';

export class LevelRepository implements ILevelRepository {
    constructor(private db: DatabaseAdapter) { }

    async findById(id: string): Promise<Level | null> {
        const results = await this.db.query<any>(
            'SELECT * FROM levels WHERE id = $1',
            [id]
        );

        if (results.length === 0) return null;

        return this.mapToEntity(results[0]);
    }

    async findByNumber(levelNumber: number): Promise<Level | null> {
        const results = await this.db.query<any>(
            'SELECT * FROM levels WHERE level_number = $1',
            [levelNumber]
        );

        if (results.length === 0) return null;

        return this.mapToEntity(results[0]);
    }

    async findAll(): Promise<Level[]> {
        const results = await this.db.query<any>(
            'SELECT * FROM levels ORDER BY level_number'
        );

        return results.map(row => this.mapToEntity(row));
    }

    async save(level: Level): Promise<void> {
        const data = this.mapToRow(level);

        const existing = await this.findById(level.id);
        if (existing) {
            await this.db.update('levels', level.id, data);
        } else {
            await this.db.insert('levels', { id: level.id, ...data });
        }
    }

    async delete(id: string): Promise<void> {
        await this.db.delete('levels', id);
    }

    private mapToEntity(row: any): Level {
        return new Level(
            row.id,
            row.name,
            row.level_number,
            row.description,
            JSON.parse(row.config || '{}')
        );
    }

    private mapToRow(level: Level): any {
        return {
            name: level.name,
            level_number: level.levelNumber,
            description: level.description,
            config: JSON.stringify(level.config),
            updated_at: new Date()
        };
    }
}
