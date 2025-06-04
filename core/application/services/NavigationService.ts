// Handles abstraction level transitions

import { TechObject } from '../../domain/entities/TechObject';
import { NavigationContext, StructuralData } from '../../domain/value-objects';
import { AbstractionHierarchy } from '../../domain/aggregates/AbstractionHierarchy';
import { TechObjectRepository, CachePort } from '../ports';
import { NavigationState, NavigationPathEntry } from '../../shared/types/NavigationTypes';
import { NavigationError, NavigationErrorCodes } from '../../shared/errors/NavigationError';
import { ValidationUtils } from '../../shared/utils/ValidationUtils';
import { AbstractionLevel, LEVEL_TRANSITIONS } from '../../shared/constants/AbstractionLevels';

export class NavigationService {
  constructor(
    private readonly repository: TechObjectRepository,
    private readonly cache: CachePort
  ) {}

  async navigateUp(
    objectId: string,
    currentLevel: AbstractionLevel,
    hierarchy: AbstractionHierarchy
  ): Promise<NavigationResult> {
    ValidationUtils.validateUUID(objectId);
    ValidationUtils.validateAbstractionLevel(currentLevel);

    const object = await this.getObject(objectId);
    if (!object) {
      throw new NavigationError(
        `Object not found: ${objectId}`,
        NavigationErrorCodes.INVALID_TRANSITION
      );
    }

    const transition = LEVEL_TRANSITIONS[currentLevel];
    if (!transition || !transition.up) {
      throw NavigationError.invalidTransition(
        currentLevel,
        -1,
        'Already at highest level'
      );
    }

    const targetLevel = transition.up;
    const validation = hierarchy.validateTransition(currentLevel, targetLevel, objectId);
    if (!validation.valid) {
      throw NavigationError.invalidTransition(
        currentLevel,
        targetLevel,
        validation.errors.join(', ')
      );
    }

    const higherLevelObjects = await this.findRelatedAtLevel(object, targetLevel);
    const structure = await this.buildNavigationStructure(object, higherLevelObjects);
    const context = this.createNavigationContext(targetLevel, higherLevelObjects);

    return {
      targetLevel,
      objects: higherLevelObjects,
      structure,
      context,
      state: this.buildNavigationState(context)
    };
  }

  async navigateDown(
    objectId: string,
    currentLevel: AbstractionLevel,
    hierarchy: AbstractionHierarchy
  ): Promise<NavigationResult> {
    const object = await this.getObject(objectId);
    if (!object) {
      throw new Error('Object not found');
    }

    const targetLevel = this.getNextLowerLevel(currentLevel);
    if (!targetLevel) {
      throw new Error('Already at lowest level');
    }

    const validation = hierarchy.validateTransition(currentLevel, targetLevel, objectId);
    if (!validation.valid) {
      throw new Error(`Invalid transition: ${validation.errors.join(', ')}`);
    }

    const lowerLevelObjects = await this.findRelatedAtLevel(object, targetLevel);
    const structure = await this.buildNavigationStructure(object, lowerLevelObjects);

    return {
      targetLevel,
      objects: lowerLevelObjects,
      structure,
      context: this.createNavigationContext(targetLevel, lowerLevelObjects)
    };
  }

  private async getObject(id: string): Promise<TechObject | null> {
    const cacheKey = `object:${id}`;
    const cached = await this.cache.get<TechObject>(cacheKey);
    if (cached) return cached;

    const object = await this.repository.findById(id);
    if (object) {
      await this.cache.set(cacheKey, object, { ttl: 3600000 }); // 1 hour
    }

    return object;
  }

  private getNextHigherLevel(current: AbstractionLevel): AbstractionLevel | null {
    const levels = [
      AbstractionLevel.LEVEL_1,
      AbstractionLevel.LEVEL_2,
      AbstractionLevel.LEVEL_3,
      AbstractionLevel.LEVEL_4
    ];
    const currentIndex = levels.indexOf(current);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  }

  private getNextLowerLevel(current: AbstractionLevel): AbstractionLevel | null {
    const levels = [
      AbstractionLevel.LEVEL_1,
      AbstractionLevel.LEVEL_2,
      AbstractionLevel.LEVEL_3,
      AbstractionLevel.LEVEL_4
    ];
    const currentIndex = levels.indexOf(current);
    return currentIndex > 0 ? levels[currentIndex - 1] : null;
  }

  private async findRelatedAtLevel(
    object: TechObject,
    level: AbstractionLevel
  ): Promise<TechObject[]> {
    const cacheKey = `related:${object.getId()}:${level}`;
    const cached = await this.cache.get<TechObject[]>(cacheKey);
    if (cached) return cached;

    const related = await this.repository.findByLevel(level);
    await this.cache.set(cacheKey, related, { ttl: 3600000 }); // 1 hour

    return related;
  }

  private async buildNavigationStructure(
    sourceObject: TechObject,
    relatedObjects: TechObject[]
  ): Promise<StructuralData> {
    // Implementation would create a structural representation
    // of the relationships between the source object and related objects
    return new StructuralData([], [], {
      totalNodes: relatedObjects.length + 1,
      totalRelationships: 0,
      maxDepth: 1,
      metrics: {}
    });
  }

  private createNavigationContext(
    level: AbstractionLevel,
    objects: TechObject[]
  ): NavigationContext {
    return NavigationContext.initial().withState({
      currentLevel: level,
      selectedIds: objects.map(o => o.getId())
    });
  }

  private buildNavigationState(context: NavigationContext): NavigationState {
    return {
      currentLevel: context.getCurrentState().currentLevel,
      selectedIds: context.getCurrentState().selectedIds,
      viewerType: context.getCurrentViewer().getType(),
      path: context.getPath().map(entry => ({
        id: entry.id,
        level: entry.level,
        timestamp: entry.timestamp,
        metadata: entry.metadata
      })),
      context: context.getMetadata()
    };
  }
}

export interface NavigationResult {
  targetLevel: AbstractionLevel;
  objects: TechObject[];
  structure: StructuralData;
  context: NavigationContext;
  state: NavigationState;
} 