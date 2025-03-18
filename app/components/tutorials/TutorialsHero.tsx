export default function TutorialsHero() {
  return (
    <div className="relative py-20 flex items-center overflow-hidden">
      {/* Arrière-plan avec effet cyberpunk */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/70 to-black"></div>
        <div className="absolute inset-0 bg-[url('/tutorials-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Lignes néon */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="block text-white">Centre de</span>
            <span className="block bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
              Tutoriels & Guides
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Explorez nos guides détaillés pour maîtriser chaque classe, comprendre les rôles, optimiser vos rotations et équipements, et devenir un joueur d'élite en PvE et PvP.
          </p>
          
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 