import { ViewerConfiguration } from "../ViewerData";

export interface SystemViewerConfig extends ViewerConfiguration {
    systemLayers: string[];
    showInteractions: boolean;
    showDataFlow: boolean;
    showControlFlow: boolean;
}