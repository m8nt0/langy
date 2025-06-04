import { TechObject } from '../../domain/entities/TechObject';
import { ViewerData } from '../../domain/value-objects';
import { 
  ViewerService, 
  RelationshipService, 
  VersionService 
} from '../services';

export class GetCardDataUseCase {
  constructor(
    private readonly viewerService: ViewerService,
    private readonly relationshipService: RelationshipService,
    private readonly versionService: VersionService
  ) {}

  async execute(
    objectId: string,
    viewer: ViewerData
  ): Promise<CardData> {
    // Get object relationships
    const [byRelationships, forRelationships] = await Promise.all([
      this.relationshipService.findByRelationships(objectId),
      this.relationshipService.findForRelationships(objectId)
    ]);

    // Get version history
    const versionHistory = await this.versionService.getVersionHistory(objectId);

    // Create visualization
    const viewerResult = await this.viewerService.switchViewer(
      [versionHistory.object],
      viewer,
      byRelationships.structure
    );

    return {
      object: versionHistory.object,
      narrative: this.buildNarrative(
        versionHistory.object,
        byRelationships,
        forRelationships
      ),
      metadata: this.buildMetadata(
        byRelationships,
        forRelationships,
        versionHistory
      ),
      visualization: viewerResult.visualization,
      relationships: {
        by: byRelationships,
        for: forRelationships
      },
      versions: {
        history: versionHistory,
        current: versionHistory.currentVersion
      }
    };
  }

  private buildNarrative(
    object: TechObject,
    byRelationships: RelationshipResult,
    forRelationships: RelationshipResult
  ): CardNarrative {
    return {
      summary: this.generateSummary(object),
      highlights: this.generateHighlights(object),
      relationships: this.generateRelationshipStory(
        byRelationships,
        forRelationships
      ),
      timeline: this.generateTimeline(object)
    };
  }

  private buildMetadata(
    byRelationships: RelationshipResult,
    forRelationships: RelationshipResult,
    versionHistory: VersionHistory
  ): CardMetadata {
    return {
      relationshipStats: {
        byCount: byRelationships.metadata.count,
        forCount: forRelationships.metadata.count,
        totalCount: byRelationships.metadata.count + forRelationships.metadata.count
      },
      versionStats: {
        totalVersions: versionHistory.metadata.totalVersions,
        averageTimeBetweenVersions: versionHistory.metadata.averageTimeBetweenVersions
      },
      complexity: this.calculateComplexity(byRelationships, forRelationships),
      lastUpdated: new Date()
    };
  }

  private generateSummary(object: TechObject): string {
    return `${object.getName()} is a ${object.getType().toLowerCase()} that ${
      this.getObjectPurpose(object)
    }`;
  }

  private generateHighlights(object: TechObject): CardHighlight[] {
    const metadata = object.getMetadata();
    return [
      {
        type: 'KEY_FEATURE',
        title: 'Key Features',
        content: metadata.features || []
      },
      {
        type: 'BEST_PRACTICE',
        title: 'Best Practices',
        content: metadata.bestPractices || []
      },
      {
        type: 'LIMITATION',
        title: 'Limitations',
        content: metadata.limitations || []
      }
    ];
  }

  private generateRelationshipStory(
    byRelationships: RelationshipResult,
    forRelationships: RelationshipResult
  ): string {
    return `Used by ${forRelationships.metadata.count} objects and depends on ${
      byRelationships.metadata.count
    } objects.`;
  }

  private generateTimeline(object: TechObject): string {
    return `Created on ${object.getMetadata().createdAt?.toLocaleDateString()}`;
  }

  private getObjectPurpose(object: TechObject): string {
    return object.getMetadata().purpose || 'serves a specific technical purpose';
  }

  private calculateComplexity(
    byRelationships: RelationshipResult,
    forRelationships: RelationshipResult
  ): number {
    const totalRelationships = 
      byRelationships.metadata.count + 
      forRelationships.metadata.count;
    
    const maxRelationships = 100; // Arbitrary threshold
    return Math.min(totalRelationships / maxRelationships, 1);
  }
}

export interface CardData {
  object: TechObject;
  narrative: CardNarrative;
  metadata: CardMetadata;
  visualization: VisualizationResult;
  relationships: {
    by: RelationshipResult;
    for: RelationshipResult;
  };
  versions: {
    history: VersionHistory;
    current: Version;
  };
}

export interface CardNarrative {
  summary: string;
  highlights: CardHighlight[];
  relationships: string;
  timeline: string;
}

export interface CardHighlight {
  type: string;
  title: string;
  content: string[];
}

export interface CardMetadata {
  relationshipStats: {
    byCount: number;
    forCount: number;
    totalCount: number;
  };
  versionStats: {
    totalVersions: number;
    averageTimeBetweenVersions: number;
  };
  complexity: number;
  lastUpdated: Date;
}

interface RelationshipResult {
  metadata: {
    count: number;
    [key: string]: any;
  };
  structure: any;
}

interface VersionHistory {
  currentVersion: Version;
  metadata: {
    totalVersions: number;
    averageTimeBetweenVersions: number;
  };
}

interface VisualizationResult {
  html: string;
  css?: string;
  javascript?: string;
  metadata: any;
}

interface Version {
  toString(): string;
} 