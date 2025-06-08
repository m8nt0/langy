// src/core/domain/value-objects/NavigationPath.ts
import { TechObjectId } from './TechObjectId';
import { AbstractionLevel } from './AbstractionLevel';
import { VersionNumber } from './VersionNumber';

export interface PathSegment {
  level: AbstractionLevel;
  techObjectId?: TechObjectId;
  version?: VersionNumber;
  timestamp: Date;
}

export interface NavigationContext {
  filters: Record<string, any>;
  viewers: string[];
  preferences: Record<string, any>;
}

export class NavigationPath {
  private constructor(
    private readonly segments: PathSegment[] = [],
    private readonly context: NavigationContext = { filters: {}, viewers: [], preferences: {} }
  ) {}

  static create(): NavigationPath {
    return new NavigationPath();
  }

  static fromSegments(segments: PathSegment[], context?: NavigationContext): NavigationPath {
    return new NavigationPath(segments, context);
  }

  addSegment(segment: PathSegment): NavigationPath {
    return new NavigationPath([...this.segments, segment], this.context);
  }

  navigateToLevel(level: AbstractionLevel): NavigationPath {
    const segment: PathSegment = {
      level,
      timestamp: new Date()
    };
    return this.addSegment(segment);
  }

  navigateToTechObject(level: AbstractionLevel, techObjectId: TechObjectId): NavigationPath {
    const segment: PathSegment = {
      level,
      techObjectId,
      timestamp: new Date()
    };
    return this.addSegment(segment);
  }

  navigateToVersion(level: AbstractionLevel, techObjectId: TechObjectId, version: VersionNumber): NavigationPath {
    const segment: PathSegment = {
      level,
      techObjectId,
      version,
      timestamp: new Date()
    };
    return this.addSegment(segment);
  }

  goBack(): NavigationPath {
    if (this.segments.length <= 1) {
      return this;
    }
    return new NavigationPath(this.segments.slice(0, -1), this.context);
  }

  getCurrentSegment(): PathSegment | null {
    return this.segments.length > 0 ? this.segments[this.segments.length - 1] : null;
  }

  getCurrentLevel(): AbstractionLevel | null {
    const current = this.getCurrentSegment();
    return current ? current.level : null;
  }

  getCurrentTechObject(): TechObjectId | null {
    const current = this.getCurrentSegment();
    return current ? current.techObjectId || null : null;
  }

  getCurrentVersion(): VersionNumber | null {
    const current = this.getCurrentSegment();
    return current ? current.version || null : null;
  }

  getSegments(): PathSegment[] {
    return [...this.segments];
  }

  getBreadcrumb(): string {
    return this.segments
      .map(segment => {
        let breadcrumb = segment.level.getName();
        if (segment.techObjectId) {
          breadcrumb += ` > ${segment.techObjectId.getValue()}`;
        }
        if (segment.version) {
          breadcrumb += ` > v${segment.version.toString()}`;
        }
        return breadcrumb;
      })
      .join(' → ');
  }

  updateContext(context: Partial<NavigationContext>): NavigationPath {
    return new NavigationPath(this.segments, { ...this.context, ...context });
  }

  getContext(): NavigationContext {
    return { ...this.context };
  }

  canGoBack(): boolean {
    return this.segments.length > 1;
  }

  canGoForward(): boolean {
    // This would be implemented with a forward stack in a real implementation
    return false;
  }

  isEmpty(): boolean {
    return this.segments.length === 0;
  }

  getDepth(): number {
    return this.segments.length;
  }
}