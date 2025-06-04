import { RelationshipType } from './TechObject';

/**
 * Represents a relationship between two tech objects
 */
export class Relationship {
  constructor(
    private id: string,
    private sourceId: string,
    private targetId: string,
    private type: RelationshipType,
    private metadata: RelationshipMetadata,
    private strength: number = 1.0,
    private bidirectional: boolean = false
  ) {}

  // Core getters
  getId(): string { return this.id; }
  getSourceId(): string { return this.sourceId; }
  getTargetId(): string { return this.targetId; }
  getType(): RelationshipType { return this.type; }
  getMetadata(): RelationshipMetadata { return { ...this.metadata }; }
  getStrength(): number { return this.strength; }
  isBidirectional(): boolean { return this.bidirectional; }

  // Relationship metadata management
  updateMetadata(newMetadata: Partial<RelationshipMetadata>): void {
    this.metadata = {
      ...this.metadata,
      ...newMetadata,
      updatedAt: new Date()
    };
  }

  // Relationship strength management
  setStrength(strength: number): void {
    if (strength < 0 || strength > 1) {
      throw new Error('Relationship strength must be between 0 and 1');
    }
    this.strength = strength;
  }

  // Directionality management
  setBidirectional(bidirectional: boolean): void {
    this.bidirectional = bidirectional;
  }

  // Validation
  validate(): boolean {
    return !!(
      this.id &&
      this.sourceId &&
      this.targetId &&
      this.type &&
      this.strength >= 0 &&
      this.strength <= 1
    );
  }

  // Create inverse relationship
  createInverse(): Relationship {
    return new Relationship(
      `${this.id}_inverse`,
      this.targetId,
      this.sourceId,
      this.getInverseType(),
      {
        ...this.metadata,
        isInverse: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      this.strength,
      this.bidirectional
    );
  }

  // Get the inverse relationship type
  private getInverseType(): RelationshipType {
    switch (this.type) {
      case RelationshipType.DEPENDS_ON:
        return RelationshipType.USED_BY;
      case RelationshipType.EXTENDS:
        return RelationshipType.EXTENDED_BY;
      case RelationshipType.IMPLEMENTS:
        return RelationshipType.IMPLEMENTED_BY;
      case RelationshipType.USES:
        return RelationshipType.USED_BY;
      case RelationshipType.BUILDS_ON:
        return RelationshipType.BUILT_BY;
      case RelationshipType.ABSTRACTS:
        return RelationshipType.ABSTRACTED_BY;
      default:
        return this.type;
    }
  }

  // Serialization
  toJSON(): object {
    return {
      id: this.id,
      sourceId: this.sourceId,
      targetId: this.targetId,
      type: this.type,
      metadata: this.metadata,
      strength: this.strength,
      bidirectional: this.bidirectional
    };
  }
}

// Additional relationship types for inverse relationships
export enum InverseRelationshipType {
  USED_BY = 'USED_BY',
  EXTENDED_BY = 'EXTENDED_BY',
  IMPLEMENTED_BY = 'IMPLEMENTED_BY',
  BUILT_BY = 'BUILT_BY',
  ABSTRACTED_BY = 'ABSTRACTED_BY'
}

// Relationship metadata interface
export interface RelationshipMetadata {
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isInverse?: boolean;
  context?: string;
  examples?: string[];
  documentation?: string;
  constraints?: string[];
  impact?: RelationshipImpact;
  [key: string]: any; // Allow for extensible metadata
}

// Impact of the relationship
export interface RelationshipImpact {
  performance?: number;
  complexity?: number;
  maintenance?: number;
  security?: number;
  scalability?: number;
} 