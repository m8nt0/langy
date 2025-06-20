import { Viewer } from "../../../domain/entities";

export interface IViewerRepository {
    applyViewer(viewer: Viewer): Promise<void>;
}