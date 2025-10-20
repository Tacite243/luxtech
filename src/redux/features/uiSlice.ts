import { createSlice } from '@reduxjs/toolkit';

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
    // C'est ici que la magie opère !
    // Nous allons écouter les actions "pending" et "fulfilled"/"rejected" des autres slices.
    extraReducers: (builder) => {
        builder
            // Quand une action asynchrone commence (matcher pour tous les `pending`)
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                }
            )
            // Quand une action asynchrone se termine (matcher pour tous les `fulfilled` et `rejected`)
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
                (state) => {
                    state.isLoading = false;
                }
            );
    },
});

export default uiSlice.reducer;