// src/core/domain/value-objects/TechObjectId.ts
export class TechObjectId {
    private constructor( readonly value: string) {
      if (!value || value.trim().length === 0) {
        throw new Error('TechObjectId cannot be empty');
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        throw new Error('TechObjectId must contain only alphanumeric characters, underscores, and hyphens');
      }
    }
  
    static create(value: string): TechObjectId {
      return new TechObjectId(value);
    }
  
    static generate(): TechObjectId {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 8);
      return new TechObjectId(`tech_${timestamp}_${random}`);
    }
  
    getValue(): string {
      return this.value;
    }
  
    equals(other: TechObjectId): boolean {
      return this.value === other.value;
    }
  
    toString(): string {
      return this.value;
    }
  }