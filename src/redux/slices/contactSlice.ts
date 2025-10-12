import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';



// ... Les interfaces ContactFormData et ContactState restent les mêmes ...
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ContactState = {
    status: 'idle',
    error: null,
};

// 1. Un type pour la réponse d'erreur attendue de notre API
// Cela nous aidera à typer l'erreur Axios.
type ApiErrorData = {
    errors?: Record<string, string[]>;
};


export const sendContactMessage = createAsyncThunk(
    'contact/sendMessage',
    async (formData: ContactFormData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/contact', formData);
            return response.data;
        } catch (err: unknown) {
            // On vérifie si c'est bien une erreur Axios
            if (axios.isAxiosError(err)) {
                // On type l'erreur Axios avec notre type personnalisé `ApiErrorData`
                const error: AxiosError<ApiErrorData> = err;
                if (error.response?.data?.errors) {
                    const errorMessage = Object.values(error.response.data.errors).flat().join(' ');
                    return rejectWithValue(errorMessage);
                }
            }
            // Gérer les erreurs non-Axios ou les erreurs sans message spécifique
            return rejectWithValue('Une erreur inattendue est survenue.');
        }
    }
);


const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        resetContactState: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendContactMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendContactMessage.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(sendContactMessage.rejected, (state, action: PayloadAction<unknown>) => {
                state.status = 'failed';
                // On s'assure que le payload est bien une chaîne avant de l'assigner
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = 'Une erreur inconnue est survenue.';
                }
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;