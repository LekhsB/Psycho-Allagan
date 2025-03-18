import { IconType } from "react-icons";
import { 
  FaHistory,
  FaChessRook,
  FaUsers,
  FaBullhorn
} from "react-icons/fa";

export default function Features() {
  return (
    <section className="py-20 bg-black/90 relative overflow-hidden">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-violet-500 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-blue-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-red-500 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-violet-500 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Présentation de <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Psycho Allagan</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Découvrez notre histoire, nos valeurs et notre vision pour construire ensemble une compagnie libre légendaire dans le monde d'Éorzéa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            icon={FaHistory}
            title="Histoire et Valeurs"
            description="Fondée par un petit groupe d'aventuriers passionnés, Psycho Allagan est née de la volonté de créer une communauté basée sur l'entraide, la progression et la convivialité. Notre histoire s'est construite autour de ces valeurs, qui continuent de guider notre évolution."
            gradient="from-violet-600 to-blue-600"
          />
          
          <FeatureCard 
            icon={FaChessRook}
            title="Objectifs et Missions"
            description="Notre vision à long terme est de créer un environnement où chaque membre peut s'épanouir à travers diverses activités : PvE de haut niveau, événements RP immersifs, projets de housing créatifs et une vie sociale enrichissante. Notre engagement premier reste le soutien à la progression de chacun."
            gradient="from-blue-600 to-red-600"
          />
          
          <FeatureCard 
            icon={FaUsers}
            title="Structure de l'Organisation"
            description="Notre hiérarchie s'articule autour de grades distincts : Maîtres de Guilde qui définissent notre direction, Officiers qui coordonnent nos activités, Vétérans qui partagent leur expertise, Membres actifs qui participent à la vie de la CL, et Recrues en période d'intégration."
            gradient="from-red-600 to-violet-600"
          />
          
          <FeatureCard 
            icon={FaBullhorn}
            title="Annonces et Actualités"
            description="Restez informés des derniers développements de notre compagnie : événements à venir, mises à jour importantes, décisions stratégiques et célébrations de nos réussites collectives. Notre communauté évolue constamment grâce à l'implication de tous."
            gradient="from-violet-600 to-red-600"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="bg-black/60 border border-violet-900/50 p-6 rounded-lg relative group hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
      <div className={`h-14 w-14 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(139,92,246,0.3)]`}>
        <Icon className="text-white text-2xl" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
      
      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`}></div>
    </div>
  );
} 
