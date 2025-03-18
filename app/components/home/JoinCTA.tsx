import Link from 'next/link';

export default function OrganizationStructure() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Arrière-plan avec effet cyberpunk */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-red-900/20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Lignes néon */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        
        {/* Cercles lumineux */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-red-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm border border-violet-800/30 rounded-xl p-8 md:p-12 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Structure <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-red-400 bg-clip-text text-transparent">Organisationnelle</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Notre compagnie libre s'organise selon une hiérarchie claire qui permet à chaque membre de trouver sa place et d'évoluer au sein de notre communauté.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <RankCard 
              title="Maîtres de Guilde" 
              description="Définissent la vision et les objectifs stratégiques de la compagnie libre."
              color="from-red-600 to-violet-600"
            />
            <RankCard 
              title="Officiers" 
              description="Coordonnent les activités quotidiennes et assurent le bon fonctionnement de la compagnie."
              color="from-violet-600 to-blue-600"
            />
            <RankCard 
              title="Vétérans" 
              description="Partagent leur expertise et encadrent les nouveaux venus dans leur progression."
              color="from-blue-600 to-cyan-600"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <RankCard 
              title="Membres" 
              description="Participent activement à la vie de la compagnie et contribuent à son développement."
              color="from-cyan-600 to-emerald-600"
            />
            <RankCard 
              title="Recrues" 
              description="Nouveaux venus en période d'intégration qui découvrent le fonctionnement de notre communauté."
              color="from-emerald-600 to-yellow-600"
            />
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/recrutement" 
              className="px-10 py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-red-600 text-white font-bold rounded-md hover:from-violet-700 hover:via-blue-700 hover:to-red-700 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] group relative overflow-hidden"
            >
              <span className="relative z-10">Rejoindre notre compagnie</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface RankCardProps {
  title: string;
  description: string;
  color: string;
}

function RankCard({ title, description, color }: RankCardProps) {
  return (
    <div className="bg-black/60 border border-violet-900/30 rounded-lg p-6 relative group hover:-translate-y-1 transition-all duration-300">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 blur-md -z-10 transition-opacity duration-300`}></div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
      
      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${color} group-hover:w-full transition-all duration-500`}></div>
    </div>
  );
} 

