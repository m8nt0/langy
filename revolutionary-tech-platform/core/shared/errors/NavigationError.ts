import { DomainError } from './DomainError';

export class NavigationError extends DomainError {
  constructor(
    message: string,
    code: NavigationErrorCode,
    public readonly context?: NavigationErrorContext
  ) {
    super(message, code, { context });
    this.name = 'NavigationError';
    Object.setPrototypeOf(this, NavigationError.prototype);
  }

  public static invalidTransition(
    from: number,
    to: number,
    reason: string
  ): NavigationError {
    return new NavigationError(
      `Invalid navigation transition from level ${from} to ${to}: ${reason}`,
      NavigationErrorCodes.INVALID_TRANSITION,
      { from, to, reason }
    );
  }

  public static invalidLevel(
    level: number,
    reason: string
  ): NavigationError {
    return new NavigationError(
      `Invalid abstraction level ${level}: ${reason}`,
      NavigationErrorCodes.INVALID_LEVEL,
      { level, reason }
    );
  }

  public static navigationConstraintViolation(
    constraint: string,
    details: Record<string, any>
  ): NavigationError {
    return new NavigationError(
      `Navigation constraint violation: ${constraint}`,
      NavigationErrorCodes.CONSTRAINT_VIOLATION,
      { constraint, details }
    );
  }

  public static navigationTimeout(
    operation: string,
    timeout: number
  ): NavigationError {
    return new NavigationError(
      `Navigation operation '${operation}' timed out after ${timeout}ms`,
      NavigationErrorCodes.TIMEOUT,
      { operation, timeout }
    );
  }
}

export const NavigationErrorCodes = {
  INVALID_TRANSITION: 'INVALID_TRANSITION',
  INVALID_LEVEL: 'INVALID_LEVEL',
  CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',
  TIMEOUT: 'TIMEOUT',
  CIRCULAR_REFERENCE: 'CIRCULAR_REFERENCE',
  MAX_DEPTH_EXCEEDED: 'MAX_DEPTH_EXCEEDED',
  INVALID_CONTEXT: 'INVALID_CONTEXT'
} as const;

export type NavigationErrorCode = typeof NavigationErrorCodes[keyof typeof NavigationErrorCodes];

export interface NavigationErrorContext {
  from?: number;
  to?: number;
  level?: number;
  reason?: string;
  constraint?: string;
  operation?: string;
  timeout?: number;
  details?: Record<string, any>;
} 