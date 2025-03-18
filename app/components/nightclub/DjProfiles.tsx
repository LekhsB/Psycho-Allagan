"use client";

import { FC, useState } from 'react';
import Image from 'next/image';
import { FaInstagram, FaSoundcloud, FaSpotify, FaHeadphones, FaCalendarAlt, FaMusic } from 'react-icons/fa';

interface DJ {
  id: string;
  name: string;
  alias: string;
  bio: string;
  specialties: string[];
  image: string;
  performances: {
    event: string;
    date: string;
  }[];
  socialLinks: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
  };
  featuredTracks: {
    title: string;
    link: string;
  }[];
  isResident: boolean;
}

// Données des DJs
const DJS_DATA: DJ[] = [
  {
    id: 'dj-quantum',
    name: "Raha'jin Tia",
    alias: 'DJ Quantum',
    bio: "Pionnier de la scène cyberpunk d'Ul'dah, DJ Quantum est connu pour ses transitions fluides et ses sets progressifs qui emmènent le public dans un voyage sonore futuriste. Sa fusion de synthwave et de techno moderne crée une atmosphère immersive parfaite pour nos soirées Neon Dreams.",
    specialties: ['Synthwave', 'Progressive House', 'Techno'],
    image: '/images/djs/dj-quantum.jpg',
    performances: [
      {
        event: 'Neon Dreams',
        date: '23 Mai'
      },
      {
        event: 'Tech Rituals',
        date: '14 Juin'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/djquantum',
      soundcloud: 'https://soundcloud.com/djquantum',
      spotify: 'https://open.spotify.com/artist/djquantum'
    },
    featuredTracks: [
      {
        title: 'Neon Pulse',
        link: 'https://soundcloud.com/djquantum/neonpulse'
      },
      {
        title: 'Digital Dreams',
        link: 'https://soundcloud.com/djquantum/digitaldreams'
      }
    ],
    isResident: true
  },
  {
    id: 'void-entity',
    name: "Y'shtola Rhul",
    alias: 'Void Entity',
    bio: "Spécialiste de l'ambient et de la dark techno, Void Entity crée des paysages sonores hypnotiques et mystérieux qui transportent l'auditeur dans les profondeurs du néant. Son approche minimaliste et ses textures sonores profondes sont parfaites pour nos soirées Void Whispers.",
    specialties: ['Dark Ambient', 'Experimental', 'Ritual Techno'],
    image: '/images/djs/void-entity.jpg',
    performances: [
      {
        event: 'Void Whispers',
        date: '7 Juin'
      }
    ],
    socialLinks: {
      soundcloud: 'https://soundcloud.com/voidentity',
      spotify: 'https://open.spotify.com/artist/voidentity'
    },
    featuredTracks: [
      {
        title: 'Echoes of Darkness',
        link: 'https://soundcloud.com/voidentity/echoesofdarkness'
      },
      {
        title: 'Whispers Between Worlds',
        link: 'https://soundcloud.com/voidentity/whispersbetweenworlds'
      }
    ],
    isResident: true
  },
  {
    id: 'crystal-resonance',
    name: "Krile Baldesion",
    alias: 'Crystal Resonance',
    bio: "Compositrice et productrice talentueuse, Crystal Resonance mélange des mélodies éthérées à des rythmes électroniques pour créer une musique qui évoque la magie des cristaux élémentaires. Ses sets oscillent entre moments méditatifs et explosions d'énergie pure.",
    specialties: ['Melodic Techno', 'Deep House', 'Ambient'],
    image: '/images/djs/crystal-resonance.jpg',
    performances: [
      {
        event: 'Crystal Mirage',
        date: '30 Mai'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/crystalresonance',
      soundcloud: 'https://soundcloud.com/crystalresonance',
    },
    featuredTracks: [
      {
        title: 'Elemental Harmony',
        link: 'https://soundcloud.com/crystalresonance/elementalharmony'
      },
      {
        title: 'Prism Reflections',
        link: 'https://soundcloud.com/crystalresonance/prismreflections'
      }
    ],
    isResident: true
  },
  {
    id: 'moogle-beats',
    name: "Tataru Taru",
    alias: 'Moogle Beats',
    bio: "Apportant joie et énergie contagieuse, Moogle Beats est spécialisée dans les genres musicaux kawaii et upbeat. Ses sets colorés et pleins de vie, parsemés de samples inspirés des mogs, transforment instantanément la piste de danse en un festival de bonne humeur.",
    specialties: ['J-Pop', 'Future Bass', 'Happy Hardcore'],
    image: '/images/djs/moogle-beats.jpg',
    performances: [
      {
        event: 'Moogle Mania',
        date: '21 Juin'
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/mooglebeats',
      spotify: 'https://open.spotify.com/artist/mooglebeats'
    },
    featuredTracks: [
      {
        title: 'Kupo Euphoria',
        link: 'https://soundcloud.com/mooglebeats/kupoeuphoria'
      },
      {
        title: 'Pom Pom Paradise',
        link: 'https://soundcloud.com/mooglebeats/pompomparadise'
      }
    ],
    isResident: false
  }
];

const DjProfiles: FC = () => {
  const [selectedDj, setSelectedDj] = useState<DJ | null>(null);
  
  const openDjProfile = (dj: DJ) => {
    setSelectedDj(dj);
  };
  
  const closeDjProfile = () => {
    setSelectedDj(null);
  };
  
  return (
    <section id="djs" className="py-20 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-waves-pattern opacity-5"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute bottom-40 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Nos </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DJs
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Découvrez les artistes talentueux qui créent l'ambiance sonore unique de Nébula Nightclub.
            Chaque DJ apporte son style et sa sensibilité pour des expériences musicales variées.
          </p>
        </div>
        
        {/* Profils des DJs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DJS_DATA.map((dj) => (
            <div
              key={dj.id}
              onClick={() => openDjProfile(dj)}
              className="relative group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-b from-black/60 to-black/10 relative">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/80"></div>
                
                {/* Contenu */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between transition-all duration-300">
                  <div>
                    {dj.isResident && (
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600/70 to-pink-600/70 text-white text-xs rounded-full mb-3">
                        Résident
                      </span>
                    )}
                    <h3 className="text-white text-xl font-bold mb-1">{dj.alias}</h3>
                    <p className="text-gray-300 text-sm opacity-80">{dj.name}</p>
                  </div>
                  
                  <div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-white mb-2">Spécialités:</p>
                      <div className="flex flex-wrap gap-2">
                        {dj.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-purple-900/30 text-purple-300 rounded-md text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FaCalendarAlt />
                      <span>Prochain set: {dj.performances[0]?.event} ({dj.performances[0]?.date})</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
                  Voir le profil
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal de profil DJ */}
        {selectedDj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-black/90 border border-purple-800/30 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                {/* Header avec image de fond (placeholder) */}
                <div className="h-48 bg-gradient-to-r from-purple-900 to-pink-900 relative">
                  <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-10 mix-blend-overlay"></div>
                </div>
                
                {/* Bouton fermeture */}
                <button
                  onClick={closeDjProfile}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  ✕
                </button>
                
                {/* Avatar */}
                <div className="absolute left-8 -bottom-16 w-32 h-32 rounded-xl overflow-hidden border-4 border-black bg-gradient-to-br from-purple-600 to-pink-600">
                  <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                    {selectedDj.alias.charAt(0)}
                  </div>
                </div>
              </div>
              
              <div className="pt-20 pb-8 px-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedDj.alias}</h2>
                  <p className="text-gray-400">{selectedDj.name}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-white mb-4">Biographie</h3>
                    <p className="text-gray-300 mb-6">{selectedDj.bio}</p>
                    
                    <h3 className="text-xl font-semibold text-white mb-4">Titres représentatifs</h3>
                    <div className="space-y-3 mb-6">
                      {selectedDj.featuredTracks.map((track, index) => (
                        <div key={index} className="flex items-center gap-3 bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                            <FaMusic />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{track.title}</h4>
                            <a
                              href={track.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
                            >
                              Écouter sur SoundCloud
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FaHeadphones className="text-purple-400" />
                        Spécialités
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDj.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1.5 bg-purple-900/30 text-purple-300 rounded-lg text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FaCalendarAlt className="text-purple-400" />
                        Prochaines performances
                      </h3>
                      <div className="space-y-3">
                        {selectedDj.performances.map((performance, index) => (
                          <div key={index} className="border-b border-purple-800/20 last:border-0 pb-3 last:pb-0">
                            <h4 className="text-white font-medium">{performance.event}</h4>
                            <p className="text-gray-400 text-sm">{performance.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h3>
                      <div className="flex gap-4">
                        {selectedDj.socialLinks.instagram && (
                          <a
                            href={selectedDj.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white hover:from-purple-500 hover:to-pink-500 transition-colors"
                          >
                            <FaInstagram />
                          </a>
                        )}
                        {selectedDj.socialLinks.soundcloud && (
                          <a
                            href={selectedDj.socialLinks.soundcloud}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white hover:from-orange-500 hover:to-red-500 transition-colors"
                          >
                            <FaSoundcloud />
                          </a>
                        )}
                        {selectedDj.socialLinks.spotify && (
                          <a
                            href={selectedDj.socialLinks.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center text-white hover:from-green-500 hover:to-green-400 transition-colors"
                          >
                            <FaSpotify />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DjProfiles; 