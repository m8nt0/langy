// Validation error handling

import { DomainError, DomainErrorCodes } from './DomainError';

export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly validationErrors: ValidationErrorDetail[] = []
  ) {
    super(message, DomainErrorCodes.INVALID_INPUT, {
      validationErrors
    });
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public addError(error: ValidationErrorDetail): this {
    this.validationErrors.push(error);
    return this;
  }

  public hasErrors(): boolean {
    return this.validationErrors.length > 0;
  }

  public getErrors(): ValidationErrorDetail[] {
    return [...this.validationErrors];
  }

  public static fromJSON(json: {
    message: string;
    validationErrors: ValidationErrorDetail[];
  }): ValidationError {
    return new ValidationError(json.message, json.validationErrors);
  }
}

export interface ValidationErrorDetail {
  field: string;
  code: ValidationErrorCode;
  message: string;
  value?: any;
  constraints?: Record<string, any>;
}

export const ValidationErrorCodes = {
  REQUIRED: 'REQUIRED',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_VALUE: 'INVALID_VALUE',
  TOO_SHORT: 'TOO_SHORT',
  TOO_LONG: 'TOO_LONG',
  MIN_VALUE: 'MIN_VALUE',
  MAX_VALUE: 'MAX_VALUE',
  PATTERN_MISMATCH: 'PATTERN_MISMATCH',
  CUSTOM: 'CUSTOM'
} as const;

export type ValidationErrorCode = typeof ValidationErrorCodes[keyof typeof ValidationErrorCodes]; 