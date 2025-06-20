// src/core/domain/repositories/IRelationshipRepository.ts
import { Relationship, RelationshipType } from '../../../domain/entities/Relationship';
import { TechObjectId } from '../../../domain/value-objects/TechObjectId';

export interface RelationshipFilter {
  sourceId?: TechObjectId;
  targetId?: TechObjectId;
  type?: RelationshipType;
  isActive?: boolean;
  minStrength?: number;
  minConfidence?: number;
}

export interface IRelationshipRepository {
  findBySourceId(sourceId: TechObjectId): Promise<Relationship[]>;
  findByTargetId(targetId: TechObjectId): Promise<Relationship[]>;
  // findByTechObjectId(techObjectId: TechObjectId): Promise<Relationship[]>;
  findByType(type: RelationshipType): Promise<Relationship[]>;
  findByFilter(filter: RelationshipFilter): Promise<Relationship[]>;
  
  save(relationship: Relationship): Promise<void>;
  delete(sourceId: TechObjectId, targetId: TechObjectId, type: RelationshipType): Promise<void>;
  exists(sourceId: TechObjectId, targetId: TechObjectId, type: RelationshipType): Promise<boolean>;
  findAll(): Promise<Relationship[]>;
}