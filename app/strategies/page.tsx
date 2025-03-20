import { Metadata } from 'next';
import Link from 'next/link';
import { FaLock, FaBook, FaScroll, FaSkull, FaDragon, FaSwords } from 'react-icons/fa';
import { GiDragonHead, GiCrossedSwords, GiMedalSkull } from 'react-icons/gi';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export const metadata: Metadata = {
  title: 'Stratégies de Combat | Psycho Allagan',
  description: 'Guides et stratégies pour les combats de haut niveau dans Final Fantasy XIV',
};

export default function StrategiesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center mr-3">
            <GiCrossedSwords className="text-red-400 text-xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            Stratégies de Combat
          </h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Cette section contient les stratégies et guides pour les combats de haut niveau. 
          Ces informations sont réservées aux membres de la compagnie libre Psycho Allagan.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full mt-4"></div>
      </div>

      <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/20 p-4 md:p-6 mb-8">
        <div className="flex items-center text-yellow-400 mb-4">
          <FaLock className="mr-2" />
          <h2 className="text-lg font-semibold">Contenu Exclusif</h2>
        </div>
        <p className="text-gray-300">
          Les stratégies présentées ici sont le fruit du travail collectif de notre communauté.
          Merci de ne pas les partager à l'extérieur de la compagnie libre. Pour toute question ou 
          suggestion d'amélioration, n'hésitez pas à contacter les officiers raids.
        </p>
      </div>

      <Tabs defaultValue="extreme" className="w-full">
        <TabsList className="mb-8 flex justify-center md:justify-start">
          <TabsTrigger value="extreme" className="px-4 py-2 flex items-center">
            <div className="w-5 h-5 mr-2 text-blue-400">
              <GiCrossedSwords />
            </div>
            Extrême
          </TabsTrigger>
          <TabsTrigger value="savage" className="px-4 py-2 flex items-center">
            <div className="w-5 h-5 mr-2 text-purple-400">
              <GiDragonHead />
            </div>
            Sadique
          </TabsTrigger>
          <TabsTrigger value="ultimate" className="px-4 py-2 flex items-center">
            <div className="w-5 h-5 mr-2 text-red-400">
              <GiMedalSkull />
            </div>
            Fatal
          </TabsTrigger>
          <TabsTrigger value="resources" className="px-4 py-2 flex items-center">
            <div className="w-5 h-5 mr-2 text-green-400">
              <FaBook />
            </div>
            Ressources
          </TabsTrigger>
        </TabsList>

        {/* Contenu Extrême */}
        <TabsContent value="extreme" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Combats Extrême</h2>
            <p className="text-gray-300 mb-6">
              Les combats extrêmes représentent le premier palier de difficulté avancée. Ces stratégies 
              sont conçues pour aider les nouveaux raiders à s'améliorer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Zeromus */}
              <div className="bg-black/50 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/zeromus.jpg" alt="Zeromus" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Zeromus (Extrême)</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Combat final du patch 7.0, introduisant des mécaniques de portails dimensionnels.
                </p>
                <Link 
                  href="/strategies/extreme/zeromus"
                  className="text-blue-400 text-sm hover:text-blue-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Rubicante */}
              <div className="bg-black/50 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/rubicante.jpg" alt="Rubicante" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Rubicante (Extrême)</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Combat élémentaire avec des mécaniques de feu et de positionnements complexes.
                </p>
                <Link 
                  href="/strategies/extreme/rubicante"
                  className="text-blue-400 text-sm hover:text-blue-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contenu Sadique */}
        <TabsContent value="savage" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Raids Sadiques</h2>
            <p className="text-gray-300 mb-6">
              Les raids sadiques sont le contenu de raid principal, avec des mécaniques plus complexes 
              et des exigences élevées en termes de coordination d'équipe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pandaemonium P9S */}
              <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/p9s.jpg" alt="P9S" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Pandaemonium P9S</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Premier étage du raid Pandaemonium: Aphanisis (Sadique)
                </p>
                <Link 
                  href="/strategies/savage/p9s"
                  className="text-purple-400 text-sm hover:text-purple-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Pandaemonium P10S */}
              <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/p10s.jpg" alt="P10S" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Pandaemonium P10S</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Deuxième étage avec des mécaniques de clone et d'illusions complexes.
                </p>
                <Link 
                  href="/strategies/savage/p10s"
                  className="text-purple-400 text-sm hover:text-purple-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Pandaemonium P11S */}
              <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/p11s.jpg" alt="P11S" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Pandaemonium P11S</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Troisième étage avec des mécaniques de gravité et d'inversions dimensionnelles.
                </p>
                <Link 
                  href="/strategies/savage/p11s"
                  className="text-purple-400 text-sm hover:text-purple-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Pandaemonium P12S */}
              <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/p12s.jpg" alt="P12S" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Pandaemonium P12S</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Quatrième et dernier étage, combat final en deux phases distinctes.
                </p>
                <Link 
                  href="/strategies/savage/p12s"
                  className="text-purple-400 text-sm hover:text-purple-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contenu Fatal */}
        <TabsContent value="ultimate" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Raids Fatals</h2>
            <p className="text-gray-300 mb-6">
              Les raids fatals représentent le contenu le plus difficile du jeu, nécessitant des dizaines 
              d'heures de progression et une maîtrise parfaite des classes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* The Omega Protocol */}
              <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 hover:border-red-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/top.jpg" alt="TOP" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Le Protocole Oméga (Fatal)</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Combat en plusieurs phases revisitant les affrontements contre Oméga.
                </p>
                <Link 
                  href="/strategies/ultimate/top"
                  className="text-red-400 text-sm hover:text-red-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Dragonsong War */}
              <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 hover:border-red-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <img src="/images/raids/dsw.jpg" alt="DSW" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Guerre du Chant des Dragons (Fatal)</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Combat épique en sept phases relatant la Guerre du Chant des Dragons.
                </p>
                <Link 
                  href="/strategies/ultimate/dsw"
                  className="text-red-400 text-sm hover:text-red-300 flex items-center"
                >
                  Voir la stratégie
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Ressources et guides */}
        <TabsContent value="resources" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Ressources & Guides</h2>
            <p className="text-gray-300 mb-6">
              Ressources utiles pour améliorer vos performances en raid et comprendre les mécaniques de jeu.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Guide des jobs */}
              <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <FaBook className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Guides des Jobs</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Rotations optimales et conseils pour chaque job.
                </p>
                <Link 
                  href="/strategies/resources/jobs"
                  className="text-green-400 text-sm hover:text-green-300 flex items-center"
                >
                  Consulter
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Outils de raid */}
              <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <FaScroll className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Outils de Raid</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Addons recommandés et outils d'analyse de performance.
                </p>
                <Link 
                  href="/strategies/resources/tools"
                  className="text-green-400 text-sm hover:text-green-300 flex items-center"
                >
                  Consulter
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Macros */}
              <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <FaScroll className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Macros de Raid</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Collection de macros pour faciliter la communication en raid.
                </p>
                <Link 
                  href="/strategies/resources/macros"
                  className="text-green-400 text-sm hover:text-green-300 flex items-center"
                >
                  Consulter
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 