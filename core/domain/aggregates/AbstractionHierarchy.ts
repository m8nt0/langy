import { HorizontalLevel } from '../value-objects/HorizontalLevel';
import { VerticalLevel } from '../../../VerticalLevel'

import {NavigationContext } from '../value-objects';

/**
 * Aggregate root for managing abstraction (Vertical) levels and Version (Horizontal) levels as well as their relationships
 */
export class AbstractionHierarchy {
  constructor(
    private readonly levels: Map<VerticalLevel,HorizontalLevel>,
    private readonly structure: StructuralData,
    private readonly context: NavigationContext
  ) {
    Object.freeze(this);
  }

  // Accessors
  getLevels(): Map<VerticalLevel,HorizontalLevel> {
    return new Map(this.levels);
  }

  getContext(): NavigationContext {
    return this.context;
  }

  // Level operations
  getVerticalLevel(level: HorizontalLevel): string {
    return this.levels.get(level);
  }

  getStructure(): AbstractionHierarchy {
    return 
  }

  // getHorizontalLevel(level: HorizontalLevel): undefined{
  //   return this.levels.get(level);
  // }

  // Navigation operations - Basically updating the navigationContext
  navigateToLevel(level: VerticalLevel): AbstractionHierarchy {
    const newContext = this.context.withState({ currentVerticalLevel: level });
    return new AbstractionHierarchy(this.levels, this.structure, newContext);
  }

  // Structural analysis
  getObjectsAtLevel(level: VerticalLevel): string[] {
    return this.structure.getNodesByLevel(level).map(node => node.id);
  }

  // getTransitions(fromLevel: VerticalLevel): AbstractionTransition[] {
  //   const levelData = this.levels.get(fromLevel);
  //   return levelData ? levelData.getTransitions() : [];
  // }

  // Relationship analysis
  getDependenciesBetweenLevels(
    sourceLevel: Map<VerticalLevel, HorizontalLevel>,
    targetLevel: Map<VerticalLevel, HorizontalLevel>
  ): LevelDependency[] {
    const sourceNodes = this.structure.getNodesByLevel(sourceLevel);
    const targetNodes = this.structure.getNodesByLevel(targetLevel);
    
    const dependencies: LevelDependency[] = [];
    
    sourceNodes.forEach(source => {
      const relationships = this.structure.findRelationships(source.id)
        .filter(r => {
          const targetNode = this.structure.findNode(r.targetId);
          return targetNode && targetNode.level === targetLevel;
        });
        
      if (relationships.length > 0) {
        dependencies.push({
          sourceId: source.id,
          sourceName: source.name,
          sourceLevel,
          targetIds: relationships.map(r => r.targetId),
          relationshipTypes: relationships.map(r => r.type)
        });
      }
    });

    return dependencies;
  }


  private validateRule(rule: string, node: any): boolean {
    // Implement specific validation logic here
    // This would be expanded based on actual validation requirements
    return true;
  }

  // Factory methods
  static create(): AbstractionHierarchy {
    const levels = new Map([
      [AbstractionLevel.LEVEL_1, AbstractionLevelData.createProgrammingLanguageLevel()],
      [AbstractionLevel.LEVEL_2, AbstractionLevelData.createLibraryLevel()],
      [AbstractionLevel.LEVEL_3, AbstractionLevelData.createFrameworkLevel()],
      [AbstractionLevel.LEVEL_4, AbstractionLevelData.createApplicationLevel()]
    ]);

    const structure = new StructuralData([], [], {
      totalNodes: 0,
      totalRelationships: 0,
      maxDepth: 4,
      metrics: {}
    });

    const context = NavigationContext.initial();

    return new AbstractionHierarchy(levels, structure, context);
  }
}

export interface LevelDependency {
  sourceId: string;
  sourceName: string;
  sourceLevel: Map<VerticalLevel,HorizontalLevel>;
  targetIds: string[];
  relationshipTypes: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface AbstractionTransition {
  targetLevel: Map<VerticalLevel,HorizontalLevel>;
  requirements: string[];
  validationRules: string[];
} 