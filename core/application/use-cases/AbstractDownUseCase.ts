import { TechObject, AbstractionLevel } from '../../domain/entities/TechObject';
import { NavigationContext, StructuralData } from '../../domain/value-objects';
import { AbstractionHierarchy } from '../../domain/aggregates/AbstractionHierarchy';
import { NavigationService, ViewerService } from '../services';

export class AbstractDownUseCase {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly viewerService: ViewerService
  ) {}

  async execute(
    objectId: string,
    currentLevel: AbstractionLevel,
    hierarchy: AbstractionHierarchy
  ): Promise<AbstractDownResult> {
    // Navigate down the abstraction hierarchy
    const navigationResult = await this.navigationService.navigateDown(
      objectId,
      currentLevel,
      hierarchy
    );

    // Update viewer for the new abstraction level
    const viewerResult = await this.viewerService.switchViewer(
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
  ): AbstractDownMetadata {
    return {
      sourceLevel: navigation.context.getCurrentState().currentLevel,
      targetLevel: navigation.targetLevel,
      objectCount: navigation.objects.length,
      timestamp: new Date(),
      viewerType: viewer.metadata.viewerType
    };
  }
}

export interface AbstractDownResult {
  targetLevel: AbstractionLevel;
  objects: TechObject[];
  structure: StructuralData;
  context: NavigationContext;
  visualization: VisualizationResult;
  metadata: AbstractDownMetadata;
}

export interface AbstractDownMetadata {
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