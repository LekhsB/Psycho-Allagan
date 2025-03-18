"use client";

import React, { useState } from 'react';
import { roles } from '@/app/data/classes';
import { FaShieldAlt, FaUserInjured, FaSwords } from 'react-icons/fa';
import { GiArrowsShield, GiSwordWound, GiHealing } from 'react-icons/gi';

export default function RoleGuides() {
  const [activeTab, setActiveTab] = useState<'tank' | 'dps' | 'healer'>('tank');
  
  const roleIcons = {
    tank: <GiArrowsShield className="w-10 h-10" />,
    dps: <GiSwordWound className="w-10 h-10" />,
    healer: <GiHealing className="w-10 h-10" />
  };
  
  return (
    <section id="role-guides" className="py-16 bg-violet-950/20 relative">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-r from-violet-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
            Comprendre les Rôles
          </span>
        </h2>
        
        <p className="text-gray-300 text-center max-w-4xl mx-auto mb-12">
          Chaque rôle dans Final Fantasy XIV a des responsabilités spécifiques et est essentiel au succès de l'équipe. 
          Découvrez les particularités de chaque rôle et comment excellez dans votre position.
        </p>
        
        {/* Onglets des rôles */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-black/50 rounded-lg p-1">
            <TabButton 
              active={activeTab === 'tank'} 
              onClick={() => setActiveTab('tank')} 
              gradientColors="from-blue-600 to-cyan-600"
              icon={<GiArrowsShield className="w-5 h-5" />}
              label="Tank"
            />
            <TabButton 
              active={activeTab === 'dps'} 
              onClick={() => setActiveTab('dps')} 
              gradientColors="from-red-600 to-orange-600"
              icon={<GiSwordWound className="w-5 h-5" />}
              label="DPS"
            />
            <TabButton 
              active={activeTab === 'healer'} 
              onClick={() => setActiveTab('healer')} 
              gradientColors="from-green-600 to-emerald-600"
              icon={<GiHealing className="w-5 h-5" />}
              label="Healer"
            />
          </div>
        </div>
        
        {/* Contenu du rôle actif */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Icône et description générale */}
          <div className="w-full md:w-1/3">
            <div className="bg-black/60 border border-violet-900/30 rounded-lg p-6 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${roles[activeTab].color} flex items-center justify-center`}>
                  {roleIcons[activeTab]}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {roles[activeTab].name}
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                {roles[activeTab].description}
              </p>
              
              <h4 className="text-lg font-semibold text-white mb-4">
                Responsabilités principales
              </h4>
              
              <ul className="space-y-2">
                {roles[activeTab].responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${roles[activeTab].color} flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5`}>
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{resp}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Guides stratégiques */}
          <div className="w-full md:w-2/3">
            <div className="bg-black/60 border border-violet-900/30 rounded-lg p-6">
              <RoleContent role={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  gradientColors: string;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, gradientColors, icon, label }: TabButtonProps) {
  return (
    <button
      className={`px-5 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
        active 
          ? `bg-gradient-to-r ${gradientColors} text-white` 
          : 'text-gray-400 hover:text-white'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

interface RoleContentProps {
  role: 'tank' | 'dps' | 'healer';
}

function RoleContent({ role }: RoleContentProps) {
  const content = {
    tank: {
      title: "Maîtriser le rôle de Tank",
      sections: [
        {
          title: "Gestion de l'aggro",
          content: "Le tank doit maintenir l'attention de tous les ennemis pour protéger ses alliés. Commencez les combats avec vos techniques de génération d'aggro et utilisez régulièrement vos capacités AoE pour maintenir l'attention des groupes d'ennemis. Surveillez constamment les barres d'aggro pour vous assurer que tous les ennemis sont bien sur vous.",
        },
        {
          title: "Positionnement des boss",
          content: "Le positionnement est crucial pour faciliter le travail de votre équipe. Placez généralement les boss face à vous et dos à l'équipe, en les maintenant immobiles autant que possible. Prenez en compte les attaques directionnelles et les mécaniques spécifiques. Communiquez avant le combat pour établir les positions clés.",
        },
        {
          title: "Mitigation proactive",
          content: "Anticipez les dégâts importants plutôt que de réagir. Apprenez les patterns des boss et utilisez vos cooldowns défensifs avant les attaques majeures. Échelonnez vos mitigations plutôt que de les utiliser toutes en même temps. Coordonnez-vous avec votre co-tank pour les tank swaps et les mitigations partagées.",
        },
        {
          title: "Maximiser vos DPS",
          content: "Bien que votre rôle principal soit de protéger l'équipe, maximiser vos dégâts reste important. Maintenez vos GCDs roulants et utilisez vos oGCDs dès qu'ils sont disponibles. Apprenez les rotations optimales pour votre classe et pratiquez-les jusqu'à ce qu'elles deviennent automatiques.",
        },
      ],
      tips: [
        "Utilisez le « Focus Target » sur le boss pour surveiller ses casts même lorsque vous devez vous occuper d'autres cibles",
        "Établissez des macros pour annoncer vos invulnérabilités et mitigations majeures",
        "Configurez des barres d'action spécifiques pour suivre les cooldowns importants",
        "Pratiquez chaque donjon d'abord en DPS ou Healer pour comprendre les mécaniques avant de tank"
      ]
    },
    dps: {
      title: "Exceller en tant que DPS",
      sections: [
        {
          title: "Optimisation des rotations",
          content: "La clé du succès en DPS est la maîtrise de votre rotation. Apprenez la séquence optimale de vos compétences et maintenez un uptime maximum sur la cible. Priorisez vos buffs et débuffs, et synchronisez vos phases de burst avec les fenêtres de buff de l'équipe. L'utilisation efficace des oGCDs entre vos GCDs est essentielle pour maximiser votre output.",
        },
        {
          title: "Gestion des mécaniques",
          content: "Un bon DPS ne se contente pas de faire des dégâts, mais gère également parfaitement les mécaniques. Anticipez les patterns pour minimiser les mouvements inutiles. Utilisez les temps de rechargement des compétences ou les instants de transition pour gérer les mécaniques. Ne sacrifiez jamais la réussite du combat pour quelques points de DPS supplémentaires.",
        },
        {
          title: "Adaptation situationnelle",
          content: "Adaptez votre jeu selon le contenu. En AoE, utilisez vos compétences multi-cibles. Pour les add phases, identifiez les priorités de ciblage. Dans les phases critiques, réservez vos ressources et cooldowns pour maximiser l'efficacité. Une bonne analyse de la situation vous distinguera d'un DPS moyen.",
        },
        {
          title: "Synergie d'équipe",
          content: "Comprendre comment votre classe interagit avec les autres est crucial. Connaissez vos buffs d'équipe et leur timing optimal. Communiquez pour coordonner les burst windows. Aidez à l'occasion avec des utilitaires comme les interruptions, purifications ou mitigations partagées si votre classe le permet.",
        },
      ],
      tips: [
        "Utilisez un parseur (si autorisé) pour analyser vos performances et identifier les points d'amélioration",
        "Entraînez-vous sur des mannequins d'entraînement jusqu'à ce que votre rotation devienne une seconde nature",
        "Configurez votre UI pour suivre facilement vos procs et cooldowns importants",
        "Étudiez des POV de joueurs expérimentés de votre classe pour apprendre des optimisations avancées"
      ]
    },
    healer: {
      title: "L'art du Healing",
      sections: [
        {
          title: "Équilibre entre soin et DPS",
          content: "Un excellent healer optimise constamment entre soigner et infliger des dégâts. La règle d'or: soignez uniquement quand c'est nécessaire. Utilisez vos HoTs et boucliers préventivement pour minimiser les soins directs. Quand l'équipe est stable, contribuez aux DPS. Chaque GCD de dégâts compte pour aider l'équipe à passer les phases plus rapidement.",
        },
        {
          title: "Gestion des ressources",
          content: "La gestion efficace du mana est fondamentale pour un healer. Priorisez les sorts efficaces en termes de mana/soin. Utilisez vos capacités de régénération de mana de manière stratégique. Ne gaspillez pas de ressources en sursoignant. Planifiez l'utilisation de vos cooldowns en fonction des phases de combat pour maximiser leur efficacité.",
        },
        {
          title: "Anticipation des dégâts",
          content: "Un healer proactif est plus efficace qu'un healer réactif. Mémorisez les timelines des boss et anticipez les dégâts massifs. Préparez vos mitigations et soins de zone avant les attaques raid-wide. Surveillez le cast bar des boss pour les tankbusters et préparez vos soins importants en conséquence.",
        },
        {
          title: "Sauvetage d'urgence",
          content: "Même les meilleures équipes font face à des situations imprévues. Maîtrisez vos capacités de sauvetage d'urgence. Apprenez à prioriser les soins quand plusieurs membres sont en danger. Sachez quand utiliser vos cooldowns majeurs pour stabiliser rapidement la situation. La résurrection en combat est une compétence cruciale - choisissez judicieusement qui ressusciter en premier.",
        }
      ],
      tips: [
        "Configurez des mouseover macros pour soigner sans changer de cible",
        "Utilisez des filtres de chat pour suivre vos actions de soin importantes",
        "Créez des barres de focus pour surveiller la santé du tank même en ciblant les ennemis pour DPS",
        "Communiquez avec votre co-healer pour coordonner les cooldowns majeurs et éviter le sursoignement"
      ]
    }
  };
  
  const currentContent = content[role];
  
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
        {currentContent.title}
      </h3>
      
      <div className="space-y-6 mb-8">
        {currentContent.sections.map((section, index) => (
          <div key={index} className="bg-black/40 border border-violet-900/20 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">
              {section.title}
            </h4>
            <p className="text-gray-300">
              {section.content}
            </p>
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 border-b border-violet-900/30 pb-2">
          Astuces avancées
        </h4>
        <ul className="space-y-2">
          {currentContent.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${roles[role].color} flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5`}>
                ✓
              </div>
              <p className="text-gray-300">{tip}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 text-center">
        <a href="#" className="px-6 py-3 inline-block bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-md font-semibold hover:from-violet-700 hover:to-blue-700 transition-all">
          Guide complet sur le rôle de {roles[role].name}
        </a>
      </div>
    </div>
  );
} 