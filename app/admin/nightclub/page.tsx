"use client";

import { useState } from "react";
import { 
  FaCalendarAlt, 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaDoorOpen, 
  FaMusic, 
  FaGlassMartiniAlt, 
  FaStar, 
  FaUsers
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Types pour les soirées
interface NightclubEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  theme: string;
  description: string;
  poster: string;
  dj: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  attendees: number;
  capacity: number;
  specialFeatures?: string[];
}

// Composant de filtre
const FilterBar = ({ 
  onSearch, 
  selectedStatus, 
  onStatusChange 
}: { 
  onSearch: (term: string) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  
  const eventStatuses = [
    { value: null, label: "Toutes les soirées" },
    { value: "upcoming", label: "À venir" },
    { value: "ongoing", label: "En cours" },
    { value: "completed", label: "Terminées" },
    { value: "cancelled", label: "Annulées" }
  ];
  
  return (
    <div className="bg-black/60 border border-gray-800 rounded-lg p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une soirée..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-violet-400 hover:text-violet-300"
            >
              Rechercher
            </button>
          </div>
        </div>
        
        <div>
          <select
            value={selectedStatus || ""}
            onChange={(e) => onStatusChange(e.target.value === "" ? null : e.target.value)}
            className="w-full md:w-auto bg-gray-900/50 border border-gray-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
          >
            {eventStatuses.map((status) => (
              <option key={status.value || "all"} value={status.value || ""}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// Composant carte de soirée
const NightclubEventCard = ({ 
  event,
  onEdit,
  onDelete
}: { 
  event: NightclubEvent;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full">À venir</span>;
      case "ongoing":
        return <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full">En cours</span>;
      case "completed":
        return <span className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full">Terminée</span>;
      case "cancelled":
        return <span className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded-full">Annulée</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-black/60 border border-gray-800 rounded-lg overflow-hidden hover:border-violet-500/20 transition-all duration-300">
      <div className="relative h-40">
        <Image 
          src={event.poster} 
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <FaCalendarAlt className="text-violet-400" />
            <span className="text-sm text-gray-300">{event.date} à {event.time}</span>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          {getStatusBadge(event.status)}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <FaMusic className="text-violet-400" />
            <span className="text-sm text-gray-300">DJ: {event.dj}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUsers className="text-violet-400" />
            <span className="text-sm text-gray-300">{event.attendees}/{event.capacity}</span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="text-sm text-gray-400 mb-2 line-clamp-2">{event.description}</div>
          <div className="text-sm font-medium text-violet-400">Thème: {event.theme}</div>
        </div>
        
        {event.specialFeatures && event.specialFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {event.specialFeatures.map((feature, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-900/50 rounded text-xs text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-800">
          <Link 
            href={`/admin/nightclub/${event.id}`} 
            className="px-3 py-1 bg-violet-900/30 hover:bg-violet-900/50 text-white rounded text-sm transition-colors flex items-center"
          >
            <FaEye className="mr-1" /> Détails
          </Link>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(event.id)}
              className="p-1.5 bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-300 rounded transition-colors"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => onDelete(event.id)}
              className="p-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded transition-colors"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page principale de gestion du Nightclub
export default function NightclubManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Soirées simulées
  const [events, setEvents] = useState<NightclubEvent[]>([
    {
      id: 1,
      title: "Nuit Étoilée",
      date: "25/04/2023",
      time: "21:00",
      theme: "Cosmos & Constellations",
      description: "Une soirée sous les étoiles d'Eorzea. Venez découvrir l'univers cosmique avec des cocktails spéciaux et une décoration stellaire.",
      poster: "/images/nightclub/cosmic-night.jpg",
      dj: "DJ Scion",
      status: "upcoming",
      attendees: 45,
      capacity: 100,
      specialFeatures: ["Bar à cocktails", "Spectacle de danse", "Concours de costumes"]
    },
    {
      id: 2,
      title: "Bal Masqué",
      date: "18/04/2023",
      time: "20:00",
      theme: "Masques & Mystères",
      description: "Une soirée élégante où l'identité reste cachée derrière des masques. Ambiance mystérieuse et romantique garantie.",
      poster: "/images/nightclub/masked-ball.jpg",
      dj: "Lady Amberfall",
      status: "completed",
      attendees: 78,
      capacity: 80,
      specialFeatures: ["Distribution de masques", "Danseurs professionnels"]
    },
    {
      id: 3,
      title: "Nuit des Élémentaires",
      date: "30/04/2023",
      time: "21:30",
      theme: "Feu, Eau, Air & Terre",
      description: "Célébrez les éléments primaires avec une décoration thématique et des effets visuels spectaculaires.",
      poster: "/images/nightclub/elemental-night.jpg",
      dj: "DJ Ifrit",
      status: "upcoming",
      attendees: 25,
      capacity: 90,
      specialFeatures: ["Effets pyrotechniques", "Cocktails élémentaires"]
    },
    {
      id: 4,
      title: "Soirée Néon",
      date: "10/04/2023",
      time: "22:00",
      theme: "Cyberpunk & Futurisme",
      description: "Plongez dans l'atmosphère cyberpunk avec des lumières néon, une musique électronique et une ambiance futuriste.",
      poster: "/images/nightclub/neon-night.jpg",
      dj: "Cyberwave",
      status: "completed",
      attendees: 95,
      capacity: 100,
      specialFeatures: ["Peintures fluorescentes", "Accessoires lumineux"]
    },
    {
      id: 5,
      title: "Festival Eorzéen",
      date: "05/05/2023",
      time: "19:00",
      theme: "Traditions & Folklore",
      description: "Une célébration des traditions d'Eorzea, avec musique folklorique et costumes traditionnels.",
      poster: "/images/nightclub/eorzean-festival.jpg",
      dj: "Barde Miqo'te",
      status: "upcoming",
      attendees: 30,
      capacity: 120,
      specialFeatures: ["Nourriture traditionnelle", "Danses folkloriques"]
    },
    {
      id: 6,
      title: "Nuit Enchantée",
      date: "12/04/2023",
      time: "21:00",
      theme: "Magie & Enchantements",
      description: "Une soirée magique avec des illusions, des tours et une ambiance féerique.",
      poster: "/images/nightclub/enchanted-night.jpg",
      dj: "Wizard Beat",
      status: "cancelled",
      attendees: 0,
      capacity: 80,
      specialFeatures: ["Spectacles d'illusion", "Potions magiques"]
    }
  ]);
  
  // Gérer l'édition d'un événement
  const handleEditEvent = (id: number) => {
    // Simuler l'ouverture d'un modal d'édition
    alert(`Édition de l'événement ${id}`);
  };
  
  // Gérer la suppression d'un événement
  const handleDeleteEvent = (id: number) => {
    // Simuler une confirmation de suppression
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };
  
  // Filtrage des événements
  const filteredEvents = events.filter(event => {
    // Filtrer par terme de recherche
    const matchesSearch = searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.dj.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filtrer par statut
    const matchesStatus = selectedStatus === null || 
      event.status === selectedStatus;
      
    return matchesSearch && matchesStatus;
  });
  
  // Statistiques
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === "upcoming").length;
  const completedEvents = events.filter(e => e.status === "completed").length;
  const cancelledEvents = events.filter(e => e.status === "cancelled").length;
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestion du Nightclub</h1>
          <p className="text-gray-400">Planifiez et gérez les soirées et événements du nightclub</p>
        </div>
        
        <Link
          href="/admin/nightclub/nouveau"
          className="flex items-center px-4 py-2 bg-violet-900/30 hover:bg-violet-900/50 text-white rounded-lg transition-colors"
        >
          <FaPlus className="mr-2" />
          Nouvelle soirée
        </Link>
      </div>
      
      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalEvents}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center">
              <FaCalendarAlt className="text-violet-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">À venir</p>
              <h3 className="text-2xl font-bold text-white mt-1">{upcomingEvents}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center">
              <FaDoorOpen className="text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Terminées</p>
              <h3 className="text-2xl font-bold text-white mt-1">{completedEvents}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
              <FaStar className="text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-red-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Annulées</p>
              <h3 className="text-2xl font-bold text-white mt-1">{cancelledEvents}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center">
              <FaCalendarAlt className="text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-green-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Participants</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalAttendees}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center">
              <FaUsers className="text-green-400" />
            </div>
          </div>
        </div>
      </div>
      
      <FilterBar 
        onSearch={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <NightclubEventCard
              key={event.id}
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      ) : (
        <div className="bg-black/60 border border-gray-800 rounded-lg p-8 text-center">
          <FaCalendarAlt className="mx-auto text-3xl text-gray-600 mb-3" />
          <h3 className="text-lg font-medium text-white mb-1">Aucune soirée trouvée</h3>
          <p className="text-gray-400">Aucune soirée ne correspond à vos critères de recherche</p>
        </div>
      )}
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          {filteredEvents.length} soirées affichées sur {events.length} au total
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded border border-gray-800 transition-colors">
            Précédent
          </button>
          <button className="px-3 py-1 bg-violet-900/30 hover:bg-violet-900/50 text-white rounded border border-violet-500/30 transition-colors">
            1
          </button>
          <button className="px-3 py-1 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded border border-gray-800 transition-colors">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
} 