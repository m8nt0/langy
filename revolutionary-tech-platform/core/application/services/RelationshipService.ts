import { TechObject } from '../../domain/entities/TechObject';
import { StructuralData, RelationshipType } from '../../domain/value-objects';
import { TechObjectRepository, CachePort } from '../ports';

export class RelationshipService {
  constructor(
    private readonly repository: TechObjectRepository,
    private readonly cache: CachePort
  ) {}

  async findByRelationships(
    objectId: string,
    type?: RelationshipType
  ): Promise<RelationshipResult> {
    const cacheKey = `by:${objectId}:${type || 'all'}`;
    const cached = await this.cache.get<RelationshipResult>(cacheKey);
    if (cached) return cached;

    const object = await this.repository.findById(objectId);
    if (!object) {
      throw new Error('Object not found');
    }

    const relationships = await this.repository.findRelated(objectId, type);
    const structure = await this.buildRelationshipStructure(object, relationships);

    const result = {
      sourceObject: object,
      relatedObjects: relationships,
      structure,
      metadata: this.buildRelationshipMetadata(object, relationships, 'BY')
    };

    await this.cache.set(cacheKey, result, { ttl: 3600000 }); // 1 hour
    return result;
  }

  async findForRelationships(
    objectId: string,
    type?: RelationshipType
  ): Promise<RelationshipResult> {
    const cacheKey = `for:${objectId}:${type || 'all'}`;
    const cached = await this.cache.get<RelationshipResult>(cacheKey);
    if (cached) return cached;

    const object = await this.repository.findById(objectId);
    if (!object) {
      throw new Error('Object not found');
    }

    const relationships = await this.repository.findDependents(objectId);
    const structure = await this.buildRelationshipStructure(object, relationships);

    const result = {
      sourceObject: object,
      relatedObjects: relationships,
      structure,
      metadata: this.buildRelationshipMetadata(object, relationships, 'FOR')
    };

    await this.cache.set(cacheKey, result, { ttl: 3600000 }); // 1 hour
    return result;
  }

  async analyzeRelationshipPath(
    sourceId: string,
    targetId: string
  ): Promise<RelationshipPath> {
    const source = await this.repository.findById(sourceId);
    const target = await this.repository.findById(targetId);

    if (!source || !target) {
      throw new Error('Source or target object not found');
    }

    const path = await this.findPath(source, target);
    return {
      source,
      target,
      path,
      metadata: this.buildPathMetadata(path)
    };
  }

  private async buildRelationshipStructure(
    source: TechObject,
    related: TechObject[]
  ): Promise<StructuralData> {
    const nodes = [
      {
        id: source.getId(),
        type: source.getType(),
        level: source.getAbstractionLevel(),
        name: source.getName()
      },
      ...related.map(obj => ({
        id: obj.getId(),
        type: obj.getType(),
        level: obj.getAbstractionLevel(),
        name: obj.getName()
      }))
    ];

    const relationships = related.map(obj => ({
      id: `${source.getId()}-${obj.getId()}`,
      type: RelationshipType.DEPENDS_ON,
      sourceId: source.getId(),
      targetId: obj.getId()
    }));

    return new StructuralData(nodes, relationships, {
      totalNodes: nodes.length,
      totalRelationships: relationships.length,
      maxDepth: 1,
      metrics: {
        complexity: this.calculateComplexity(relationships.length, nodes.length),
        cohesion: this.calculateCohesion(relationships.length, nodes.length)
      }
    });
  }

  private async findPath(
    source: TechObject,
    target: TechObject
  ): Promise<RelationshipPathNode[]> {
    // Implementation would use graph traversal to find the path
    // For now, return a simple direct path
    return [
      {
        object: source,
        relationships: []
      },
      {
        object: target,
        relationships: [{
          type: RelationshipType.DEPENDS_ON,
          metadata: {}
        }]
      }
    ];
  }

  private buildRelationshipMetadata(
    source: TechObject,
    related: TechObject[],
    direction: 'BY' | 'FOR'
  ): RelationshipMetadata {
    return {
      direction,
      count: related.length,
      types: this.countRelationshipTypes(related),
      timestamp: new Date()
    };
  }

  private buildPathMetadata(path: RelationshipPathNode[]): PathMetadata {
    return {
      length: path.length,
      directional: true,
      bidirectional: this.checkBidirectional(path),
      strength: this.calculatePathStrength(path)
    };
  }

  private countRelationshipTypes(objects: TechObject[]): Map<string, number> {
    return objects.reduce((acc, obj) => {
      const type = obj.getType();
      acc.set(type, (acc.get(type) || 0) + 1);
      return acc;
    }, new Map<string, number>());
  }

  private calculateComplexity(relationships: number, nodes: number): number {
    return nodes === 0 ? 0 : relationships / nodes;
  }

  private calculateCohesion(relationships: number, nodes: number): number {
    const maxPossibleRelationships = (nodes * (nodes - 1)) / 2;
    return maxPossibleRelationships === 0 ? 0 : relationships / maxPossibleRelationships;
  }

  private checkBidirectional(path: RelationshipPathNode[]): boolean {
    // Implementation would check if relationships exist in both directions
    return false;
  }

  private calculatePathStrength(path: RelationshipPathNode[]): number {
    // Implementation would calculate the strength based on relationship metadata
    return 1.0;
  }
}

export interface RelationshipResult {
  sourceObject: TechObject;
  relatedObjects: TechObject[];
  structure: StructuralData;
  metadata: RelationshipMetadata;
}

export interface RelationshipMetadata {
  direction: 'BY' | 'FOR';
  count: number;
  types: Map<string, number>;
  timestamp: Date;
}

export interface RelationshipPath {
  source: TechObject;
  target: TechObject;
  path: RelationshipPathNode[];
  metadata: PathMetadata;
}

export interface RelationshipPathNode {
  object: TechObject;
  relationships: Array<{
    type: RelationshipType;
    metadata: Record<string, any>;
  }>;
}

export interface PathMetadata {
  length: number;
  directional: boolean;
  bidirectional: boolean;
  strength: number;
} 