import { ViewerConfiguration } from "../ViewerData";

export interface ExperienceViewerConfig extends ViewerConfiguration {
    userTypes: string[];
    showInteractions: boolean;
    showUsagePatterns: boolean;
    experienceMetrics: string[];
}