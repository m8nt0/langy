import { Viewer } from "../entities";

export interface IViewerRepository {
    applyviewer(viewer: Viewer): Promise<void>;
}