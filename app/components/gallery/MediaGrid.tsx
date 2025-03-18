"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaEye, FaExpand, FaDownload, FaShare } from "react-icons/fa";

// Données fictives des médias
const mediaData = [
  {
    id: 1,
    type: "image",
    title: "Victoire sur Alexander Ultimate",
    description: "Notre groupe célébrant la victoire sur The Epic of Alexander Ultimate",
    src: "/images/gallery/raid3.jpg",
    category: "raids",
    contributor: "Zenos Warrior",
    date: "2024-06-10",
    likes: 45,
    comments: 12,
    views: 248
  },
  {
    id: 2,
    type: "image",
    title: "Housing Décoré",
    description: "Décoration intérieure de notre maison de FC",
    src: "/images/gallery/housing2.jpg",
    category: "housing",
    contributor: "Decora Master",
    date: "2024-05-28",
    likes: 37,
    comments: 8,
    views: 176
  },
  {
    id: 3,
    type: "video",
    title: "Soirée Danse au Gold Saucer",
    description: "Performance de danse lors de notre soirée mensuelle",
    src: "/images/gallery/party2.jpg",
    category: "parties",
    contributor: "Dancer Main",
    date: "2024-06-05",
    likes: 29,
    comments: 6,
    views: 142
  },
  {
    id: 4,
    type: "image",
    title: "Session RP - L'histoire d'Eorzea",
    description: "Session de roleplay racontant les légendes d'Eorzea",
    src: "/images/gallery/rp2.jpg",
    category: "rp",
    contributor: "Lore Expert",
    date: "2024-06-01",
    likes: 18,
    comments: 5,
    views: 98
  },
  {
    id: 5,
    type: "image",
    title: "Premier kill de Golbez Savage",
    description: "Notre équipe de raid après avoir vaincu Golbez en mode Savage",
    src: "/images/gallery/raid4.jpg",
    category: "raids",
    contributor: "Tank Pro",
    date: "2024-06-12",
    likes: 53,
    comments: 15,
    views: 312
  },
  {
    id: 6,
    type: "image",
    title: "Soirée Maid Café",
    description: "Notre thème spécial maid café pour la soirée hebdomadaire",
    src: "/images/gallery/party3.jpg",
    category: "parties",
    contributor: "Event Planner",
    date: "2024-05-20",
    likes: 41,
    comments: 9,
    views: 187
  },
  {
    id: 7,
    type: "image",
    title: "Jardin Japonais",
    description: "Décoration extérieure inspirée des jardins japonais",
    src: "/images/gallery/housing3.jpg",
    category: "housing",
    contributor: "Botanist Expert",
    date: "2024-06-08",
    likes: 32,
    comments: 7,
    views: 154
  },
  {
    id: 8,
    type: "video",
    title: "Combat de RP entre guildes",
    description: "Scène de combat entre la Psycho Allagan et une guilde rivale",
    src: "/images/gallery/rp3.jpg",
    category: "rp",
    contributor: "Battle Choreographer",
    date: "2024-05-30",
    likes: 27,
    comments: 11,
    views: 143
  }
];

export default function MediaGrid() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [loadedItems, setLoadedItems] = useState(8); // Nombre d'éléments chargés initialement
  
  const handleLoadMore = () => {
    setLoadedItems(prevCount => Math.min(prevCount + 8, mediaData.length));
  };
  
  // Ouvrir le modal d'un média
  const openMediaModal = (id: number) => {
    setSelectedItem(id);
    document.body.style.overflow = "hidden"; // Empêcher le défilement
  };
  
  // Fermer le modal
  const closeMediaModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto"; // Réactiver le défilement
  };
  
  const selectedMedia = selectedItem !== null 
    ? mediaData.find(item => item.id === selectedItem) 
    : null;
  
  return (
    <div>
      {/* Grille de médias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaData.slice(0, loadedItems).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-black/50 rounded-xl overflow-hidden border border-violet-500/30 card-hover"
          >
            {/* Placeholder de média (image ou vidéo) */}
            <div 
              className="aspect-square relative cursor-pointer"
              onClick={() => openMediaModal(item.id)}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-blue-900/20">
                <span className="text-white opacity-50">{item.type === "image" ? "Image" : "Vidéo"}</span>
              </div>
              
              {/* Overlay au survol */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-violet-600/80 text-white rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <FaExpand size={18} />
                </button>
              </div>
            </div>
            
            {/* Informations */}
            <div className="p-4">
              <h3 className="text-white font-medium text-lg mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="bg-violet-900/40 px-2 py-1 rounded-full text-xs">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-1">
                    <FaHeart className="text-red-400" size={14} />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaComment className="text-blue-400" size={14} />
                    <span>{item.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Bouton "Charger plus" */}
      {loadedItems < mediaData.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-violet-700/80 text-white rounded-lg hover:bg-violet-600 transition-colors shadow-lg"
          >
            Charger plus
          </button>
        </div>
      )}
      
      {/* Modal détaillé */}
      {selectedItem !== null && selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeMediaModal}
        >
          <div 
            className="max-w-5xl w-full bg-black/70 rounded-xl overflow-hidden border border-violet-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Contenu du média */}
            <div className="max-h-[60vh] overflow-hidden relative">
              <div className="aspect-video bg-gradient-to-br from-violet-900/20 to-blue-900/20 flex items-center justify-center">
                <span className="text-white text-lg opacity-50">
                  {selectedMedia.type === "image" ? `Image ${selectedItem}` : `Vidéo ${selectedItem}`}
                </span>
              </div>
            </div>
            
            {/* Informations détaillées */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedMedia.title}</h2>
              <p className="text-gray-300 mb-4">{selectedMedia.description}</p>
              
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Partagé par</p>
                  <p className="text-white">{selectedMedia.contributor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Date</p>
                  <p className="text-white">{new Date(selectedMedia.date).toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Catégorie</p>
                  <p className="text-white capitalize">{selectedMedia.category}</p>
                </div>
              </div>
              
              {/* Statistiques */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-500" />
                    <span>{selectedMedia.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaComment className="text-blue-500" />
                    <span>{selectedMedia.comments} commentaires</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEye className="text-green-500" />
                    <span>{selectedMedia.views} vues</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="p-2 rounded-full bg-violet-900/40 hover:bg-violet-700/60 transition-colors">
                    <FaDownload className="text-white" />
                  </button>
                  <button className="p-2 rounded-full bg-violet-900/40 hover:bg-violet-700/60 transition-colors">
                    <FaShare className="text-white" />
                  </button>
                </div>
              </div>
              
              {/* Section commentaires (simulée) */}
              <div className="pt-4 border-t border-violet-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Commentaires ({selectedMedia.comments})</h3>
                <p className="text-gray-400 text-sm">Connectez-vous pour voir et ajouter des commentaires.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 