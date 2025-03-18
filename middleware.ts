import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// Middleware protégé par NextAuth
export default withAuth(
  // Fonction qui s'exécute après vérification de l'authentification
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      // Fonction qui détermine si la route doit être protégée
      authorized: ({ token }) => !!token
    },
    // Pages publiques (pas besoin d'authentification)
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    }
  }
);

// Routes qui nécessitent une authentification
export const config = {
  matcher: [
    '/profile/:path*',
    '/events/my-events/:path*',
    '/admin/:path*',
  ]
}; 