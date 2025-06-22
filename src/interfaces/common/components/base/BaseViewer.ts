import { TechObjectDto } from "../../../../core/application/dto";

/**
 * Defines the essential properties for any of the six main "viewer" components.
 */
export interface BaseViewerProps<T> {
    // The specific data to be visualized (e.g., TemporalViewerData[]).
    data: T;
    isLoading: boolean;
    error?: string | null;
}

export abstract class BaseViewer<T> {
    constructor(protected props: BaseViewerProps<T>) {}

    abstract render(): any;
}
