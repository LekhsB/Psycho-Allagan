"use client";

import React from 'react';
import { FaCalendarAlt, FaMusic, FaCocktail, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-purple-800/30 rounded-lg p-5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

const NightclubHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Arrière-plan avec effet de néon et gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/nightclub-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
      </div>
      
      {/* Effet de grille et de néons */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Éléments lumineux */}
      <div className="absolute top-1/4 left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-20 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl"></div>
      
      {/* Ligne néon horizontale top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Texte de présentation */}
          <div className="w-full md:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="text-white">Psycho </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Nightclub
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mt-4">
                Vivez une expérience nocturne unique où la musique, les lumières et l'ambiance 
                vous transportent dans un univers inspiré de Final Fantasy XIV.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a 
                  href="#events" 
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-900/30"
                >
                  Événements
                </a>
                <a 
                  href="#menu" 
                  className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 text-white rounded-lg font-semibold hover:bg-black/60 hover:border-purple-500/50 transition-all duration-300"
                >
                  Menu
                </a>
              </div>
              
              <div className="pt-6 mt-8 border-t border-purple-900/30">
                <p className="text-gray-400">
                  <span className="text-purple-400 font-semibold">Ouvert: </span> 
                  Jeudi - Dimanche, 21h - 4h | <span className="text-purple-400">Quartier des plaisirs, Limsa Lominsa</span>
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Image ou animation */}
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-[400px] rounded-xl bg-purple-900/20 relative overflow-hidden border border-purple-800/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/20"></div>
                <div className="absolute inset-0 bg-[url('/nightclub-interior.jpg')] bg-cover bg-center opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                {/* Badge flottant */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full z-10">
                  Maintenant Ouvert
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Caractéristiques */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Découvrez l'Expérience
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaCalendarAlt className="text-purple-400" size={24} />}
              title="Événements Thématiques"
              description="Chaque semaine, plongez dans un thème unique inspiré des différentes facettes de l'univers de FFXIV."
            />
            
            <FeatureCard 
              icon={<FaMusic className="text-pink-400" size={24} />}
              title="DJ Résidents"
              description="Nos DJ talentueux mixent des sets exclusifs qui vont du lo-fi aux beats électro pour créer une ambiance inoubliable."
            />
            
            <FeatureCard 
              icon={<FaCocktail className="text-blue-400" size={24} />}
              title="Cocktails Signature"
              description="Dégustez nos boissons spéciales inspirées par les jobs, primals et zones emblématiques du jeu."
            />
            
            <FeatureCard 
              icon={<FaLightbulb className="text-yellow-400" size={24} />}
              title="Spectacle de Lumières"
              description="Un système d'éclairage de pointe synchronisé avec la musique pour une immersion totale."
            />
          </div>
        </div>
      </div>
      
      {/* Ligne néon horizontale bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70"></div>
    </section>
  );
};

export default NightclubHero; 