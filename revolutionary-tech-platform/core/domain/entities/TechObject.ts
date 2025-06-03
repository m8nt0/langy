import { Version } from './Version';
import { Relationship, RelationshipMetadata } from './Relationship';

/**
 * Base class for all technology objects in the system.
 * This serves as the foundation for programming languages, libraries, frameworks, etc.
 */
export class TechObject {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private type: TechObjectType,
    private version: Version,
    private metadata: TechObjectMetadata,
    private relationships: Relationship[],
    private abstractionLevel: AbstractionLevel
  ) {}

  // Core properties
  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getDescription(): string { return this.description; }
  getType(): TechObjectType { return this.type; }
  getVersion(): Version { 
    return this.version; 
  }
  getMetadata(): TechObjectMetadata { return this.metadata; }
  getRelationships(): Relationship[] { return [...this.relationships]; }
  getAbstractionLevel(): AbstractionLevel { return this.abstractionLevel; }

  // Relationship management
  addRelationship(relationship: Relationship): void {
    this.relationships.push(relationship);
  }

  removeRelationship(relationshipId: string): void {
    this.relationships = this.relationships.filter(r => r.getId() !== relationshipId);
  }

  // Version management
  updateVersion(newVersion: Version): void {
    this.version = newVersion;
  }

  // Metadata management
  updateMetadata(newMetadata: Partial<TechObjectMetadata>): void {
    this.metadata = { ...this.metadata, ...newMetadata };
  }

  // Abstraction level management
  setAbstractionLevel(level: AbstractionLevel): void {
    this.abstractionLevel = level;
  }

  // Validation
  validate(): boolean {
    return !!(
      this.id &&
      this.name &&
      this.type &&
      this.version &&
      this.abstractionLevel
    );
  }

  // Serialization
  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      version: this.version,
      metadata: this.metadata,
      relationships: this.relationships,
      abstractionLevel: this.abstractionLevel
    };
  }
}

// Types and interfaces
export enum TechObjectType {
  PROGRAMMING_LANGUAGE = 'PROGRAMMING_LANGUAGE',
  LIBRARY = 'LIBRARY',
  FRAMEWORK = 'FRAMEWORK',
  APPLICATION = 'APPLICATION'
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

export enum AbstractionLevel {
  LEVEL_1 = 1, // Programming Languages
  LEVEL_2 = 2, // Libraries
  LEVEL_3 = 3, // Frameworks
  LEVEL_4 = 4  // Applications
} 