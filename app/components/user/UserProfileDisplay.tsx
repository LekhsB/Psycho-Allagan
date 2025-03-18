"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaUser, FaDiscord, FaEnvelope, FaCheck, FaShieldAlt } from 'react-icons/fa';

interface UserProfileDisplayProps {
  showDetails?: boolean;
}

export default function UserProfileDisplay({ showDetails = true }: UserProfileDisplayProps) {
  const { data: session, status } = useSession();
  const [isCopied, setIsCopied] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-r-transparent border-b-violet-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status !== "authenticated" || !session) {
    return (
      <div className="text-center p-6 bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20">
        <div className="flex justify-center">
          <div className="relative w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            <FaUser className="text-2xl text-gray-400" />
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-200">Non connecté</h3>
        <p className="mt-2 text-sm text-gray-400">Connectez-vous pour voir votre profil</p>
      </div>
    );
  }

  const user = session.user;
  
  const copyToClipboard = (text: string | undefined | null) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 overflow-hidden shadow-[0_5px_20px_rgba(147,51,234,0.2)]">
      {/* En-tête du profil avec image et nom */}
      <div className="relative">
        {/* Bannière avec effet de glitch/cyberpunk */}
        <div className="h-32 bg-gradient-to-r from-violet-900 via-blue-900 to-violet-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-70"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
        </div>
        
        {/* Avatar positionné à cheval sur la bannière */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-violet-500 opacity-70 animate-pulse blur-sm"></div>
            <div className="relative h-24 w-24 rounded-full border-4 border-black overflow-hidden">
              {user.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || "Avatar"} 
                  width={96} 
                  height={96}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <FaUser className="text-3xl text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Informations de l'utilisateur */}
      <div className="pt-14 pb-6 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">{user.name || "Utilisateur"}</h2>
        
        {user.role && (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-violet-600/30 to-blue-600/30 text-violet-200 mb-3">
            <FaShieldAlt className="mr-1 text-violet-400" />
            {user.role === "admin" ? "Administrateur" : "Membre"}
          </div>
        )}

        {showDetails && (
          <div className="mt-6 space-y-3">
            {user.email && (
              <div className="group flex items-center py-2 px-3 bg-gray-900/50 rounded-lg relative overflow-hidden hover:bg-gray-900/70 transition-colors cursor-pointer" onClick={() => copyToClipboard(user.email)}>
                <FaEnvelope className="text-blue-400 text-lg mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-gray-200 truncate">{user.email}</p>
                </div>
                <div className={`absolute right-2 transition-opacity duration-300 ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
                  <FaCheck className="text-green-400" />
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            )}
            
            <div className="group flex items-center py-2 px-3 bg-gray-900/50 rounded-lg relative overflow-hidden hover:bg-gray-900/70 transition-colors">
              <FaDiscord className="text-[#5865F2] text-lg mr-3" />
              <div className="text-left">
                <p className="text-xs text-gray-400">Discord</p>
                <p className="text-sm text-gray-200">Connecté</p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500 group-hover:w-full transition-all duration-300"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 