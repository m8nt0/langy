// Navigate to higher abstraction levels

import { TechObject } from '../../domain/entities/TechObject';
// import { AbstractionLevel } from '../../shared/constants/AbstractionLevels';
import { VerticalLevel } from '../../domain/value-objects';
import { NavigationContext } from '../../domain/value-objects';
import { AbstractionHierarchy } from '../../domain/aggregates/AbstractionHierarchy';
import { NavigationService, ViewerService } from '../services';

export class AbstractUpUseCase {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly viewerService: ViewerService
  ) {}

  async execute(
    objectId: string,
    currentLevel: VerticalLevel,
    hierarchy: AbstractionHierarchy
  ): Promise<AbstractUpResult> {
    // Navigate up the abstraction hierarchy
    const navigationResult = await this.navigationService.navigateUp(
      objectId,
      currentLevel,
      hierarchy
    );

    // Update viewer for the new abstraction level
    const viewerResult = await this.viewerService.transformForViewer(
      navigationResult.objects,
      navigationResult.context.getCurrentViewer(),
      navigationResult.structure
    );

    return {
      targetLevel: navigationResult.targetLevel,
      objects: navigationResult.objects,
      structure: navigationResult.structure,
      context: navigationResult.context,
      visualization: viewerResult.visualization,
      metadata: this.buildMetadata(navigationResult, viewerResult)
    };
  }

  private buildMetadata(
    navigation: NavigationResult,
    viewer: ViewerResult
  ): AbstractUpMetadata {
    return {
      sourceLevel: navigation.context.getCurrentState().currentLevel,
      targetLevel: navigation.targetLevel,
      objectCount: navigation.objects.length,
      timestamp: new Date(),
      viewerType: viewer.metadata.viewerType
    };
  }
}

export interface AbstractUpResult {
  targetLevel: AbstractionLevel;
  objects: TechObject[];
  structure: StructuralData;
  context: NavigationContext;
  visualization: VisualizationResult;
  metadata: AbstractUpMetadata;
}

export interface AbstractUpMetadata {
  sourceLevel: AbstractionLevel;
  targetLevel: AbstractionLevel;
  objectCount: number;
  timestamp: Date;
  viewerType: string;
}

interface NavigationResult {
  targetLevel: AbstractionLevel;
  objects: TechObject[];
  structure: StructuralData;
  context: NavigationContext;
}

interface ViewerResult {
  visualization: VisualizationResult;
  metadata: {
    viewerType: string;
    [key: string]: any;
  };
}

interface VisualizationResult {
  html: string;
  css?: string;
  javascript?: string;
  metadata: any;
} 