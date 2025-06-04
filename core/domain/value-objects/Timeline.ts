import { Version } from '../entities/Version';
import { TimelineScale } from './ViewerData';

/**
 * Represents temporal data and relationships in the system
 */
export class Timeline {
  constructor(
    private readonly events: TimelineEvent[],
    private readonly scale: TimelineScale,
    private readonly range: TimeRange,
    private readonly grouping: TimelineGrouping = {}
  ) {
    Object.freeze(this);
  }

  getEvents(): TimelineEvent[] {
    return [...this.events];
  }

  getScale(): TimelineScale {
    return this.scale;
  }

  getRange(): TimeRange {
    return { ...this.range };
  }

  getGrouping(): TimelineGrouping {
    return { ...this.grouping };
  }

  // Timeline modifications
  withEvents(events: TimelineEvent[]): Timeline {
    return new Timeline(events, this.scale, this.range, this.grouping);
  }

  withScale(scale: TimelineScale): Timeline {
    return new Timeline(this.events, scale, this.range, this.grouping);
  }

  withRange(range: TimeRange): Timeline {
    return new Timeline(this.events, this.scale, range, this.grouping);
  }

  withGrouping(grouping: TimelineGrouping): Timeline {
    return new Timeline(this.events, this.scale, this.range, grouping);
  }

  // Event filtering and analysis
  getEventsByType(type: TimelineEventType): TimelineEvent[] {
    return this.events.filter(e => e.type === type);
  }

  getEventsByPeriod(period: TimeRange): TimelineEvent[] {
    return this.events.filter(e => 
      e.timestamp >= period.start && e.timestamp <= period.end
    );
  }

  getMilestones(): TimelineEvent[] {
    return this.getEventsByType(TimelineEventType.MILESTONE);
  }

  getVersionReleases(): TimelineEvent[] {
    return this.getEventsByType(TimelineEventType.VERSION_RELEASE);
  }

  // Timeline analysis
  getEventDensity(): TimelineDensity[] {
    // Group events by time periods and calculate density
    const periods = this.dividePeriods();
    return periods.map(period => ({
      period,
      count: this.getEventsByPeriod(period).length,
      events: this.getEventsByPeriod(period)
    }));
  }

  private dividePeriods(): TimeRange[] {
    // Divide timeline into periods based on scale
    const periods: TimeRange[] = [];
    let current = new Date(this.range.start);
    
    while (current <= this.range.end) {
      const next = this.getNextPeriod(current);
      periods.push({
        start: new Date(current),
        end: next > this.range.end ? this.range.end : next
      });
      current = next;
    }

    return periods;
  }

  private getNextPeriod(date: Date): Date {
    const next = new Date(date);
    switch (this.scale) {
      case TimelineScale.DAYS:
        next.setDate(date.getDate() + 1);
        break;
      case TimelineScale.WEEKS:
        next.setDate(date.getDate() + 7);
        break;
      case TimelineScale.MONTHS:
        next.setMonth(date.getMonth() + 1);
        break;
      case TimelineScale.QUARTERS:
        next.setMonth(date.getMonth() + 3);
        break;
      case TimelineScale.YEARS:
        next.setFullYear(date.getFullYear() + 1);
        break;
    }
    return next;
  }
}

export enum TimelineEventType {
  VERSION_RELEASE = 'VERSION_RELEASE',
  MILESTONE = 'MILESTONE',
  DEPENDENCY_UPDATE = 'DEPENDENCY_UPDATE',
  BREAKING_CHANGE = 'BREAKING_CHANGE',
  FEATURE_ADDITION = 'FEATURE_ADDITION',
  DEPRECATION = 'DEPRECATION',
  SECURITY_UPDATE = 'SECURITY_UPDATE'
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  timestamp: Date;
  title: string;
  description: string;
  version?: Version;
  metadata?: {
    impact?: string;
    category?: string;
    tags?: string[];
    relatedIds?: string[];
    [key: string]: any;
  };
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface TimelineDensity {
  period: TimeRange;
  count: number;
  events: TimelineEvent[];
}

export interface TimelineGrouping {
  byType?: boolean;
  byCategory?: boolean;
  byImpact?: boolean;
  customGroups?: {
    [key: string]: (event: TimelineEvent) => boolean;
  };
} 