import { ValidationError } from '../errors/ValidationError';
import { AbstractionLevel, TechObjectType } from '../constants';
import { UUID } from '../types/Common';

export class ValidationUtils {
  static validateUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  static validateAbstractionLevel(level: number): boolean {
    return Object.values(AbstractionLevel).includes(level);
  }

  static validateObjectType(type: string): boolean {
    return Object.values(TechObjectType).includes(type as TechObjectType);
  }

  static validateRequired<T>(value: T | undefined | null, fieldName: string): T {
    if (value === undefined || value === null) {
      throw new ValidationError(`${fieldName} is required`);
    }
    return value;
  }

  static validateString(value: string, fieldName: string, options: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  } = {}): void {
    if (typeof value !== 'string') {
      throw new ValidationError(`${fieldName} must be a string`);
    }

    if (options.minLength && value.length < options.minLength) {
      throw new ValidationError(
        `${fieldName} must be at least ${options.minLength} characters long`
      );
    }

    if (options.maxLength && value.length > options.maxLength) {
      throw new ValidationError(
        `${fieldName} must be at most ${options.maxLength} characters long`
      );
    }

    if (options.pattern && !options.pattern.test(value)) {
      throw new ValidationError(
        `${fieldName} must match pattern ${options.pattern}`
      );
    }
  }

  static validateArray<T>(value: T[], fieldName: string, options: {
    minLength?: number;
    maxLength?: number;
    validator?: (item: T) => boolean;
  } = {}): void {
    if (!Array.isArray(value)) {
      throw new ValidationError(`${fieldName} must be an array`);
    }

    if (options.minLength && value.length < options.minLength) {
      throw new ValidationError(
        `${fieldName} must contain at least ${options.minLength} items`
      );
    }

    if (options.maxLength && value.length > options.maxLength) {
      throw new ValidationError(
        `${fieldName} must contain at most ${options.maxLength} items`
      );
    }

    if (options.validator) {
      const invalidItems = value.filter(item => !options.validator!(item));
      if (invalidItems.length > 0) {
        throw new ValidationError(
          `${fieldName} contains invalid items: ${invalidItems.join(', ')}`
        );
      }
    }
  }

  static validateObject<T extends object>(
    value: T,
    fieldName: string,
    requiredFields: (keyof T)[]
  ): void {
    if (typeof value !== 'object' || value === null) {
      throw new ValidationError(`${fieldName} must be an object`);
    }

    for (const field of requiredFields) {
      if (!(field in value)) {
        throw new ValidationError(
          `${fieldName} is missing required field: ${String(field)}`
        );
      }
    }
  }

  static validateDate(value: Date, fieldName: string, options: {
    min?: Date;
    max?: Date;
  } = {}): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new ValidationError(`${fieldName} must be a valid date`);
    }

    if (options.min && value < options.min) {
      throw new ValidationError(
        `${fieldName} must be after ${options.min.toISOString()}`
      );
    }

    if (options.max && value > options.max) {
      throw new ValidationError(
        `${fieldName} must be before ${options.max.toISOString()}`
      );
    }
  }
} 