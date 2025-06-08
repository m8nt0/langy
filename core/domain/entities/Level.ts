// src/core/domain/entities/Level.ts
import { TechObjectId } from '../value-objects/TechObjectId';
import { AbstractionLevel } from '../value-objects/AbstractionLevel';

export class Level {
  constructor(
    public readonly level: AbstractionLevel,
    public readonly name: string,
    public readonly description: string,
    public readonly techObjects: TechObjectId[] = [],
    public readonly parentLevel?: AbstractionLevel,
    public readonly childLevels: AbstractionLevel[] = []
  ) {}

  addTechObject(techObjectId: TechObjectId): Level {
    return new Level(
      this.level,
      this.name,
      this.description,
      [...this.techObjects, techObjectId],
      this.parentLevel,
      this.childLevels
    );
  }

  removeTechObject(techObjectId: TechObjectId): Level {
    return new Level(
      this.level,
      this.name,
      this.description,
      this.techObjects.filter(id => !id.equals(techObjectId)),
      this.parentLevel,
      this.childLevels
    );
  }

  addChildLevel(childLevel: AbstractionLevel): Level {
    return new Level(
      this.level,
      this.name,
      this.description,
      this.techObjects,
      this.parentLevel,
      [...this.childLevels, childLevel]
    );
  }

  isParentOf(level: AbstractionLevel): boolean {
    return this.childLevels.some(child => child.equals(level));
  }

  isChildOf(level: AbstractionLevel): boolean {
    return this.parentLevel?.equals(level) ?? false;
  }
}
