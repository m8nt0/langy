import { TechObjectId } from '../TechObjectId';

export type ExperienceRelationType =
    | 'LEARNING_EASIER' | 'LEARNING_HARDER' | 'LEARNING_SIMILAR'
    | 'COMMUNITY_OVERLAP' | 'COMMUNITY_ISOLATED' | 'COMMUNITY_COMPETITIVE'
    | 'DOCUMENTATION_BETTER' | 'DOCUMENTATION_WORSE' | 'DOCUMENTATION_SIMILAR'
    | 'FEEDBACK_FASTER' | 'FEEDBACK_SLOWER' | 'FEEDBACK_SIMILAR'
    | 'CUSTOMIZATION_MORE' | 'CUSTOMIZATION_LESS' | 'CUSTOMIZATION_SIMILAR' 
    | 'BEGINNER_FRIENDLY_THAN' | 'EXPERT_ORIENTED_THAN' | 'SKILL_LEVEL_SIMILAR' 
    | 'ONBOARDING_SMOOTHER' | 'ONBOARDING_STEEPER';

/**

export type ExperienceRelationType = 
  | 'LEARNING_CURVE_STEEPER'   // Rust has a LEARNING_CURVE_STEEPER than Python
  | 'ONBOARDING_SMOOTHER'      // Ruby on Rails has an ONBOARDING_SMOOTHER than vanilla Node.js
  | 'COMMUNITY_OVERLAP'        // The Data Science communities for Python and R have COMMUNITY_OVERLAP
  | 'DOCUMENTATION_BETTER'     // React's DOCUMENTATION is often considered BETTER than Angular's
  | 'BEGINNER_FRIENDLY_THAN'   // Python is more BEGINNER_FRIENDLY_THAN C++
  | 'DESIGNED_FOR_EXPERTS';    // Haskell is often DESIGNED_FOR_EXPERTS in functional programming

**/
export class ExperienceRelationship {
    constructor(
        public readonly sourceId: TechObjectId,
        public readonly targetId: TechObjectId,
        public readonly type: ExperienceRelationType,
        public readonly exprienceContext?: {
            learningCurveMetrics?: Record<string, number>;
            communityOverlapPercentage?: number;
            documentationQualityScore?: number;
            customizationLevel?: string;
        },
        public readonly createdAt: Date = new Date(),
        public readonly isActive: boolean = true
    ) { }

    static create(
        sourceId: TechObjectId,
        targetId: TechObjectId,
        type: ExperienceRelationType,
        experienceContext?: {
            learningCurveMetrics?: Record<string, number>;
            communityOverlapPercentage?: number;
            documentationQualityScore?: number;
            customizationLevel?: string;
        }
    ): ExperienceRelationship {
        return new ExperienceRelationship(sourceId, targetId, type, experienceContext);
    }

    deactivate(): ExperienceRelationship {
        return new ExperienceRelationship(
            this.sourceId, this.targetId, this.type, this.exprienceContext, this.createdAt, false
        )
    }

    isDirectional(): boolean {
        return ['LEARNING_EASIER', 'LEARNING_HARDER', 'DOCUMENTATION_BETTER', 'DOCUMENTATION_WORSE', 'FEEDBACK_FASTER', 'FEEDBACK_SLOWER', 'CUSTOMIZATION_MORE', 'CUSTOMIZATION_LESS', 'BEGINNER_FRIENDLY_THAN', 'EXPERT_ORIENTED_THAN', 'ONBOARDING_SMOOTHER', 'ONBOARDING_STEEPER'].includes(this.type);
    }

    getReverse(): ExperienceRelationType | null {
        const reverseMap: Record<ExperienceRelationType, ExperienceRelationType | null> = {
            'LEARNING_EASIER': 'LEARNING_HARDER',
            'LEARNING_HARDER': 'LEARNING_EASIER',
            'LEARNING_SIMILAR': 'LEARNING_SIMILAR',
            'COMMUNITY_OVERLAP': 'COMMUNITY_OVERLAP',
            'COMMUNITY_ISOLATED': 'COMMUNITY_ISOLATED',
            'COMMUNITY_COMPETITIVE': 'COMMUNITY_COMPETITIVE',
            'DOCUMENTATION_BETTER': 'DOCUMENTATION_WORSE',
            'DOCUMENTATION_WORSE': 'DOCUMENTATION_BETTER',
            'DOCUMENTATION_SIMILAR': 'DOCUMENTATION_SIMILAR',
            'FEEDBACK_FASTER': 'FEEDBACK_SLOWER',
            'FEEDBACK_SLOWER': 'FEEDBACK_FASTER',
            'FEEDBACK_SIMILAR': 'FEEDBACK_SIMILAR',
            'CUSTOMIZATION_MORE': 'CUSTOMIZATION_LESS',
            'CUSTOMIZATION_LESS': 'CUSTOMIZATION_MORE',
            'CUSTOMIZATION_SIMILAR': 'CUSTOMIZATION_SIMILAR',
            'BEGINNER_FRIENDLY_THAN': 'EXPERT_ORIENTED_THAN',
            'EXPERT_ORIENTED_THAN': 'BEGINNER_FRIENDLY_THAN',
            'SKILL_LEVEL_SIMILAR': 'SKILL_LEVEL_SIMILAR',
            'ONBOARDING_SMOOTHER': 'ONBOARDING_STEEPER',
            'ONBOARDING_STEEPER': 'ONBOARDING_SMOOTHER'
        };
        return reverseMap[this.type];
    }

    isBidirectional(): boolean {
        return ['LEARNING_SIMILAR', 'COMMUNITY_OVERLAP', 'COMMUNITY_ISOLATED', 'COMMUNITY_COMPETITIVE', 'DOCUMENTATION_SIMILAR', 'FEEDBACK_SIMILAR', 'CUSTOMIZATION_SIMILAR', 'SKILL_LEVEL_SIMILAR'].includes(this.type);
    }
}