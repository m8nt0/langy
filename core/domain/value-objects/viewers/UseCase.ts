import { ViewerConfiguration } from "../ViewerData";

export interface UseCaseViewerConfig extends ViewerConfiguration {
    domains: string[];
    industries: string[];
    showValueChains: boolean;
    valueMetrics: string[];
}