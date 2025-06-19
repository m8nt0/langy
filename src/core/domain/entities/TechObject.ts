// src/core/domain/entities/TechObject.ts (Updated)
import { TechObjectId } from '../value-objects/TechObjectId';
import { CompleteViewerData, ViewerType } from '../value-objects/Viewer';
import { Level } from './Level';
import { VersionNumber } from '../value-objects/VersionNumber';

export class TechVersion {
  constructor(
    public readonly id: TechObjectId,
    public version: VersionNumber,
    public parentVersion?: TechVersion,
    public children: TechVersion[] = [],
    public viewersData: CompleteViewerData, // Each patch has complete viewer data
    public createdAt: Date = new Date()
  ) { }

  addChildVersion(child: TechVersion): TechVersion {
    return new TechVersion(
      this.id,
      this.version,
      this.parentVersion,
      [...this.children, child],
      this.viewersData,
      this.createdAt
    );
  }

  get fullPath(): string {
    return this.parentVersion
      ? `${this.parentVersion.fullPath}.${this.version}`
      : this.version.toString();
  }

  // Get all versions in the tree
  getAllVersions(): TechVersion[] {
    const allVersions = [this];
    for (const child of this.children) {
      allVersions.push(...child.getAllVersions());
    }
    return allVersions;
  }

  // Find a specific version in the tree
  findVersion(version: VersionNumber): TechVersion | null {
    if (this.version.equals(version)) return this;
    for (const child of this.children) {
      const found = child.findVersion(version);
      if (found) return found;
    }
    return null;
  }

  // Aggregate relationships from all child versions
  getAggregatedViewerData(): CompleteViewerData {
    const allVersions = this.getAllVersions();
    
    // This would contain logic to merge/aggregate relationships
    // from all child versions up to this level
    // For now, returning this version's data as example
    return this.viewersData;
  }
}

export class TechObject {
  constructor(
    public readonly id: TechObjectId,
    public name: string,
    public level: Level,
    public versions: TechVersion[] = [], // Major versions
    public aggregatedViewersData: CompleteViewerData, // Aggregated from all versions
    public createdAt: Date = new Date()
  ) { }

  addVersion(version: TechVersion): TechObject {
    return new TechObject(
      this.id,
      this.name,
      this.level,
      [...this.versions, version],
      this.aggregatedViewersData,
      this.createdAt
    );
  }

  // Get all versions (flattened from trees)
  getAllVersions(): TechVersion[] {
    return this.versions.flatMap(v => v.getAllVersions());
  }

  // Get aggregated relationships across all versions
  getAggregatedRelationships(viewerType: ViewerType): any[] {
    return this.getAllVersions()
      .flatMap(v => {
        switch(viewerType) {
          case 'TEMPORAL': return v.viewersData.temporal.relationships;
          case 'STRUCTURE': return v.viewersData.structure.relationships;
          case 'PARADIGM': return v.viewersData.paradigm.relationships;
          case 'SYSTEM': return v.viewersData.system.relationships;
          case 'USECASE': return v.viewersData.system.relationships;
          case 'EXPERIENCE': return v.viewersData.experience.relationships;
        }
      })
  }
}
