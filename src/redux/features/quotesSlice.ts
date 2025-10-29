import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { Quote } from '@prisma/client';
import axios from 'axios';
import z from 'zod';

// ==================================
// TYPES
// ==================================

// Type pour le formulaire public
const quoteFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    message: z.string(),
});
type QuoteFormData = z.infer<typeof quoteFormSchema>;

type QuotesState = {
    quotes: Quote[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Types pour les payloads des thunks admin
type ReplyPayload = { id: string; subject: string; message: string; };
type ToggleReadPayload = { id: string; isRead: boolean; };

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: QuotesState = {
    quotes: [],
    status: 'idle',
    error: null,
};

// ==================================
// THUNKS ASYNCHRONES
// ==================================

// --- Thunk pour le formulaire public ---
export const sendQuoteRequest = createAsyncThunk(
    'quotes/sendRequest', // Nom d'action différent pour éviter les conflits
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

// --- Thunks pour le back-office ---
export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<Quote[]>('/quote');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors du chargement.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});


// Thunk pour marquer comme lu/non lu (exemple d'action de mise à jour)
export const toggleQuoteReadStatus = createAsyncThunk('quotes/toggleReadStatus', async ({ id, isRead }: ToggleReadPayload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put<Quote>(`/quote/${id}`, { isRead });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de l\'envoi.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const deleteQuote = createAsyncThunk('quotes/deleteQuote', async (quoteId: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/quote/${quoteId}`);
        return quoteId;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de l\'envoi.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const replyToQuote = createAsyncThunk('quotes/replyToQuote', async ({ id, subject, message }: ReplyPayload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/quote/${id}`, { subject, message });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de l\'envoi.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

// ==================================
// SLICE
// ==================================

const quotesSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        // Action synchrone pour réinitialiser l'état du formulaire public
        resetQuoteState: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Cas pour sendQuoteRequest (formulaire public)
            .addCase(sendQuoteRequest.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(sendQuoteRequest.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(sendQuoteRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Cas pour fetchQuotes (back-office)
            .addCase(fetchQuotes.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchQuotes.fulfilled, (state, action: PayloadAction<Quote[]>) => {
                state.status = 'succeeded';
                state.quotes = action.payload;
            })
            .addCase(fetchQuotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Cas pour les mises à jour optimistes (back-office)
            .addCase(toggleQuoteReadStatus.fulfilled, (state, action: PayloadAction<Quote>) => {
                const index = state.quotes.findIndex(q => q.id === action.payload.id);
                if (index !== -1) {
                    state.quotes[index].isRead = action.payload.isRead;
                }
            })
            .addCase(deleteQuote.fulfilled, (state, action: PayloadAction<string>) => {
                state.quotes = state.quotes.filter(q => q.id !== action.payload);
            });
    },
});

// Exporter toutes les actions
export const { resetQuoteState } = quotesSlice.actions;
export default quotesSlice.reducer;