import { MainLayout } from '../layouts';
import { navigationActions } from '../state/actions';

/**
 * The initial landing page of the application.
 * It might show an introduction or the top-level abstraction categories.
 */
export class HomePage {
    private layout: MainLayout;

    constructor() {
        this.layout = new MainLayout();
    }

    onMount() {
        console.log("HomePage mounted.");
        // This could trigger fetching initial data, like the list of levels.
    }

    render(): any {
        // This page uses the MainLayout. The content pane would display
        // navigation options to the different abstraction levels, e.g.,
        // a button "Explore Programming Languages" that calls
        // navigationActions.navigateTo('/levels/1');
        return this.layout.render();
    }
}