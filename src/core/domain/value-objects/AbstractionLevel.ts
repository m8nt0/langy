// src/core/domain/value-objects/AbstractionLevel.ts
export class AbstractionLevel {
  private static readonly VALID_LEVELS = [1, 2, 3, 4, 5] as const;
  private static readonly LEVEL_NAMES: Record<number, string> = {
    1: 'Programming Languages',
    2: 'Libraries',
    3: 'Frameworks',
    4: 'Applications',
    5: 'Platforms'
  };

  private constructor(private readonly level: number) {
    if (!AbstractionLevel.VALID_LEVELS.includes(level as any)) {
      throw new Error(`Invalid abstraction level: ${level}. Valid levels are: ${AbstractionLevel.VALID_LEVELS.join(', ')}`);
    }
  }

  static create(level: number): AbstractionLevel {
    return new AbstractionLevel(level);
  }

  static PROGRAMMING_LANGUAGES = new AbstractionLevel(1);
  static LIBRARIES = new AbstractionLevel(2);
  static FRAMEWORKS = new AbstractionLevel(3);
  static APPLICATIONS = new AbstractionLevel(4);
  static PLATFORMS = new AbstractionLevel(5);

  getValue(): number {
    return this.level;
  }

  getName(): string {
    return AbstractionLevel.LEVEL_NAMES[this.level];
  }

  equals(other: AbstractionLevel): boolean {
    return this.level === other.level;
  }

  isHigherThan(other: AbstractionLevel): boolean {
    return this.level > other.level;
  }

  isLowerThan(other: AbstractionLevel): boolean {
    return this.level < other.level;
  }

  getParentLevel(): AbstractionLevel | null {
    return this.level > 1 ? new AbstractionLevel(this.level - 1) : null;
  }

  getChildLevel(): AbstractionLevel | null {
    return this.level < 5 ? new AbstractionLevel(this.level + 1) : null;
  }

  canAbstractTo(target: AbstractionLevel): boolean {
    return Math.abs(this.level - target.level) === 1;
  }

  toString(): string {
    return `Level ${this.level}: ${this.getName()}`;
  }
}