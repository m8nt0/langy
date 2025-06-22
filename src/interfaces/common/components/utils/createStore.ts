/**
 * A very simple observable store implementation.
 */
export function createStore<T>(initialState: T) {
    let state = initialState;
    const listeners: Set<() => void> = new Set();

    return {
        getState() {
            return state;
        },
        update(updater: (currentState: T) => T) {
            state = updater(state);
            listeners.forEach(l => l());
        },
        subscribe(listener: () => void) {
            listeners.add(listener);
            return () => listeners.delete(listener); // Return an unsubscribe function
        },
    };
}