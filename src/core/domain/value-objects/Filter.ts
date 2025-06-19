// ================================
// Filter.ts (value-objects)
// ================================
// ===== FILTERING AS VALUE OBJECTS =====

import { TechObject } from "../entities/TechObject";
import { TechVersion } from "../entities/TechObject";
import { ViewerData } from "./Viewer";

export interface FilterCriteria {
  field: string; // 'createdAt', 'name', 'level', etc.
  operator: 'equals' | 'between' | 'contains' | 'startsWith';
  value: any; // The filter value
}

export class TechObjectFilter {
  constructor(
    public readonly criteria: FilterCriteria[],
    public readonly logic: 'AND' | 'OR' = 'AND'
  ) { }

  static dateRange(startYear: number, endYear: number): TechObjectFilter {
    return new TechObjectFilter([
      {
        field: 'createdAt',
        operator: 'between',
        value: { start: new Date(startYear, 0, 1), end: new Date(endYear, 11, 31) }
      }
    ]);
  }

  static byName(name: string): TechObjectFilter {
    return new TechObjectFilter([
      {
        field: 'name',
        operator: 'contains',
        value: name
      }
    ]);
  }

  static byLevel(levelNumber: number): TechObjectFilter {
    return new TechObjectFilter([
      {
        field: 'level',
        operator: 'equals',
        value: levelNumber
      }
    ]);
  }

  static byViewerData(data: ViewerData): TechObjectFilter {
    return new TechObjectFilter([
      {
        // Choose which one you want to choose out of the 6
      }
    ])
  }

  // Combine filters
  and(other: TechObjectFilter): TechObjectFilter {
    return new TechObjectFilter([...this.criteria, ...other.criteria], 'AND');
  }

  or(other: TechObjectFilter): TechObjectFilter {
    return new TechObjectFilter([...this.criteria, ...other.criteria], 'OR');
  }

  // Check if a tech object matches this filter
  matches(techObject: TechObject): boolean {
    if (this.logic === 'AND') {
      return this.criteria.every(criterion => this.matchesCriterion(techObject, criterion));
    } else {
      return this.criteria.some(criterion => this.matchesCriterion(techObject, criterion));
    }
  }

  // Check if any version in the tech object matches
  matchesAnyVersion(techObject: TechObject): { matches: boolean; matchingVersions: TechVersion[] } {
    const matchingVersions: TechVersion[] = [];

    const checkVersion = (version: TechVersion) => {
      if (this.matchesVersion(version)) {
        matchingVersions.push(version);
      }
      version.children.forEach(checkVersion);
    };

    techObject.versions.forEach(checkVersion);

    return {
      matches: matchingVersions.length > 0,
      matchingVersions
    };
  }

  private matchesCriterion(techObject: TechObject, criterion: FilterCriteria): boolean {
    const value = this.getFieldValue(techObject, criterion.field);

    switch (criterion.operator) {
      case 'equals':
        return value === criterion.value;
      case 'contains':
        return String(value).toLowerCase().includes(String(criterion.value).toLowerCase());
      case 'startsWith':
        return String(value).toLowerCase().startsWith(String(criterion.value).toLowerCase());
      case 'between':
        if (value instanceof Date) {
          return value >= criterion.value.start && value <= criterion.value.end;
        }
        return value >= criterion.value.start && value <= criterion.value.end;
      default:
        return false;
    }
  }

  private matchesVersion(version: TechVersion): boolean {
    // You can add version-specific filtering logic here
    // For now, just check the creation date from viewer data
    return true; // Implement based on your needs
  }

  private getFieldValue(techObject: TechObject, field: string): any {
    switch (field) {
      case 'name':
        return techObject.name;
      case 'level':
        return techObject.level.level.getValue();
      case 'createdAt':
        // Extract from viewer data or metadata
        return techObject.viewersData.timeline?.find(d => d.type === 'timeline')?.data?.createdAt;
      default:
        return null;
    }
  }
}