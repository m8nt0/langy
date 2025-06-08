import { TimelineViewerConfig } from './viewers/Timeline';
import { AbstractionViewerConfig } from './viewers';
import { ParadigmViewerConfig } from './viewers';
import { SystemViewerConfig } from './viewers';
import { UseCaseViewerConfig } from './viewers';
import { ExperienceViewerConfig } from './viewers';

/**
 * Represents different ways to view tech objects in the system
 */

// Viewers are organizational lenses—they change how the cards are grouped/arranged, not the underlying data.

export enum ViewerType {
    TIMELINE = 'TIMELINE',
    ABSTRACTION_TREE = 'ABSTRACTION_TREE',
    PARADIGM = 'PARADIGM',
    SYSTEM = 'SYSTEM',
    USE_CASES = 'USE_CASES',
    EXPERIENCE = 'EXPERIENCE'
}

export interface ViewerConfiguration {
    showMetadata: boolean;
    showRelationships: boolean;
    showVersions: boolean;
    showStatistics: boolean;
    highlightPatterns: boolean;
    autoLayout: boolean;
    grouping?: string[];
    customFields?: string[];
}
/**
 * Immutable value object representing viewer configuration and state
 */
export class ViewerData {
    constructor(
        private readonly type: ViewerType,
        private readonly config: ViewerConfiguration,
        private readonly context: ViewerContext = {}
    ) {
        Object.freeze(this);
    }

    getType(): ViewerType {
        return this.type;
    }

    getConfig(): ViewerConfiguration {
        return { ...this.config };
    }

    getContext(): ViewerContext {
        return { ...this.context };
    }

    withConfig(config: Partial<ViewerConfiguration>): ViewerData {
        return new ViewerData(
            this.type,
            { ...this.config, ...config },
            this.context
        );
    }

    withContext(context: Partial<ViewerContext>): ViewerData {
        return new ViewerData(
            this.type,
            this.config,
            { ...this.context, ...context }
        );
    }

    withType(type: ViewerType): ViewerData {
        return new ViewerData(type, this.config, this.context);
    }

    // Factory methods for specific viewer types
    static createTimelineViewer(config: TimelineViewerConfig): ViewerData {
        return new ViewerData(ViewerType.TIMELINE, config);
    }

    static createAbstractionTreeViewer(config: AbstractionViewerConfig): ViewerData {
        return new ViewerData(ViewerType.ABSTRACTION_TREE, config);
    }

    static createParadigmViewer(config: ParadigmViewerConfig): ViewerData {
        return new ViewerData(ViewerType.PARADIGM, config);
    }

    static createSystemViewer(config: SystemViewerConfig): ViewerData {
        return new ViewerData(ViewerType.SYSTEM, config);
    }

    // Validation
    isValid(): boolean {
        return !!(
            this.type &&
            this.config &&
            this.validateConfig()
        );
    }

    private validateConfig(): boolean {
        const config = this.config;
        return typeof config.showMetadata === 'boolean' &&
            typeof config.showRelationships === 'boolean' &&
            typeof config.showVersions === 'boolean' &&
            typeof config.showStatistics === 'boolean';
    }
}

// Additional types
export interface ViewerContext {
    selectedIds?: string[];
    focusedId?: string;
    zoomLevel?: number;
    position?: { x: number; y: number };
    filters?: any[];
    searchQuery?: string;
    [key: string]: any;
} 