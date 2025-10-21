import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './features/contactSlice'
import authReducer from './features/authSlice';
import uiReducer from './features/uiSlice';
import productsReducer from './features/productsSlice';



export const makeStore = () => {
    return configureStore({
        reducer: {
            contact: contactReducer,
            auth: authReducer,
            ui: uiReducer,
            products: productsReducer,
        },
        // Activer les Redux DevTools uniquement en développement
        devTools: process.env.NODE_ENV !== 'production',
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
