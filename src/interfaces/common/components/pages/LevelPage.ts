import { MainLayout } from '../layouts';
import { techObjectActions } from '../state/actions';

interface LevelPageParams {
    levelId: string;
}

/**
 * The primary page for displaying all TechObjects within a specific level.
 */
export class LevelPage {
    private layout: MainLayout;
    private levelId: number;

    constructor(params: LevelPageParams) {
        this.layout = new MainLayout();
        this.levelId = parseInt(params.levelId, 10);
    }

    /**
     * When the page is mounted (i.e., becomes visible), it triggers the action
     * to fetch the necessary data for its level.
     */
    onMount() {
        if (!isNaN(this.levelId)) {
            techObjectActions.fetchTechObjectsForLevel(this.levelId);
        }
    }

    render(): any {
        // The page itself just renders the MainLayout. The layout and its children
        // are driven by the state stores, which will be updated by the onMount action.
        // The ContentPane will automatically show the correct cards or viewers.
        return this.layout.render();
    }
}