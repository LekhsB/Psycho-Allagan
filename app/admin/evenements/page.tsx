"use client";

import { useState } from "react";
import { 
  FaCalendarAlt, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaUsers, 
  FaSort, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaCheck, 
  FaTimes 
} from "react-icons/fa";
import Link from "next/link";

// Types pour les événements
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  participants: number;
  maxParticipants: number;
  description: string;
  createdBy: string;
}

// Composant de filtre
const FilterBar = ({ 
  onSearch, 
  selectedType, 
  onTypeChange,
  selectedStatus,
  onStatusChange
}: { 
  onSearch: (term: string) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  
  const eventTypes = [
    { value: null, label: "Tous les types" },
    { value: "raid", label: "Raid" },
    { value: "social", label: "Social" },
    { value: "progression", label: "Progression" },
    { value: "competition", label: "Compétition" },
    { value: "training", label: "Entraînement" }
  ];
  
  const eventStatuses = [
    { value: null, label: "Tous les statuts" },
    { value: "upcoming", label: "À venir" },
    { value: "ongoing", label: "En cours" },
    { value: "completed", label: "Terminé" },
    { value: "cancelled", label: "Annulé" }
  ];
  
  return (
    <div className="bg-black/60 border border-gray-800 rounded-lg p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un événement..."
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
        
        <div className="flex gap-2">
          <select
            value={selectedType || ""}
            onChange={(e) => onTypeChange(e.target.value === "" ? null : e.target.value)}
            className="bg-gray-900/50 border border-gray-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
          >
            {eventTypes.map((type) => (
              <option key={type.value || "all"} value={type.value || ""}>
                {type.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus || ""}
            onChange={(e) => onStatusChange(e.target.value === "" ? null : e.target.value)}
            className="bg-gray-900/50 border border-gray-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
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

// Composant du tableau d'événements
const EventsTable = ({ events }: { events: Event[] }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full">À venir</span>;
      case "ongoing":
        return <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full">En cours</span>;
      case "completed":
        return <span className="px-2 py-1 bg-gray-900/30 text-gray-300 text-xs rounded-full">Terminé</span>;
      case "cancelled":
        return <span className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded-full">Annulé</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-black/30">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Événement
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Date & Heure
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Participants
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-black/20 divide-y divide-gray-800">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-900/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-white">{event.title}</div>
                <div className="text-sm text-gray-400">Créé par {event.createdBy}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{event.date}</div>
                <div className="text-xs text-gray-400">{event.time}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-violet-900/30 text-violet-300 text-xs rounded-full">
                  {event.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(event.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FaUsers className="text-gray-400 mr-2" />
                  <span className="text-sm text-white">{event.participants}/{event.maxParticipants}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link 
                    href={`/admin/evenements/${event.id}`} 
                    className="text-blue-400 hover:text-blue-300"
                    title="Voir"
                  >
                    <FaEye />
                  </Link>
                  <Link 
                    href={`/admin/evenements/${event.id}/modifier`} 
                    className="text-yellow-400 hover:text-yellow-300"
                    title="Modifier"
                  >
                    <FaEdit />
                  </Link>
                  <button 
                    className="text-red-400 hover:text-red-300"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                  {event.status === "upcoming" && (
                    <button 
                      className="text-green-400 hover:text-green-300"
                      title="Marquer comme en cours"
                    >
                      <FaCheck />
                    </button>
                  )}
                  {event.status === "upcoming" && (
                    <button 
                      className="text-red-400 hover:text-red-300"
                      title="Annuler"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Page principale de gestion des événements
export default function EventsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Événements simulés
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Raid Hebdomadaire P12S",
      date: "24 mars 2024",
      time: "20:00 - 23:00",
      type: "Raid",
      status: "upcoming",
      participants: 8,
      maxParticipants: 8,
      description: "Progression sur le combat final de Pandaemonium Sadique",
      createdBy: "Lekhslecafeine"
    },
    {
      id: 2,
      title: "Soirée Nightclub Spéciale Masquerade",
      date: "26 mars 2024",
      time: "21:00 - 00:00",
      type: "Social",
      status: "upcoming",
      participants: 32,
      maxParticipants: 50,
      description: "Grande soirée à thème masquée avec concours de costumes",
      createdBy: "Dancer Main"
    },
    {
      id: 3,
      title: "Entraînement Golbez Extrême",
      date: "27 mars 2024",
      time: "19:00 - 21:00",
      type: "Training",
      status: "upcoming",
      participants: 6,
      maxParticipants: 8,
      description: "Session d'entraînement pour les nouveaux membres sur Golbez Extrême",
      createdBy: "Thaliak Duskblade"
    },
    {
      id: 4,
      title: "Tournoi de Triple Triad",
      date: "30 mars 2024",
      time: "19:00 - 22:00",
      type: "Competition",
      status: "upcoming",
      participants: 16,
      maxParticipants: 32,
      description: "Tournoi interne avec lots à gagner pour les finalistes",
      createdBy: "Card Master"
    },
    {
      id: 5,
      title: "Progression The Omega Protocol",
      date: "22 mars 2024",
      time: "20:00 - 23:00",
      type: "Progression",
      status: "completed",
      participants: 8,
      maxParticipants: 8,
      description: "Progression sur TOP Phase 3",
      createdBy: "Asthenia Shinryu"
    },
    {
      id: 6,
      title: "Présentation des nouvelles races",
      date: "15 mars 2024",
      time: "18:00 - 19:00",
      type: "Social",
      status: "cancelled",
      participants: 12,
      maxParticipants: 30,
      description: "Présentation annulée en raison de problèmes techniques",
      createdBy: "Lore Expert"
    }
  ]);
  
  // Filtrage des événements
  const filteredEvents = events.filter(event => {
    // Filtrer par terme de recherche
    const matchesSearch = searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filtrer par type
    const matchesType = selectedType === null || 
      event.type.toLowerCase() === selectedType.toLowerCase();
      
    // Filtrer par statut
    const matchesStatus = selectedStatus === null || 
      event.status === selectedStatus;
      
    return matchesSearch && matchesType && matchesStatus;
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestion des Événements</h1>
          <p className="text-gray-400">Créez, modifiez et suivez les événements de la compagnie</p>
        </div>
        
        <Link
          href="/admin/evenements/creer"
          className="flex items-center px-4 py-2 bg-violet-900/30 hover:bg-violet-900/50 text-white rounded-lg transition-colors"
        >
          <FaPlus className="mr-2" />
          Nouvel événement
        </Link>
      </div>
      
      <FilterBar 
        onSearch={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      <div className="bg-black/60 border border-gray-800 rounded-lg overflow-hidden">
        {filteredEvents.length > 0 ? (
          <EventsTable events={filteredEvents} />
        ) : (
          <div className="p-8 text-center">
            <FaCalendarAlt className="mx-auto text-3xl text-gray-600 mb-3" />
            <h3 className="text-lg font-medium text-white mb-1">Aucun événement trouvé</h3>
            <p className="text-gray-400">Aucun événement ne correspond à vos critères de recherche</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          {filteredEvents.length} événements affichés sur {events.length} au total
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded border border-gray-800 transition-colors">
            Précédent
          </button>
          <button className="px-3 py-1 bg-violet-900/30 hover:bg-violet-900/50 text-white rounded border border-violet-500/30 transition-colors">
            1
          </button>
          <button className="px-3 py-1 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded border border-gray-800 transition-colors">
            2
          </button>
          <button className="px-3 py-1 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded border border-gray-800 transition-colors">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
} 