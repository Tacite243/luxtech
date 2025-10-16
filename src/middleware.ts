import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;
        const { pathname } = req.nextUrl;

        // Protéger les routes API d'administration
        if (pathname.startsWith('/api/products') || pathname.startsWith('/api/public')) {
            if (token?.role !== 'ADMIN' && token?.role !== 'SUPERADMIN') {
                return new NextResponse('Accès non autorisé', { status: 403 });
            }
        }

        // Protéger les routes API de super-administration
        if (pathname.startsWith('/api/users')) {
            if (token?.role !== 'SUPERADMIN') {
                return new NextResponse('Accès non autorisé', { status: 403 });
            }
        }

        // Protéger le backoffice (si vous en avez un)
        if (pathname.startsWith('/admin')) {
            if (token?.role !== 'ADMIN' && token?.role !== 'SUPERADMIN') {
                return new NextResponse('Accès non autorisé', { status: 403 });
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // L'utilisateur doit être connecté pour accéder à toute route matchée
        },
    }
);

// Appliquer le middleware à des routes spécifiques
export const config = {
    matcher: [
        '/api/products/:path*',
        '/api/users/:path*',
        '/api/orders/:path*',
        '/api/public/:path*',
        '/admin/:path*', // Dashboard admin
        '/me', // Espace membre
    ],
};