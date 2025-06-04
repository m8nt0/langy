import { UUID, Description, Identifiable, Named, Versioned } from '../../shared/types/Common';
import { ValidationUtils } from '../../shared/utils/ValidationUtils';
import { TechObjectType } from '../../shared/constants/ObjectTypes';
import { AbstractionLevel } from '../../shared/constants/AbstractionLevels';
import { DomainError } from '../../shared/errors/DomainError';
import { Version } from './Version';
import { Relationship, RelationshipMetadata } from './Relationship';

/**
 * Base class for all technology objects in the system.
 * This serves as the foundation for programming languages, libraries, frameworks, etc.
 */
export class TechObject implements Identifiable, Named, Versioned {
  constructor(
    public readonly id: UUID,
    public name: string,
    public description: Description,
    public type: TechObjectType,
    public level: AbstractionLevel,
    public version: string,
    private relationships: Relationship[],
  ) {
    this.validate();
  }

  private validate(): void {
    ValidationUtils.validateUUID(this.id);
    ValidationUtils.validateString(this.name, 'name', { minLength: 1 });
    ValidationUtils.validateObjectType(this.type);
    ValidationUtils.validateAbstractionLevel(this.level);
  }

  public getId(): UUID {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): TechObjectType {
    return this.type;
  }

  public getAbstractionLevel(): AbstractionLevel {
    return this.level;
  }

  public getDescription(): Description {
    return this.description;
  }

  public getVersion(): string {
    return this.version;
  }

  public getRelationships(): Relationship[] {
    return [...this.relationships];
  }

  public update(updates: {
    name?: string;
    type?: TechObjectType;
    level?: AbstractionLevel;
    description?: Partial<Description>;
  }): void {
    if (updates.name) {
      ValidationUtils.validateString(updates.name, 'name', { minLength: 1 });
      this.name = updates.name;
    }

    if (updates.type) {
      ValidationUtils.validateObjectType(updates.type);
      this.type = updates.type;
    }

    if (updates.level) {
      ValidationUtils.validateAbstractionLevel(updates.level);
      this.level = updates.level;
    }

    if (updates.description) {
      this.description = {
        ...this.description,
        ...updates.description,
      };
    }
  }

  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      level: this.level,
      version: this.version,
      relationships: this.relationships,
    };
  }

  public static fromJSON(json: Record<string, any>): TechObject {
    try {
      return new TechObject(
        json.id,
        json.name,
        json.description,
        json.type,
        json.level,
        json.version,
        json.relationships,
      );
    } catch (error) {
      throw new DomainError(
        'Failed to create TechObject from JSON',
        'INVALID_JSON',
        { cause: error }
      );
    }
  }

  // Relationship management
  addRelationship(relationship: Relationship): void {
    this.relationships.push(relationship);
  }

  removeRelationship(relationshipId: string): void {
    this.relationships = this.relationships.filter(r => r.getId() !== relationshipId);
  }

  // Version management
  updateVersion(newVersion: Version): void {
    this.version = newVersion.toString();
  }

  // Validation
  // validate(): boolean {
  //   return !!(
  //     this.id &&
  //     this.name &&
  //     this.type &&
  //     this.level &&
  //     this.version
  //   );
  // }
}

// Types and interfaces
export enum RelationshipType {
  DEPENDS_ON = 'DEPENDS_ON',
  EXTENDS = 'EXTENDS',
  IMPLEMENTS = 'IMPLEMENTS',
  USES = 'USES',
  BUILDS_ON = 'BUILDS_ON',
  ABSTRACTS = 'ABSTRACTS',
  // Inverse relationships
  DEPENDANT_OF = 'DEPENDANT_OF',
  EXTENDED_BY = 'EXTENDED_BY',
  IMPLEMENTED_BY = 'IMPLEMENTED_BY',
  USED_BY = 'USED_BY',
  BUILT_BY = 'BUILT_BY',
  ABSTRACTED_BY = 'ABSTRACTED_BY'
}

export interface TechObjectMetadata {
  creator: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  url?: string;
  documentation?: string;
  repository?: string;
  license?: string;
  [key: string]: any; // Allow for extensible metadata
} 