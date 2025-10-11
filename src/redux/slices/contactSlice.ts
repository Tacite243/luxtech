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


export const sendContactMessage = createAsyncThunk(
    'contact/sendMessage',
    async (formData: ContactFormData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/contact', formData);
            return response.data;
        } catch (err: any) {
            const error: AxiosError<any> = err;
            if (error.response) {
                const errorMessage = error.response.data.errors
                    ? Object.values(error.response.data.errors).flat().join(' ')
                    : "Une erreur est survenue.";
                return rejectWithValue(errorMessage);
            } else {
                // Erreur de réseau ou autre
                return rejectWithValue(error.message || 'Une erreur de réseau est survenue.');
            }
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
            .addCase(sendContactMessage.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;