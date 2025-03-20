"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaUser, FaDiscord, FaEnvelope, FaCheck, FaShieldAlt, FaStar, FaBriefcase, FaHistory } from 'react-icons/fa';
import { GiTwoHandedSword, GiMagicSwirl, GiHealing, GiArrowsShield } from 'react-icons/gi';

interface UserProfileDisplayProps {
  showDetails?: boolean;
}

// Représentation des classes avec leurs icônes
const getClassIcon = (iconName: string) => {
  switch (iconName) {
    case "GiTwoHandedSword": return <GiTwoHandedSword className="text-red-500" />;
    case "GiMagicSwirl": return <GiMagicSwirl className="text-blue-500" />;
    case "GiHealing": return <GiHealing className="text-green-500" />;
    case "GiArrowsShield": return <GiArrowsShield className="text-yellow-500" />;
    default: return <GiTwoHandedSword className="text-white" />;
  }
};

// Interface pour les données de profil personnalisées
interface CustomProfileData {
  race: string;
  level: number;
  mainClass: {
    name: string;
    icon: string;
    level: number;
    specialization?: string;
  };
  secondaryClass: {
    name: string;
    icon: string;
    level: number;
    specialization?: string;
  };
  responsibilities: string[];
  lore: string;
  highlights: string[];
}

export default function UserProfileDisplay({ showDetails = true }: UserProfileDisplayProps) {
  const { data: session, status } = useSession();
  const [isCopied, setIsCopied] = useState(false);
  const [profileData, setProfileData] = useState<CustomProfileData | null>(null);

  // Simuler le chargement des données du profil
  useEffect(() => {
    if (status === "authenticated") {
      // Simuler un appel API pour récupérer les données personnalisées
      setTimeout(() => {
        setProfileData({
          race: "Miqo'te",
          level: 90,
          mainClass: {
            name: "BLM",
            icon: "GiMagicSwirl",
            level: 90,
            specialization: "Magie temporelle"
          },
          secondaryClass: {
            name: "SMN",
            icon: "GiMagicSwirl",
            level: 85
          },
          responsibilities: ["Raid leader", "Events"],
          lore: "Un aventurier venant de loin, à la recherche de défis et de nouvelles expériences.",
          highlights: ["A vaincu Bahamut Ultimate", "Triple Legend"]
        });
      }, 500);
    }
  }, [status]);

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

        {profileData && (
          <div className="mt-2 text-violet-200 text-sm">
            <span>{profileData.race}</span> · <span>Niveau {profileData.level}</span>
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
            
            {profileData && (
              <>
                {/* Classes */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4 text-left">Classes</h3>
                  
                  <div className="space-y-3">
                    {/* Classe principale */}
                    <div className="flex items-center p-3 bg-gray-900/50 rounded-lg overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center mr-3">
                        {getClassIcon(profileData.mainClass.icon)}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-violet-300">{profileData.mainClass.name}</h4>
                          <span className="text-xs text-gray-400">Niveau {profileData.mainClass.level}</span>
                        </div>
                        {profileData.mainClass.specialization && (
                          <p className="text-xs text-gray-400 mt-1">{profileData.mainClass.specialization}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Classe secondaire */}
                    <div className="flex items-center p-3 bg-gray-900/50 rounded-lg overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mr-3">
                        {getClassIcon(profileData.secondaryClass.icon)}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-blue-300">{profileData.secondaryClass.name}</h4>
                          <span className="text-xs text-gray-400">Niveau {profileData.secondaryClass.level}</span>
                        </div>
                        {profileData.secondaryClass.specialization && (
                          <p className="text-xs text-gray-400 mt-1">{profileData.secondaryClass.specialization}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Responsabilités */}
                {profileData.responsibilities?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 text-left flex items-center">
                      <FaBriefcase className="mr-2 text-purple-400" />
                      Responsabilités
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.responsibilities.map((responsibility, index) => (
                        <div key={index} className="px-3 py-1 bg-gray-900/70 border border-violet-500/20 rounded-full text-sm text-gray-300">
                          {responsibility}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Histoire */}
                {profileData.lore && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 text-left flex items-center">
                      <FaHistory className="mr-2 text-blue-400" />
                      Histoire
                    </h3>
                    <p className="text-sm text-gray-300 text-left">
                      {profileData.lore}
                    </p>
                  </div>
                )}
                
                {/* Points forts */}
                {profileData.highlights?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 text-left flex items-center">
                      <FaStar className="mr-2 text-yellow-400" />
                      Moments marquants
                    </h3>
                    <ul className="space-y-2 text-left">
                      {profileData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-300">{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 