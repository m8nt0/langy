/**
 * Defines a contract for handling URL-based navigation.
 */
export interface BaseNavigationAdapter {
    /**
     * Navigates to a new path.
     * @param path The destination path (e.g., '/levels/1').
     */
    goTo(path: string): void;

    /**
     * Navigates to the previous location in the history.
     */
    back(): void;

    /**
     * Returns the current URL path.
     */
    getCurrentPath(): string;

    /**
     * Subscribes to route changes.
     * @param callback The function to execute when the route changes.
     * @returns A function to unsubscribe.
     */
    onRouteChanged(callback: (path: string) => void): () => void;
}