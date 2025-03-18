"use client";

import { useState } from "react";
import { FaSearch, FaCalendarAlt, FaFilter, FaStar, FaHeart, FaClock } from "react-icons/fa";

export default function GalleryFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="w-full">
      {/* Barre de recherche et contrôle des filtres */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-4">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre, membre ou description..."
            className="w-full bg-black/40 border border-violet-500/30 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-black/40 border border-violet-500/30 rounded-lg text-gray-300 hover:bg-violet-800/20 transition-colors w-full md:w-auto justify-center"
        >
          <FaFilter />
          <span>Filtres avancés</span>
        </button>
      </div>
      
      {/* Filtres avancés */}
      {showFilters && (
        <div className="bg-black/40 rounded-lg border border-violet-500/20 p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tri */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Trier par
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-black/60 border border-violet-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="popular">Popularité</option>
              <option value="likes">Nombre de likes</option>
              <option value="comments">Nombre de commentaires</option>
            </select>
          </div>
          
          {/* Filtrage par date */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              Période
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-black/60 border border-violet-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
              <option value="custom">Personnalisé...</option>
            </select>
          </div>
          
          {/* Filtrage par type de contenu */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FaClock className="text-green-500" />
              Type de contenu
            </label>
            <div className="flex gap-2">
              <label className="flex-1">
                <input
                  type="checkbox"
                  className="hidden peer"
                  defaultChecked
                />
                <div className="w-full py-2 px-2 text-center text-sm rounded-lg bg-black/60 border border-violet-500/30 text-gray-300 peer-checked:bg-violet-700 peer-checked:text-white transition-colors cursor-pointer">
                  Images
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="checkbox"
                  className="hidden peer"
                  defaultChecked
                />
                <div className="w-full py-2 px-2 text-center text-sm rounded-lg bg-black/60 border border-violet-500/30 text-gray-300 peer-checked:bg-violet-700 peer-checked:text-white transition-colors cursor-pointer">
                  Vidéos
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 