// src/core/domain/entities/Relationship.ts
import { TechObjectId } from '../value-objects/TechObjectId';

export type RelationshipType = 
  | 'DEPENDS_ON' 
  | 'DEPENDANT_OF'
  | 'EXTENDS'
  | 'EXTENDED_BY' 
  | 'IMPLEMENTS'
  | 'IMPLEMENTED_BY' 
  | 'USES' 
  | 'USED_BY'
  | 'ABSTRACTS_TO' 
  | 'ABSTRACTS_FROM'
  | 'COMPETES_WITH'
  | 'REPLACES'
  | 'REPLACED_BY'
  | 'INFLUENCES'
  | 'INFLUENCED_BY';

export interface RelationshipMetadata {
  strength: number; // 0-1 scale
  confidence: number; // 0-1 scale
  source: 'USER' | 'SYSTEM' | 'AI' | 'COMMUNITY';
  description?: string;
  evidence?: string[];
}

export class Relationship {
  constructor(
    public readonly sourceId: TechObjectId,
    public readonly targetId: TechObjectId,
    public readonly type: RelationshipType,
    public readonly metadata: RelationshipMetadata,
    public readonly createdAt: Date = new Date(),
    public readonly isActive: boolean = true
  ) {}

  static create(
    sourceId: TechObjectId,
    targetId: TechObjectId,
    type: RelationshipType,
    metadata: RelationshipMetadata
  ): Relationship {
    return new Relationship(sourceId, targetId, type, metadata);
  }

  deactivate(): Relationship {
    return new Relationship(
      this.sourceId,
      this.targetId,
      this.type,
      this.metadata,
      this.createdAt,
      false
    );
  }

  updateMetadata(metadata: Partial<RelationshipMetadata>): Relationship {
    return new Relationship(
      this.sourceId,
      this.targetId,
      this.type,
      { ...this.metadata, ...metadata },
      this.createdAt,
      this.isActive
    );
  }

  isDirectional(): boolean {
    return ['DEPENDS_ON', 'EXTENDS', 'IMPLEMENTS', 'USES', 'ABSTRACTS_TO', 'REPLACES'].includes(this.type);
  }

  getReverse(): RelationshipType | null {
    const reverseMap: Record<RelationshipType, RelationshipType | null> = {
      'DEPENDS_ON': 'DEPENDANT_OF',
      'DEPENDANT_OF': 'DEPENDS_ON',

      'EXTENDS': 'EXTENDED_BY',
      'EXTENDED_BY': 'EXTENDS',

      'IMPLEMENTS': 'IMPLEMENTED_BY',
      'IMPLEMENTED_BY': 'IMPLEMENTS',

      'USES': 'USED_BY',
      'USED_BY': 'USES',

      'ABSTRACTS_TO': 'ABSTRACTS_FROM',
      'ABSTRACTS_FROM': 'ABSTRACTS_TO',

      'COMPETES_WITH': 'COMPETES_WITH',

      'REPLACES': 'REPLACED_BY',
      'REPLACED_BY': 'REPLACES',

      'INFLUENCES': 'INFLUENCED_BY',
      'INFLUENCED_BY': 'INFLUENCES',
    };
    return reverseMap[this.type];
  }

  isBidirectional(): boolean {
    return ['COMPETES_WITH', 'INFLUENCES'].includes(this.type);
  }
}