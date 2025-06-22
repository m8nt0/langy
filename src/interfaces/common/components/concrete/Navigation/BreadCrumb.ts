import { navigationStore } from '../../state/stores';
import { navigationActions } from '../../state/actions';
import { NavigationNode } from '../../../../../core/domain/value-objects';

/**
 * Represents the breadcrumb navigation bar at the top of the screen.
 */
export class BreadCrumb {
    props: {
        nodes: ReadonlyArray<NavigationNode>;
        onNodeClick: (nodeIndex: number) => void;
    };

    constructor() {
        // This component connects directly to the navigation state.
        this.props = {
            // It gets the current path from the store.
            nodes: navigationStore.getCurrentPath().nodes,
            // It dispatches an action to navigate when a node is clicked.
            onNodeClick: (nodeIndex: number) => navigationActions.navigateBackTo(nodeIndex),
        };
    }

    render(): any {}
}