"use client";

import { useState } from "react";
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaEnvelope, 
  FaDiscord, 
  FaShieldAlt, 
  FaArrowUp, 
  FaArrowDown,
  FaUser
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Types pour les membres
interface Member {
  id: number;
  name: string;
  avatar: string;
  role: string; // grade
  level: number;
  job: string;
  status: "active" | "inactive" | "pending";
  discord: string;
  email?: string;
  joinDate: string;
  lastActive: string;
}

// Composant de filtre
const FilterBar = ({ 
  onSearch, 
  selectedRole, 
  onRoleChange,
  selectedStatus,
  onStatusChange
}: { 
  onSearch: (term: string) => void;
  selectedRole: string | null;
  onRoleChange: (role: string | null) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  
  const memberRoles = [
    { value: null, label: "Tous les grades" },
    { value: "Maître de Guilde", label: "Maître de Guilde" },
    { value: "Officier", label: "Officier" },
    { value: "Vétéran", label: "Vétéran" },
    { value: "Membre", label: "Membre" },
    { value: "Recrue", label: "Recrue" }
  ];
  
  const memberStatuses = [
    { value: null, label: "Tous les statuts" },
    { value: "active", label: "Actif" },
    { value: "inactive", label: "Inactif" },
    { value: "pending", label: "En attente" }
  ];
  
  return (
    <div className="bg-black/60 border border-gray-800 rounded-lg p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un membre..."
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
            value={selectedRole || ""}
            onChange={(e) => onRoleChange(e.target.value === "" ? null : e.target.value)}
            className="bg-gray-900/50 border border-gray-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
          >
            {memberRoles.map((role) => (
              <option key={role.value || "all"} value={role.value || ""}>
                {role.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus || ""}
            onChange={(e) => onStatusChange(e.target.value === "" ? null : e.target.value)}
            className="bg-gray-900/50 border border-gray-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
          >
            {memberStatuses.map((status) => (
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

// Composant du tableau des membres
const MembersTable = ({ 
  members,
  onPromote,
  onDemote
}: { 
  members: Member[];
  onPromote: (id: number) => void;
  onDemote: (id: number) => void;
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full">Actif</span>;
      case "inactive":
        return <span className="px-2 py-1 bg-gray-900/30 text-gray-300 text-xs rounded-full">Inactif</span>;
      case "pending":
        return <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 text-xs rounded-full">En attente</span>;
      default:
        return null;
    }
  };
  
  // Déterminer si la promotion/rétrogradation est possible
  const canPromote = (role: string) => {
    const roles = ["Recrue", "Membre", "Vétéran", "Officier"];
    return roles.includes(role);
  };
  
  const canDemote = (role: string) => {
    const roles = ["Membre", "Vétéran", "Officier", "Maître de Guilde"];
    return roles.includes(role);
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-black/30">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Membre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Grade
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Job/Niveau
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Contact
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Dernière activité
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-black/20 divide-y divide-gray-800">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-900/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 relative">
                    <Image 
                      src={member.avatar} 
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-sm text-gray-400">Inscrit le {member.joinDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FaShieldAlt className={`mr-2 ${
                    member.role === 'Maître de Guilde' ? 'text-yellow-400' : 
                    member.role === 'Officier' ? 'text-blue-400' :
                    member.role === 'Vétéran' ? 'text-purple-400' :
                    member.role === 'Membre' ? 'text-green-400' : 'text-gray-400'
                  }`} />
                  <span className="text-sm text-white">{member.role}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{member.job}</div>
                <div className="text-xs text-gray-400">Niveau {member.level}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(member.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <a href={`mailto:${member.email}`} className="text-blue-400 hover:text-blue-300">
                    <FaEnvelope />
                  </a>
                  <a href={`https://discord.com/users/${member.discord}`} className="text-indigo-400 hover:text-indigo-300">
                    <FaDiscord />
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {member.lastActive}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link 
                    href={`/admin/membres/${member.id}`} 
                    className="text-violet-400 hover:text-violet-300"
                    title="Profil"
                  >
                    <FaUser />
                  </Link>
                  <Link 
                    href={`/admin/membres/${member.id}/modifier`} 
                    className="text-yellow-400 hover:text-yellow-300"
                    title="Modifier"
                  >
                    <FaEdit />
                  </Link>
                  {canPromote(member.role) && (
                    <button 
                      onClick={() => onPromote(member.id)}
                      className="text-green-400 hover:text-green-300"
                      title="Promouvoir"
                    >
                      <FaArrowUp />
                    </button>
                  )}
                  {canDemote(member.role) && (
                    <button 
                      onClick={() => onDemote(member.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Rétrograder"
                    >
                      <FaArrowDown />
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

// Page principale de gestion des membres
export default function MembersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Membres simulés
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Lekhslecafeine",
      avatar: "/images/avatars/admin1.jpg",
      role: "Maître de Guilde",
      level: 90,
      job: "Paladin",
      status: "active",
      discord: "lekhslecafeine",
      email: "admin@psychoallagan.fr",
      joinDate: "12/01/2023",
      lastActive: "Il y a 30 minutes"
    },
    {
      id: 2,
      name: "Asthenia Shinryu",
      avatar: "/images/avatars/officer1.jpg",
      role: "Officier",
      level: 90,
      job: "Warrior",
      status: "active",
      discord: "astheniasthenia",
      joinDate: "15/01/2023",
      lastActive: "Il y a 1 heure"
    },
    {
      id: 3,
      name: "Thaliak Duskblade",
      avatar: "/images/avatars/dps1.jpg",
      role: "Officier",
      level: 90,
      job: "Black Mage",
      status: "active",
      discord: "thaliakdusk",
      joinDate: "20/01/2023",
      lastActive: "Il y a 2 heures"
    },
    {
      id: 4,
      name: "Faye Silverwind",
      avatar: "/images/avatars/dps2.jpg",
      role: "Vétéran",
      level: 90,
      job: "Ninja",
      status: "active",
      discord: "fayesilver",
      joinDate: "05/02/2023",
      lastActive: "Hier à 20:15"
    },
    {
      id: 5,
      name: "Soren Lightheart",
      avatar: "/images/avatars/healer1.jpg",
      role: "Vétéran",
      level: 90,
      job: "White Mage",
      status: "active",
      discord: "sorenwhmain",
      joinDate: "10/02/2023",
      lastActive: "Aujourd'hui à 15:20"
    },
    {
      id: 6,
      name: "Lilja Moonwhisper",
      avatar: "/images/avatars/healer2.jpg",
      role: "Membre",
      level: 90,
      job: "Astrologian",
      status: "active",
      discord: "liljamoon",
      joinDate: "18/02/2023",
      lastActive: "Il y a 4 jours"
    },
    {
      id: 7,
      name: "Thordan Ironwill",
      avatar: "/images/avatars/tank2.jpg",
      role: "Membre",
      level: 90,
      job: "Paladin",
      status: "inactive",
      discord: "thordanIW",
      joinDate: "01/03/2023",
      lastActive: "Il y a 3 semaines"
    },
    {
      id: 8,
      name: "Zephyr Stormcaller",
      avatar: "/images/avatars/dps4.jpg",
      role: "Recrue",
      level: 87,
      job: "Dragoon",
      status: "active",
      discord: "zephyrcaller",
      joinDate: "15/03/2023",
      lastActive: "Hier à 18:45"
    },
    {
      id: 9,
      name: "Sylvia Valkyrie",
      avatar: "/images/avatars/dps3.jpg",
      role: "Recrue",
      level: 85,
      job: "Samurai",
      status: "pending",
      discord: "sylviasam",
      joinDate: "22/03/2023",
      lastActive: "En attente d'approbation"
    }
  ]);
  
  // Gérer la promotion des membres
  const handlePromote = (id: number) => {
    setMembers(members.map(member => {
      if (member.id === id) {
        let newRole = member.role;
        if (member.role === "Recrue") newRole = "Membre";
        else if (member.role === "Membre") newRole = "Vétéran";
        else if (member.role === "Vétéran") newRole = "Officier";
        
        return { ...member, role: newRole };
      }
      return member;
    }));
  };
  
  // Gérer la rétrogradation des membres
  const handleDemote = (id: number) => {
    setMembers(members.map(member => {
      if (member.id === id) {
        let newRole = member.role;
        if (member.role === "Officier") newRole = "Vétéran";
        else if (member.role === "Vétéran") newRole = "Membre";
        else if (member.role === "Membre") newRole = "Recrue";
        else if (member.role === "Maître de Guilde") newRole = "Officier";
        
        return { ...member, role: newRole };
      }
      return member;
    }));
  };
  
  // Filtrage des membres
  const filteredMembers = members.filter(member => {
    // Filtrer par terme de recherche
    const matchesSearch = searchTerm === "" || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.discord.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filtrer par rôle
    const matchesRole = selectedRole === null || 
      member.role === selectedRole;
      
    // Filtrer par statut
    const matchesStatus = selectedStatus === null || 
      member.status === selectedStatus;
      
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestion des Membres</h1>
          <p className="text-gray-400">Administrez les membres de la compagnie et gérez les grades</p>
        </div>
        
        <Link
          href="/admin/membres/nouveau"
          className="flex items-center px-4 py-2 bg-violet-900/30 hover:bg-violet-900/50 text-white rounded-lg transition-colors"
        >
          <FaUserPlus className="mr-2" />
          Ajouter un membre
        </Link>
      </div>
      
      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total</p>
              <h3 className="text-2xl font-bold text-white mt-1">{members.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center">
              <FaUsers className="text-violet-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-green-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Actifs</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {members.filter(m => m.status === "active").length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center">
              <FaUser className="text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-yellow-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">En attente</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {members.filter(m => m.status === "pending").length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-600/30 flex items-center justify-center">
              <FaUserPlus className="text-yellow-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 hover:border-red-500/30 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Inactifs</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {members.filter(m => m.status === "inactive").length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center">
              <FaUser className="text-red-400" />
            </div>
          </div>
        </div>
      </div>
      
      <FilterBar 
        onSearch={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      <div className="bg-black/60 border border-gray-800 rounded-lg overflow-hidden">
        {filteredMembers.length > 0 ? (
          <MembersTable 
            members={filteredMembers} 
            onPromote={handlePromote}
            onDemote={handleDemote}
          />
        ) : (
          <div className="p-8 text-center">
            <FaUsers className="mx-auto text-3xl text-gray-600 mb-3" />
            <h3 className="text-lg font-medium text-white mb-1">Aucun membre trouvé</h3>
            <p className="text-gray-400">Aucun membre ne correspond à vos critères de recherche</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          {filteredMembers.length} membres affichés sur {members.length} au total
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