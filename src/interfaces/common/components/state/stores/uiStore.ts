import { createStore } from '../utils/createStore';

export type ViewerMode = 'default' | 'temporal' | 'structure' | 'paradigm' | 'system' | 'useCase' | 'experience';

interface UIState {
  activeViewer: ViewerMode;
}

const initialState: UIState = {
  activeViewer: 'default', // The default view is the grid of cards
};

export const uiStore = createStore<UIState>(initialState);