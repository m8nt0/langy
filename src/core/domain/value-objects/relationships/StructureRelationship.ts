// src/core/domain/value-objects/relationships/StructureRelationship.ts
import { TechObjectId } from '../TechObjectId';

export type StructureRelationType =
  | 'DEPENDS_ON' | 'DEPENDANT_OF'
  | 'EXTENDS' | 'EXTENDED_BY'
  | 'IMPLEMENTS' | 'IMPLEMENTED_BY'
  | 'USES' | 'USED_BY'
  | 'ABSTRACTS_TO' | 'ABSTRACTS_FROM'
  | 'COMPETES_WITH'
  | 'REPLACES' | 'REPLACED_BY'
  | 'INFLUENCES' | 'INFLUENCED_BY';

export class StructureRelationship {
  constructor(
    public readonly sourceId: TechObjectId,
    public readonly targetId: TechObjectId,
    public readonly type: StructureRelationType,
    public readonly createdAt: Date = new Date(),
    public readonly isActive: boolean = true
  ) { }

  static create(
    sourceId: TechObjectId,
    targetId: TechObjectId,
    type: StructureRelationType
  ): StructureRelationship {
    return new StructureRelationship(sourceId, targetId, type);
  }

  deactivate(): StructureRelationship {
    return new StructureRelationship(
      this.sourceId, this.targetId, this.type, this.createdAt, false
    );
  }

  isDirectional(): boolean {
    return ['DEPENDS_ON', 'EXTENDS', 'IMPLEMENTS', 'USES', 'ABSTRACTS_TO', 'REPLACES', 'INFLUENCES'].includes(this.type);
  }

  getReverse(): StructureRelationType | null {
    const reverseMap: Record<StructureRelationType, StructureRelationType | null> = {
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
    return ['COMPETES_WITH'].includes(this.type);
  }
}