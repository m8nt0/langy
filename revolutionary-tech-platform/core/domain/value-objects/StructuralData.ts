import { AbstractionLevel, TechObjectType } from '../entities/TechObject';

/**
 * Represents structural relationships and hierarchies in the system
 */
export class StructuralData {
  constructor(
    private readonly nodes: StructuralNode[],
    private readonly relationships: StructuralRelationship[],
    private readonly metadata: StructuralMetadata
  ) {
    Object.freeze(this);
  }

  getNodes(): StructuralNode[] {
    return [...this.nodes];
  }

  getRelationships(): StructuralRelationship[] {
    return [...this.relationships];
  }

  getMetadata(): StructuralMetadata {
    return { ...this.metadata };
  }

  // Node operations
  findNode(id: string): StructuralNode | undefined {
    return this.nodes.find(n => n.id === id);
  }

  getNodesByType(type: TechObjectType): StructuralNode[] {
    return this.nodes.filter(n => n.type === type);
  }

  getNodesByLevel(level: AbstractionLevel): StructuralNode[] {
    return this.nodes.filter(n => n.level === level);
  }

  // Relationship operations
  findRelationships(nodeId: string): StructuralRelationship[] {
    return this.relationships.filter(r => 
      r.sourceId === nodeId || r.targetId === nodeId
    );
  }

  getRelationshipsByType(type: RelationshipType): StructuralRelationship[] {
    return this.relationships.filter(r => r.type === type);
  }

  // Structure analysis
  getHierarchy(rootId: string): StructuralHierarchy {
    const root = this.findNode(rootId);
    if (!root) throw new Error(`Node ${rootId} not found`);

    return {
      node: root,
      children: this.getChildren(rootId).map(child => 
        this.getHierarchy(child.id)
      )
    };
  }

  getChildren(nodeId: string): StructuralNode[] {
    const childRelationships = this.relationships.filter(r => 
      r.sourceId === nodeId && 
      (r.type === RelationshipType.CONTAINS || r.type === RelationshipType.IMPLEMENTS)
    );
    return childRelationships.map(r => 
      this.findNode(r.targetId)
    ).filter((n): n is StructuralNode => n !== undefined);
  }

  getParents(nodeId: string): StructuralNode[] {
    const parentRelationships = this.relationships.filter(r => 
      r.targetId === nodeId && 
      (r.type === RelationshipType.CONTAINS || r.type === RelationshipType.IMPLEMENTS)
    );
    return parentRelationships.map(r => 
      this.findNode(r.sourceId)
    ).filter((n): n is StructuralNode => n !== undefined);
  }

  // Graph analysis
  getDependencyGraph(): DependencyGraph {
    const nodes = new Map<string, Set<string>>();
    
    this.nodes.forEach(node => {
      nodes.set(node.id, new Set());
    });

    this.relationships
      .filter(r => r.type === RelationshipType.DEPENDS_ON)
      .forEach(r => {
        const dependencies = nodes.get(r.sourceId);
        if (dependencies) {
          dependencies.add(r.targetId);
        }
      });

    return {
      nodes: Array.from(nodes.entries()).map(([id, dependencies]) => ({
        id,
        dependencies: Array.from(dependencies)
      }))
    };
  }

  // Modification operations
  withNodes(nodes: StructuralNode[]): StructuralData {
    return new StructuralData(nodes, this.relationships, this.metadata);
  }

  withRelationships(relationships: StructuralRelationship[]): StructuralData {
    return new StructuralData(this.nodes, relationships, this.metadata);
  }

  withMetadata(metadata: Partial<StructuralMetadata>): StructuralData {
    return new StructuralData(
      this.nodes,
      this.relationships,
      { ...this.metadata, ...metadata }
    );
  }
}

export interface StructuralNode {
  id: string;
  type: TechObjectType;
  level: AbstractionLevel;
  name: string;
  metadata?: {
    complexity?: number;
    stability?: number;
    maintainability?: number;
    [key: string]: any;
  };
}

export enum RelationshipType {
  CONTAINS = 'CONTAINS',
  IMPLEMENTS = 'IMPLEMENTS',
  DEPENDS_ON = 'DEPENDS_ON',
  EXTENDS = 'EXTENDS',
  USES = 'USES',
  PROVIDES = 'PROVIDES',
  INFLUENCES = 'INFLUENCES'
}

export interface StructuralRelationship {
  id: string;
  type: RelationshipType;
  sourceId: string;
  targetId: string;
  metadata?: {
    strength?: number;
    impact?: number;
    bidirectional?: boolean;
    [key: string]: any;
  };
}

export interface StructuralMetadata {
  totalNodes: number;
  totalRelationships: number;
  maxDepth: number;
  metrics: {
    cohesion?: number;
    coupling?: number;
    complexity?: number;
    [key: string]: any;
  };
}

export interface StructuralHierarchy {
  node: StructuralNode;
  children: StructuralHierarchy[];
}

export interface DependencyGraph {
  nodes: {
    id: string;
    dependencies: string[];
  }[];
} 