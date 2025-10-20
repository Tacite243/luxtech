"use client";

import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import AuthManager from "./AuthManager";
import { Toaster } from 'react-hot-toast';
import GlobalLoader from "./GlobalLoader";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        {/* AuthManager est à l'intérieur des deux, il peut donc utiliser leurs hooks */}
        <AuthManager />

        <GlobalLoader />

        {/* Le Toaster pour les notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {children}
      </StoreProvider>
    </AuthProvider>
  );
};
