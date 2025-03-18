"use client";

import { useState } from 'react';
import classesData from '@/app/data/classes';
import { GiDiamondHard, GiSwordArray, GiCheckedShield, GiCrossedSwords } from 'react-icons/gi';

export default function BuildsRotations() {
  const [activeTab, setActiveTab] = useState<'raid' | 'dungeon' | 'pvp'>('raid');
  const [selectedClass, setSelectedClass] = useState<string | null>('black-mage'); // BLM comme classe par défaut
  
  const selectedClassData = classesData.find(c => c.id === selectedClass);
  
  return (
    <section id="builds-rotations" className="py-16 bg-black/90 relative">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-r from-transparent to-red-500"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
            Builds & Rotations
          </span>
        </h2>
        
        <p className="text-gray-300 text-center max-w-4xl mx-auto mb-12">
          Optimisez votre performance avec des builds adaptés à chaque situation et des rotations 
          finement calibrées. Des guides spécifiques pour les raids, les donjons et le PvP vous 
          permettront de tirer le maximum de votre classe.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sélecteur de classe */}
          <div className="md:col-span-1">
            <div className="bg-black/60 border border-violet-900/30 rounded-lg p-4 sticky top-20">
              <h3 className="text-lg font-semibold text-white mb-4 px-2">
                Classes
              </h3>
              
              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-black">
                {/* Group by role */}
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-blue-400 mb-1 px-2">Tanks</h4>
                  {classesData.filter(c => c.role === 'tank').map(classItem => (
                    <ClassButton 
                      key={classItem.id}
                      classItem={classItem}
                      isSelected={selectedClass === classItem.id}
                      onClick={() => setSelectedClass(classItem.id)}
                    />
                  ))}
                </div>
                
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-green-400 mb-1 px-2">Healers</h4>
                  {classesData.filter(c => c.role === 'healer').map(classItem => (
                    <ClassButton 
                      key={classItem.id}
                      classItem={classItem}
                      isSelected={selectedClass === classItem.id}
                      onClick={() => setSelectedClass(classItem.id)}
                    />
                  ))}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-1 px-2">DPS</h4>
                  {classesData.filter(c => c.role === 'dps').map(classItem => (
                    <ClassButton 
                      key={classItem.id}
                      classItem={classItem}
                      isSelected={selectedClass === classItem.id}
                      onClick={() => setSelectedClass(classItem.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="md:col-span-3">
            {selectedClassData && (
              <div className="bg-black/60 border border-violet-900/30 rounded-lg p-6">
                {/* En-tête avec nom et onglets */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                      {selectedClassData.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {selectedClassData.name}
                      </h3>
                      <div className="text-gray-400">
                        {selectedClassData.abbreviation} · {selectedClassData.role === 'tank' ? 'Tank' : selectedClassData.role === 'healer' ? 'Healer' : 'DPS'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex bg-black/50 rounded-lg p-1">
                    <ContentTabButton 
                      active={activeTab === 'raid'} 
                      onClick={() => setActiveTab('raid')} 
                      icon={<GiDiamondHard className="w-4 h-4" />}
                      label="Raids"
                    />
                    <ContentTabButton 
                      active={activeTab === 'dungeon'} 
                      onClick={() => setActiveTab('dungeon')} 
                      icon={<GiSwordArray className="w-4 h-4" />}
                      label="Donjons"
                    />
                    <ContentTabButton 
                      active={activeTab === 'pvp'} 
                      onClick={() => setActiveTab('pvp')} 
                      icon={<GiCrossedSwords className="w-4 h-4" />}
                      label="PvP"
                    />
                  </div>
                </div>
                
                {/* Contenu selon l'onglet */}
                <ContentTab 
                  type={activeTab} 
                  classItem={selectedClassData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ClassButtonProps {
  classItem: any;
  isSelected: boolean;
  onClick: () => void;
}

function ClassButton({ classItem, isSelected, onClick }: ClassButtonProps) {
  return (
    <button
      className={`w-full text-left px-2 py-1.5 rounded-md transition-all text-sm flex items-center gap-2 ${
        isSelected 
          ? 'bg-gradient-to-r from-violet-600/40 to-blue-600/40 text-white' 
          : 'text-gray-400 hover:bg-violet-900/20 hover:text-white'
      }`}
      onClick={onClick}
    >
      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">{classItem.icon}</span>
      <span>{classItem.abbreviation}</span>
    </button>
  );
}

interface ContentTabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function ContentTabButton({ active, onClick, icon, label }: ContentTabButtonProps) {
  return (
    <button
      className={`px-3 py-1.5 rounded-md transition-all duration-300 flex items-center gap-1.5 text-sm ${
        active 
          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white' 
          : 'text-gray-400 hover:text-white'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

interface ContentTabProps {
  type: 'raid' | 'dungeon' | 'pvp';
  classItem: any;
}

function ContentTab({ type, classItem }: ContentTabProps) {
  // Contenus fictifs pour la démonstration
  const contents = {
    raid: {
      title: `Optimisation pour Raids - ${classItem.name}`,
      description: "Cette rotation et ce build sont optimisés pour le contenu de raid de haut niveau, maximisant le DPS soutenu et la synergie avec l'équipe.",
      opener: `1. Pré-pot → 2. ${classItem.abbreviation} précombat buffs → 3. Premier GCD + oGCDs → 4. Continuer rotation principale → 5. Alignement avec fenêtres de buff de raid à 2 minutes`,
      priorities: [
        "Maintenir alignement avec fenêtres de buff de raid (2min/6min/8min)",
        "Optimiser l'utilisation des ressources de classe",
        "Minimiser les mouvements pendant les phases de DPS",
        "Prioriser la survie lors des mécaniques critiques"
      ],
      stats: {
        primary: classItem.primaryStat,
        secondary: ["Critique", "Détermination", "Vitesse d'action"],
        meld: "Cristaux de Critique X jusqu'au cap, puis Détermination"
      },
      rotation: {
        opener: "Séquence d'ouverture optimisée pour raid",
        burst: "Cycle de burst aligné avec les fenêtres de buff de raid (2min)",
        sustained: "Phase de maintien entre les fenêtres de burst"
      }
    },
    dungeon: {
      title: `Build Donjon - ${classItem.name}`,
      description: "Ce build se concentre sur l'efficacité en AoE pour les packs de mobs et la régénération de ressources entre les pulls.",
      opener: `1. AoE principale → 2. Cooldowns AoE → 3. Rotation AoE principale → 4. Finishers sur cibles à basse santé`,
      priorities: [
        "Maximiser les dégâts AoE sur les packs de mobs",
        "Conserver certains cooldowns pour les boss",
        "Régénérer les ressources entre les pulls",
        "Soutenir le tank pour les grands pulls"
      ],
      stats: {
        primary: classItem.primaryStat,
        secondary: ["Direct Hit", "Critique", "Détermination"],
        meld: "Équilibre entre Critique et Direct Hit pour AoE optimale"
      },
      rotation: {
        opener: "Cycle AoE optimal pour groupes de mobs",
        burst: "Cycle burst pour boss de donjon",
        sustained: "Rotation de maintenance et régénération"
      }
    },
    pvp: {
      title: `Stratégie PvP - ${classItem.name}`,
      description: "Cette configuration est optimisée pour le PvP, privilégiant les burst rapides et la survivabilité en situation de combat contre d'autres joueurs.",
      opener: `1. Approche → 2. CC (si disponible) → 3. Burst complet → 4. Finisher ou sortie`,
      priorities: [
        "Chercher les cibles prioritaires (healers/buffers)",
        "Synchroniser les CC et burst avec l'équipe",
        "Savoir quand se replier et quand pousser",
        "Utiliser le terrain à votre avantage"
      ],
      stats: {
        primary: classItem.primaryStat,
        secondary: ["Ténacité", "Détermination", "Direct Hit"],
        meld: "Ténacité maximale, puis équilibre DH/Det pour burst"
      },
      rotation: {
        opener: "Séquence d'approche et d'engagement",
        burst: "Combo burst maximum pour élimination rapide",
        sustained: "Jeu défensif et repositionnement"
      }
    }
  };
  
  const content = contents[type];
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          {content.title}
        </h3>
        <p className="text-gray-300 mb-6">
          {content.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 border border-violet-900/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <GiSwordArray className="text-violet-400" />
            Rotation Optimale
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-blue-400 font-semibold mb-1">Opener</h5>
              <p className="text-gray-300">{content.rotation.opener}</p>
            </div>
            <div>
              <h5 className="text-blue-400 font-semibold mb-1">Phase de Burst</h5>
              <p className="text-gray-300">{content.rotation.burst}</p>
            </div>
            <div>
              <h5 className="text-blue-400 font-semibold mb-1">Phase de Maintien</h5>
              <p className="text-gray-300">{content.rotation.sustained}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-black/40 border border-violet-900/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <GiDiamondHard className="text-violet-400" />
            Statistiques & Matéria
          </h4>
          <div className="space-y-2">
            <div>
              <div className="text-blue-400 font-semibold">Statistique Principale</div>
              <p className="text-gray-300">{content.stats.primary}</p>
            </div>
            <div>
              <div className="text-blue-400 font-semibold">Statistiques Secondaires (par ordre)</div>
              <p className="text-gray-300">{content.stats.secondary.join(' > ')}</p>
            </div>
            <div>
              <div className="text-blue-400 font-semibold">Recommandation de Matéria</div>
              <p className="text-gray-300">{content.stats.meld}</p>
            </div>
          </div>
          
          <h4 className="text-lg font-semibold text-white mt-6 mb-3 flex items-center gap-2">
            <GiCheckedShield className="text-violet-400" />
            Priorités
          </h4>
          <ul className="space-y-1">
            {content.priorities.map((priority, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-violet-400 font-bold">•</span>
                <span className="text-gray-300">{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="pt-4">
        <div className="border-t border-violet-900/30 pt-6 flex flex-wrap gap-4 justify-center">
          <a href="#" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-md text-sm hover:from-violet-700 hover:to-blue-700 transition-all">
            Guide détaillé de rotation
          </a>
          <a href="#" className="px-4 py-2 bg-black border border-violet-500/50 text-white rounded-md text-sm hover:bg-violet-900/20 transition-all">
            Vidéo de démonstration
          </a>
          <a href="#" className="px-4 py-2 bg-black border border-violet-500/50 text-white rounded-md text-sm hover:bg-violet-900/20 transition-all">
            Set d'équipement recommandé
          </a>
        </div>
      </div>
    </div>
  );
} 