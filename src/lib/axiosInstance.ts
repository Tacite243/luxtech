import axios from 'axios';
import { AppStore, RootState } from '@/redux/store';


let store: AppStore;

// Fonction pour injecter le store dans notre instance Axios
export const injectStore = (_store: AppStore) => {
    store = _store;
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // Utilise une variable d'env ou une route relative
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT à chaque requête sortante
axiosInstance.interceptors.request.use(
    (config) => {
        const state: RootState = store.getState();
        const token = state.auth.token; // Récupère le token depuis le state Redux
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;