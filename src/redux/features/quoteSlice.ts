import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';

// Le type des données que le formulaire enverra
const quoteSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    message: z.string(),
});
type QuoteFormData = z.infer<typeof quoteSchema>;

type QuoteState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: QuoteState = {
    status: 'idle',
    error: null,
};

// Thunk asynchrone pour envoyer la demande de devis
export const sendQuoteRequest = createAsyncThunk(
    'quote/sendRequest',
    async (data: QuoteFormData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/quote', data);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.error || 'Erreur lors de l\'envoi.');
            }
            return rejectWithValue('Une erreur réseau est survenue.');
        }
    }
);

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        resetQuoteState: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendQuoteRequest.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendQuoteRequest.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(sendQuoteRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { resetQuoteState } = quoteSlice.actions;
export default quoteSlice.reducer;