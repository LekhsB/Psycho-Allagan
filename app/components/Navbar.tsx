"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

// Type déclaration pour l'utilisateur avec le rôle
interface UserWithRole {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

// Composant pour un lien de navigation
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-300 hover:text-white relative group transition-colors duration-300"
    >
      <span className={`relative z-10 ${isActive ? 'text-white' : ''}`}>{children}</span>
      <span className={`absolute inset-0 w-full h-full translate-y-1 rounded transition-all duration-300 ${isActive ? 'bg-violet-600/20' : 'bg-violet-600/0 group-hover:bg-violet-600/20'}`}></span>
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
};

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Détecter le défilement pour ajouter des effets
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Fonction de connexion avec redirection vers la page actuelle
  const handleSignIn = () => {
    signIn("discord", { callbackUrl: pathname });
  };
  
  const isLoggedIn = status === "authenticated" && session !== null;
  const user = session?.user as UserWithRole | undefined;
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-md border-b border-violet-500/30 shadow-[0_2px_10px_rgba(147,51,234,0.2)]" 
        : "bg-black/40 backdrop-blur-sm"
    }`}>
      {/* Ligne néon supérieure */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-2 overflow-hidden rounded-full bg-gradient-to-br from-violet-600 to-blue-600 p-0.5">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-red-600 opacity-70 animate-pulse"></div>
                <Image
                  src="/psycho-allagan-logo.svg"
                  alt="Psycho Allagan"
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-900"
                />
              </div>
              <span className="text-white text-lg font-bold relative">
                <span className="relative z-10">Psycho Allagan</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>
          
          {/* Menu de navigation pour desktop */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <NavLink href="/">Accueil</NavLink>
              <NavLink href="/members">Membres</NavLink>
              <NavLink href="/tutorials">Tutoriels</NavLink>
              <NavLink href="/nightclub">Nightclub</NavLink>
              <NavLink href="/galerie">Galerie</NavLink>
              {!isLoggedIn && (
                <NavLink href="/recrutement">Recrutement</NavLink>
              )}
              {isLoggedIn && (
                <NavLink href="/evenements">Événements</NavLink>
              )}
              {/* Garder uniquement les liens vers les pages existantes */}
              {/* D'autres liens seront ajoutés ici au fur et à mesure de la création des pages */}
              
              {/* Profil utilisateur */}
              <div className="ml-4 relative" ref={userMenuRef}>
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      onMouseEnter={() => setUserMenuOpen(true)}
                      className="flex items-center text-gray-300 hover:text-white relative group px-4 py-2"
                      aria-expanded={userMenuOpen}
                      aria-haspopup="true"
                    >
                      <div className="relative z-10 flex items-center">
                        {user?.image ? (
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-red-500 animate-pulse opacity-0 group-hover:opacity-70 blur-sm transition-opacity duration-300"></div>
                            <Image
                              src={user.image}
                              alt={user.name || "Avatar"}
                              width={32}
                              height={32}
                              className="rounded-full border border-violet-500/50"
                            />
                          </div>
                        ) : (
                          <div className="relative w-8 h-8 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-red-500 opacity-0 group-hover:opacity-70 blur-sm transition-opacity duration-300"></div>
                            <FaUser className="text-xl relative z-10" />
                          </div>
                        )}
                        <span className="ml-2">{user?.name || "Utilisateur"}</span>
                        <FaChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
                    </button>
                    
                    <div 
                      className={`absolute right-0 mt-1 w-56 rounded-md shadow-lg overflow-hidden z-10 border border-violet-500/30 backdrop-blur-md transition-all duration-200 origin-top-right ${
                        userMenuOpen 
                          ? 'transform opacity-100 scale-100' 
                          : 'transform opacity-0 scale-95 pointer-events-none'
                      }`}
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      {/* Flèche décorative en haut du menu */}
                      <div className="absolute top-0 right-6 -mt-2 w-4 h-4 bg-black/80 border-t border-l border-violet-500/30 transform rotate-45"></div>
                      
                      <div className="bg-black/80 backdrop-blur-md shadow-[0_4px_20px_rgba(147,51,234,0.3)]">
                        {/* En-tête du menu avec avatar et nom */}
                        <div className="px-4 py-3 border-b border-violet-500/20">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              {user?.image ? (
                                <Image
                                  src={user.image}
                                  alt={user.name || "Avatar"}
                                  width={40}
                                  height={40}
                                  className="rounded-full border border-violet-500/30"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-violet-900/30 flex items-center justify-center">
                                  <FaUser className="text-violet-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">{user?.name}</p>
                              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Menu items */}
                        <Link 
                          href="/profile" 
                          className="block px-4 py-3 text-gray-300 hover:bg-violet-900/30 hover:text-white transition-colors duration-200 group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center mr-3 group-hover:bg-violet-500/20 transition-colors">
                              <FaUser className="text-violet-400" />
                            </div>
                            <span>Profil</span>
                          </div>
                          <div className="mt-1 ml-11 text-xs text-gray-500">Voir et gérer votre profil</div>
                        </Link>
                        
                        <div className="border-t border-violet-500/20 my-1"></div>
                        
                        <button 
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut({ callbackUrl: pathname });
                          }}
                          className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-violet-900/30 hover:text-white transition-colors duration-200 group"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                              <FaSignOutAlt className="text-red-400" />
                            </div>
                            <span>Déconnexion</span>
                          </div>
                          <div className="mt-1 ml-11 text-xs text-gray-500">Se déconnecter du site</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="flex items-center px-5 py-2 relative group overflow-hidden rounded"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-80 blur-md transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center text-white font-medium">
                      <FaSignInAlt className="mr-2" />
                      Connexion
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white relative w-10 h-10 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/0 to-blue-500/0 hover:from-violet-500/20 hover:to-blue-500/20 transition-all duration-300"></div>
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenu du menu mobile */}
      <div 
        className={`md:hidden bg-black/90 backdrop-blur-md border-violet-500/30 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen 
            ? "max-h-screen border-t border-b shadow-[0_5px_20px_rgba(147,51,234,0.3)]" 
            : "max-h-0 border-t-0 border-b-0"
        }`}
      >
        <div className="px-2 py-3 space-y-1">
          <Link 
            href="/"
            className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          
          <Link 
            href="/members"
            className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Membres
          </Link>
          
          <Link 
            href="/tutorials"
            className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tutoriels
          </Link>
          
          <Link 
            href="/nightclub"
            className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nightclub
          </Link>
          
          <Link 
            href="/galerie"
            className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Galerie
          </Link>
          
          {!isLoggedIn && (
            <Link 
              href="/recrutement"
              className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recrutement
            </Link>
          )}
          
          {isLoggedIn && (
            <Link 
              href="/evenements"
              className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Événements
            </Link>
          )}
          
          <div className="border-t border-violet-500/20 my-2"></div>
          
          {isLoggedIn ? (
            <>
              {/* Info utilisateur en mode mobile */}
              <div className="px-4 py-3 flex items-center space-x-3 bg-violet-900/10 rounded-md mb-2">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Avatar"}
                    width={36}
                    height={36}
                    className="rounded-full border border-violet-500/50"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-violet-900/30 flex items-center justify-center">
                    <FaUser className="text-violet-400" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
              </div>
              
              <Link 
                href="/profile"
                className="block px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser className="inline mr-2 text-violet-400" />
                Profil
              </Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: pathname });
                }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-violet-900/20 hover:text-white rounded-md transition-colors duration-200"
              >
                <FaSignOutAlt className="inline mr-2 text-red-400" />
                Déconnexion
              </button>
            </>
          ) : (
            <div className="px-3 py-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignIn();
                }}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium rounded-md hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              >
                <FaSignInAlt className="mr-2" />
                Connexion avec Discord
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 