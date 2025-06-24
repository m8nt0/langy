import { BaseNavigationAdapter } from '../../../common/adapters/base';

/**
 * An implementation of the navigation adapter using the browser's History API.
 */
export class WebNavigationAdapter implements BaseNavigationAdapter {
    constructor() {
        // Listen to the browser's back/forward buttons
        window.addEventListener('popstate', this.handlePopState);
    }

    private listeners: Set<(path: string) => void> = new Set();

    private handlePopState = () => {
        this.listeners.forEach(cb => cb(this.getCurrentPath()));
    }

    goTo(path: string): void {
        window.history.pushState({}, '', path);
        this.listeners.forEach(cb => cb(path));
    }

    back(): void {
        window.history.back();
    }

    getCurrentPath(): string {
        return window.location.pathname;
    }

    onRouteChanged(callback: (path: string) => void): () => void {
        this.listeners.add(callback);
        return () => {
            this.listeners.delete(callback);
            // Clean up main event listener if no subscribers are left
            if (this.listeners.size === 0) {
                window.removeEventListener('popstate', this.handlePopState);
            }
        };
    }
}