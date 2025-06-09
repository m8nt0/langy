// src/core/infrastructure/persistence/repositories/RelationshipRepository.ts
import { IRelationshipRepository } from '../../../domain/repositories/IRelationshipRepository';
import { Relationship } from '../../../domain/entities/Relationship';
import { TechObjectId } from '../../../domain/value-objects/TechObjectId';
import { DatabaseAdapter } from '../adapters/DatabaseAdapter';

export class RelationshipRepository implements IRelationshipRepository {
    constructor(private db: DatabaseAdapter) { }

    async findById(id: string): Promise<Relationship | null> {
        const results = await this.db.query<any>(
            'SELECT * FROM relationships WHERE id = $1',
            [id]
        );

        if (results.length === 0) return null;

        return this.mapToEntity(results[0]);
    }

    async findBySource(sourceId: TechObjectId): Promise<Relationship[]> {
        const results = await this.db.query<any>(
            'SELECT * FROM relationships WHERE source_id = $1',
            [sourceId.value]
        );

        return results.map(row => this.mapToEntity(row));
    }

    async findByTarget(targetId: TechObjectId): Promise<Relationship[]> {
        const results = await this.db.query<any>(
            'SELECT * FROM relationships WHERE target_id = $1',
            [targetId.value]
        );

        return results.map(row => this.mapToEntity(row));
    }

    async findByType(type: string): Promise<Relationship[]> {
        const results = await this.db.query<any>(
            'SELECT * FROM relationships WHERE type = $1',
            [type]
        );

        return results.map(row => this.mapToEntity(row));
    }

    async save(relationship: Relationship): Promise<void> {
        const data = this.mapToRow(relationship);

        const existing = await this.findById(relationship.id);
        if (existing) {
            await this.db.update('relationships', relationship.id, data);
        } else {
            await this.db.insert('relationships', { id: relationship.id, ...data });
        }
    }

    async delete(id: string): Promise<void> {
        await this.db.delete('relationships', id);
    }

    async findAll(): Promise<Relationship[]> {
        const results = await this.db.query<any>('SELECT * FROM relationships');
        return results.map(row => this.mapToEntity(row));
    }

    private mapToEntity(row: any): Relationship {
        return new Relationship(
            row.id,
            new TechObjectId(row.source_id),
            new TechObjectId(row.target_id),
            row.type,
            row.strength || 1.0,
            JSON.parse(row.metadata || '{}')
        );
    }

    private mapToRow(relationship: Relationship): any {
        return {
            source_id: relationship.sourceId.value,
            target_id: relationship.targetId.value,
            type: relationship.type,
            strength: relationship.strength,
            metadata: JSON.stringify(relationship.metadata),
            updated_at: new Date()
        };
    }
}