"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [errorType, setErrorType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');
    
    switch (error) {
      case 'AccessDenied':
        setErrorType('Accès refusé');
        setErrorMessage('Vous n\'avez pas autorisé l\'accès à votre compte Discord.');
        break;
      case 'Configuration':
        setErrorType('Erreur de configuration');
        setErrorMessage('Il y a un problème avec la configuration de l\'authentification.');
        break;
      case 'Verification':
        setErrorType('Vérification échouée');
        setErrorMessage('Impossible de vérifier votre identité. Veuillez réessayer.');
        break;
      case 'OAuthSignin':
        setErrorType('Erreur de connexion OAuth');
        setErrorMessage('Erreur lors de la connexion avec Discord.');
        break;
      case 'OAuthCallback':
        setErrorType('Erreur de retour OAuth');
        setErrorMessage('Erreur lors du retour de Discord.');
        break;
      case 'OAuthAccountNotLinked':
        setErrorType('Compte non lié');
        setErrorMessage('Vous vous êtes connecté avec un compte Discord différent.');
        break;
      default:
        setErrorType('Erreur d\'authentification');
        setErrorMessage('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Arrière-plan cyberpunk */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Lignes néon */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 animate-pulse opacity-70 blur-lg"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-500 to-red-700 overflow-hidden border-2 border-red-500/30">
                <div className="w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-full border border-red-500/50 animate-ping opacity-30"></div>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            {errorType}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {errorMessage}
          </p>
        </div>
        
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-[0_5px_30px_rgba(239,68,68,0.25)] border border-red-500/20">
          <div className="space-y-6 flex flex-col items-center">
            <p className="text-gray-300 text-center">
              Veuillez réessayer ou contacter l'administrateur si le problème persiste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link 
                href="/auth/signin"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-center font-medium rounded-md hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              >
                Réessayer
              </Link>
              
              <Link 
                href="/"
                className="flex-1 py-3 px-4 bg-transparent border border-gray-600 text-gray-300 text-center font-medium rounded-md hover:bg-gray-800 transition-all duration-300"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 