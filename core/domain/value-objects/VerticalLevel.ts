// core/domain/value-objects/AbstractionLevel.ts

export class VerticalLevel {
  private readonly level: 'language' | 'library' | 'framework' | 'application';

  constructor(level: string) {
    const allowed = ['language', 'library', 'framework', 'application'];
    if (!allowed.includes(level)) throw new Error(`Invalid Vertical level: ${level}`);
    this.level = level as any;
  }

  public getValue(): string {
    return this.level;
  }

  public equals(other: VerticalLevel): boolean {
    return this.level === other.level;
  }

  static level(level: 'language' | 'library' | 'framework' | 'application') : VerticalLevel {
    return new VerticalLevel(level);
  }
}
