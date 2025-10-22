import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { Stat } from '@prisma/client';
import { StatOutputValues } from '@/components/StatForm';



// ==================================
// TYPES
// ==================================

type StatsState = {
    stats: Stat[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

type UpdateStatPayload = {
    id: string;
    data: Partial<StatOutputValues>;
};

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: StatsState = {
    stats: [],
    status: 'idle',
    error: null,
};

// ==================================
// THUNKS ASYNCHRONES
// ==================================

export const fetchStats = createAsyncThunk('stats/fetchStats', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<Stat[]>('/stats');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors du chargement des statistiques.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});


export const createStat = createAsyncThunk('stats/createStat', async (statData: StatOutputValues, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post<Stat>('/stats', statData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de la création.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const updateStat = createAsyncThunk('stats/updateStat', async ({ id, data }: UpdateStatPayload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put<Stat>(`/stats/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de la mise à jour.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const deleteStat = createAsyncThunk('stats/deleteStat', async (statId: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/stats/${statId}`);
        return statId;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de la suppression.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

// ==================================
// SLICE
// ==================================

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchStats.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchStats.fulfilled, (state, action: PayloadAction<Stat[]>) => {
                state.status = 'succeeded';
                state.stats = action.payload;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Create (mise à jour optimiste)
            .addCase(createStat.fulfilled, (state, action: PayloadAction<Stat>) => {
                state.stats.push(action.payload);
            })
            // Update (mise à jour optimiste)
            .addCase(updateStat.fulfilled, (state, action: PayloadAction<Stat>) => {
                const index = state.stats.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.stats[index] = action.payload;
                }
            })
            // Delete (mise à jour optimiste)
            .addCase(deleteStat.fulfilled, (state, action: PayloadAction<string>) => {
                state.stats = state.stats.filter(s => s.id !== action.payload);
            });
    },
});

export default statsSlice.reducer;