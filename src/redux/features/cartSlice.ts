import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@prisma/client';
import toast from 'react-hot-toast';

export interface CartItem extends Product {
    quantity: number;
}

type CartState = {
    items: CartItem[];
};

// Fonction pour charger l'état depuis le localStorage
const loadState = (): CartItem[] => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const initialState: CartState = {
    items: typeof window !== 'undefined' ? loadState() : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Action pour ajouter un produit au panier
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                // Si l'article existe déjà, augmenter la quantité
                existingItem.quantity++;
            } else {
                // Sinon, l'ajouter au panier
                state.items.push({ ...product, quantity: 1 });
            }
            toast.success(`${product.name} a été ajouté au panier !`);
        },

        // Action pour mettre à jour la quantité d'un article
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === productId);
            if (itemToUpdate) {
                if (quantity > 0) {
                    itemToUpdate.quantity = quantity;
                } else {
                    // Si la quantité est 0 ou moins, supprimer l'article
                    state.items = state.items.filter(item => item.id !== productId);
                }
            }
        },

        // Action pour supprimer un article du panier
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
            toast.error("Article retiré du panier.");
        },

        // Action pour vider complètement le panier
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;