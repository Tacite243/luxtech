import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { Order } from '@prisma/client';



// ==================================
// TYPES
// ==================================

// Type pour les données envoyées à l'API
export type CreateOrderPayload = {
    paymentMethod: 'AIRTEL_MONEY' | 'PHYSICAL' | 'WHATSAPP';
    items: { productId: string; quantity: number }[];
    customerPhone?: string; // Optionnel, mais requis pour Airtel Money
};

// Type pour la réponse réussie de l'API
type CreateOrderSuccessResponse = {
    order: Order;
    paymentInfo?: any; // Informations de paiement d'Airtel
    paymentError?: string;
};

type OrdersState = {
    // Stocke la dernière commande créée pour potentiellement afficher une page de confirmation
    latestOrder: Order | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: OrdersState = {
    latestOrder: null,
    status: 'idle',
    error: null,
};

// ==================================
// THUNK ASYNCHRONE
// ==================================

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: CreateOrderPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<CreateOrderSuccessResponse>('/orders', orderData);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                // Si Zod renvoie une erreur détaillée
                if (typeof error.response.data.error === 'object') {
                    return rejectWithValue(Object.values(error.response.data.error).flat().join(' '));
                }
                return rejectWithValue(error.response.data.error || 'Erreur lors de la création de la commande.');
            }
            return rejectWithValue('Une erreur réseau est survenue.');
        }
    }
);

// ==================================
// SLICE
// ==================================

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // Permet de vider la dernière commande après l'avoir affichée
        clearLatestOrder: (state) => {
            state.latestOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.latestOrder = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderSuccessResponse>) => {
                state.status = 'succeeded';
                state.latestOrder = action.payload.order;
                // Gérer le cas où l'API de paiement a échoué mais la commande a été créée
                if (action.payload.paymentError) {
                    state.error = action.payload.paymentError;
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { clearLatestOrder } = ordersSlice.actions;
export default ordersSlice.reducer;