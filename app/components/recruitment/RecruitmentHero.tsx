"use client";

import { motion } from "framer-motion";

export default function RecruitmentHero() {
  return (
    <div className="w-full text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Rejoignez nos rangs
        </h1>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-gray-300 max-w-3xl mx-auto"
      >
        Vous souhaitez intégrer la compagnie libre Psycho Allagan ? Découvrez notre processus de recrutement 
        et soumettez votre candidature ci-dessous. Nous recherchons des joueurs passionnés, 
        respectueux et motivés pour partager notre aventure dans Éorzéa.
      </motion.p>
      
      <div className="mt-8 w-full max-w-3xl mx-auto h-[3px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-60"></div>
    </div>
  );
} 