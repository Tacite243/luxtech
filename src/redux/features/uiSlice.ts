import { createSlice, AnyAction } from '@reduxjs/toolkit';

// Helper pour vérifier si une action est un thunk asynchrone
const isPendingAction = (action: AnyAction) => {
    return typeof action.type === 'string' && action.type.endsWith('/pending');
}
const isFulfilledOrRejectedAction = (action: AnyAction) => {
    return typeof action.type === 'string' && (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'));
}

type UIState = {
    isLoading: boolean;
};

const initialState: UIState = {
    isLoading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Quand une action asynchrone commence...
            .addMatcher(
                (action): action is AnyAction => isPendingAction(action),
                (state, action) => {
                    // ... on active le loader SAUF pour l'action `fetchUser`
                    if (action.type !== 'auth/fetchUser/pending') {
                        state.isLoading = true;
                    }
                }
            )
            // Quand une action asynchrone se termine...
            .addMatcher(
                (action): action is AnyAction => isFulfilledOrRejectedAction(action),
                (state, action) => {
                    // ... on désactive le loader SAUF pour l'action `fetchUser`
                    if (action.type !== 'auth/fetchUser/pending' && action.type !== 'products/fetchProducts/pending') {
                        state.isLoading = false;
                    }
                }
            );
    },
});

export default uiSlice.reducer;