import { BaseNavigationAdapter, BaseUIAdapter } from '../../adapters/base';
import { routes } from './routes';

/**
 * The main router for the SPA. It listens to navigation changes and
 * renders the appropriate page.
 */
export class RouteHandler {
    private currentComponent: any | null = null;

    constructor(
        private navigationAdapter: BaseNavigationAdapter,
        private uiAdapter: BaseUIAdapter,
        private mountPoint: any,
    ) {
        // Listen for changes from the navigation adapter (e.g., browser back/forward)
        this.navigationAdapter.onRouteChanged(this.handleRouteChange.bind(this));
        // Handle the initial route on load
        this.handleRouteChange(this.navigationAdapter.getCurrentPath());
    }

    private handleRouteChange(path: string): void {
        const matchedRoute = routes.find(route => {
            // Simple regex matching for parameters like :levelId
            const regex = new RegExp(`^${route.path.replace(/:\w+/g, '(\\w+)')}$`);
            return regex.test(path);
        });

        if (matchedRoute) {
            if (this.currentComponent) {
                this.uiAdapter.unmount(this.currentComponent);
            }

            // Extract params from path
            const paramRegex = new RegExp(`^${matchedRoute.path.replace(/:\w+/g, '(\\w+)')}$`);
            const paramValues = path.match(paramRegex)?.slice(1) ?? [];
            const paramKeys = matchedRoute.path.match(/:\w+/g)?.map(key => key.substring(1)) ?? [];
            const params = Object.fromEntries(paramKeys.map((key, i) => [key, paramValues[i]]));

            // Instantiate the page component with its params
            const PageComponent = matchedRoute.component;
            this.currentComponent = new PageComponent(params);

            // Tell the component it's being mounted
            if (this.currentComponent.onMount) {
                this.currentComponent.onMount();
            }

            // Render the new page component
            this.uiAdapter.render(this.currentComponent, this.mountPoint);
        }
    }
}