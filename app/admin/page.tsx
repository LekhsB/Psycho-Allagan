"use client";

import { useState, useEffect } from "react";
import { FaUsers, FaCalendarAlt, FaGlassCheers, FaUserPlus, FaChartLine, FaBell, FaEye, FaCheckCircle } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import Link from "next/link";

// Composant de carte statistique
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: string;
  changeType?: "increase" | "decrease";
}

const StatCard = ({ title, value, icon, color, change, changeType }: StatCardProps) => (
  <div className="bg-black/60 border border-gray-800 rounded-lg p-5 hover:border-violet-500/30 transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-white text-2xl font-bold mt-1">{value}</h3>
        {change && (
          <p className={`text-xs mt-1 ${changeType === "increase" ? "text-green-400" : "text-red-400"}`}>
            {changeType === "increase" ? "↑" : "↓"} {change} depuis le mois dernier
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

// Composant pour les événements à venir
interface EventItem {
  id: number;
  title: string;
  date: string;
  type: string;
  participants: number;
}

const UpcomingEvents = ({ events }: { events: EventItem[] }) => (
  <div className="bg-black/60 border border-gray-800 rounded-lg p-5 hover:border-violet-500/30 transition-all duration-300">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-white font-bold">Événements à venir</h3>
      <Link 
        href="/admin/evenements" 
        className="text-violet-400 text-sm hover:text-violet-300"
      >
        Voir tout
      </Link>
    </div>
    
    <div className="space-y-3">
      {events.map((event) => (
        <div key={event.id} className="border-b border-gray-800 pb-3 last:border-0">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-medium">{event.title}</h4>
              <p className="text-gray-400 text-sm mt-1">{event.date}</p>
            </div>
            <span className="px-2 py-1 bg-violet-900/30 text-violet-300 text-xs rounded-full">
              {event.type}
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <FaUsers className="text-gray-500 mr-1" />
            <span className="text-gray-400 text-sm">{event.participants} participants</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Composant pour les activités récentes
interface ActivityItem {
  id: number;
  action: string;
  user: string;
  time: string;
  icon: React.ReactNode;
  iconColor: string;
}

const RecentActivity = ({ activities }: { activities: ActivityItem[] }) => (
  <div className="bg-black/60 border border-gray-800 rounded-lg p-5 hover:border-violet-500/30 transition-all duration-300">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-white font-bold">Activités récentes</h3>
      <Link 
        href="/admin/parametres" 
        className="text-violet-400 text-sm hover:text-violet-300"
      >
        Journal
      </Link>
    </div>
    
    <div className="space-y-3">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className={`w-8 h-8 rounded-full ${activity.iconColor} flex-shrink-0 flex items-center justify-center mr-3`}>
            {activity.icon}
          </div>
          <div className="flex-1">
            <p className="text-white text-sm">{activity.action}</p>
            <div className="flex items-center mt-1">
              <span className="text-gray-400 text-xs">{activity.user}</span>
              <span className="mx-2 text-gray-600">•</span>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Page principale du tableau de bord
export default function AdminDashboard() {
  // État pour les données (simulées)
  const [statistics, setStatistics] = useState({
    totalMembers: 253,
    activeEvents: 12,
    activeRaids: 4,
    newRegistrations: 18
  });
  
  const [events, setEvents] = useState<EventItem[]>([
    { id: 1, title: "Raid Hebdomadaire", date: "24 mars 2024 - 20:00", type: "Raid", participants: 8 },
    { id: 2, title: "Soirée Nightclub Spéciale", date: "26 mars 2024 - 21:00", type: "Social", participants: 32 },
    { id: 3, title: "Pandaemonium (Sadique)", date: "28 mars 2024 - 20:30", type: "Progression", participants: 8 },
    { id: 4, title: "Tournoi de Triple Triad", date: "30 mars 2024 - 19:00", type: "Compétition", participants: 16 }
  ]);
  
  const [activities, setActivities] = useState<ActivityItem[]>([
    { 
      id: 1, 
      action: "Nouveau membre validé: Sylvia Valkyrie", 
      user: "Lekhslecafeine", 
      time: "Il y a 25 minutes",
      icon: <FaUserPlus className="text-white" />,
      iconColor: "bg-green-600/30"
    },
    { 
      id: 2, 
      action: "Événement créé: Raid Fatal DSR", 
      user: "Asthenia Shinryu", 
      time: "Il y a 2 heures",
      icon: <FaCalendarAlt className="text-white" />,
      iconColor: "bg-blue-600/30"
    },
    { 
      id: 3, 
      action: "Progression de raid mise à jour: 75% P12S", 
      user: "Thaliak Duskblade", 
      time: "Il y a 5 heures",
      icon: <GiCrossedSwords className="text-white" />,
      iconColor: "bg-red-600/30"
    },
    { 
      id: 4, 
      action: "Soirée Nightclub planifiée pour le 26/03", 
      user: "Dancer Main", 
      time: "Hier à 14:23",
      icon: <FaGlassCheers className="text-white" />,
      iconColor: "bg-purple-600/30"
    },
    { 
      id: 5, 
      action: "Mise à jour des rôles Discord synchronisée", 
      user: "Système", 
      time: "Hier à 08:45",
      icon: <FaCheckCircle className="text-white" />,
      iconColor: "bg-yellow-600/30"
    }
  ]);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Tableau de bord</h1>
        <p className="text-gray-400">Bienvenue dans l'interface d'administration de Psycho Allagan</p>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Membres totaux"
          value={statistics.totalMembers}
          icon={<FaUsers className="text-white text-xl" />}
          color="bg-blue-600/30"
          change="12%"
          changeType="increase"
        />
        
        <StatCard 
          title="Événements actifs"
          value={statistics.activeEvents}
          icon={<FaCalendarAlt className="text-white text-xl" />}
          color="bg-purple-600/30"
          change="3"
          changeType="increase"
        />
        
        <StatCard 
          title="Raids en progression"
          value={statistics.activeRaids}
          icon={<GiCrossedSwords className="text-white text-xl" />}
          color="bg-red-600/30"
          change="1"
          changeType="increase"
        />
        
        <StatCard 
          title="Nouvelles inscriptions"
          value={statistics.newRegistrations}
          icon={<FaUserPlus className="text-white text-xl" />}
          color="bg-green-600/30"
          change="8%"
          changeType="decrease"
        />
      </div>
      
      {/* Actions rapides */}
      <div className="bg-black/60 border border-gray-800 rounded-lg p-5 mb-8">
        <h3 className="text-white font-bold mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/evenements/creer"
            className="flex flex-col items-center justify-center bg-violet-900/20 hover:bg-violet-900/30 border border-violet-900/20 hover:border-violet-500/30 rounded-lg p-4 transition-all"
          >
            <FaCalendarAlt className="text-violet-400 text-2xl mb-2" />
            <span className="text-white text-sm">Créer un événement</span>
          </Link>
          
          <Link
            href="/admin/membres/nouveau"
            className="flex flex-col items-center justify-center bg-blue-900/20 hover:bg-blue-900/30 border border-blue-900/20 hover:border-blue-500/30 rounded-lg p-4 transition-all"
          >
            <FaUserPlus className="text-blue-400 text-2xl mb-2" />
            <span className="text-white text-sm">Ajouter un membre</span>
          </Link>
          
          <Link
            href="/admin/nightclub/creer"
            className="flex flex-col items-center justify-center bg-purple-900/20 hover:bg-purple-900/30 border border-purple-900/20 hover:border-purple-500/30 rounded-lg p-4 transition-all"
          >
            <FaGlassCheers className="text-purple-400 text-2xl mb-2" />
            <span className="text-white text-sm">Planifier Nightclub</span>
          </Link>
          
          <Link
            href="/admin/statistiques"
            className="flex flex-col items-center justify-center bg-green-900/20 hover:bg-green-900/30 border border-green-900/20 hover:border-green-500/30 rounded-lg p-4 transition-all"
          >
            <FaChartLine className="text-green-400 text-2xl mb-2" />
            <span className="text-white text-sm">Voir statistiques</span>
          </Link>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="bg-black/60 border border-gray-800 rounded-lg p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold">Notifications</h3>
          <span className="px-2 py-1 bg-violet-900/30 text-violet-300 text-xs rounded-full">
            3 nouvelles
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex p-3 bg-violet-900/10 border border-violet-500/20 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-violet-600/30 flex-shrink-0 flex items-center justify-center mr-3">
              <FaBell className="text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">5 demandes d'adhésion en attente de validation</p>
              <div className="flex items-center mt-1">
                <Link href="/admin/membres/demandes" className="text-violet-400 text-xs hover:text-violet-300">
                  Voir les demandes
                </Link>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-gray-400 text-xs">Il y a 1 heure</span>
              </div>
            </div>
          </div>
          
          <div className="flex p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 flex-shrink-0 flex items-center justify-center mr-3">
              <FaEye className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Le site a reçu 132 visites au cours des dernières 24 heures</p>
              <div className="flex items-center mt-1">
                <Link href="/admin/statistiques" className="text-blue-400 text-xs hover:text-blue-300">
                  Voir les statistiques
                </Link>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-gray-400 text-xs">Il y a 3 heures</span>
              </div>
            </div>
          </div>
          
          <div className="flex p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-green-600/30 flex-shrink-0 flex items-center justify-center mr-3">
              <FaCheckCircle className="text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Sauvegarde automatique des données effectuée avec succès</p>
              <div className="flex items-center mt-1">
                <Link href="/admin/parametres/sauvegardes" className="text-green-400 text-xs hover:text-green-300">
                  Gérer les sauvegardes
                </Link>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-gray-400 text-xs">Aujourd'hui à 04:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Widgets de bas de page */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <UpcomingEvents events={events} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
} 