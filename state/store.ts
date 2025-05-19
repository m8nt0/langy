// Framework-agnostic store interface
import type { Language, FilterState } from '../core/models/languages/types';

export interface Store<T> {
  getState(): T;
  setState(partialState: Partial<T>): void;
  subscribe(listener: (state: T) => void): () => void;
}

export interface AppState {
  languages: Language[];
  filters: FilterState;
  selectedLanguage: Language | null;
  comparedLanguages: Language[];
}

export const initialState: AppState = {
  languages: [],
  filters: {
    searchQuery: '',
    sortBy: 'name',
    paradigm: [],
    origin: [],
    introductionDate: [],
    typing: [],
    compilation: [],
    memory: [],
    concurrency: [],
    syntax: [],
    useCase: [],
    difficulty: [],
    ecosystem: [],
    popularity: [],
    historical: [],
    category: [],
    industryUsage: [],
    platforms: [],
    executionSpeed: [],
    memoryUsage: [],
    communitySize: [],

  },
  selectedLanguage: null,
  comparedLanguages: []
};
