// A generic reference to a UI component instance
export type UIComponentReference = any;

/**
 * Defines the contract for rendering and managing UI components in a platform-agnostic way
 */
export interface BaseUIAdapter {
    /**
     * Renders a component at a specified mount point.
     * @param component The abstract component to render.
     * @param mountPoint A reference to the location in the UI to render the component.
     */
    render(component: any, mountPoint: UIComponentReference): void

    /**
     * Updates a specific component with new properties.
     * @param componentRed A refernce to an existing component instance.
     * @param newProps the new properties to apply.
     */
    updateComponent(componentRef: UIComponentReference, newProps: object): void;

    /**
     * Removes a component from the UI.
     * @param componentRef A reference to th ecomponent instance to unmount
     */
    unmount(componentRef: UIComponentReference): void;
}