import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { Stat } from '@prisma/client';
type StatsState = {
    stats: Stat[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};
const initialState: StatsState = {
    stats: [],
    status: 'idle',
    error: null,
};
// Thunks pour les opérations CRUD
export const fetchStats = createAsyncThunk('stats/fetchStats', async () => {
    const response = await axiosInstance.get<Stat[]>('/stats');
    return response.data;
});
// ... (créez les thunks createStat, updateStat, deleteStat sur le même modèle que pour les produits) ...
const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchStats.fulfilled, (state, action: PayloadAction<Stat[]>) => {
                state.status = 'succeeded';
                state.stats = action.payload;
            })
        // ... (gérez les autres cas 'fulfilled' pour les mises à jour optimistes) ...
    },
});
export default statsSlice.reducer;