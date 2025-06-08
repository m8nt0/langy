// Manages different visualization modes

import { TechObject } from '../../domain/entities/TechObject';
import { ViewerData } from '../../domain/value-objects';
import { ExperienceViewerConfig, ParadigmViewerConfig, UseCaseViewerConfig, AbstractionViewerConfig, TimelineViewerConfig, SystemViewerConfig} from '../../../viewers'
import { 
  VisualizerApiPort, 
  CachePort,
  TechObjectRepository 
} from '../ports';

export class ViewerService {
  constructor(
    private readonly visualizer: VisualizerApiPort,
    private readonly repository: TechObjectRepository,
    private readonly cache: CachePort
  ) {}

  async switchViewer(
    objects: TechObject[],
    viewer: ViewerData,
    structure: StructuralData
  ): Promise<ViewerResult> {
    const cacheKey = `view:${viewer.getType()}:${objects.map(o => o.getId()).join(',')}`;
    const cached = await this.cache.get<ViewerResult>(cacheKey);
    if (cached) return cached;

    const visualization = await this.createVisualization(objects, viewer, structure);
    const relatedObjects = await this.findRelatedObjects(objects, viewer);
    const timeline = await this.buildTimeline(objects, viewer);

    const result = {
      visualization,
      relatedObjects,
      timeline,
      metadata: this.buildViewerMetadata(objects, viewer)
    };

    await this.cache.set(cacheKey, result, { ttl: 1800000 }); // 30 minutes
    return result;
  }

  async updateViewerConfig(
    currentViewer: ViewerData,
    updates: Partial<ViewerConfig>
  ): Promise<ViewerData> {
    return currentViewer.withConfig({
      ...currentViewer.getConfig(),
      ...updates
    });
  }

  private async createVisualization(
    objects: TechObject[],
    viewer: ViewerData,
    structure: StructuralData
  ): Promise<VisualizationResult> {
    const config = viewer.getConfig();
    
    switch (viewer.getType()) {
      case 'TIMELINE':
        const events = await this.getTimelineEvents(objects);
        return this.visualizer.createInteractiveView(objects[0], viewer);
      
      case 'ABSTRACTION_TREE':
        return this.visualizer.visualizeRelationships(
          objects,
          structure.getRelationships().map(r => ({
            source: r.sourceId,
            target: r.targetId,
            type: r.type
          }))
        );
      
      case 'PARADIGM':
        return this.visualizer.createCustomVisualization(
          {
            objects,
            paradigms: (config as ParadigmViewerConfig).paradigms,
            relationships: structure.getRelationships()
          },
          'paradigm-view',
          config
        );
      
      case 'SYSTEM':
        return this.visualizer.visualizeRelationships(
          objects,
          structure.getRelationships().map(r => ({
            source: r.sourceId,
            target: r.targetId,
            type: r.type,
            metadata: {
              dataFlow: (config as SystemViewerConfig).showDataFlow,
              controlFlow: (config as SystemViewerConfig).showControlFlow
            }
          }))
        );

      case 'USE_CASES':
        return this.visualizer.createCustomVisualization(
          {
            objects,
            domains: (config as UseCaseViewerConfig).domains,
            industries: (config as UseCaseViewerConfig).industries,
            valueChains: (config as UseCaseViewerConfig).showValueChains,
            metrics: (config as UseCaseViewerConfig).valueMetrics
          },
          'use-case-view',
          config
        );

      case 'EXPERIENCE':
        return this.visualizer.createCustomVisualization(
          {
            objects,
            userTypes: (config as ExperienceViewerConfig).userTypes,
            interactions: (config as ExperienceViewerConfig).showInteractions,
            patterns: (config as ExperienceViewerConfig).showUsagePatterns,
            metrics: (config as ExperienceViewerConfig).experienceMetrics
          },
          'experience-view',
          config
        );
      
      default:
        throw new Error(`Unsupported viewer type: ${viewer.getType()}`);
    }
  }

  private async findRelatedObjects(
    objects: TechObject[],
    viewer: ViewerData
  ): Promise<TechObject[]> {
    const relatedIds = new Set<string>();
    
    for (const object of objects) {
      const related = await this.repository.findRelated(object.getId());
      related.forEach(r => relatedIds.add(r.getId()));
    }

    return this.repository.findByIds(Array.from(relatedIds));
  }

  private async buildTimeline(
    objects: TechObject[],
    viewer: ViewerData
  ): Promise<Timeline> {
    const events = await this.getTimelineEvents(objects);
    const range = this.calculateTimeRange(events);
    
    return new Timeline(
      events,
      viewer.getConfig().scale || 'MONTHS',
      range
    );
  }

  private async getTimelineEvents(objects: TechObject[]): Promise<TimelineEvent[]> {
    const events: TimelineEvent[] = [];
    
    for (const object of objects) {
      const objectEvents = await this.repository.findByFilter({
        conditions: [{
          field: 'relatedId',
          operator: 'EQUALS',
          value: object.getId()
        }],
        combinator: 'AND'
      });

      events.push(...objectEvents.map(e => ({
        id: e.getId(),
        type: e.getType(),
        timestamp: e.getTimestamp(),
        title: e.getTitle(),
        description: e.getDescription()
      } as TimelineEvent)));
    }

    return events;
  }

  private calculateTimeRange(events: TimelineEvent[]): TimeRange {
    if (events.length === 0) {
      const now = new Date();
      return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: now
      };
    }

    const timestamps = events.map(e => e.timestamp.getTime());
    return {
      start: new Date(Math.min(...timestamps)),
      end: new Date(Math.max(...timestamps))
    };
  }

  private buildViewerMetadata(
    objects: TechObject[],
    viewer: ViewerData
  ): ViewerMetadata {
    return {
      objectCount: objects.length,
      viewerType: viewer.getType(),
      config: viewer.getConfig(),
      timestamp: new Date()
    };
  }
}

export interface ViewerResult {
  visualization: VisualizationResult;
  relatedObjects: TechObject[];
  timeline: Timeline;
  metadata: ViewerMetadata;
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

export interface ViewerMetadata {
  objectCount: number;
  viewerType: string;
  config: ViewerConfig;
  timestamp: Date;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface VisualizationResult {
  html: string;
  css?: string;
  javascript?: string;
  metadata: any;
} 