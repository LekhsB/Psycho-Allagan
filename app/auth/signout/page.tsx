"use client";

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { FaPowerOff } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Arrière-plan cyberpunk */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Lignes néon */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 animate-pulse opacity-70 blur-lg"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 overflow-hidden border-2 border-white/10">
                <Image
                  src="/psycho-allagan-logo.svg"
                  alt="Psycho Allagan"
                  width={80}
                  height={80}
                  className="rounded-full bg-gray-900 p-2"
                />
              </div>
              <div className="absolute -inset-1 rounded-full border border-blue-500/50 animate-spin-slow"></div>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Déconnexion
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </p>
        </div>
        
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-[0_5px_30px_rgba(59,130,246,0.25)] border border-blue-500/20">
          <div className="space-y-6">
            <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full flex items-center justify-center">
              <div className="absolute inset-1 rounded-full border border-blue-500/30 animate-ping opacity-30"></div>
              <FaPowerOff className="text-4xl text-blue-400" />
            </div>
            
            <p className="text-center text-gray-300">
              Vous serez redirigé automatiquement dans <span className="text-blue-400 font-bold">{countdown}</span> secondes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSignOut}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-violet-700 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                Confirmer
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 py-3 px-4 bg-transparent border border-gray-600 text-gray-300 font-medium rounded-md hover:bg-gray-800 transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 