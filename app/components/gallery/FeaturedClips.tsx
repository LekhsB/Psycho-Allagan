"use client";

import { useState } from "react";
import { FaTwitch, FaYoutube, FaCalendarAlt, FaStar, FaHeart, FaComment } from "react-icons/fa";
import { motion } from "framer-motion";

// Données fictives des clips
const videoData = [
  {
    id: 1,
    platform: "twitch",
    embedId: "1234567890",
    title: "Mécanique parfaite sur Golbez Savage",
    creator: "RaiderX",
    date: "2024-06-15",
    event: "Raids Hebdo",
    likes: 28,
    comments: 7
  },
  {
    id: 2,
    platform: "youtube",
    embedId: "abcdefghij",
    title: "Tour du Free Company House après rénovation",
    creator: "DesignerY",
    date: "2024-05-22",
    event: "Housing",
    likes: 34,
    comments: 12
  },
  {
    id: 3,
    platform: "twitch",
    embedId: "0987654321",
    title: "Soirée karaoké au Nightclub",
    creator: "SingerZ",
    date: "2024-06-10",
    event: "Event Nightclub",
    likes: 42,
    comments: 15
  },
  {
    id: 4,
    platform: "youtube",
    embedId: "zyxwvutsr",
    title: "Guide du trial Extreme - Zodiark",
    creator: "GuideGuru",
    date: "2024-04-30",
    event: "Tutoriels",
    likes: 56,
    comments: 23
  }
];

export default function FeaturedClips() {
  const [filter, setFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  
  // Extraire les événements uniques pour le filtre
  const events = [...new Set(videoData.map(video => video.event))];
  
  // Filtrer les vidéos
  const filteredVideos = filter === "all" 
    ? videoData 
    : videoData.filter(video => video.event === filter);
  
  return (
    <div className="w-full">
      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-gray-400">Filtrer par événement:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "all"
                ? "bg-violet-600 text-white"
                : "bg-black/40 border border-violet-500/30 text-gray-300 hover:bg-violet-800/30"
            }`}
          >
            Tous
          </button>
          
          {events.map(event => (
            <button
              key={event}
              onClick={() => setFilter(event)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === event
                  ? "bg-violet-600 text-white"
                  : "bg-black/40 border border-violet-500/30 text-gray-300 hover:bg-violet-800/30"
              }`}
            >
              {event}
            </button>
          ))}
        </div>
      </div>
      
      {/* Clips vidéo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="bg-black/50 border border-violet-500/30 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
          >
            {/* Vidéo embed placeholder */}
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {activeVideo === video.id ? (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">
                    {video.platform === "twitch" 
                      ? "Embed Twitch: " + video.embedId 
                      : "Embed YouTube: " + video.embedId}
                  </span>
                </div>
              ) : (
                <div 
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setActiveVideo(video.id)}
                >
                  {video.platform === "twitch" ? (
                    <FaTwitch className="text-6xl text-[#6441a5] mb-2" />
                  ) : (
                    <FaYoutube className="text-6xl text-[#ff0000] mb-2" />
                  )}
                  <span className="text-white">Cliquez pour charger la vidéo</span>
                </div>
              )}
            </div>
            
            {/* Informations */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">Par: {video.creator}</span>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <FaCalendarAlt className="text-violet-400" />
                  <span>{new Date(video.date).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="bg-violet-800/40 text-sm px-2 py-1 rounded">{video.event}</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <FaHeart className="text-red-500" />
                    <span>{video.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaComment className="text-blue-500" />
                    <span>{video.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message si aucun résultat */}
      {filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-400"
        >
          Aucun clip vidéo trouvé pour cet événement.
        </motion.div>
      )}
    </div>
  );
} 