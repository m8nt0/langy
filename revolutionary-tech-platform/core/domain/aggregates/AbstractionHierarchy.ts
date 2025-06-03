import { AbstractionLevel, TechObjectType } from '../entities/TechObject';
import { AbstractionLevelData, StructuralData, NavigationContext } from '../value-objects';

/**
 * Aggregate root for managing abstraction levels and their relationships
 */
export class AbstractionHierarchy {
  constructor(
    private readonly levels: Map<AbstractionLevel, AbstractionLevelData>,
    private readonly structure: StructuralData,
    private readonly context: NavigationContext
  ) {
    Object.freeze(this);
  }

  // Accessors
  getLevels(): Map<AbstractionLevel, AbstractionLevelData> {
    return new Map(this.levels);
  }

  getStructure(): StructuralData {
    return this.structure;
  }

  getContext(): NavigationContext {
    return this.context;
  }

  // Level operations
  getLevel(level: AbstractionLevel): AbstractionLevelData | undefined {
    return this.levels.get(level);
  }

  // Navigation operations
  navigateToLevel(level: AbstractionLevel): AbstractionHierarchy {
    const newContext = this.context.withState({ currentLevel: level });
    return new AbstractionHierarchy(this.levels, this.structure, newContext);
  }

  // Structural analysis
  getObjectsAtLevel(level: AbstractionLevel): string[] {
    return this.structure.getNodesByLevel(level).map(node => node.id);
  }

  getTransitions(fromLevel: AbstractionLevel): AbstractionTransition[] {
    const levelData = this.levels.get(fromLevel);
    return levelData ? levelData.getTransitions() : [];
  }

  // Relationship analysis
  getDependenciesBetweenLevels(
    sourceLevel: AbstractionLevel,
    targetLevel: AbstractionLevel
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

  // Validation
  validateTransition(
    fromLevel: AbstractionLevel,
    toLevel: AbstractionLevel,
    objectId: string
  ): ValidationResult {
    const levelData = this.levels.get(fromLevel);
    if (!levelData) {
      return { valid: false, errors: ['Source level not found'] };
    }

    const transitions = levelData.getTransitions();
    const validTransition = transitions.find(t => t.targetLevel === toLevel);
    if (!validTransition) {
      return { valid: false, errors: ['Invalid transition path'] };
    }

    const node = this.structure.findNode(objectId);
    if (!node) {
      return { valid: false, errors: ['Object not found'] };
    }

    // Validate against transition rules
    const errors: string[] = [];
    validTransition.validationRules.forEach(rule => {
      // Here we would implement specific validation logic for each rule
      // For now, we'll just check if the node meets basic requirements
      if (!this.validateRule(rule, node)) {
        errors.push(`Failed validation rule: ${rule}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
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
  sourceLevel: AbstractionLevel;
  targetIds: string[];
  relationshipTypes: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface AbstractionTransition {
  targetLevel: AbstractionLevel;
  requirements: string[];
  validationRules: string[];
} 