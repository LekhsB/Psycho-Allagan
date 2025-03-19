"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaUsers, FaFilter, FaSort, FaSearch, FaBell, FaCheck } from 'react-icons/fa';

// Types pour les événements
type EventType = 'raid' | 'social' | 'rp' | 'pve';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: EventType;
  location: string;
  participants: number;
  maxParticipants?: number;
  description: string;
  isRegistered?: boolean;
}

// Données d'exemple pour les événements
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Raid Savage P9S-P12S',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    time: '21:00',
    type: 'raid',
    location: 'Pandaemonium',
    participants: 6,
    maxParticipants: 8,
    description: 'Progression sur P10S et P11S. Venez avec vos consommables et materia.',
    isRegistered: true
  },
  {
    id: '2',
    title: 'Soirée RP - Taverne des Aventuriers',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    time: '20:00',
    type: 'rp',
    location: 'La Noscea - Limsalominsa',
    participants: 12,
    description: 'Soirée détente et roleplay à la taverne. Tous les aventuriers sont bienvenus.'
  },
  {
    id: '3',
    title: 'Donjon Extreme - The Lunar Subterrane',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
    time: '19:30',
    type: 'pve',
    location: 'The Lunar Subterrane',
    participants: 3,
    maxParticipants: 4,
    description: 'Farm de monture et équipement. Minimum iLvl 640 requis.'
  },
  {
    id: '4',
    title: 'Craft & Gather - Préparation Patch 7.1',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
    time: '18:00',
    type: 'social',
    location: 'Old Sharlayan',
    participants: 8,
    description: 'Session collective de craft et récolte pour préparer le nouveau contenu. Partage de matériaux et aide aux nouveaux.'
  },
  {
    id: '5',
    title: 'Exploration - Nouvelle zone',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 8),
    time: '20:30',
    type: 'pve',
    location: 'Zone inconnue',
    participants: 2,
    maxParticipants: 8,
    description: 'Découverte de la nouvelle zone et déverrouillage des aether currents.'
  },
];

const eventTypeLabels: Record<EventType, string> = {
  'raid': 'Raid',
  'social': 'Social',
  'rp': 'Roleplay',
  'pve': 'PvE'
};

// Obtenir le label d'un type d'événement
const getEventTypeLabel = (type: EventType): string => {
  return eventTypeLabels[type] || 'Autre';
};

// Obtenir la couleur en fonction du type d'événement
const getEventColor = (type: EventType) => {
  switch (type) {
    case 'raid': return 'bg-red-600';
    case 'social': return 'bg-blue-600';
    case 'rp': return 'bg-purple-600';
    case 'pve': return 'bg-green-600';
    default: return 'bg-gray-600';
  }
};

// Obtenir l'icône en fonction du type d'événement
const getEventIcon = (type: EventType) => {
  switch (type) {
    case 'raid': return <span className="text-red-400">🗡️</span>;
    case 'social': return <span className="text-blue-400">🎉</span>;
    case 'rp': return <span className="text-purple-400">🎭</span>;
    case 'pve': return <span className="text-green-400">👥</span>;
    default: return <span className="text-gray-400">📅</span>;
  }
};

const EventsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Filtrer les événements en fonction des critères
  const filteredEvents = mockEvents.filter(event => {
    // Filtrer par recherche
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !event.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrer par type
    if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
      return false;
    }
    
    return true;
  });
  
  // Trier les événements
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date') {
      const comparison = a.date.getTime() - b.date.getTime();
      return sortDirection === 'asc' ? comparison : -comparison;
    } else {
      const comparison = a.title.localeCompare(b.title);
      return sortDirection === 'asc' ? comparison : -comparison;
    }
  });
  
  // Formatage de la date en français
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };
  
  // Toggle pour le type d'événement dans les filtres
  const toggleType = (type: EventType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  // Changer le tri
  const handleSortChange = (sortType: 'date' | 'name') => {
    if (sortBy === sortType) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortDirection('asc');
    }
  };
  
  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSortBy('date');
    setSortDirection('asc');
  };
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un événement..."
              className="w-full py-2 pl-10 pr-3 bg-black/50 border border-violet-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${showFilters ? 'bg-violet-600' : 'bg-gray-800'} hover:bg-violet-700 transition-colors`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="text-white" />
              <span className="text-white text-sm hidden sm:inline">Filtres</span>
            </button>
            
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={() => handleSortChange('date')}
            >
              <FaSort className="text-white" />
              <span className="text-white text-sm hidden sm:inline">
                {sortBy === 'date' 
                  ? `Date ${sortDirection === 'asc' ? '↑' : '↓'}`
                  : 'Date'}
              </span>
            </button>
            
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={() => handleSortChange('name')}
            >
              <FaSort className="text-white" />
              <span className="text-white text-sm hidden sm:inline">
                {sortBy === 'name' 
                  ? `Nom ${sortDirection === 'asc' ? '↑' : '↓'}`
                  : 'Nom'}
              </span>
            </button>
          </div>
        </div>
        
        {/* Section de filtres */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-900/50 p-4 rounded-md mb-4"
          >
            <h3 className="text-white font-medium mb-3">Types d'événements</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(eventTypeLabels).map(([type, label]) => (
                <button
                  key={type}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTypes.includes(type as EventType)
                      ? getEventColor(type as EventType)
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => toggleType(type as EventType)}
                >
                  {getEventIcon(type as EventType)} {label}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                className="text-violet-400 hover:text-violet-300 text-sm"
                onClick={resetFilters}
              >
                Réinitialiser les filtres
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Liste des événements */}
      <div className="space-y-4">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 rounded-md p-4 border border-gray-800 hover:border-violet-500/30 transition-colors cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`px-2 py-0.5 rounded text-xs text-white ${getEventColor(event.type)}`}>
                      {getEventTypeLabel(event.type)}
                    </div>
                    {event.isRegistered && (
                      <div className="px-2 py-0.5 rounded text-xs bg-violet-600 text-white flex items-center gap-1">
                        <FaCheck size={10} /> Inscrit
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-violet-500" />
                      <span>{formatDate(event.date)} · {event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-violet-500" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-violet-500" />
                      <span>
                        {event.participants}
                        {event.maxParticipants ? `/${event.maxParticipants}` : ''}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                </div>
                
                <div className="ml-4 flex flex-col gap-2">
                  <button className={`p-2 rounded-full ${event.isRegistered ? 'bg-violet-600' : 'bg-gray-700'} hover:bg-violet-700 transition-colors`}>
                    {event.isRegistered ? <FaCheck className="text-white" /> : <FaUsers className="text-white" />}
                  </button>
                  <button className="p-2 rounded-full bg-gray-700 hover:bg-violet-700 transition-colors">
                    <FaBell className="text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="inline-block p-3 rounded-full bg-gray-800 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-400">Essayez de modifier vos critères de recherche ou de créer un nouvel événement.</p>
          </div>
        )}
      </div>
      
      {/* Modal détaillé d'un événement */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gray-900 rounded-lg max-w-lg w-full p-6 border border-violet-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`px-2 py-0.5 rounded text-xs text-white ${getEventColor(selectedEvent.type)}`}>
                    {getEventTypeLabel(selectedEvent.type)}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  {formatDate(selectedEvent.date)} à {selectedEvent.time}
                </p>
              </div>
              <button 
                className="text-gray-500 hover:text-white"
                onClick={() => setSelectedEvent(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <FaClock className="text-violet-400" />
                  <span className="text-gray-300">{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-violet-400" />
                  <span className="text-gray-300">{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-violet-400" />
                  <span className="text-gray-300">
                    {selectedEvent.participants}{selectedEvent.maxParticipants ? `/${selectedEvent.maxParticipants}` : ''}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-violet-400 mb-2">Description</h4>
                <p className="text-gray-300 text-sm">{selectedEvent.description}</p>
              </div>
              
              <div className="border-t border-gray-700 pt-4 flex gap-3">
                <button className={`flex-1 py-2 ${selectedEvent.isRegistered ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-700'} text-white rounded-md transition-colors flex items-center justify-center gap-2`}>
                  {selectedEvent.isRegistered ? (
                    <>
                      <FaCheck /> Inscrit
                    </>
                  ) : (
                    "S'inscrire"
                  )}
                </button>
                <button className="py-2 px-4 bg-transparent border border-violet-500 text-violet-400 hover:bg-violet-900/20 rounded-md transition-colors">
                  Rappel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EventsList; 