"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaLock, FaUsers, FaUserAlt, FaChartLine, FaListAlt, FaTools, FaCommentAlt } from "react-icons/fa";
import { GiArmorUpgrade, GiSwordWound, GiMagnifyingGlass } from "react-icons/gi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export default function RosterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Vérifier que l'utilisateur a le bon rôle pour accéder à cette page
  useEffect(() => {
    // Attendre que le statut d'authentification soit résolu
    if (status === "loading") return;

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    // Vérifier que l'utilisateur a le rôle approprié (admin ou roster)
    const userRole = session?.user?.role;
    if (userRole !== "admin" && userRole !== "roster") {
      // Rediriger vers la page d'accueil si l'utilisateur n'a pas les permissions nécessaires
      router.push("/");
      return;
    }

    setLoading(false);
  }, [status, session, router]);

  // Si chargement en cours, afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  // Données temporaires pour la démo
  const teammembers = [
    { id: 1, name: "Aelina Starfire", job: "Warrior", avatar: "/images/avatars/tank1.jpg", ilvl: 660, bis: 85, lastRaid: "2023-04-15", lastFFLogs: "92.5" },
    { id: 2, name: "Soren Lightheart", job: "White Mage", avatar: "/images/avatars/healer1.jpg", ilvl: 657, bis: 74, lastRaid: "2023-04-15", lastFFLogs: "88.7" },
    { id: 3, name: "Thaliak Duskblade", job: "Black Mage", avatar: "/images/avatars/dps1.jpg", ilvl: 662, bis: 96, lastRaid: "2023-04-15", lastFFLogs: "95.2" },
    { id: 4, name: "Faye Silverwind", job: "Ninja", avatar: "/images/avatars/dps2.jpg", ilvl: 659, bis: 82, lastRaid: "2023-04-15", lastFFLogs: "90.1" },
    { id: 5, name: "Thordan Ironwill", job: "Paladin", avatar: "/images/avatars/tank2.jpg", ilvl: 656, bis: 68, lastRaid: "2023-04-10", lastFFLogs: "87.3" },
    { id: 6, name: "Lilja Moonwhisper", job: "Astrologian", avatar: "/images/avatars/healer2.jpg", ilvl: 658, bis: 78, lastRaid: "2023-04-10", lastFFLogs: "89.6" },
    { id: 7, name: "Cyrus Flameblade", job: "Samurai", avatar: "/images/avatars/dps3.jpg", ilvl: 661, bis: 91, lastRaid: "2023-04-10", lastFFLogs: "93.8" },
    { id: 8, name: "Zephyr Stormcaller", job: "Dragoon", avatar: "/images/avatars/dps4.jpg", ilvl: 657, bis: 76, lastRaid: "2023-04-10", lastFFLogs: "86.9" },
  ];

  const recentFights = [
    { id: 1, boss: "Pandaemonium P12S", date: "2023-04-15", duration: "9:32", wipes: 2, success: true, dps: "92.4", healing: "88.7", mitigation: "91.2", mechanics: "85.9" },
    { id: 2, boss: "Pandaemonium P11S", date: "2023-04-15", duration: "7:18", wipes: 0, success: true, dps: "93.8", healing: "90.2", mitigation: "88.5", mechanics: "94.7" },
    { id: 3, boss: "Pandaemonium P10S", date: "2023-04-10", duration: "6:45", wipes: 1, success: true, dps: "95.1", healing: "87.3", mitigation: "90.8", mechanics: "92.3" },
    { id: 4, boss: "The Omega Protocol", date: "2023-04-08", duration: "14:25", wipes: 5, success: false, dps: "88.9", healing: "83.6", mitigation: "85.4", mechanics: "79.2" },
  ];

  const feedback = [
    { id: 1, from: "Aelina Starfire", date: "2023-04-16", content: "Excellente gestion des cooldowns pendant la phase finale. Continuer à améliorer le timing sur les tank busters." },
    { id: 2, from: "Soren Lightheart", date: "2023-04-15", content: "Bon positionnement global, mais attention aux mécaniques de spread pendant Ultima. Rester vigilant sur les purges de debuffs." },
    { id: 3, from: "Thaliak Duskblade", date: "2023-04-12", content: "DPS en constante amélioration. Penser à optimiser l'utilisation des buffs raid pour maximiser les fenêtres de burst." },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center mr-3">
            <FaUsers className="text-violet-400 text-xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500">
            Roster de Raid
          </h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Centre de gestion des équipes de raid, suivi des équipements et analyse des performances.
          Ces informations sont réservées aux gestionnaires de roster et administrateurs.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 rounded-full mt-4"></div>
      </div>

      <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 p-4 md:p-6 mb-8">
        <div className="flex items-center text-yellow-400 mb-4">
          <FaLock className="mr-2" />
          <h2 className="text-lg font-semibold">Accès Restreint</h2>
        </div>
        <p className="text-gray-300">
          Cet espace est dédié à la gestion des équipes de raid et à l'analyse des performances des membres.
          Les informations présentées ici sont confidentielles et destinées uniquement aux officiers de raid.
        </p>
      </div>

      <Tabs defaultValue="team" className="w-full">
        <TabsList className="mb-8 flex justify-center md:justify-start">
          <TabsTrigger value="team" className="px-4 py-2 flex items-center">
            <div className="w-5 h-5 mr-2 text-blue-400">
              <FaUsers />
            </div>
            Équipe
          </TabsTrigger>
          <TabsTrigger value="personal" className="px-4 py-2 flex items-center">
            <div className="w-5 h-5 mr-2 text-purple-400">
              <FaUserAlt />
            </div>
            Personnel
          </TabsTrigger>
        </TabsList>

        {/* Contenu Équipe */}
        <TabsContent value="team" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Gestion de l'Équipe</h2>
            <p className="text-gray-300 mb-6">
              Suivi des équipements, progression BIS et analyse des performances en équipe.
            </p>
            
            {/* Tableau des membres */}
            <div className="bg-black/50 border border-blue-500/20 rounded-lg p-4 overflow-x-auto mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <GiArmorUpgrade className="mr-2 text-blue-400" />
                Équipement et BIS
              </h3>
              
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-blue-900/30 text-blue-200">
                  <tr>
                    <th className="p-3 rounded-tl-md">Membre</th>
                    <th className="p-3">Job</th>
                    <th className="p-3">iLvl</th>
                    <th className="p-3">BIS%</th>
                    <th className="p-3">Dernier Raid</th>
                    <th className="p-3">FFLogs</th>
                    <th className="p-3 rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/20">
                  {teammembers.map((member) => (
                    <tr key={member.id} className="hover:bg-blue-900/10 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <Image 
                              src={member.avatar} 
                              alt={member.name} 
                              width={40} 
                              height={40} 
                              className="rounded-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-white">{member.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">{member.job}</td>
                      <td className="p-3">
                        <span className="text-yellow-400 font-medium">{member.ilvl}</span>
                      </td>
                      <td className="p-3">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-violet-600 h-2.5 rounded-full" 
                            style={{ width: `${member.bis}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{member.bis}%</span>
                      </td>
                      <td className="p-3 text-gray-300">{member.lastRaid}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          parseFloat(member.lastFFLogs) > 90 ? 'bg-orange-500/20 text-orange-300' :
                          parseFloat(member.lastFFLogs) > 80 ? 'bg-purple-500/20 text-purple-300' :
                          parseFloat(member.lastFFLogs) > 70 ? 'bg-blue-500/20 text-blue-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {member.lastFFLogs}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="p-1.5 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors">
                            <GiMagnifyingGlass />
                          </button>
                          <button className="p-1.5 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors">
                            <FaTools />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Intégration des logs */}
            <div className="bg-black/50 border border-blue-500/20 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaChartLine className="mr-2 text-blue-400" />
                Logs de Combat Récents
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentFights.map((fight) => (
                  <div key={fight.id} className={`border ${fight.success ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'} rounded-lg p-4`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">{fight.boss}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${fight.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {fight.success ? 'Clear' : 'Wipe'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-400 mb-3">
                      <span>{fight.date}</span> · <span>Durée: {fight.duration}</span> · <span>Wipes: {fight.wipes}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">DPS</p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full" 
                            style={{ width: `${fight.dps}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{fight.dps}%</span>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Healing</p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full" 
                            style={{ width: `${fight.healing}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{fight.healing}%</span>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Mitigation</p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full" 
                            style={{ width: `${fight.mitigation}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{fight.mitigation}%</span>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Mécaniques</p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                            style={{ width: `${fight.mechanics}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{fight.mechanics}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <Link href="#" className="text-blue-400 text-sm hover:text-blue-300 inline-flex items-center">
                        Voir le détail
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-md hover:bg-blue-900/50 transition-colors inline-flex items-center">
                  <FaChartLine className="mr-2" />
                  Importer des logs depuis FFLogs
                </button>
                <button className="px-4 py-2 bg-violet-900/30 text-violet-400 rounded-md hover:bg-violet-900/50 transition-colors inline-flex items-center ml-3">
                  <FaChartLine className="mr-2" />
                  Importer des logs depuis Tomestone
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contenu Personnel */}
        <TabsContent value="personal" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Analyse Personnelle</h2>
            <p className="text-gray-300 mb-6">
              Performance individuelle, analyse de vos derniers combats et feedback reçus.
            </p>
            
            {/* Analyse du dernier combat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="col-span-1 md:col-span-2 bg-black/50 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FaChartLine className="mr-2 text-purple-400" />
                  Analyse de votre dernier combat
                </h3>
                
                <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white">Pandaemonium P12S</h4>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-300">
                      Clear
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    <span>15 Avril 2023</span> · <span>Durée: 9:32</span> · <span>Job: White Mage</span>
                  </div>
                  
                  {/* Graphique radar (version simplifiée) */}
                  <div className="aspect-square max-w-xs mx-auto mb-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-purple-900/20 rounded-full"></div>
                      <div className="w-[80%] h-[80%] bg-purple-900/20 rounded-full absolute"></div>
                      <div className="w-[60%] h-[60%] bg-purple-900/20 rounded-full absolute"></div>
                      <div className="w-[40%] h-[40%] bg-purple-900/20 rounded-full absolute"></div>
                      <div className="w-[20%] h-[20%] bg-purple-900/20 rounded-full absolute"></div>
                      
                      {/* Points de données (version simplifiée sans svg réel) */}
                      <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 text-xs text-gray-300">DPS</div>
                      <div className="absolute top-[30%] right-[5%] text-xs text-gray-300">Healing</div>
                      <div className="absolute bottom-[5%] right-[30%] text-xs text-gray-300">Mitigation</div>
                      <div className="absolute bottom-[5%] left-[30%] text-xs text-gray-300">Mécaniques</div>
                      <div className="absolute top-[30%] left-[5%] text-xs text-gray-300">Mouvement</div>
                      
                      {/* Zone colorée (simplifiée) */}
                      <div className="w-[70%] h-[70%] bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full absolute animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1 text-center">DPS</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 block text-center">78%</span>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1 text-center">Healing</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 block text-center">92%</span>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1 text-center">Mitigation</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                          style={{ width: "86%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 block text-center">86%</span>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1 text-center">Mécaniques</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                          style={{ width: "91%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 block text-center">91%</span>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1 text-center">Mouvement</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                          style={{ width: "74%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 block text-center">74%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link href="#" className="text-purple-400 text-sm hover:text-purple-300 inline-flex items-center">
                      Analyse détaillée
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-md font-semibold text-white mb-2 flex items-center">
                      <GiSwordWound className="text-purple-400 mr-2" />
                      Points Forts
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">Excellent timing des sorts de soin principaux</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">Bonne gestion des ressources de MP</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">Réaction rapide aux dégâts inattendus</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-md font-semibold text-white mb-2 flex items-center">
                      <FaTools className="text-purple-400 mr-2" />
                      Points à Améliorer
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">!</span>
                        <span className="text-gray-300">Plus de DPS pendant les phases calmes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">!</span>
                        <span className="text-gray-300">Optimisation du placement pour les mécaniques</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">!</span>
                        <span className="text-gray-300">Meilleure coordination des mitigations avec co-healer</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Feedbacks */}
              <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FaCommentAlt className="mr-2 text-purple-400" />
                  Feedback Reçu
                </h3>
                
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-white">{item.from}</span>
                        <span className="text-xs text-gray-400">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-300">{item.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <button className="w-full py-2 bg-purple-900/30 text-purple-400 rounded-md hover:bg-purple-900/50 transition-colors inline-flex items-center justify-center">
                    <FaCommentAlt className="mr-2" />
                    Demander un feedback
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">Progression Personnelle</h3>
              <p className="text-gray-300 mb-4">
                Suivez votre évolution et identifiez vos axes d'amélioration pour optimiser vos performances en raid.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-lg p-3 border border-purple-500/20">
                  <h4 className="text-md font-semibold text-white mb-2">Prochain Objectif</h4>
                  <div className="text-sm text-gray-300">
                    <p>Améliorer la rotation DPS en phase de mouvement</p>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">45% complété</span>
                  </div>
                </div>
                
                <div className="bg-black/40 rounded-lg p-3 border border-purple-500/20">
                  <h4 className="text-md font-semibold text-white mb-2">Conseil de la Semaine</h4>
                  <p className="text-sm text-gray-300">
                    Essayez d'utiliser Assize en coordination avec les buffs raid pour maximiser les dégâts tout en soignant.
                  </p>
                </div>
                
                <div className="bg-black/40 rounded-lg p-3 border border-purple-500/20">
                  <h4 className="text-md font-semibold text-white mb-2">Ressources</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <Link href="#" className="text-blue-400 hover:text-blue-300">
                        Guide White Mage Optimisé
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-blue-400 hover:text-blue-300">
                        Vidéo: Healing Avancé P12S
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 