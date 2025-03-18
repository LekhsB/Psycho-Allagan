"use client";

import React, { useState } from 'react';
import classesData from '@/app/data/classes';
import { FaSearch, FaStar, FaPlay } from 'react-icons/fa';

export default function ClassGuides() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Filtrer les classes en fonction du rôle et du terme de recherche
  const filteredClasses = classesData.filter(classItem => {
    const matchesRole = selectedRole ? classItem.role === selectedRole : true;
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         classItem.abbreviation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Grouper les classes par rôle pour l'affichage
  const tankClasses = filteredClasses.filter(c => c.role === 'tank');
  const healerClasses = filteredClasses.filter(c => c.role === 'healer');
  const dpsClasses = filteredClasses.filter(c => c.role === 'dps');

  return (
    <section id="class-guides" className="py-16 bg-black/95 relative">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-violet-500 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-r from-transparent to-violet-500"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
            Guides des Classes
          </span>
        </h2>
        
        <p className="text-gray-300 text-center max-w-4xl mx-auto mb-10">
          Explorez nos guides détaillés pour chaque classe de Final Fantasy XIV. Apprenez les rotations optimales, 
          les meilleures pratiques et comment maximiser vos performances dans tous les types de contenu.
        </p>
        
        {/* Filtres et recherche */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                selectedRole === null 
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white' 
                  : 'bg-black/50 border border-violet-500/30 text-gray-300 hover:bg-violet-500/10'
              }`}
              onClick={() => setSelectedRole(null)}
            >
              Toutes
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                selectedRole === 'tank' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                  : 'bg-black/50 border border-violet-500/30 text-gray-300 hover:bg-violet-500/10'
              }`}
              onClick={() => setSelectedRole('tank')}
            >
              Tanks
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                selectedRole === 'healer' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                  : 'bg-black/50 border border-violet-500/30 text-gray-300 hover:bg-violet-500/10'
              }`}
              onClick={() => setSelectedRole('healer')}
            >
              Healers
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                selectedRole === 'dps' 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white' 
                  : 'bg-black/50 border border-violet-500/30 text-gray-300 hover:bg-violet-500/10'
              }`}
              onClick={() => setSelectedRole('dps')}
            >
              DPS
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une classe..."
              className="w-64 px-4 py-2 rounded-md bg-black/50 border border-violet-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Affichage des classes */}
        <div className="space-y-8">
          {/* Classes Tank */}
          {tankClasses.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Tanks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tankClasses.map(classItem => (
                  <ClassCard 
                    key={classItem.id} 
                    classItem={classItem} 
                    isSelected={selectedClass === classItem.id}
                    onClick={() => setSelectedClass(selectedClass === classItem.id ? null : classItem.id)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Classes Healer */}
          {healerClasses.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-green-400 mb-4">Healers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {healerClasses.map(classItem => (
                  <ClassCard 
                    key={classItem.id} 
                    classItem={classItem} 
                    isSelected={selectedClass === classItem.id}
                    onClick={() => setSelectedClass(selectedClass === classItem.id ? null : classItem.id)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Classes DPS */}
          {dpsClasses.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-red-400 mb-4">DPS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dpsClasses.map(classItem => (
                  <ClassCard 
                    key={classItem.id} 
                    classItem={classItem} 
                    isSelected={selectedClass === classItem.id}
                    onClick={() => setSelectedClass(selectedClass === classItem.id ? null : classItem.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Détails de la classe sélectionnée */}
        {selectedClass && (
          <ClassDetails 
            classItem={classesData.find(c => c.id === selectedClass)!}
            onClose={() => setSelectedClass(null)}
          />
        )}
      </div>
    </section>
  );
}

interface ClassCardProps {
  classItem: any;
  isSelected: boolean;
  onClick: () => void;
}

function ClassCard({ classItem, isSelected, onClick }: ClassCardProps) {
  const roleColors = {
    tank: "from-blue-600 to-cyan-600",
    healer: "from-green-600 to-emerald-600",
    dps: "from-red-600 to-orange-600"
  };
  
  const difficultyStars = Array(5).fill(0).map((_, index) => (
    <FaStar 
      key={index} 
      className={`w-3 h-3 ${index < classItem.difficulty ? 'text-yellow-400' : 'text-gray-600'}`} 
    />
  ));
  
  return (
    <div 
      className={`bg-black/60 border ${isSelected ? 'border-violet-500' : 'border-violet-900/30'} rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]`}
      onClick={onClick}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${roleColors[classItem.role]}`}></div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${roleColors[classItem.role]} flex items-center justify-center`}>
            {classItem.icon}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              {classItem.abbreviation} <span className="text-sm text-gray-400">- {classItem.name}</span>
            </h4>
            <div className="flex items-center gap-1 mt-1">
              {difficultyStars}
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {classItem.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Stat principale: <span className="text-blue-400">{classItem.primaryStat}</span></span>
          <span className="text-xs flex items-center gap-1 text-violet-400">
            <FaPlay className="w-3 h-3" /> Guide complet
          </span>
        </div>
      </div>
    </div>
  );
}

interface ClassDetailsProps {
  classItem: any;
  onClose: () => void;
}

function ClassDetails({ classItem, onClose }: ClassDetailsProps) {
  const roleColors = {
    tank: "from-blue-600 to-cyan-600",
    healer: "from-green-600 to-emerald-600",
    dps: "from-red-600 to-orange-600"
  };
  
  const difficultyLevel = [
    "Très facile",
    "Facile",
    "Modéré",
    "Difficile",
    "Très difficile"
  ];
  
  const difficultyStars = Array(5).fill(0).map((_, index) => (
    <FaStar 
      key={index} 
      className={`w-4 h-4 ${index < classItem.difficulty ? 'text-yellow-400' : 'text-gray-600'}`} 
    />
  ));

  return (
    <div className="mt-10 bg-black/70 border border-violet-900/50 rounded-lg p-6 animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${roleColors[classItem.role]} flex items-center justify-center`}>
            {React.cloneElement(classItem.icon, { className: "w-8 h-8" })}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{classItem.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                {classItem.abbreviation}
              </span>
              <div className="flex items-center gap-1 ml-3">
                {difficultyStars}
              </div>
              <span className="text-gray-400 text-sm">
                {difficultyLevel[classItem.difficulty - 1]}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          &times;
        </button>
      </div>
      
      <p className="text-gray-300 mb-6">
        {classItem.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 border-b border-violet-900/30 pb-2">
            Forces
          </h4>
          <ul className="space-y-2">
            {classItem.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 font-bold">+</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 border-b border-violet-900/30 pb-2">
            Faiblesses
          </h4>
          <ul className="space-y-2">
            {classItem.weaknesses.map((weakness: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-red-400 font-bold">-</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 border-b border-violet-900/30 pb-2">
          Statistiques et synergies
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 border border-violet-900/30 rounded-lg p-4">
            <p className="text-gray-300">
              <span className="text-violet-400 font-semibold">Statistique principale:</span> {classItem.primaryStat}
            </p>
          </div>
          <div className="bg-black/40 border border-violet-900/30 rounded-lg p-4">
            <p className="text-gray-300">
              <span className="text-violet-400 font-semibold">Meilleures synergies:</span> {classItem.bestPairedWith.join(', ')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="#" className="px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-md text-center font-semibold hover:from-violet-700 hover:to-blue-700 transition-all">
          Guide de rotation
        </a>
        <a href="#" className="px-4 py-3 bg-black border border-violet-500/50 text-white rounded-md text-center font-semibold hover:bg-violet-900/20 transition-all">
          Équipement recommandé
        </a>
        <a href="#" className="px-4 py-3 bg-black border border-violet-500/50 text-white rounded-md text-center font-semibold hover:bg-violet-900/20 transition-all">
          Vidéos & tutoriels
        </a>
      </div>
    </div>
  );
} 