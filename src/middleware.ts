import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;
        const { pathname } = req.nextUrl;

        // --- RÈGLE GÉNÉRIQUE POUR LES ROUTES D'ADMINISTRATION API ---
        // On regroupe toutes les routes qui nécessitent un rôle ADMIN ou SUPERADMIN
        const adminApiRoutes = [
            '/api/products',
            '/api/projects',
            '/api/stats',
            '/api/quotes',
            '/api/public',
            '/api/orders'
        ];

        if (adminApiRoutes.some(route => pathname.startsWith(route))) {
            if (token?.role !== 'ADMIN' && token?.role !== 'SUPERADMIN') {
                return new NextResponse('Accès non autorisé', { status: 403 });
            }
        }

        // --- RÈGLE SPÉCIFIQUE POUR LA GESTION DES UTILISATEURS (SUPERADMIN) ---
        if (pathname.startsWith('/api/users')) {
            if (token?.role !== 'SUPERADMIN') {
                return new NextResponse('Accès refusé. Seul un Super Administrateur peut gérer les utilisateurs.', { status: 403 });
            }
        }

        // --- RÈGLE POUR L'ACCÈS AU DASHBOARD (FRONTEND) ---
        if (pathname.startsWith('/dashboard')) {
            if (token?.role !== 'ADMIN' && token?.role !== 'SUPERADMIN') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

// Appliquer le middleware à des routes spécifiques
export const config = {
    matcher: [
        /* Protéger toutes les routes du dashboard et les API admin */
        '/dashboard/:path*',
        '/api/products/:path*',
        '/api/projects/:path*',
        '/api/stats/:path*',
        '/api/quotes/:path*',
        '/api/users/:path*',
        '/api/orders/:path*',
        '/api/public/:path*',
        '/me',
    ],
};