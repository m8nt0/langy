// src/core/domain/value-objects/relationships/SystemRelationship.ts
import { TechObjectId } from '../TechObjectId';

export type SystemRelationType =
  | 'SAME_RUNTIME' | 'DIFFERENT_RUNTIME' | 'COMPILES_TO_SAME' | 'COMPILES_TO_DIFFERENT'
  | 'PERFORMANCE_SIMILAR' | 'PERFORMANCE_FASTER' | 'PERFORMANCE_SLOWER'
  | 'MEMORY_EFFICIENT_THAN' | 'MEMORY_HEAVY_THAN' | 'MEMORY_SIMILAR'
  | 'HARDWARE_COMPATIBLE' | 'HARDWARE_INCOMPATIBLE' | 'EXECUTION_COMPATIBLE' | 'EXECUTION_INCOMPATIBLE'
  | 'SCALABILITY_SIMILAR' | 'SCALABILITY_BETTER' | 'SCALABILITY_WORSE';

export class SystemRelationship {
  constructor(
    public readonly sourceId: TechObjectId,
    public readonly targetId: TechObjectId,
    public readonly type: SystemRelationType,
    public readonly systemContext?: {
      runtime?: string;
      compilationTarget?: string;
      performanceMetrics?: Record<string, number>;
      hardwareRequirements?: string[];
    },
    public readonly createdAt: Date = new Date(),
    public readonly isActive: boolean = true
  ) { }

  static create(
    sourceId: TechObjectId,
    targetId: TechObjectId,
    type: SystemRelationType,
    systemContext?: {
      runtime?: string;
      compilationTarget?: string;
      performanceMetrics?: Record<string, number>;
      hardwareRequirements?: string[];
    }
  ): SystemRelationship {
    return new SystemRelationship(sourceId, targetId, type, systemContext);
  }

  deactivate(): SystemRelationship {
    return new SystemRelationship(
      this.sourceId, this.targetId, this.type, this.systemContext, this.createdAt, false
    );
  }

  isDirectional(): boolean {
    return ['PERFORMANCE_FASTER', 'PERFORMANCE_SLOWER', 'MEMORY_EFFICIENT_THAN', 'MEMORY_HEAVY_THAN', 'SCALABILITY_BETTER', 'SCALABILITY_WORSE'].includes(this.type);
  }

  getReverse(): SystemRelationType | null {
    const reverseMap: Record<SystemRelationType, SystemRelationType | null> = {
      'SAME_RUNTIME': 'SAME_RUNTIME',
      'DIFFERENT_RUNTIME': 'DIFFERENT_RUNTIME',
      'COMPILES_TO_SAME': 'COMPILES_TO_SAME',
      'COMPILES_TO_DIFFERENT': 'COMPILES_TO_DIFFERENT',
      'PERFORMANCE_SIMILAR': 'PERFORMANCE_SIMILAR',
      'PERFORMANCE_FASTER': 'PERFORMANCE_SLOWER',
      'PERFORMANCE_SLOWER': 'PERFORMANCE_FASTER',
      'MEMORY_EFFICIENT_THAN': 'MEMORY_HEAVY_THAN',
      'MEMORY_HEAVY_THAN': 'MEMORY_EFFICIENT_THAN',
      'MEMORY_SIMILAR': 'MEMORY_SIMILAR',
      'HARDWARE_COMPATIBLE': 'HARDWARE_COMPATIBLE',
      'HARDWARE_INCOMPATIBLE': 'HARDWARE_INCOMPATIBLE',
      'EXECUTION_COMPATIBLE': 'EXECUTION_COMPATIBLE',
      'EXECUTION_INCOMPATIBLE': 'EXECUTION_INCOMPATIBLE',
      'SCALABILITY_SIMILAR': 'SCALABILITY_SIMILAR',
      'SCALABILITY_BETTER': 'SCALABILITY_WORSE',
      'SCALABILITY_WORSE': 'SCALABILITY_BETTER'
    };
    return reverseMap[this.type];
  }

  isBidirectional(): boolean {
    return ['SAME_RUNTIME', 'DIFFERENT_RUNTIME', 'COMPILES_TO_SAME', 'COMPILES_TO_DIFFERENT', 'PERFORMANCE_SIMILAR', 'MEMORY_SIMILAR', 'HARDWARE_COMPATIBLE', 'HARDWARE_INCOMPATIBLE', 'EXECUTION_COMPATIBLE', 'EXECUTION_INCOMPATIBLE', 'SCALABILITY_SIMILAR'].includes(this.type);
  }
}