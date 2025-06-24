import { navigationStore, uiStore } from '../stores';
// import {
//     // Assume use cases are initialized elsewhere
//     getNavigationPathUseCase,
//     abstractUpUseCase,
// } from '../services/useCaseProvider'; // A hypothetical provider for use cases

import {
    GetNavigationPathUseCase,
    AbstractUpUseCase
} from '../../../../../core/application/use-cases/navigation'
import { ViewerMode } from '../stores/uiStore';


export const navigationActions = {
    navigateTo(path: string) {
        // This would be handled by the navigation adapter, which would then
        // trigger an update to the navigationStore.
        console.log(`Navigating to ${path}...`);
    },

    navigateBackTo(nodeIndex: number) {
        // Logic to update the navigation path in the store
    },

    abstractUp() {
        // const result = await abstractUpUseCase.execute(...);
        // ...
    },

    changeViewerMode(mode: ViewerMode) {
        uiStore.update(state => ({ ...state, activeViewer: mode }));
    }
};