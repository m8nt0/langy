import { ViewerConfiguration } from "../ViewerData";

export enum TimelineScale {
    DAYS = 'DAYS',
    WEEKS = 'WEEKS',
    MONTHS = 'MONTHS',
    QUARTERS = 'QUARTERS',
    YEARS = 'YEARS'
}

export interface TimelineViewerConfig extends ViewerConfiguration {
    scale: TimelineScale;
    showMilestones: boolean;
    showReleases: boolean;
    showDependencies: boolean;
    compareVersions: boolean;
}