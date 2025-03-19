"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaCheck, FaChevronDown } from 'react-icons/fa';

type EventType = 'raid' | 'social' | 'rp' | 'pve';

interface FilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  types: EventType[];
  timeFrame: 'all' | 'upcoming' | 'past';
  participation: 'all' | 'registered' | 'notRegistered';
}

const EventsFilters = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    timeFrame: 'upcoming',
    participation: 'all',
  });
  
  const [expandedSection, setExpandedSection] = useState<string | null>('types');
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const toggleType = (type: EventType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    const newFilters = { ...filters, types: newTypes };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const setTimeFrame = (timeFrame: 'all' | 'upcoming' | 'past') => {
    const newFilters = { ...filters, timeFrame };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const setParticipation = (participation: 'all' | 'registered' | 'notRegistered') => {
    const newFilters = { ...filters, participation };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const resetFilters = () => {
    const defaultFilters: FilterState = {
      types: [],
      timeFrame: 'upcoming',
      participation: 'all',
    };
    
    setFilters(defaultFilters);
    
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };
  
  // Données pour les types d'événements
  const eventTypes: { id: EventType; label: string; color: string }[] = [
    { id: 'raid', label: 'Raids', color: 'bg-red-600' },
    { id: 'social', label: 'Social', color: 'bg-blue-600' },
    { id: 'rp', label: 'Roleplay', color: 'bg-purple-600' },
    { id: 'pve', label: 'PvE', color: 'bg-green-600' },
  ];
  
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-violet-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Filtres</h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
        >
          Réinitialiser
        </button>
      </div>
      
      {/* Types d'événements */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-left text-white hover:text-violet-300 transition-colors"
          onClick={() => toggleSection('types')}
        >
          <span className="font-medium">Types d'événements</span>
          <FaChevronDown className={`transform transition-transform ${expandedSection === 'types' ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSection === 'types' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 space-y-2"
          >
            {eventTypes.map((type) => (
              <div key={type.id} className="flex items-center">
                <button
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                    filters.types.includes(type.id)
                      ? `${type.color} text-white`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => toggleType(type.id)}
                >
                  <span>{type.label}</span>
                  {filters.types.includes(type.id) && (
                    <FaCheck className="text-white" />
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Période */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-left text-white hover:text-violet-300 transition-colors"
          onClick={() => toggleSection('timeFrame')}
        >
          <span className="font-medium">Période</span>
          <FaChevronDown className={`transform transition-transform ${expandedSection === 'timeFrame' ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSection === 'timeFrame' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center">
              <button
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  filters.timeFrame === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setTimeFrame('all')}
              >
                <span>Tous</span>
                {filters.timeFrame === 'all' && (
                  <FaCheck className="text-white" />
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <button
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  filters.timeFrame === 'upcoming'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setTimeFrame('upcoming')}
              >
                <span>À venir</span>
                {filters.timeFrame === 'upcoming' && (
                  <FaCheck className="text-white" />
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <button
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  filters.timeFrame === 'past'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setTimeFrame('past')}
              >
                <span>Passés</span>
                {filters.timeFrame === 'past' && (
                  <FaCheck className="text-white" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Participation */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-left text-white hover:text-violet-300 transition-colors"
          onClick={() => toggleSection('participation')}
        >
          <span className="font-medium">Participation</span>
          <FaChevronDown className={`transform transition-transform ${expandedSection === 'participation' ? 'rotate-180' : ''}`} />
        </button>
        
        {expandedSection === 'participation' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center">
              <button
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  filters.participation === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setParticipation('all')}
              >
                <span>Tous</span>
                {filters.participation === 'all' && (
                  <FaCheck className="text-white" />
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <button
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  filters.participation === 'registered'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setParticipation('registered')}
              >
                <span>Inscrit(e)</span>
                {filters.participation === 'registered' && (
                  <FaCheck className="text-white" />
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <button
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  filters.participation === 'notRegistered'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setParticipation('notRegistered')}
              >
                <span>Non inscrit(e)</span>
                {filters.participation === 'notRegistered' && (
                  <FaCheck className="text-white" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Résumé des filtres */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Filtres appliqués</h4>
        
        <div className="flex flex-wrap gap-2">
          {filters.types.length > 0 ? (
            filters.types.map((type) => {
              const typeInfo = eventTypes.find(t => t.id === type);
              return (
                <div key={type} className={`px-2 py-1 rounded-full text-xs text-white ${typeInfo?.color}`}>
                  {typeInfo?.label}
                </div>
              );
            })
          ) : (
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">
              Tous les types
            </div>
          )}
          
          <div className={`px-2 py-1 rounded-full text-xs ${
            filters.timeFrame !== 'all' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}>
            {filters.timeFrame === 'all' ? 'Toutes dates' : 
             filters.timeFrame === 'upcoming' ? 'À venir' : 'Passés'}
          </div>
          
          {filters.participation !== 'all' && (
            <div className="px-2 py-1 rounded-full text-xs bg-violet-600 text-white">
              {filters.participation === 'registered' ? 'Inscrit(e)' : 'Non inscrit(e)'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsFilters; 