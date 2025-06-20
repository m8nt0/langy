import {
  AbstractionLevel,
  CompleteViewerData,
  TechObjectId,
  // TechObjectMetadata,
  VersionNumber,
} from '../value-objects';
import { TechObjectDto } from '../../application/dto';
import { cloneDeep, merge } from 'lodash';

export class TechVersion {
  constructor(
    public readonly id: TechObjectId,
    public readonly version: VersionNumber,
    // public readonly metadata: TechObjectMetadata,
    public readonly children: TechVersion[],
    public readonly viewersData: CompleteViewerData, // Each version has its own viewer data
  ) {}
}

export class TechObject {
  constructor(
    public readonly id: TechObjectId,
    public readonly name: string,
    public readonly level: AbstractionLevel,
    public readonly versions: TechVersion[],
    public readonly viewersData: CompleteViewerData, // Aggregated or default viewer data for the root
    // public readonly metadata: TechObjectMetadata,
  ) {}

  /**
   * Creates a new TechObject with updated values.
   * This ensures the entity remains immutable.
   */
  public update(updates: Partial<Omit<TechObjectDto, 'id'>>): TechObject {
    const newProps = cloneDeep({
        id: this.id,
        name: this.name,
        level: this.level,
        versions: this.versions,
        viewersData: this.viewersData,
        // metadata: this.metadata
    });

    // Merge only the properties present in the updates DTO
    if(updates.name) newProps.name = updates.name;
    if(updates.level) newProps.level = new AbstractionLevel(updates.level);
    // if(updates.metadata) newProps.metadata = merge(newProps.metadata, updates.metadata);
    if(updates.viewersData) newProps.viewersData = merge(newProps.viewersData, updates.viewersData);
    // Version updating would be a more complex operation, handled by a dedicated method if needed.

    return new TechObject(
      newProps.id,
      newProps.name,
      newProps.level,
      newProps.versions,
      newProps.viewersData
    );
  }
}