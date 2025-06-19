
// src/core/domain/value-objects/relationships/ParadigmRelationship.ts
import { TechObjectId } from '../TechObjectId';

export type ParadigmRelationType =
    | 'SHARES_PARADIGM' | 'PARADIGM_OPPOSITE' | 'PARADIGM_SUPERSET' | 'PARADIGM_SUBSET'
    | 'MENTAL_MODEL_SIMILAR' | 'MENTAL_MODEL_CLASH' | 'ABSTRACTION_HIGHER' | 'ABSTRACTION_LOWER'
    | 'COMPOSABILITY_MATCH' | 'COMPOSABILITY_CONFLICT' | 'PARADIGM_BRIDGES' | 'PARADIGM_CONSTRAINS'
    | 'DESIGN_PHILOSOPHY_ALIGNED' | 'DESIGN_PHILOSOPHY_OPPOSED';

export class ParadigmRelationship {
    constructor(
        public readonly sourceId: TechObjectId,
        public readonly targetId: TechObjectId,
        public readonly type: ParadigmRelationType,
        public readonly paradigmContext?: { sharedParadigms?: string[]; conflictingParadigms?: string[] },
        public readonly createdAt: Date = new Date(),
        public readonly isActive: boolean = true
    ) { }

    static create(
        sourceId: TechObjectId,
        targetId: TechObjectId,
        type: ParadigmRelationType,
        paradigmContext?: { sharedParadigms?: string[]; conflictingParadigms?: string[] }
    ): ParadigmRelationship {
        return new ParadigmRelationship(sourceId, targetId, type, paradigmContext);
    }

    deactivate(): ParadigmRelationship {
        return new ParadigmRelationship(
            this.sourceId, this.targetId, this.type, this.paradigmContext, this.createdAt, false
        );
    }

    isDirectional(): boolean {
        return ['PARADIGM_SUPERSET', 'PARADIGM_SUBSET', 'ABSTRACTION_HIGHER', 'ABSTRACTION_LOWER', 'PARADIGM_BRIDGES', 'PARADIGM_CONSTRAINS'].includes(this.type);
    }

    getReverse(): ParadigmRelationType | null {
        const reverseMap: Record<ParadigmRelationType, ParadigmRelationType | null> = {
            'SHARES_PARADIGM': 'SHARES_PARADIGM',
            'PARADIGM_OPPOSITE': 'PARADIGM_OPPOSITE',
            'PARADIGM_SUPERSET': 'PARADIGM_SUBSET',
            'PARADIGM_SUBSET': 'PARADIGM_SUPERSET',
            'MENTAL_MODEL_SIMILAR': 'MENTAL_MODEL_SIMILAR',
            'MENTAL_MODEL_CLASH': 'MENTAL_MODEL_CLASH',
            'ABSTRACTION_HIGHER': 'ABSTRACTION_LOWER',
            'ABSTRACTION_LOWER': 'ABSTRACTION_HIGHER',
            'COMPOSABILITY_MATCH': 'COMPOSABILITY_MATCH',
            'COMPOSABILITY_CONFLICT': 'COMPOSABILITY_CONFLICT',
            'PARADIGM_BRIDGES': 'PARADIGM_CONSTRAINS',
            'PARADIGM_CONSTRAINS': 'PARADIGM_BRIDGES',
            'DESIGN_PHILOSOPHY_ALIGNED': 'DESIGN_PHILOSOPHY_ALIGNED',
            'DESIGN_PHILOSOPHY_OPPOSED': 'DESIGN_PHILOSOPHY_OPPOSED'
        };
        return reverseMap[this.type];
    }

    isBidirectional(): boolean {
        return ['SHARES_PARADIGM', 'PARADIGM_OPPOSITE', 'MENTAL_MODEL_SIMILAR', 'MENTAL_MODEL_CLASH', 'COMPOSABILITY_MATCH', 'COMPOSABILITY_CONFLICT', 'DESIGN_PHILOSOPHY_ALIGNED', 'DESIGN_PHILOSOPHY_OPPOSED'].includes(this.type);
    }
}