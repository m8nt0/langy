import { ViewerConfiguration } from "../ViewerData";

// export enum Paradigms {

// }

export interface ParadigmViewerConfig extends ViewerConfiguration {
    paradigms: string[];
    showCrossParadigm: boolean;
    groupByParadigm: boolean;
    showParadigmRelations: boolean;
}