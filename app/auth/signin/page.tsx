"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Récupérer l'URL de redirection depuis les paramètres de recherche ou utiliser '/' par défaut
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn('discord', { callbackUrl });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Arrière-plan cyberpunk */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/50 to-black"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Lignes néon */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 via-blue-600 to-red-600 animate-pulse opacity-70 blur-xl"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-red-500 overflow-hidden border-2 border-white/10">
                <Image
                  src="/psycho-allagan-logo.svg"
                  alt="Psycho Allagan"
                  width={96}
                  height={96}
                  className="rounded-full bg-gray-900 p-4"
                />
              </div>
              <div className="absolute -inset-1 rounded-full border border-violet-500/50 animate-spin-slow"></div>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Connexion à <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-red-500">Psycho Allagan</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Connectez-vous avec votre compte Discord pour accéder à l'espace membre
          </p>
        </div>
        
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-[0_5px_30px_rgba(147,51,234,0.25)] border border-violet-500/20">
          <div className="space-y-6">
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 rounded-md text-white font-medium transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#5865F2] group-hover:bg-[#4752C4] transition-colors duration-300"></div>
              <div className="absolute inset-0 bg-[#5865F2] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
              <span className="relative flex items-center justify-center gap-3 font-semibold">
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FaDiscord className="text-2xl" />
                )}
                {isLoading ? "Connexion en cours..." : "Continuer avec Discord"}
              </span>
            </button>
            
            <div className="text-center text-sm">
              <p className="text-gray-400">
                En vous connectant, vous acceptez nos{' '}
                <Link href="/conditions" className="text-violet-400 hover:text-violet-300">
                  conditions d'utilisation
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la page précédente
          </button>
        </div>
      </div>
    </div>
  );
} 