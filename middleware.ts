import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// Middleware protégé par NextAuth
export default withAuth(
  // Fonction qui s'exécute après vérification de l'authentification
  function middleware(req) {
    // Check if the user is authenticated and if they have a token
    const token = req.nextauth.token;
    
    // If user is not authenticated and tries to access protected routes, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    
    // Pour les routes spécifiques qui nécessitent des rôles particuliers
    const path = req.nextUrl.pathname;
    
    // Vérifier les permissions pour la page roster
    if (path.startsWith('/roster') && token.role !== 'admin' && token.role !== 'roster') {
      // Rediriger vers la page d'accueil si l'utilisateur n'a pas les permissions nécessaires
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      // Fonction qui détermine si la route doit être protégée
      authorized: ({ token }) => !!token
    },
    // Pages publiques (pas besoin d'authentification)
    pages: {
      signIn: '/auth/login',
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
    '/evenements/:path*',
    '/strategies/:path*',
    '/roster/:path*',
  ]
}; 