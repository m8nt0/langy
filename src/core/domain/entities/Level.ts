// src/core/domain/entities/Level.ts
import { TechObject, TechVersion } from './TechObject';
import { TechObjectId } from '../value-objects/TechObjectId';
import { AbstractionLevel } from '../value-objects/AbstractionLevel';
import { TechObjectFilter } from '../value-objects/Filter';
// import uuid from '@/uuid';

export class Level {
  constructor(
    public readonly id: LevelId,
    public readonly level: AbstractionLevel,
    public name: string,
    public techObjects: TechObjectId[] = [],
    public readonly childLevels: AbstractionLevel[] = []
  ) {}

  // Apply filter to get filtered tech objects
  getFilteredTechObjects(
    allTechObjects: TechObject[], 
    filter?: TechObjectFilter
  ): { visible: TechObject[]; grayed: TechObject[] } {
    const levelTechObjects = allTechObjects.filter(tech => 
      this.techObjects.some(id => id.equals(tech.id))
    );

    if (!filter) {
      return { visible: levelTechObjects, grayed: [] };
    }

    const visible: TechObject[] = [];
    const grayed: TechObject[] = [];

    levelTechObjects.forEach(techObject => {
      const result = filter.matchesAnyVersion(techObject);
      if (result.matches) {
        // Create a new tech object with only matching versions highlighted
        visible.push(this.highlightMatchingVersions(techObject, result.matchingVersions));
      } else {
        grayed.push(techObject);
      }
    });

    return { visible, grayed };
  }

  private highlightMatchingVersions(techObject: TechObject, matchingVersions: TechVersion[]): TechObject {
    // This would mark which versions match the filter for UI highlighting
    // Implementation depends on how you want to show this in the UI
    return techObject;
  }

  addTechObject(techObjectId: TechObjectId): Level {
    return new Level(
      this.id,
      this.level,
      this.name,
      [...this.techObjects, techObjectId],
      this.childLevels
    );
  }

  removeTechObject(techObjectId: TechObjectId): Level {
    return new Level(
      this.id,
      this.level,
      this.name,
      this.techObjects.filter(id => !id.equals(techObjectId)),
      this.childLevels
    );
  }

  addChildLevel(childLevel: AbstractionLevel): Level {
    return new Level(
      this.id,
      this.level,
      this.name,
      this.techObjects,
      [...this.childLevels, childLevel]
    );
  }

  isParentOf(level: AbstractionLevel): boolean {
    return this.childLevels.some(child => child.equals(level));
  }

  // isChildOf(level: AbstractionLevel): boolean {
  //   return this.parentLevel?.equals(level) ?? false;
  // }
}
