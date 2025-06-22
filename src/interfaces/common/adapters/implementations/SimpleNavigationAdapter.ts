import { BaseNavigationAdapter } from "../base/BaseNavigationAdapter";

/**
 * A very simple, non-browser-based navigation adapter for testing.
 */
export class SimpleNavigationAdapter implements BaseNavigationAdapter {
    private currentPath: string = '/';
    private listeners: Set<(path: string) => void> = new Set();

    goTo(path: string): void {
        this.currentPath = path;
        this.listeners.forEach(cb => cb(this.currentPath));
    }

    back(): void {
        // TODO: implement the method
        console.warn('SimpleNavigationAdapter.back() is not implemented.');
    }

    getCurrentPath(): string {
        return this.currentPath;
    }

    onRouteChanged(callback: (path: string) => void): () => void {
        console.warn('SimpleNavigationAdapter.onRouteChanged() is not implemented.'); 
    }
}