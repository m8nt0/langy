// src/core/domain/value-objects/relationships/TemporalRelationship.ts
import { TechObjectId } from '../TechObjectId';

export type TemporalRelationType =
    | 'CREATED_BEFORE' | 'CREATED_AFTER' | 'CREATED_SAME_ERA'
    | 'PREDATES' | 'SUCCEEDS' | 'COEXISTS_WITH'
    | 'REVIVED_BY' | 'MADE_OBSOLETE_BY' | 'CONCURRENT_VERSIONS'
    | 'EVOLUTION_PATH' | 'TIMELINE_OVERLAP' | 'TIMELINE_GAP';

/**

export type TemporalRelationType = 
  | 'PREDATES'           // C PREDATES Java
  | 'SUCCEEDS'           // Rust SUCCEEDS C++
  | 'COEXISTS_WITH'      // React COEXISTS_WITH Vue
  | 'MADE_OBSOLETE_BY'   // Flash MADE_OBSOLETE_BY HTML5
  | 'REVIVED_BY'         // Lisp REVIVED_BY AI boom
  | 'TIMELINE_OVERLAP';  // The x86 and ARM timelines overlap

**/

export class TemporalRelationship {
    constructor(
        public readonly sourceId: TechObjectId,
        public readonly targetId: TechObjectId,
        public readonly type: TemporalRelationType,
        public readonly timeContext?: { startDate?: Date; endDate?: Date; duration?: number },
        public readonly createdAt: Date = new Date(),
        public readonly isActive: boolean = true
    ) { }

    static create(
        sourceId: TechObjectId,
        targetId: TechObjectId,
        type: TemporalRelationType,
        timeContext?: { startDate?: Date; endDate?: Date; duration?: number }
    ): TemporalRelationship {
        return new TemporalRelationship(sourceId, targetId, type, timeContext);
    }

    deactivate(): TemporalRelationship {
        return new TemporalRelationship(
            this.sourceId, this.targetId, this.type, this.timeContext, this.createdAt, false
        );
    }

    isDirectional(): boolean {
        return ['CREATED_BEFORE', 'CREATED_AFTER', 'PREDATES', 'SUCCEEDS', 'REVIVED_BY', 'MADE_OBSOLETE_BY', 'EVOLUTION_PATH'].includes(this.type);
    }

    getReverse(): TemporalRelationType | null {
        const reverseMap: Record<TemporalRelationType, TemporalRelationType | null> = {
            'CREATED_BEFORE': 'CREATED_AFTER',
            'CREATED_AFTER': 'CREATED_BEFORE',
            'CREATED_SAME_ERA': 'CREATED_SAME_ERA',
            'PREDATES': 'SUCCEEDS',
            'SUCCEEDS': 'PREDATES',
            'COEXISTS_WITH': 'COEXISTS_WITH',
            'REVIVED_BY': 'MADE_OBSOLETE_BY',
            'MADE_OBSOLETE_BY': 'REVIVED_BY',
            'CONCURRENT_VERSIONS': 'CONCURRENT_VERSIONS',
            'EVOLUTION_PATH': 'EVOLUTION_PATH',
            'TIMELINE_OVERLAP': 'TIMELINE_OVERLAP',
            'TIMELINE_GAP': 'TIMELINE_GAP'
        };
        return reverseMap[this.type];
    }

    isBidirectional(): boolean {
        return ['CREATED_SAME_ERA', 'COEXISTS_WITH', 'CONCURRENT_VERSIONS', 'TIMELINE_OVERLAP', 'TIMELINE_GAP'].includes(this.type);
    }
}