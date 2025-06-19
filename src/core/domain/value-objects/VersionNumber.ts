// src/core/domain/value-objects/VersionNumber.ts
export class VersionNumber {
    constructor(
      public readonly major: number,
      public readonly minor: number,
      public readonly patch: number,
      public readonly prerelease?: string,
      public readonly build?: string
    ) {
      if (major < 0 || minor < 0 || patch < 0) {
        throw new Error('Version numbers cannot be negative');
      }
    }
    
    // Parse whatever string we give it into a VersionNumber, basically create with strings input
    static parse(versionString: string): VersionNumber {
      const regex = /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/;
      const match = versionString.match(regex);
      
      if (!match) {
        throw new Error(`Invalid version string: ${versionString}`);
      }
  
      return new VersionNumber(
        parseInt(match[1]),
        parseInt(match[2]),
        parseInt(match[3]),
        match[4],
        match[5]
      );
    }
  
    // When we specifically know m.m.p
    static create(major: number, minor: number, patch: number, prerelease?: string, build?: string): VersionNumber {
      return new VersionNumber(major, minor, patch, prerelease, build);
    }
    
    // When we want to translate it to String
    toString(): string {
      let version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease) version += `-${this.prerelease}`;
      if (this.build) version += `+${this.build}`;
      return version;
    }

    // Down below, checkers
    equals(other: VersionNumber): boolean {
      return this.toString() === other.toString();
    }
  
    compareTo(other: VersionNumber): number {
      if (this.major !== other.major) return this.major - other.major;
      if (this.minor !== other.minor) return this.minor - other.minor;
      if (this.patch !== other.patch) return this.patch - other.patch;
      
      // Handle prerelease comparison
      if (!this.prerelease && other.prerelease) return 1;
      if (this.prerelease && !other.prerelease) return -1;
      if (this.prerelease && other.prerelease) {
        return this.prerelease.localeCompare(other.prerelease);
      }
      
      return 0;
    }
  
    isNewerThan(other: VersionNumber): boolean {
      return this.compareTo(other) > 0;
    }
  
    isOlderThan(other: VersionNumber): boolean {
      return this.compareTo(other) < 0;
    }
  
    isPrerelease(): boolean {
      return !!this.prerelease;
    }
  }