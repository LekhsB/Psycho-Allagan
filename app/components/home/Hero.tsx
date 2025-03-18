import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Arrière-plan avec effet cyberpunk */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/70 to-black"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Lignes néon */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block text-white">Bienvenue chez</span>
              <span className="block bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
                Psycho Allagan
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Une compagnie libre dédiée à l'entraide, la progression et la convivialité. Notre mission est de créer un espace où chaque aventurier peut s'épanouir, progresser et partager des moments inoubliables dans le monde d'Éorzéa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="#features" 
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold rounded-md hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]"
              >
                Découvrir notre compagnie
              </Link>
              <Link 
                href="/profile" 
                className="px-8 py-3 bg-transparent border border-red-500 text-red-400 font-bold rounded-md hover:bg-red-500/10 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              >
                Espace membre
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-8 md:mt-0 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 via-blue-600 to-red-600 animate-pulse opacity-70 blur-xl"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-red-500 overflow-hidden border-2 border-white/10">
                {/* Logo de la FC */}
                <Image 
                  src="/psycho-allagan-logo.svg"
                  alt="Psycho Allagan"
                  fill
                  className="p-8"
                />
              </div>
              <div className="absolute -inset-1 rounded-full border border-violet-500/50 animate-spin-slow"></div>
              <div className="absolute -inset-2 rounded-full border border-blue-500/30 animate-reverse-spin-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
