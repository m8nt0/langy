import { BaseUIAdapter } from '../../../common/adapters/base';

/**
 * A UI adapter for Svelte. Because Svelte components manage their own lifecycle,
 * this adapter's role is simplified to mounting the root component.
 */
export class DOMUIAdapter implements BaseUIAdapter {
    render(ComponentClass: any, mountPoint: HTMLElement): void {
        new ComponentClass({
            target: mountPoint,
        });
    }

    updateComponent(): void {
        // Svelte's reactivity handles updates, so this is not needed.
        console.warn('DOMUIAdapter.updateComponent is a no-op in Svelte.');
    }

    unmount(): void {
        // Svelte components have a $destroy method, but top-level unmounting
        // is usually handled by simply clearing the mountPoint's innerHTML.
        console.warn('DOMUIAdapter.unmount should be handled by the component hierarchy.');
    }
}