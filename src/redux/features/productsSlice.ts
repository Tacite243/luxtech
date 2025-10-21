import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
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
// THUNKS ASYNCHRONES
// ==================================

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Product[]>('/products');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.error || 'Erreur lors du chargement des produits.');
    }
    return rejectWithValue('Une erreur réseau est survenue.');
  }
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData: ProductOutputValues, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<Product>('/products', productData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.error || 'Erreur lors de la création du produit.');
    }
    return rejectWithValue('Une erreur réseau est survenue.');
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }: UpdateProductPayload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put<Product>(`/products/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.error || 'Erreur lors de la mise à jour du produit.');
    }
    return rejectWithValue('Une erreur réseau est survenue.');
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: string, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/products/${productId}`);
    return productId;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.error || 'Erreur lors de la suppression du produit.');
    }
    return rejectWithValue('Une erreur réseau est survenue.');
  }
});

// ==================================
// SLICE (VERSION CORRIGÉE)
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

      // Create Product (Mise à jour optimiste)
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })

      // Update Product (Mise à jour optimiste)
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      
      // Delete Product (Mise à jour optimiste)
      // Il ne doit y avoir qu'UN SEUL .addCase pour cette action.
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;