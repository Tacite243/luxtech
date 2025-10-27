import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // 1. Importer la configuration

// 2. Créer le handler
const handler = NextAuth(authOptions);

// 3. Exporter le handler pour les méthodes GET et POST
export { handler as GET, handler as POST };