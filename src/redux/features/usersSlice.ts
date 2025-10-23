import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { User, Role } from '@prisma/client';

// Type pour un utilisateur sans mot de passe, tel que renvoyé par l'API
export type SafeUser = Omit<User, 'password'>;

// ==================================
// TYPES
// ==================================

type UsersState = {
    users: SafeUser[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Type pour les données de création/mise à jour d'un utilisateur
export type UserFormData = {
    name: string;
    email: string;
    password?: string; // Le mot de passe est optionnel à la mise à jour
    role: Role;
}

type UpdateUserPayload = {
    id: string;
    data: Partial<UserFormData>;
};

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null,
};

// ==================================
// THUNKS ASYNCHRONES
// ==================================

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<SafeUser[]>('/users');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors du chargement des utilisateurs.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const createUser = createAsyncThunk('users/createUser', async (userData: UserFormData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post<SafeUser>('/users', userData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Erreur lors de la création.');
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }: UpdateUserPayload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put<SafeUser>(`/users/${id}`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Erreur lors de la mise à jour.');
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/users/${userId}`);
        return userId;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Erreur lors de la suppression.');
    }
});

// ==================================
// SLICE
// ==================================

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<SafeUser[]>) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Create
            .addCase(createUser.fulfilled, (state, action: PayloadAction<SafeUser>) => {
                state.users.unshift(action.payload); // Ajouter le nouvel utilisateur au début de la liste
            })
            // Update
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<SafeUser>) => {
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter(u => u.id !== action.payload);
            });
    },
});

export default usersSlice.reducer;