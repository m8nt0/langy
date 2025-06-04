import { TechObject, AbstractionLevel, TechObjectType } from '../entities/TechObject';
import { Version } from '../entities/Version';
import { 
  ViewerData, 
  FilterCriteria, 
  Timeline, 
  StructuralData,
  NavigationContext,
  TimelineEvent
} from '../value-objects';
import { AbstractionHierarchy, ValidationResult } from './AbstractionHierarchy';

/**
 * Root aggregate for the entire tech knowledge system
 */
export class TechEcosystem {
  constructor(
    private readonly objects: Map<string, TechObject>,
    private readonly hierarchy: AbstractionHierarchy,
    private readonly timeline: Timeline,
    private readonly viewer: ViewerData,
    private readonly filter: FilterCriteria
  ) {
    Object.freeze(this);
  }

  // Object management
  getObject(id: string): TechObject | undefined {
    return this.objects.get(id);
  }

  getObjects(): Map<string, TechObject> {
    return new Map(this.objects);
  }

  addObject(object: TechObject): TechEcosystem {
    const newObjects = new Map(this.objects);
    newObjects.set(object.getId(), object);

    // Update structural data
    const structure = this.hierarchy.getStructure();
    const newStructure = structure.withNodes([
      ...structure.getNodes(),
      {
        id: object.getId(),
        type: object.getType(),
        level: object.getAbstractionLevel(),
        name: object.getName(),
        metadata: {
          complexity: object.getMetadata().complexity,
          stability: object.getMetadata().stability
        }
      }
    ]);

    const newHierarchy = new AbstractionHierarchy(
      this.hierarchy.getLevels(),
      newStructure,
      this.hierarchy.getContext()
    );

    return new TechEcosystem(
      newObjects,
      newHierarchy,
      this.timeline,
      this.viewer,
      this.filter
    );
  }

  // Relationship management
  addRelationship(
    sourceId: string,
    targetId: string,
    type: string,
    metadata: any = {}
  ): TechEcosystem {
    const source = this.objects.get(sourceId);
    const target = this.objects.get(targetId);
    
    if (!source || !target) {
      throw new Error('Source or target object not found');
    }

    const structure = this.hierarchy.getStructure();
    const newStructure = structure.withRelationships([
      ...structure.getRelationships(),
      {
        id: `${sourceId}-${type}-${targetId}`,
        type: type as any,
        sourceId,
        targetId,
        metadata
      }
    ]);

    const newHierarchy = new AbstractionHierarchy(
      this.hierarchy.getLevels(),
      newStructure,
      this.hierarchy.getContext()
    );

    return new TechEcosystem(
      this.objects,
      newHierarchy,
      this.timeline,
      this.viewer,
      this.filter
    );
  }

  // Timeline operations
  addEvent(event: TimelineEvent): TechEcosystem {
    const newTimeline = this.timeline.withEvents([
      ...this.timeline.getEvents(),
      event
    ]);

    return new TechEcosystem(
      this.objects,
      this.hierarchy,
      newTimeline,
      this.viewer,
      this.filter
    );
  }

  // Navigation and viewing
  setViewer(viewer: ViewerData): TechEcosystem {
    return new TechEcosystem(
      this.objects,
      this.hierarchy,
      this.timeline,
      viewer,
      this.filter
    );
  }

  setFilter(filter: FilterCriteria): TechEcosystem {
    return new TechEcosystem(
      this.objects,
      this.hierarchy,
      this.timeline,
      this.viewer,
      filter
    );
  }

  // Analysis and insights
  getInsights(): EcosystemInsights {
    const structure = this.hierarchy.getStructure();
    const timeline = this.timeline;

    return {
      totalObjects: this.objects.size,
      objectsByLevel: new Map(
        (Object.values(AbstractionLevel) as AbstractionLevel[]).map(level => [
          level,
          structure.getNodesByLevel(level).length
        ])
      ),
      objectsByType: new Map(
        Object.values(TechObjectType).map(type => [
          type,
          structure.getNodesByType(type).length
        ])
      ),
      relationships: {
        total: structure.getRelationships().length,
        byType: new Map(
          Object.values(RelationshipType).map(type => [
            type,
            structure.getRelationshipsByType(type as any).length
          ])
        )
      },
      timeline: {
        totalEvents: timeline.getEvents().length,
        eventsByType: new Map(
          Object.values(TimelineEventType).map(type => [
            type,
            timeline.getEventsByType(type).length
          ])
        ),
        density: timeline.getEventDensity()
      },
      metrics: structure.getMetadata().metrics
    };
  }

  validateEcosystem(): ValidationResult {
    const errors: string[] = [];

    // Validate object consistency
    this.objects.forEach(object => {
      const structuralNode = this.hierarchy.getStructure().findNode(object.getId());
      if (!structuralNode) {
        errors.push(`Structural node missing for object ${object.getId()}`);
      } else if (
        structuralNode.level !== object.getAbstractionLevel() ||
        structuralNode.type !== object.getType()
      ) {
        errors.push(`Structural node inconsistent with object ${object.getId()}`);
      }
    });

    // Validate relationships
    this.hierarchy.getStructure().getRelationships().forEach(rel => {
      if (!this.objects.has(rel.sourceId)) {
        errors.push(`Source object missing for relationship ${rel.id}`);
      }
      if (!this.objects.has(rel.targetId)) {
        errors.push(`Target object missing for relationship ${rel.id}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Factory methods
  static create(): TechEcosystem {
    return new TechEcosystem(
      new Map(),
      AbstractionHierarchy.create(),
      new Timeline([], TimelineScale.MONTHS, { start: new Date(), end: new Date() }),
      ViewerData.createAbstractionTreeViewer({
        direction: TreeDirection.TOP_DOWN,
        maxDepth: 4,
        showInherited: true,
        showImplemented: true,
        collapseNodes: false,
        showMetadata: true,
        showRelationships: true,
        showVersions: true,
        showStatistics: true,
        highlightPatterns: true,
        autoLayout: true
      }),
      new FilterCriteria([], {
        name: 'Default Filter',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
  }
}

// Types from other files needed for the ecosystem
import { 
  TreeDirection,
  TimelineScale,
  TimelineEventType,
  RelationshipType 
} from '../value-objects';

export interface EcosystemInsights {
  totalObjects: number;
  objectsByLevel: Map<AbstractionLevel, number>;
  objectsByType: Map<TechObjectType, number>;
  relationships: {
    total: number;
    byType: Map<string, number>;
  };
  timeline: {
    totalEvents: number;
    eventsByType: Map<string, number>;
    density: any[];
  };
  metrics: {
    cohesion?: number;
    coupling?: number;
    complexity?: number;
    [key: string]: any;
  };
} 