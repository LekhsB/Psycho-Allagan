"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExpand, FaHeart } from "react-icons/fa";

// Données fictives d'images
const FEATURED_IMAGES = [
  {
    id: 1,
    src: "/images/gallery/raid1.jpg",
    alt: "Raid Eden's Promise",
    caption: "Victoire contre le boss final d'Eden's Promise",
    category: "Raids",
    contributor: "Aria Starlight",
    likes: 43
  },
  {
    id: 2,
    src: "/images/gallery/party1.jpg",
    alt: "Soirée au Gold Saucer",
    caption: "Soirée annuelle de la FC au Gold Saucer",
    category: "Soirées",
    contributor: "Thancred Myr",
    likes: 38
  },
  {
    id: 3,
    src: "/images/gallery/housing1.jpg",
    alt: "Maison FC",
    caption: "Notre nouvelle maison à Ishgard",
    category: "Housing",
    contributor: "Lyse Firemane",
    likes: 27
  },
  {
    id: 4,
    src: "/images/gallery/rp1.jpg",
    alt: "Session RP",
    caption: "Session de RP dans les plaines de Thanalan",
    category: "RP",
    contributor: "Y'shtola Viera",
    likes: 31
  },
  {
    id: 5,
    src: "/images/gallery/raid2.jpg",
    alt: "Pandaemonium",
    caption: "Premier kill de Pandaemonium - Anabaseios",
    category: "Raids",
    contributor: "Urianger Leveilleur",
    likes: 56
  }
];

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === FEATURED_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  }, []);
  
  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? FEATURED_IMAGES.length - 1 : prevIndex - 1
    );
  }, []);
  
  // Autoplay
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext, isAutoplay]);
  
  // Pause autoplay when modal is open
  useEffect(() => {
    if (isModalOpen) {
      setIsAutoplay(false);
    }
  }, [isModalOpen]);
  
  const currentImage = FEATURED_IMAGES[currentIndex];
  
  return (
    <div className="w-full relative">
      <div className="aspect-[16/9] w-full relative overflow-hidden rounded-xl bg-black/50 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
        {/* Image placeholder - remplacer avec des vraies images */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-blue-900/20">
          <div className="text-white text-xl opacity-50">Image {currentIndex + 1}</div>
        </div>
        
        {/* Info panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{currentImage.caption}</h3>
              <div className="flex items-center mt-1 space-x-4 text-sm">
                <span className="px-2 py-1 rounded bg-violet-800/50">{currentImage.category}</span>
                <span className="text-gray-300">Par: {currentImage.contributor}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-full bg-black/40 hover:bg-violet-800/50 transition-colors"
              >
                <FaExpand className="text-gray-300" />
              </button>
              <div className="flex items-center space-x-1">
                <FaHeart className="text-red-500" />
                <span>{currentImage.likes}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-violet-800/70 transition-colors text-white"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-violet-800/70 transition-colors text-white"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
      
      {/* Thumbnails/indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {FEATURED_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoplay(false);
              setTimeout(() => setIsAutoplay(true), 5000);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-violet-500 scale-110" 
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      
      {/* Image modal */}
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-blue-900/20">
              <div className="text-white text-xl opacity-50">Image {currentIndex + 1} (Agrandie)</div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white bg-black/60 p-3 rounded-lg">
              <h3 className="text-lg font-semibold">{currentImage.caption}</h3>
              <p className="text-sm text-gray-300">Partagé par: {currentImage.contributor}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 