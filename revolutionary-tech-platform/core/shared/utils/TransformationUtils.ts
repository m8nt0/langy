import { TechObject } from '../../domain/entities/TechObject';
import { ViewerData, StructuralData } from '../../domain/value-objects';
import { DeepPartial } from '../types/Common';

export class TransformationUtils {
  static toGraphData(structure: StructuralData): GraphData {
    const nodes = structure.getNodes().map(node => ({
      id: node.id,
      type: node.type,
      level: node.level,
      data: {
        name: node.name,
        ...node.metadata
      }
    }));

    const edges = structure.getRelationships().map(rel => ({
      id: rel.id,
      source: rel.sourceId,
      target: rel.targetId,
      type: rel.type,
      data: rel.metadata
    }));

    return { nodes, edges };
  }

  static toTreeData(objects: TechObject[]): TreeNode[] {
    const rootNodes: TreeNode[] = [];
    const nodeMap = new Map<string, TreeNode>();

    // First pass: create all nodes
    objects.forEach(obj => {
      nodeMap.set(obj.getId(), {
        id: obj.getId(),
        name: obj.getName(),
        type: obj.getType(),
        level: obj.getAbstractionLevel(),
        children: [],
        data: obj.getMetadata()
      });
    });

    // Second pass: build relationships
    objects.forEach(obj => {
      const node = nodeMap.get(obj.getId())!;
      const parentId = obj.getMetadata().parentId;

      if (parentId && nodeMap.has(parentId)) {
        nodeMap.get(parentId)!.children.push(node);
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  }

  static toTimelineData(objects: TechObject[]): TimelineEvent[] {
    return objects.map(obj => ({
      id: obj.getId(),
      type: 'OBJECT_CREATED',
      timestamp: obj.getMetadata().createdAt || new Date(),
      title: obj.getName(),
      description: obj.getMetadata().description || '',
      data: {
        objectType: obj.getType(),
        level: obj.getAbstractionLevel(),
        version: obj.getVersion()?.toString()
      }
    }));
  }

  static mergeConfigs<T extends object>(
    base: T,
    override: DeepPartial<T>
  ): T {
    const result = { ...base };

    for (const [key, value] of Object.entries(override)) {
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        result[key as keyof T] &&
        typeof result[key as keyof T] === 'object'
      ) {
        result[key as keyof T] = this.mergeConfigs(
          result[key as keyof T] as object,
          value as DeepPartial<object>
        ) as T[keyof T];
      } else {
        result[key as keyof T] = value as T[keyof T];
      }
    }

    return result;
  }

  static groupByLevel(objects: TechObject[]): Map<number, TechObject[]> {
    return objects.reduce((acc, obj) => {
      const level = obj.getAbstractionLevel();
      if (!acc.has(level)) {
        acc.set(level, []);
      }
      acc.get(level)!.push(obj);
      return acc;
    }, new Map<number, TechObject[]>());
  }
}

interface GraphData {
  nodes: Array<{
    id: string;
    type: string;
    level: number;
    data: Record<string, any>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type: string;
    data: Record<string, any>;
  }>;
}

interface TreeNode {
  id: string;
  name: string;
  type: string;
  level: number;
  children: TreeNode[];
  data: Record<string, any>;
}

interface TimelineEvent {
  id: string;
  type: string;
  timestamp: Date;
  title: string;
  description: string;
  data: Record<string, any>;
} 