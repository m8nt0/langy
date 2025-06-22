import { TechObjectFilter } from '../../../../../core/domain/value-objects';
import { createStore } from '../utils/createStore';

interface FilterState {
    activeFilter: TechObjectFilter;
};

const initialState: FilterState = {
    activeFilter: new TechObjectFilter([]), // Starts with an empty filter
}

export const filterStore = createStore<FilterState>(initialState);