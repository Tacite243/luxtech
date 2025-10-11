import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice'




export const makeStore = () => {
    return configureStore({
        reducer: {
            contact: contactReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];