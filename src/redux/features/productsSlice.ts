import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { Product } from '@prisma/client';
import { ProductOutputValues } from '@/components/ProductForm';

// ==================================
// TYPES
// ==================================

type ProductsState = {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Type pour l'argument de l'action de mise à jour
type UpdateProductPayload = {
  id: string;
  data: Partial<ProductOutputValues>;
};

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

// ==================================
// THUNKS ASYNCHRONES (NOS APPELS API)
// ==================================

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Product[]>('/products');
    return response.data;
  } catch (error: any) {
    return rejectWithValue('Erreur lors du chargement des produits.');
  }
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData: ProductOutputValues, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<Product>('/products', productData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue('Erreur lors de la création du produit.');
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }: UpdateProductPayload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put<Product>(`/products/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue('Erreur lors de la mise à jour du produit.');
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: string, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/products/${productId}`);
    return productId; // Renvoyer l'ID pour le supprimer de l'état
  } catch (error: any) {
    return rejectWithValue('Erreur lors de la suppression du produit.');
  }
});


// ==================================
// SLICE
// ==================================

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        // Supprimer le produit de la liste sans avoir à re-fetch
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      // Pour create et update, on pourrait aussi mettre à jour l'état directement,
      // mais re-fetch est souvent plus simple et garantit la cohérence.
      // Le composant s'en chargera.
  },
});

export default productsSlice.reducer;