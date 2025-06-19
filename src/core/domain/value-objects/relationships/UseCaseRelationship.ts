// src/core/domain/value-objects/relationships/UseCaseRelationship.ts
import { TechObjectId } from '../TechObjectId';

export type UseCaseRelationType =
    | 'SAME_DOMAIN' | 'COMPLEMENTARY_DOMAIN' | 'COMPETING_DOMAIN' | 'DIFFERENT_DOMAIN'
    | 'SCALES_SIMILARLY' | 'SCALES_BETTER' | 'SCALES_WORSE'
    | 'ECOSYSTEM_OVERLAP' | 'ECOSYSTEM_ISOLATED' | 'ECOSYSTEM_COMPETITIVE'
    | 'INTEGRATION_FRIENDLY' | 'INTEGRATION_CONFLICT' | 'INTEGRATION_NEUTRAL'
    | 'MATURITY_SIMILAR' | 'MATURITY_HIGHER' | 'MATURITY_LOWER'
    | 'TARGET_AUDIENCE_SAME' | 'TARGET_AUDIENCE_DIFFERENT';

export class UseCaseRelationship {
    constructor(
        public readonly sourceId: TechObjectId,
        public readonly targetId: TechObjectId,
        public readonly type: UseCaseRelationType,
        public readonly useCaseContext?: {
            domains?: string[];
            scalabilityMetrics?: Record<string, number>;
            targetAudience?: string[];
            integrationExamples?: string[];
        },
        public readonly createdAt: Date = new Date(),
        public readonly isActive: boolean = true
    ) { }

    static create(
        sourceId: TechObjectId,
        targetId: TechObjectId,
        type: UseCaseRelationType,
        useCaseContext?: {
            domains?: string[];
            scalabilityMetrics?: Record<string, number>;
            targetAudience?: string[];
            integrationExamples?: string[];
        }
    ): UseCaseRelationship {
        return new UseCaseRelationship(sourceId, targetId, type, useCaseContext);
    }

    deactivate(): UseCaseRelationship {
        return new UseCaseRelationship(
            this.sourceId, this.targetId, this.type, this.useCaseContext, this.createdAt, false
        );
    }

    isDirectional(): boolean {
        return ['SCALES_BETTER', 'SCALES_WORSE', 'MATURITY_HIGHER', 'MATURITY_LOWER'].includes(this.type);
    }

    getReverse(): UseCaseRelationType | null {
        const reverseMap: Record<UseCaseRelationType, UseCaseRelationType | null> = {
            'SAME_DOMAIN': 'SAME_DOMAIN',
            'COMPLEMENTARY_DOMAIN': 'COMPLEMENTARY_DOMAIN',
            'COMPETING_DOMAIN': 'COMPETING_DOMAIN',
            'DIFFERENT_DOMAIN': 'DIFFERENT_DOMAIN',
            'SCALES_SIMILARLY': 'SCALES_SIMILARLY',
            'SCALES_BETTER': 'SCALES_WORSE',
            'SCALES_WORSE': 'SCALES_BETTER',
            'ECOSYSTEM_OVERLAP': 'ECOSYSTEM_OVERLAP',
            'ECOSYSTEM_ISOLATED': 'ECOSYSTEM_ISOLATED',
            'ECOSYSTEM_COMPETITIVE': 'ECOSYSTEM_COMPETITIVE',
            'INTEGRATION_FRIENDLY': 'INTEGRATION_FRIENDLY',
            'INTEGRATION_CONFLICT': 'INTEGRATION_CONFLICT',
            'INTEGRATION_NEUTRAL': 'INTEGRATION_NEUTRAL',
            'MATURITY_SIMILAR': 'MATURITY_SIMILAR',
            'MATURITY_HIGHER': 'MATURITY_LOWER',
            'MATURITY_LOWER': 'MATURITY_HIGHER',
            'TARGET_AUDIENCE_SAME': 'TARGET_AUDIENCE_SAME',
            'TARGET_AUDIENCE_DIFFERENT': 'TARGET_AUDIENCE_DIFFERENT'
        };
        return reverseMap[this.type];
    }

    isBidirectional(): boolean {
        return ['SAME_DOMAIN', 'COMPLEMENTARY_DOMAIN', 'COMPETING_DOMAIN', 'DIFFERENT_DOMAIN', 'SCALES_SIMILARLY', 'ECOSYSTEM_OVERLAP', 'ECOSYSTEM_ISOLATED', 'ECOSYSTEM_COMPETITIVE', 'INTEGRATION_FRIENDLY', 'INTEGRATION_CONFLICT', 'INTEGRATION_NEUTRAL', 'MATURITY_SIMILAR', 'TARGET_AUDIENCE_SAME', 'TARGET_AUDIENCE_DIFFERENT'].includes(this.type);
    }
}