"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaClock, FaChevronRight, FaChevronDown, FaSearch } from 'react-icons/fa';

// Types pour les projets
type ProjectStatus = 'planning' | 'inProgress' | 'testing' | 'completed';
type ProjectCategory = 'raid' | 'social' | 'housing' | 'crafting' | 'infrastructure';

interface ProjectMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number;
  startDate: Date;
  endDate?: Date;
  members: ProjectMember[];
  tasks: {
    title: string;
    completed: boolean;
    assignee?: string;
  }[];
}

// Données d'exemple pour les projets
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Raid Team Endgame',
    description: 'Mise en place d\'une équipe de raid dédiée au contenu difficile pour le patch 7.0',
    category: 'raid',
    status: 'inProgress',
    progress: 65,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15),
    members: [
      { id: '1', name: 'Akira Kyono', role: 'Leader', avatar: '/images/avatars/akira.jpg' },
      { id: '2', name: 'Lena Hikaru', role: 'Coordinatrice', avatar: '/images/avatars/lena.jpg' },
      { id: '3', name: 'Kazuto Ryuu', role: 'Membre', avatar: '/images/avatars/kazuto.jpg' }
    ],
    tasks: [
      { title: 'Recrutement des membres', completed: true, assignee: 'Akira Kyono' },
      { title: 'Définition du planning hebdomadaire', completed: true, assignee: 'Lena Hikaru' },
      { title: 'Allocation des rôles', completed: true, assignee: 'Akira Kyono' },
      { title: 'Préparation des stratégies', completed: false, assignee: 'Kazuto Ryuu' },
      { title: 'Organisation des ressources', completed: false, assignee: 'Lena Hikaru' }
    ]
  },
  {
    id: '2',
    title: 'Refonte du QG de la Compagnie',
    description: 'Réaménagement complet du QG avec de nouveaux espaces dédiés aux activités sociales et stratégiques',
    category: 'housing',
    status: 'planning',
    progress: 25,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    members: [
      { id: '4', name: 'Mina Shirokaze', role: 'Architecte', avatar: '/images/avatars/mina.jpg' },
      { id: '5', name: 'Takeshi Kawa', role: 'Assistant', avatar: '/images/avatars/takeshi.jpg' }
    ],
    tasks: [
      { title: 'Élaboration des plans', completed: true, assignee: 'Mina Shirokaze' },
      { title: 'Collecte des matériaux', completed: false, assignee: 'Takeshi Kawa' },
      { title: 'Achat des meubles', completed: false, assignee: 'Mina Shirokaze' },
      { title: 'Construction de la structure', completed: false },
      { title: 'Décoration finale', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Festival Estival 2024',
    description: 'Organisation d\'un festival d\'été avec des jeux, concours et spectacles pour tous les membres',
    category: 'social',
    status: 'planning',
    progress: 15,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 10),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 12),
    members: [
      { id: '6', name: 'Hiroshi Tanaka', role: 'Organisateur', avatar: '/images/avatars/hiroshi.jpg' },
      { id: '7', name: 'Sakura Mizuki', role: 'Assistante', avatar: '/images/avatars/sakura.jpg' }
    ],
    tasks: [
      { title: 'Planification des activités', completed: true, assignee: 'Hiroshi Tanaka' },
      { title: 'Réservation du lieu', completed: false, assignee: 'Sakura Mizuki' },
      { title: 'Préparation des décorations', completed: false, assignee: 'Hiroshi Tanaka' },
      { title: 'Recrutement des volontaires', completed: false, assignee: 'Sakura Mizuki' },
      { title: 'Organisation des prix', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Système de Banque de Ressources',
    description: 'Mise en place d\'un système pour faciliter le partage et la gestion des ressources entre membres',
    category: 'infrastructure',
    status: 'testing',
    progress: 85,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 2, 20),
    members: [
      { id: '8', name: 'Yuki Natsume', role: 'Développeur', avatar: '/images/avatars/yuki.jpg' },
      { id: '9', name: 'Haru Masaki', role: 'Testeur', avatar: '/images/avatars/haru.jpg' }
    ],
    tasks: [
      { title: 'Analyse des besoins', completed: true, assignee: 'Yuki Natsume' },
      { title: 'Conception du système', completed: true, assignee: 'Yuki Natsume' },
      { title: 'Implémentation', completed: true, assignee: 'Yuki Natsume' },
      { title: 'Tests utilisateurs', completed: true, assignee: 'Haru Masaki' },
      { title: 'Déploiement', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Atelier de Craft Collectif',
    description: 'Organisation d\'ateliers hebdomadaires pour aider les membres à progresser dans leurs métiers',
    category: 'crafting',
    status: 'completed',
    progress: 100,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 30),
    members: [
      { id: '10', name: 'Kaito Forge', role: 'Maître Artisan', avatar: '/images/avatars/kaito.jpg' },
      { id: '11', name: 'Rumi Weaver', role: 'Assistante', avatar: '/images/avatars/rumi.jpg' }
    ],
    tasks: [
      { title: 'Planification du programme', completed: true, assignee: 'Kaito Forge' },
      { title: 'Préparation des ressources', completed: true, assignee: 'Rumi Weaver' },
      { title: 'Recrutement des participants', completed: true, assignee: 'Kaito Forge' },
      { title: 'Conduite des ateliers', completed: true, assignee: 'Kaito Forge' },
      { title: 'Évaluation et feedback', completed: true, assignee: 'Rumi Weaver' }
    ]
  }
];

// Catégories de projets
const projectCategories: Record<ProjectCategory, { label: string; color: string }> = {
  raid: { label: 'Raid', color: 'bg-red-600' },
  social: { label: 'Social', color: 'bg-blue-600' },
  housing: { label: 'Housing', color: 'bg-purple-600' },
  crafting: { label: 'Artisanat', color: 'bg-green-600' },
  infrastructure: { label: 'Infrastructure', color: 'bg-yellow-600' }
};

// Statuts de projets
const projectStatuses: Record<ProjectStatus, { label: string; color: string }> = {
  planning: { label: 'Planification', color: 'bg-blue-600' },
  inProgress: { label: 'En Cours', color: 'bg-yellow-600' },
  testing: { label: 'Test', color: 'bg-purple-600' },
  completed: { label: 'Terminé', color: 'bg-green-600' }
};

// Formatage de la date en français
const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const ProjectsList = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');
  
  // Filtrer les projets
  const filteredProjects = mockProjects.filter(project => {
    // Filtrer par recherche
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrer par catégorie
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
    }
    
    // Filtrer par statut
    if (selectedStatus !== 'all' && project.status !== selectedStatus) {
      return false;
    }
    
    return true;
  });
  
  // Toggle pour l'affichage des détails d'un projet
  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };
  
  return (
    <div className="w-full">
      {/* Contrôles de filtrage */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un projet..."
              className="w-full py-2 pl-10 pr-3 bg-black/50 border border-violet-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="bg-black/50 border border-violet-500/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | 'all')}
            >
              <option value="all">Toutes catégories</option>
              {Object.entries(projectCategories).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            
            <select
              className="bg-black/50 border border-violet-500/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | 'all')}
            >
              <option value="all">Tous statuts</option>
              {Object.entries(projectStatuses).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Liste des projets */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="bg-black/40 rounded-lg border border-gray-800 overflow-hidden">
              {/* En-tête du projet */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleProject(project.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${projectStatuses[project.status].color}`}></div>
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <div className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white ${projectCategories[project.category].color}`}>
                      {projectCategories[project.category].label}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
                      <FaCalendarAlt />
                      <span>{formatDate(project.startDate)}</span>
                      {project.endDate && (
                        <>
                          <span>-</span>
                          <span>{formatDate(project.endDate)}</span>
                        </>
                      )}
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
                      <FaUsers />
                      <span>{project.members.length}</span>
                    </div>
                    {expandedProject === project.id ? (
                      <FaChevronDown className="text-violet-400" />
                    ) : (
                      <FaChevronRight className="text-violet-400" />
                    )}
                  </div>
                </div>
                
                {/* Barre de progression */}
                <div className="mt-3 w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      project.progress >= 100
                        ? 'bg-green-600'
                        : project.progress >= 75
                        ? 'bg-blue-600'
                        : project.progress >= 50
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-400">
                    {projectStatuses[project.status].label}
                  </div>
                  <div className="text-sm font-medium text-violet-400">
                    {project.progress}%
                  </div>
                </div>
              </div>
              
              {/* Détails du projet (s'affichent quand le projet est développé) */}
              {expandedProject === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-800 p-4"
                >
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
                    <p className="text-white">{project.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Équipe</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1">
                          <div className="w-6 h-6 rounded-full bg-violet-700 flex items-center justify-center text-xs text-white">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm text-white">{member.name}</div>
                            <div className="text-xs text-gray-400">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Tâches</h4>
                    <div className="space-y-2">
                      {project.tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-md p-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.completed ? 'border-green-500 bg-green-500/20' : 'border-gray-600'}`}>
                              {task.completed && (
                                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>{task.title}</span>
                          </div>
                          {task.assignee && (
                            <span className="text-xs text-gray-400">{task.assignee}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="inline-block p-3 rounded-full bg-gray-800 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400">Essayez de modifier vos critères de recherche ou de créer un nouveau projet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList; 