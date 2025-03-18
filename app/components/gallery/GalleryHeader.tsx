"use client";

import { motion } from "framer-motion";

export default function GalleryHeader() {
  return (
    <div className="w-full text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Galerie
        </h1>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-gray-300 max-w-3xl mx-auto"
      >
        Plongez dans nos aventures à travers Éorzéa avec notre collection d'images, clips et vidéos.
        Partagez vos propres souvenirs et découvrez les moments immortalisés par nos membres.
      </motion.p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <StatsCounter label="Images" count={358} />
        <StatsCounter label="Vidéos" count={47} />
        <StatsCounter label="Contributeurs" count={24} />
      </div>
    </div>
  );
}

function StatsCounter({ label, count }: { label: string; count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="bg-black/40 backdrop-blur-sm border border-violet-500/30 rounded-lg p-4 flex flex-col items-center min-w-[100px]"
    >
      <span className="text-2xl font-bold text-white">{count}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </motion.div>
  );
} 