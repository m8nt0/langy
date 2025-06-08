// src/core/domain/entities/Version.ts
import { VersionNumber } from '../value-objects/VersionNumber';
import { TechObjectId } from '../value-objects/TechObjectId';

export interface VersionMetadata {
  releaseNotes: string;
  isStable: boolean;
  isLTS: boolean;
  deprecatedAt?: Date;
  endOfLifeAt?: Date;
  downloadUrl?: string;
  size?: number;
  checksum?: string;
}

export class Version {
  constructor(
    public readonly techObjectId: TechObjectId,
    public readonly version: VersionNumber,
    public readonly metadata: VersionMetadata,
    public readonly createdAt: Date = new Date(),
    public readonly features: string,
    public readonly dependencies: Array<{ techObjectId: TechObjectId; versionRange: string }> = []
  ) {}

  addDependency(techObjectId: TechObjectId, versionRange: string): Version {
    return new Version(
      this.techObjectId,
      this.version,
      this.metadata,
      this.createdAt,
      this.features,
      [...this.dependencies, { techObjectId, versionRange }]
    );
  }

  isDeprecated(): boolean {
    return this.metadata.deprecatedAt !== undefined && this.metadata.deprecatedAt <= new Date();
  }

  isEndOfLife(): boolean {
    return this.metadata.endOfLifeAt !== undefined && this.metadata.endOfLifeAt <= new Date();
  }

  isCompatibleWith(other: Version): boolean {
    // Simple semantic versioning compatibility check
    const thisVersion = this.version;
    const otherVersion = other.version;
    
    return thisVersion.major === otherVersion.major &&
           thisVersion.minor >= otherVersion.minor;
  }

  updateMetadata(metadata: Partial<VersionMetadata>): Version {
    return new Version(
      this.techObjectId,
      this.version,
      { ...this.metadata, ...metadata },
      this.createdAt,
      this.features,
      this.dependencies
    );
  }
}