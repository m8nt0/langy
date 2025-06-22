import { TechObjectDto } from '../../../../../core/application/dto';
import { TechObject } from '../../../../../core/domain/entities';
import { createStore } from '../utils/createStore'; // A simple store utility

interface TechObjectState {
    techObjects: Record<string, TechObjectDto>; // Stored by ID for easy lookup
    currentLevelIds: string[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TechObjectState = {
    techObjects: {},
    currentLevelIds: [],
    isLoading: false,
    error: null,
}

// Creates a store with the state and methods to get/update it.
export const techObjectStore = createStore<TechObjectState>(initialState);