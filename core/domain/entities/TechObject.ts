
// src/core/domain/entities/TechObject.ts
import { TechObjectId } from '../value-objects/TechObjectId';
import { Version } from './Version';
import { Relationship } from './Relationship';

export interface TechObjectMetadata {
  name: string;
  description: string;
  creator?: string;
  website?: string;
  repository?: string;
  documentation?: string;
  community: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentSection {
  narrative: {
    history: string;
    purpose: string;
    designPhilosophy: string;
    currentStatus: 'active' | 'deprecated' | 'experimental';
  };
  viewerData: {
    timeline: any[];
    abstraction: any[];
    paradigm: any[];
    system: any[];
    useCase: any[];
    experience: any[];
  };
  codeExamples: {
    language: string;
    examples: Array<{
      title: string;
      code: string;
      description: string;
    }>;
  };
}

export class TechObject {
  constructor(
    public readonly id: TechObjectId,
    public readonly name: string,
    public readonly metadata: TechObjectMetadata,
    public readonly level: number,
    public readonly type: string,
    public readonly versions: Version[] = [],
    public readonly relationships: Relationship[] = [],
    public readonly content: ContentSection
  ) {}

  addVersion(version: Version): TechObject {
    return new TechObject(
      this.id,
      this.name,
      this.metadata,
      this.level,
      this.type,
      [...this.versions, version],
      this.relationships,
      this.content
    );
  }

  addRelationship(relationship: Relationship): TechObject {
    return new TechObject(
      this.id,
      this.name,
      this.metadata,
      this.level,
      this.type,
      this.versions,
      [...this.relationships, relationship],
      this.content
    );
  }

  updateMetadata(metadata: Partial<TechObjectMetadata>): TechObject {
    return new TechObject(
      this.id,
      this.name,
      { ...this.metadata, ...metadata, updatedAt: new Date() },
      this.level,
      this.type,
      this.versions,
      this.relationships,
      this.content
    );
  }

  getLatestVersion(): Version | null {
    return this.versions.length > 0 
      ? this.versions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
      : null;
  }

  hasRelationshipWith(targetId: TechObjectId): boolean {
    return this.relationships.some(rel => 
      rel.sourceId.equals(targetId) || rel.targetId.equals(targetId)
    );
  }
}
