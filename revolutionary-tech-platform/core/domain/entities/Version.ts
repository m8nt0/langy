/**
 * Represents a version of a tech object with semantic versioning support
 */
export class Version {
  constructor(
    private major: number,
    private minor: number,
    private patch: number,
    private label?: string,
    private releaseDate: Date = new Date()
  ) {}

  // Getters
  getMajor(): number { return this.major; }
  getMinor(): number { return this.minor; }
  getPatch(): number { return this.patch; }
  getLabel(): string | undefined { return this.label; }
  getReleaseDate(): Date { return new Date(this.releaseDate); }

  // Version string representation
  toString(): string {
    const base = `${this.major}.${this.minor}.${this.patch}`;
    return this.label ? `${base}-${this.label}` : base;
  }

  // Version comparison methods
  isGreaterThan(other: Version): boolean {
    if (this.major !== other.major) return this.major > other.major;
    if (this.minor !== other.minor) return this.minor > other.minor;
    return this.patch > other.patch;
  }

  isLessThan(other: Version): boolean {
    return !this.isGreaterThan(other) && !this.equals(other);
  }

  equals(other: Version): boolean {
    return this.major === other.major &&
           this.minor === other.minor &&
           this.patch === other.patch &&
           this.label === other.label;
  }

  // Version increment methods
  incrementMajor(): Version {
    return new Version(this.major + 1, 0, 0, undefined, new Date());
  }

  incrementMinor(): Version {
    return new Version(this.major, this.minor + 1, 0, undefined, new Date());
  }

  incrementPatch(): Version {
    return new Version(this.major, this.minor, this.patch + 1, undefined, new Date());
  }

  // Version validation
  isValid(): boolean {
    return this.major >= 0 && this.minor >= 0 && this.patch >= 0;
  }

  // Factory methods
  static fromString(version: string): Version {
    const parts = version.split('-');
    const numbers = parts[0].split('.').map(n => parseInt(n, 10));
    const label = parts[1];
    
    if (numbers.length !== 3 || numbers.some(n => isNaN(n))) {
      throw new Error('Invalid version string format. Expected: major.minor.patch[-label]');
    }

    return new Version(numbers[0], numbers[1], numbers[2], label);
  }

  static initial(): Version {
    return new Version(0, 1, 0);
  }

  // Serialization
  toJSON(): object {
    return {
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      label: this.label,
      releaseDate: this.releaseDate
    };
  }
} 