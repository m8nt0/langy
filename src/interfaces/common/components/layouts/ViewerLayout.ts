import { FilterPanel } from '../concrete/Filters';
import { navigationActions } from '../state/actions';
import { uiStore, ViewerMode } from '../state/stores';
import { techObjectSelectors } from '../state/selectors';
import { TechObjectCard } from '../concrete/TechObjectCard';
import * as Viewers from '../concrete/Viewers';

/**
 * Defines the primary interaction area: the tools bar and the content pane below it.
 */
export class ViewerLayout {
    private toolsBar: ToolsBar;
    private contentPane: ContentPane;

    constructor() {
        this.toolsBar = new ToolsBar();
        this.contentPane = new ContentPane();
    }

    render(): any {
        // Renders a container with the ToolsBar at the top and the ContentPane below.
    }
}

/**
 * The bar containing viewer modes, filtering, and abstraction controls.
 */
class ToolsBar {
    private filterPanel: FilterPanel;
    // TODO: add abstraction controls

    constructor() {
        this.filterPanel = new FilterPanel();
    }

    private changeViewer(mode: ViewerMode) {
        navigationActions.changeViewerMode(mode);
    }

    render(): any {
        // Renders buttons for each of the 6 viewers.
        // onClick for each button calls this.changeViewer('temporal'), etc.
        // Renders the FilterPanel component.
        // Renders "Abstract Up" and "Abstract Down" buttons.
    }
}

/**
 * The dynamic pane that shows either the default card grid or a specific viewer.
 */
class ContentPane {
    render(): any {
        const activeViewerMode = uiStore.getState().activeViewer;
        const viewerData = techObjectSelectors.selectActiveViewerData();

        // Conditional rendering based on the active viewer mode.
        if (activeViewerMode === 'default') {
            // If default, get the visible objects and render them as cards.
            const visibleObjects = techObjectSelectors.selectVisibleTechObjects();
            // Returns a grid of TechObjectCard components.
            return visibleObjects.map(obj => new TechObjectCard({ techObject: obj }));
        } else {
            // If a viewer is active, instantiate and render the correct one.
            switch (activeViewerMode) {
                case 'temporal': return new Viewers.TemporalViewer();
                case 'structure': return new Viewers.StructureViewer();
                case 'paradigm': return new Viewers.ParadigmViewer();
                case 'system': return new Viewers.SystemViewer();
                case 'useCase': return new Viewers.UseCaseViewer();
                case 'experience': return new Viewers.ExperienceViewer();
            }
        }
    }
}