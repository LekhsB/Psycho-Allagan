"use client";

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface EventType {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  djs: string[];
  category: 'regular' | 'special' | 'private';
  theme: {
    name: string;
    color: string;
  };
  ticketsAvailable: boolean;
  image: string;
}

// Données des événements
const EVENTS_DATA: EventType[] = [
  {
    id: 'neon-dreams-mai',
    title: 'Neon Dreams',
    date: '23/05/2023',
    time: '22:00 - 03:00',
    location: 'Salle principale',
    description: "Plongez dans l'esthétique cyberpunk où néons et lasers transforment notre club en métropole futuriste. DJ Quantum vous emmènera dans un voyage musical synthwave avec ses transitions fluides et ses sets progressifs.",
    djs: ['DJ Quantum', 'KV-X'],
    category: 'regular',
    theme: {
      name: 'Cyberpunk',
      color: 'from-blue-500 to-pink-600'
    },
    ticketsAvailable: true,
    image: '/images/events/neon-dreams.jpg'
  },
  {
    id: 'crystal-mirage-mai',
    title: 'Crystal Mirage',
    date: '30/05/2023',
    time: '22:00 - 03:00',
    location: 'Salle principale',
    description: "Une célébration de la magie élémentaire d'Éorzéa, où les cristaux et leurs pouvoirs mystiques inspirent notre décoration et notre ambiance. Crystal Resonance vous transportera avec ses mélodies éthérées.",
    djs: ['Crystal Resonance', 'Aetherial Pulse'],
    category: 'regular',
    theme: {
      name: 'Elemental',
      color: 'from-cyan-400 to-purple-500'
    },
    ticketsAvailable: true,
    image: '/images/events/crystal-mirage.jpg'
  },
  {
    id: 'void-whispers-juin',
    title: 'Void Whispers',
    date: '07/06/2023',
    time: '22:00 - 03:00',
    location: 'Salle principale',
    description: "Les profondeurs mystérieuses du néant s'invitent dans notre club pour une atmosphère sombre et envoûtante. Void Entity crée des paysages sonores hypnotiques qui vous transporteront dans une autre dimension.",
    djs: ['Void Entity', 'Shadow Weaver'],
    category: 'regular',
    theme: {
      name: 'Void',
      color: 'from-purple-900 to-pink-700'
    },
    ticketsAvailable: true,
    image: '/images/events/void-whispers.jpg'
  },
  {
    id: 'tech-rituals-juin',
    title: 'Tech Rituals',
    date: '14/06/2023',
    time: '22:00 - 03:00',
    location: 'Salle principale',
    description: "Fusion parfaite entre technologie ancestrale allagoise et rituels mystiques créant une ambiance à la fois tribale et futuriste. DJ Quantum présentera ses dernières créations alliant techno rituelle et beats tribaux.",
    djs: ['DJ Quantum', 'Ancient Circuit'],
    category: 'regular',
    theme: {
      name: 'Tech Ritual',
      color: 'from-amber-500 to-red-600'
    },
    ticketsAvailable: false,
    image: '/images/events/tech-rituals.jpg'
  },
  {
    id: 'moogle-mania-juin',
    title: 'Moogle Mania',
    date: '21/06/2023',
    time: '22:00 - 03:00',
    location: 'Salle principale',
    description: "Une soirée kawaii et colorée inspirée par les adorables mogs! Moogle Beats vous fera danser toute la nuit sur des rythmes J-Pop et Future Bass dans une atmosphère joyeuse et festive.",
    djs: ['Moogle Beats', 'Kupo King'],
    category: 'special',
    theme: {
      name: 'Kawaii',
      color: 'from-pink-400 to-purple-400'
    },
    ticketsAvailable: true,
    image: '/images/events/moogle-mania.jpg'
  },
  {
    id: 'astral-projection-juin',
    title: 'Astral Projection',
    date: '28/06/2023',
    time: '22:00 - 03:00',
    location: 'Salle principale',
    description: "Une exploration sonore des astres et de l'espace, avec des projections célestes et des ambiances spatiales. Une soirée méditative et transcendante pour voyager vers d'autres mondes.",
    djs: ['Stellar Drift', 'Celestial Body'],
    category: 'regular',
    theme: {
      name: 'Cosmic',
      color: 'from-indigo-600 to-purple-800'
    },
    ticketsAvailable: true,
    image: '/images/events/astral-projection.jpg'
  }
];

const formatDate = (dateString: string): string => {
  const [day, month] = dateString.split('/');
  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  return `${day} ${monthNames[parseInt(month) - 1]}`;
};

const getDayOfWeek = (dateString: string): string => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  return days[date.getDay()];
};

const EventCalendar: FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(4); // Mai = 4
  
  const openEventDetails = (event: EventType) => {
    setSelectedEvent(event);
  };
  
  const closeEventDetails = () => {
    setSelectedEvent(null);
  };
  
  return (
    <section id="events" className="py-20 bg-gradient-to-b from-black to-indigo-950/20 relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute top-40 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Calendrier des </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Événements
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Découvrez notre programmation de soirées thématiques et réservez votre place pour vivre une expérience unique au Nébula Nightclub.
          </p>
        </div>
        
        {/* Navigation du calendrier */}
        <div className="mb-10 flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <FaCalendarAlt className="text-purple-400" />
            <span>Événements à venir</span>
          </h3>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentMonthIndex(prev => Math.max(prev - 1, 4))}
              disabled={currentMonthIndex <= 4}
              className="w-10 h-10 rounded-full bg-black/60 border border-purple-800/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentMonthIndex(prev => Math.min(prev + 1, 7))}
              disabled={currentMonthIndex >= 7}
              className="w-10 h-10 rounded-full bg-black/60 border border-purple-800/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        
        {/* Liste des événements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {EVENTS_DATA
            .filter(event => parseInt(event.date.split('/')[1]) === currentMonthIndex + 1)
            .map((event) => (
              <div 
                key={event.id}
                onClick={() => openEventDetails(event)}
                className="bg-black/60 backdrop-blur-sm border border-purple-800/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] cursor-pointer group"
              >
                <div className="p-6 flex">
                  {/* Date */}
                  <div className="mr-5 flex flex-col items-center justify-center min-w-[80px]">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${event.theme.color} flex flex-col items-center justify-center text-white shadow-lg transform group-hover:scale-105 transition-transform`}>
                      <span className="text-sm font-medium">{getDayOfWeek(event.date)}</span>
                      <span className="text-2xl font-bold">{formatDate(event.date).split(' ')[0]}</span>
                      <span className="text-xs">{formatDate(event.date).split(' ')[1]}</span>
                    </div>
                    
                    {event.category === 'special' && (
                      <span className="mt-2 text-xs px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                        Spécial
                      </span>
                    )}
                  </div>
                  
                  {/* Détails */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {event.title}
                      </h3>
                      
                      {event.ticketsAvailable ? (
                        <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full">
                          Disponible
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-900/30 text-red-400 text-xs rounded-full">
                          Complet
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-y-2">
                      <div className="flex items-center gap-1 text-gray-400 text-xs mr-4">
                        <FaClock className="text-purple-400" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-400 text-xs mr-4">
                        <FaMapMarkerAlt className="text-purple-400" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <FaTicketAlt className="text-purple-400" />
                        <span>{event.ticketsAvailable ? 'Réservations ouvertes' : 'Plus de place'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        {/* Actions */}
        <div className="text-center mt-10">
          <div className="inline-flex flex-wrap gap-4 bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-2">
            <Link 
              href="#"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Tous les événements
            </Link>
            <Link 
              href="#reservation"
              className="px-5 py-2 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Réservations
            </Link>
            <Link 
              href="#djs"
              className="px-5 py-2 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Découvrir nos DJs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar; 