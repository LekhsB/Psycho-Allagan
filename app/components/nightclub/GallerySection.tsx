"use client";

import { FC, useState, useEffect, useCallback } from 'react';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  source: string;
  thumbnail: string;
  title: string;
  date: string;
  event: string;
}

// Données de la galerie
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-001',
    type: 'image',
    source: '/images/gallery/neon-dreams-01.jpg',
    thumbnail: '/images/gallery/thumbnails/neon-dreams-01.jpg',
    title: 'Lumières néon sur la piste de danse',
    date: '23/05/2023',
    event: 'Neon Dreams'
  },
  {
    id: 'gallery-002',
    type: 'image',
    source: '/images/gallery/neon-dreams-02.jpg',
    thumbnail: '/images/gallery/thumbnails/neon-dreams-02.jpg',
    title: 'DJ Quantum en action',
    date: '23/05/2023',
    event: 'Neon Dreams'
  },
  {
    id: 'gallery-003',
    type: 'video',
    source: '/videos/neon-dreams-highlight.mp4',
    thumbnail: '/images/gallery/thumbnails/neon-dreams-video.jpg',
    title: 'Highlights de la soirée Neon Dreams',
    date: '23/05/2023',
    event: 'Neon Dreams'
  },
  {
    id: 'gallery-004',
    type: 'image',
    source: '/images/gallery/crystal-mirage-01.jpg',
    thumbnail: '/images/gallery/thumbnails/crystal-mirage-01.jpg',
    title: 'Décoration Crystal Mirage',
    date: '30/05/2023',
    event: 'Crystal Mirage'
  },
  {
    id: 'gallery-005',
    type: 'image',
    source: '/images/gallery/crystal-mirage-02.jpg',
    thumbnail: '/images/gallery/thumbnails/crystal-mirage-02.jpg',
    title: 'Cocktails spéciaux Crystal Mirage',
    date: '30/05/2023',
    event: 'Crystal Mirage'
  },
  {
    id: 'gallery-006',
    type: 'video',
    source: '/videos/crystal-mirage-performance.mp4',
    thumbnail: '/images/gallery/thumbnails/crystal-mirage-video.jpg',
    title: 'Performance live Crystal Resonance',
    date: '30/05/2023',
    event: 'Crystal Mirage'
  },
  {
    id: 'gallery-007',
    type: 'image',
    source: '/images/gallery/void-whispers-01.jpg',
    thumbnail: '/images/gallery/thumbnails/void-whispers-01.jpg',
    title: 'Ambiance sombre Void Whispers',
    date: '07/06/2023',
    event: 'Void Whispers'
  },
  {
    id: 'gallery-008',
    type: 'image',
    source: '/images/gallery/void-whispers-02.jpg',
    thumbnail: '/images/gallery/thumbnails/void-whispers-02.jpg',
    title: 'Void Entity au mixage',
    date: '07/06/2023',
    event: 'Void Whispers'
  },
  {
    id: 'gallery-009',
    type: 'image',
    source: '/images/gallery/tech-rituals-01.jpg',
    thumbnail: '/images/gallery/thumbnails/tech-rituals-01.jpg',
    title: 'Installations tech sur la piste',
    date: '14/06/2023',
    event: 'Tech Rituals'
  }
];

const GallerySection: FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => {
        if (filter === 'image' || filter === 'video') {
          return item.type === filter;
        } else {
          return item.event === filter;
        }
      });
  
  const openModal = (item: GalleryItem) => {
    setCurrentItem(item);
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setCurrentItem(null);
  };
  
  const goToNext = useCallback(() => {
    if (!filteredItems.length) return;
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
    setCurrentItem(filteredItems[(currentIndex + 1) % filteredItems.length]);
  }, [filteredItems, currentIndex]);
  
  const goToPrev = useCallback(() => {
    if (!filteredItems.length) return;
    setCurrentIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    setCurrentItem(filteredItems[(currentIndex - 1 + filteredItems.length) % filteredItems.length]);
  }, [filteredItems, currentIndex]);
  
  // Gestion des touches clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, goToNext, goToPrev]);
  
  const uniqueEvents = Array.from(new Set(GALLERY_ITEMS.map(item => item.event)));
  
  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Notre </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Galerie
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Découvrez l'ambiance de nos soirées à travers notre collection de photos et vidéos.
            Revivez les moments forts du Nébula ou découvrez ce qui vous attend.
          </p>
        </div>
        
        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5
              ${filter === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-black/60 border border-purple-800/30 text-gray-300 hover:text-white hover:border-purple-500/50'}
            `}
          >
            <FaFilter className="text-xs" />
            Tous
          </button>
          
          <button
            onClick={() => setFilter('image')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${filter === 'image'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-black/60 border border-purple-800/30 text-gray-300 hover:text-white hover:border-purple-500/50'}
            `}
          >
            Photos
          </button>
          
          <button
            onClick={() => setFilter('video')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${filter === 'video'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-black/60 border border-purple-800/30 text-gray-300 hover:text-white hover:border-purple-500/50'}
            `}
          >
            Vidéos
          </button>
          
          {uniqueEvents.map(event => (
            <button
              key={event}
              onClick={() => setFilter(event)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === event
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-black/60 border border-purple-800/30 text-gray-300 hover:text-white hover:border-purple-500/50'}
              `}
            >
              {event}
            </button>
          ))}
        </div>
        
        {/* Grille de galerie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] cursor-pointer group"
              onClick={() => openModal(item)}
            >
              {/* Thumbnail */}
              <div className="h-48 md:h-56 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                
                {/* Ici serait l'image ou la vidéo thumbnail - placeholder pour le moment */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/80"></div>
                
                {item.type === 'video' && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-600/80 rounded-full flex items-center justify-center z-20 group-hover:bg-purple-500 transition-all">
                    <FaPlay className="text-white ml-1" />
                  </span>
                )}
                
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-purple-300 text-xs rounded-full z-10 border border-purple-500/30">
                  {item.event}
                </span>
              </div>
              
              {/* Informations */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal */}
        {modalOpen && currentItem && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-all"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="relative w-full max-w-5xl">
              {/* Navigation */}
              <button
                onClick={goToPrev}
                className="absolute left-2 md:-left-12 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-all z-10"
              >
                <FaChevronLeft />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-2 md:-right-12 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-all z-10"
              >
                <FaChevronRight />
              </button>
              
              {/* Contenu du modal */}
              <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
                  {currentItem.type === 'image' ? (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-black/80"></div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-black/80 flex items-center justify-center">
                      <FaPlay className="text-white text-4xl" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{currentItem.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">{currentItem.date}</p>
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full border border-purple-500/30">
                      {currentItem.event}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection; 