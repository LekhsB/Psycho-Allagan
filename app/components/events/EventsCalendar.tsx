"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaUsers, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

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
}

// Fonction utilitaire pour générer le calendrier du mois
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Ajustement pour commencer le lundi

  const days = [];
  
  // Jours du mois précédent pour compléter la première semaine
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    });
  }
  
  // Jours du mois actuel
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Jours du mois suivant pour compléter la dernière semaine
  const remainingDays = 42 - days.length; // 6 semaines * 7 jours = 42 cases au total
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return days;
};

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
    description: 'Progression sur P10S et P11S. Venez avec vos consommables et materia.'
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
];

const EventsCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const days = generateCalendarDays(currentYear, currentMonth);
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedEvent(null);
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedEvent(null);
  };
  
  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };
  
  // Obtenir les événements pour une date spécifique
  const getEventsForDate = (date: Date): Event[] => {
    return mockEvents.filter(event => 
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
    );
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
  
  return (
    <div className="w-full">
      {/* En-tête du calendrier */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-md hover:bg-violet-900/30"
          >
            <FaChevronLeft className="text-violet-400" />
          </button>
          <h2 className="text-xl font-bold text-white">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-md hover:bg-violet-900/30"
          >
            <FaChevronRight className="text-violet-400" />
          </button>
        </div>
        <button 
          onClick={goToToday}
          className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
        >
          <FaCalendarAlt />
          <span>Aujourd'hui</span>
        </button>
      </div>
      
      {/* Noms des jours */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-sm font-semibold text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const eventsForDay = getEventsForDate(day.date);
          const isToday = day.date.toDateString() === today.toDateString();
          const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`
                p-1 aspect-square rounded-md relative cursor-pointer border
                ${day.isCurrentMonth ? 'bg-black/40' : 'bg-black/20 opacity-50'}
                ${isToday ? 'border-violet-500' : 'border-transparent'}
                ${isSelected ? 'ring-2 ring-violet-500 ring-opacity-70' : ''}
                hover:border-violet-500/40 transition-all duration-200
              `}
              onClick={() => {
                setSelectedDate(day.date);
                setSelectedEvent(null);
              }}
            >
              <div className={`
                text-right text-sm p-1
                ${isToday ? 'font-bold text-violet-400' : day.isCurrentMonth ? 'text-white' : 'text-gray-600'}
              `}>
                {day.date.getDate()}
              </div>
              
              {/* Événements du jour (maximum 3 affichés) */}
              <div className="absolute bottom-1 left-1 right-1 flex flex-col gap-1">
                {eventsForDay.slice(0, 2).map((event, idx) => (
                  <div 
                    key={idx}
                    className={`text-xs truncate px-1 py-0.5 rounded ${getEventColor(event.type)} text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                
                {eventsForDay.length > 2 && (
                  <div className="text-xs text-right text-gray-400">
                    +{eventsForDay.length - 2} plus
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Détails de la date sélectionnée */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-black/40 rounded-md border border-violet-500/20">
          <h3 className="text-lg font-bold text-white mb-2">
            {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
          
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-md border-l-4 ${getEventColor(event.type).replace('bg-', 'border-')} bg-black/40 cursor-pointer`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <span className="font-semibold text-white">{event.title}</span>
                    </div>
                    <span className="text-sm text-gray-400">{event.time}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                    <FaUsers className="text-gray-500" />
                    <span>
                      {event.participants}{event.maxParticipants ? `/${event.maxParticipants}` : ''}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Aucun événement prévu pour cette date.</p>
          )}
        </div>
      )}
      
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
                  {getEventIcon(selectedEvent.type)}
                  <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  {selectedEvent.date.getDate()} {monthNames[selectedEvent.date.getMonth()]} {selectedEvent.date.getFullYear()} à {selectedEvent.time}
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
                <button className="flex-1 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors">
                  S'inscrire
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

export default EventsCalendar; 