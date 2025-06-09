// src/core/infrastructure/persistence/repositories/TechObjectRepository.ts
import { ITechObjectRepository } from '../../../domain/repositories/ITechObjectRepository';
import { TechObject } from '../../../domain/entities/TechObject';
import { TechObjectId } from '../../../domain/value-objects/TechObjectId';
import { DatabaseAdapter } from '../adapters/DatabaseAdapter';

export class TechObjectRepository implements ITechObjectRepository {
    constructor(private db: DatabaseAdapter) { }

    async findById(id: TechObjectId): Promise<TechObject | null> {
        const results = await this.db.query<any>(
            'SELECT * FROM tech_objects WHERE id = $1',
            [id.value]
        );

        if (results.length === 0) return null;

        return this.mapToEntity(results[0]);
    }

    async findByLevel(level: number): Promise<TechObject[]> {
        const results = await this.db.query<any>(
            'SELECT * FROM tech_objects WHERE level = $1',
            [level]
        );

        return results.map(row => this.mapToEntity(row));
    }

    async findByName(name: string): Promise<TechObject[]> {
        const results = await this.db.query<any>(
            'SELECT * FROM tech_objects WHERE name ILIKE $1',
            [`%${name}%`]
        );

        return results.map(row => this.mapToEntity(row));
    }

    async save(techObject: TechObject): Promise<void> {
        const data = this.mapToRow(techObject);

        const existing = await this.findById(techObject.id);
        if (existing) {
            await this.db.update('tech_objects', techObject.id.value, data);
        } else {
            await this.db.insert('tech_objects', { id: techObject.id.value, ...data });
        }
    }

    async delete(id: TechObjectId): Promise<void> {
        await this.db.delete('tech_objects', id.value);
    }

    async findAll(): Promise<TechObject[]> {
        const results = await this.db.query<any>('SELECT * FROM tech_objects');
        return results.map(row => this.mapToEntity(row));
    }

    private mapToEntity(row: any): TechObject {
        return new TechObject(
            new TechObjectId(row.id),
            row.name,
            row.type,
            row.level,
            JSON.parse(row.versions || '[]'),
            JSON.parse(row.metadata || '{}'),
            JSON.parse(row.relationships || '[]'),
            JSON.parse(row.content || '{}')
        );
    }

    private mapToRow(techObject: TechObject): any {
        return {
            name: techObject.name,
            type: techObject.type,
            level: techObject.level,
            versions: JSON.stringify(techObject.versions),
            metadata: JSON.stringify(techObject.metadata),
            relationships: JSON.stringify(techObject.relationships),
            content: JSON.stringify(techObject.content),
            updated_at: new Date()
        };
    }
}