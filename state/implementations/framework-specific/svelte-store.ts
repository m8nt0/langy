import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { AppState } from '../../store';
import { vanillaStore } from '../vanilla-store';
import type { Language, FilterState } from '../../../core/models/languages/types';

// Create a Svelte store that wraps our vanilla store
function createAppStore(): Writable<AppState> {
  const { subscribe, set, update } = writable<AppState>(vanillaStore.getState());
  
  // Subscribe to changes in the vanilla store
  vanillaStore.subscribe((state) => {
    set(state);
  });
  
  return {
    subscribe,
    set: (value: AppState) => {
      vanillaStore.setState(value);
    },
    update: (updater: (state: AppState) => AppState) => {
      const newState = updater(vanillaStore.getState());
      vanillaStore.setState(newState);
    }
  };
}

// Create the main store
export const appStore = createAppStore();

// Create derived stores for specific parts of the state
export const languages = derived(appStore, $appStore => $appStore.languages);
export const filters = derived(appStore, $appStore => $appStore.filters);
export const selectedLanguage = derived(appStore, $appStore => $appStore.selectedLanguage);
export const comparedLanguages = derived(appStore, $appStore => $appStore.comparedLanguages);

// Helper functions to update specific parts of the state
export function updateFilters(newFilters: Partial<FilterState>): void {
  vanillaStore.setState({
    filters: {
      ...vanillaStore.getState().filters,
      ...newFilters
    }
  });
}

export function setSelectedLanguage(language: Language | null): void {
  vanillaStore.setState({ selectedLanguage: language });
}

export function addComparedLanguage(language: Language): void {
  const current = vanillaStore.getState().comparedLanguages;
  if (!current.some(l => l.id === language.id)) {
    vanillaStore.setState({
      comparedLanguages: [...current, language]
    });
  }
}

export function removeComparedLanguage(languageId: string): void {
  const current = vanillaStore.getState().comparedLanguages;
  vanillaStore.setState({
    comparedLanguages: current.filter(l => l.id !== languageId)
  });
}

export function setLanguages(languages: Language[]): void {
  vanillaStore.setState({ languages });
}