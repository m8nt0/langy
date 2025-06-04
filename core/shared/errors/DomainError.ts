// Base domain error class

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = 'DomainError';
    Object.setPrototypeOf(this, DomainError.prototype);
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details
    };
  }

  public static fromJSON(json: {
    message: string;
    code: string;
    details?: Record<string, any>;
  }): DomainError {
    return new DomainError(json.message, json.code, json.details);
  }
}

export const DomainErrorCodes = {
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;

export type DomainErrorCode = typeof DomainErrorCodes[keyof typeof DomainErrorCodes]; 