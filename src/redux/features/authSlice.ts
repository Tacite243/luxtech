import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { z } from 'zod';
import { registerSchema } from '@/lib/validators/auth.validator'; // Réutiliser le schéma d'inscription

// ==================================
// TYPES
// ==================================

// Le type User complet qui sera utilisé dans notre application
export type User = {
  id: string;
  name: string | null;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  // Ajoutez d'autres champs si nécessaire (ex: createdAt)
};

// L'état de notre slice
type AuthState = {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Statut pour nos propres actions (register, updateUser, etc.)
  error: string | null;
};

// Le type pour les données d'inscription
type RegisterData = z.infer<typeof registerSchema>;

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: AuthState = {
  user: null,       // L'utilisateur est initialement inconnu
  status: 'idle',   // Le statut initial est inactif
  error: null,
  token: null,
};

// ==================================
// THUNKS ASYNCHRONES
// ==================================

/**
 * Thunk pour l'inscription d'un nouvel utilisateur.
 * Appelle notre API backend /api/auth/register.
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      return response.data; // Le backend renvoie l'utilisateur créé
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Une erreur est survenue lors de l\'inscription.');
    }
  }
);

/**
 * Thunk pour récupérer les informations de l'utilisateur connecté.
 * Appelle notre API backend /api/auth/me qui est protégée par NextAuth.
 * C'est la source de vérité pour les données de l'utilisateur.
 */
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue('Impossible de récupérer les informations de l\'utilisateur.');
    }
  }
);

// ==================================
// SLICE
// ==================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour vider l'état de l'utilisateur (utilisée après un signOut de NextAuth)
    clearUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    // Action pour définir manuellement l'utilisateur (utile après une connexion OAuth)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Gérer l'inscription (registerUser) ---
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        // Note: L'utilisateur n'est pas connecté automatiquement, il doit se connecter après.
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // --- Gérer la récupération de l'utilisateur (fetchUser) ---
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload; // Mettre à jour notre état avec les données fraîches du backend
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null; // Si on ne peut pas récupérer l'utilisateur, il n'est pas authentifié
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, setUser } = authSlice.actions;
export default authSlice.reducer;