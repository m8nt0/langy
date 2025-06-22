import { techObjectStore, techObjectSelectors } from '../state'; // Assuming state management

/**
 * Encapsulates the logic for any of the main viewers.
 * It selects the appropriate data from the application state.
 * @param viewerType The type of viewer to select data for.
 */
export function useViewerBehavior(
    viewerType: 'temporal' | 'structure' | 'paradigm' | 'system' | 'useCase' | 'experience'
) {
    // This selector would derive the specific viewer data from the list of 
    // visible TechObjects in the main techObjectStore.
    const data = techObjectSelectors.selectViewerData(viewerType);
    const isLoading = techObjectStore.isLoading();
    const error = techObjectStore.getError();

    return {
        data,
        isLoading,
        error,
    };
}