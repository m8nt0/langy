import { TechObject } from '../entities';
import { TechObjectDto } from '../../application/dto';

// Represents a single step in the breadcrumb
export interface NavigationNode {
  techObjectId: string;
  techObjectName: string;
  level: number;
}

export class NavigationPath {
  public readonly nodes: ReadonlyArray<NavigationNode>;

  private constructor(nodes: ReadonlyArray<NavigationNode>) {
    this.nodes = nodes;
  }

  static empty(): NavigationPath {
    return new NavigationPath([]);
  }

  // Returns a NEW NavigationPath with the added node
  add(techObject: TechObject): NavigationPath {
    const newNode: NavigationNode = {
      techObjectId: techObject.id.toString(),
      techObjectName: techObject.name,
      level: techObject.level.toNumber(),
    };

    // Avoid adding duplicates if the user clicks the same item twice
    if (this.nodes[this.nodes.length - 1]?.techObjectId === newNode.techObjectId) {
      return this;
    }

    return new NavigationPath([...this.nodes, newNode]);
  }

  // Returns a NEW NavigationPath up to a certain point
  slice(toIndex: number): NavigationPath {
    const newNodes = this.nodes.slice(0, toIndex + 1);
    return new NavigationPath(newNodes);
  }
}