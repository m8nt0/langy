// Switch viewer lenses

import { TechObject } from '../../domain/entities/TechObject';
import { ViewerData, StructuralData } from '../../..';
import { ViewerService } from '../services';

export class ApplyViewerUseCase {
  constructor(
    private readonly viewerService: ViewerService
  ) {}

  async execute(
    objects: TechObject[],
    viewer: ViewerData,
    structure: StructuralData,
    config?: Partial<ViewerConfig>
  ): Promise<ApplyViewerResult> {
    // Update viewer configuration if provided
    const updatedViewer = config
      ? await this.viewerService.updateViewerConfig(viewer, config)
      : viewer;

    // Switch to the new viewer
    const viewerResult = await this.viewerService.switchViewer(
      objects,
      updatedViewer,
      structure
    );

    return {
      viewer: updatedViewer,
      visualization: viewerResult.visualization,
      relatedObjects: viewerResult.relatedObjects,
      timeline: viewerResult.timeline,
      metadata: this.buildMetadata(viewerResult.metadata)
    };
  }

  private buildMetadata(viewerMetadata: ViewerMetadata): ApplyViewerMetadata {
    return {
      viewerType: viewerMetadata.viewerType,
      objectCount: viewerMetadata.objectCount,
      config: viewerMetadata.config,
      appliedAt: new Date()
    };
  }
}

export interface ApplyViewerResult {
  viewer: ViewerData;
  visualization: VisualizationResult;
  relatedObjects: TechObject[];
  timeline: Timeline;
  metadata: ApplyViewerMetadata;
}

export interface ApplyViewerMetadata {
  viewerType: string;
  objectCount: number;
  config: ViewerConfig;
  appliedAt: Date;
}

export interface ViewerConfig {
  showMetadata: boolean;
  showRelationships: boolean;
  showVersions: boolean;
  showStatistics: boolean;
  highlightPatterns: boolean;
  autoLayout: boolean;
  [key: string]: any;
}

interface ViewerMetadata {
  viewerType: string;
  objectCount: number;
  config: ViewerConfig;
  timestamp: Date;
}

interface VisualizationResult {
  html: string;
  css?: string;
  javascript?: string;
  metadata: any;
}

interface Timeline {
  events: any[];
  scale: string;
  range: {
    start: Date;
    end: Date;
  };
} 