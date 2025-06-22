import { MainLayout } from '../layouts';
import { techObjectActions } from '../state/actions';

interface TechObjectPageParams {
    techObjectId: string;
}

/**
 * A detail page for a single TechObject.
 */
export class TechObjectPage {
    private layout: MainLayout;
    private techObjectId: string;

    constructor(params: TechObjectPageParams) {
        this.layout = new MainLayout();
        this.techObjectId = params.techObjectId;
    }

    onMount() {
        techObjectActions.getTechObjectDetails(this.techObjectId);
    }

    render(): any {
        // Renders the MainLayout. The content pane for this page would be
        // configured to show a detailed view of a single object from the store.
        return this.layout.render();
    }
}