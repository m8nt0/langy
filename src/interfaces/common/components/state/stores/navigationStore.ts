import { NavigationPath, NavigationNode } from '../../../../../core/domain/value-objects';
import { createStore } from '../../utils/createStore';

interface NavigationState {
  path: ReadonlyArray<NavigationNode>;
}

const initialState: NavigationState = {
  path: [],
};

export const navigationStore = createStore<NavigationState>(initialState);