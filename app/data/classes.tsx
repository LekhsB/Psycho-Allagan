import { ReactElement } from 'react';
import { GiTwoHandedSword, GiMagicSwirl, GiHealing, GiArrowsShield, GiAxeSwing, GiPocketBow, GiPunchBlast, GiNinjaStar, GiDuality, GiSaberToothedCatHead, GiSwordWound, GiPistolGun } from 'react-icons/gi';

export interface ClassData {
  id: string;
  name: string;
  abbreviation: string;
  role: 'tank' | 'dps' | 'healer';
  icon: ReactElement;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1-5 scale, 5 being most difficult
  strengths: string[];
  weaknesses: string[];
  primaryStat: string;
  bestPairedWith: string[];
}

export const roles = {
  tank: {
    name: "Tank",
    color: "from-blue-600 to-cyan-600",
    description: "Les tanks sont en première ligne, absorbant les dégâts et protégeant l'équipe. Ils maintiennent l'aggro des ennemis et positionnent les boss.",
    responsibilities: [
      "Maintenir l'aggro des ennemis",
      "Positionner les boss correctement",
      "Utiliser les cooldowns défensifs efficacement",
      "Survivre aux attaques dévastatrices"
    ],
    icon: <GiArrowsShield className="w-6 h-6" />
  },
  dps: {
    name: "DPS",
    color: "from-red-600 to-orange-600",
    description: "Les DPS (Damage Per Second) se concentrent sur l'élimination rapide des ennemis, utilisant des rotations complexes pour maximiser leurs dégâts.",
    responsibilities: [
      "Maximiser les dégâts infligés",
      "Exécuter les mécaniques spécifiques",
      "Éliminer les adds prioritaires",
      "Éviter les attaques ennemies"
    ],
    icon: <GiSwordWound className="w-6 h-6" />
  },
  healer: {
    name: "Healer",
    color: "from-green-600 to-emerald-600",
    description: "Les healers maintiennent l'équipe en vie tout en contribuant aux dégâts. Ils doivent gérer efficacement leurs ressources et anticiper les pics de dégâts.",
    responsibilities: [
      "Maintenir l'équipe en vie",
      "Gérer efficacement les ressources de soin",
      "Contribuer aux dégâts quand possible",
      "Dissiper les statuts négatifs"
    ],
    icon: <GiHealing className="w-6 h-6" />
  }
};

const classesData: ClassData[] = [
  // TANKS
  {
    id: "paladin",
    name: "Paladin",
    abbreviation: "PLD",
    role: "tank",
    icon: <GiArrowsShield className="w-6 h-6" />,
    description: "Le Paladin est un tank polyvalent qui excelle dans la protection de ses alliés grâce à ses capacités défensives et ses sorts de soutien.",
    difficulty: 2,
    strengths: [
      "Excellente mitigation des dégâts",
      "Capacité à soigner les alliés",
      "Invulnérabilité temporaire",
      "Bon mélange de défense physique et magique"
    ],
    weaknesses: [
      "DPS légèrement inférieur aux autres tanks",
      "Rotation complexe entre phases magiques et physiques",
      "Consommation élevée de MP"
    ],
    primaryStat: "Force",
    bestPairedWith: ["WHM", "AST", "DRG"]
  },
  {
    id: "warrior",
    name: "Guerrier",
    abbreviation: "WAR",
    role: "tank",
    icon: <GiAxeSwing className="w-6 h-6" />,
    description: "Le Guerrier est un tank brutal qui utilise sa rage pour augmenter ses dégâts et sa survie, avec une excellente capacité d'auto-guérison.",
    difficulty: 1,
    strengths: [
      "Auto-guérison exceptionnelle",
      "Sustain inégalé en solo",
      "Burst damage élevé",
      "Facile à prendre en main"
    ],
    weaknesses: [
      "Moins de soutien pour l'équipe",
      "Mitigation moins flexible",
      "Mobilité limitée"
    ],
    primaryStat: "Force",
    bestPairedWith: ["SCH", "SGE", "MNK"]
  },
  {
    id: "dark-knight",
    name: "Chevalier Noir",
    abbreviation: "DRK",
    role: "tank",
    icon: <GiTwoHandedSword className="w-6 h-6" />,
    description: "Le Chevalier Noir maîtrise les pouvoirs des ténèbres, offrant une excellente mitigation magique et un DPS élevé au prix d'une gestion complexe de ses ressources.",
    difficulty: 3,
    strengths: [
      "DPS élevé pour un tank",
      "Excellente mitigation magique",
      "Barrière puissante pour protéger un allié",
      "Burst phases impressionnantes"
    ],
    weaknesses: [
      "Gestion complexe des ressources",
      "Peu d'auto-guérison",
      "Dépendant des healers pour survivre"
    ],
    primaryStat: "Force",
    bestPairedWith: ["WHM", "AST", "BLM"]
  },
  {
    id: "gunbreaker",
    name: "Pistosabreur",
    abbreviation: "GNB",
    role: "tank",
    icon: <GiPistolGun className="w-6 h-6" />,
    description: "Le Pistosabreur combine défense et attaque avec style, offrant une rotation de DPS proche des classes de dégâts tout en maintenant ses capacités de tank.",
    difficulty: 4,
    strengths: [
      "DPS très élevé pour un tank",
      "Rotation offensive engageante",
      "Bon équilibre entre offense et défense",
      "Mitigations solides"
    ],
    weaknesses: [
      "Rotation complexe avec beaucoup de weaving",
      "Cycle de burst exigeant",
      "Moins d'auto-guérison que le WAR"
    ],
    primaryStat: "Force",
    bestPairedWith: ["SGE", "SCH", "NIN"]
  },

  // DPS MÊLÉE
  {
    id: "monk",
    name: "Moine",
    abbreviation: "MNK",
    role: "dps",
    icon: <GiPunchBlast className="w-6 h-6" />,
    description: "Le Moine excelle dans le combat rapproché avec des combos de poings et de pieds, maintenant un rythme soutenu d'attaques pour maximiser son DPS.",
    difficulty: 4,
    strengths: [
      "DPS soutenu très élevé",
      "Mobilité excellente",
      "Buff de dégâts pour l'équipe (Brotherhood)",
      "Forte réduction des dégâts personnels"
    ],
    weaknesses: [
      "Positionnements stricts pour maximiser les dégâts",
      "Peu de dégâts à distance",
      "Rotation complexe avec beaucoup de ressources à gérer"
    ],
    primaryStat: "Force",
    bestPairedWith: ["DRG", "NIN", "DNC"]
  },
  {
    id: "dragoon",
    name: "Chevalier Dragon",
    abbreviation: "DRG",
    role: "dps",
    icon: <GiTwoHandedSword className="w-6 h-6" />,
    description: "Le Chevalier Dragon exécute des combos aériens dévastateurs avec sa lance, offrant un mélange de dégâts soutenus et de buffs pour l'équipe.",
    difficulty: 3,
    strengths: [
      "Rotation simple mais efficace",
      "Buffs importants pour l'équipe",
      "Mobilité avec des sauts",
      "Animation spectaculaire"
    ],
    weaknesses: [
      "Vulnérabilité pendant certaines animations",
      "Temps de blocage pendant les sauts",
      "Positionnement important pour maximiser les dégâts"
    ],
    primaryStat: "Force",
    bestPairedWith: ["BRD", "MCH", "RDM"]
  },
  {
    id: "ninja",
    name: "Ninja",
    abbreviation: "NIN",
    role: "dps",
    icon: <GiNinjaStar className="w-6 h-6" />,
    description: "Le Ninja utilise la vitesse et des techniques ninjutsu pour infliger des dégâts massifs pendant ses fenêtres de burst, tout en apportant des utilitaires à l'équipe.",
    difficulty: 5,
    strengths: [
      "Burst damage extrêmement élevé",
      "Buff de dégâts pour l'équipe (Trick Attack)",
      "Excellente mobilité",
      "Utilitaire unique (invisibilité, speed boost)"
    ],
    weaknesses: [
      "DPS hors burst plus faible",
      "Complexité des mudras",
      "Fenêtres de burst exigeantes"
    ],
    primaryStat: "Dextérité",
    bestPairedWith: ["SAM", "BLM", "RDM"]
  },
  {
    id: "samurai",
    name: "Samouraï",
    abbreviation: "SAM",
    role: "dps",
    icon: <GiTwoHandedSword className="w-6 h-6" />,
    description: "Le Samouraï est un spécialiste du DPS pur, maniant son katana avec précision pour infliger des dégâts dévastateurs sans compromis.",
    difficulty: 3,
    strengths: [
      "DPS brut le plus élevé",
      "Autosuffisant en combat",
      "Exécution puissante",
      "Bon équilibre entre dégâts soutenus et burst"
    ],
    weaknesses: [
      "Pas de soutien pour l'équipe",
      "Positionnement important",
      "Gestion des ressources exigeante pour optimiser"
    ],
    primaryStat: "Force",
    bestPairedWith: ["NIN", "DNC", "AST"]
  },
  {
    id: "reaper",
    name: "Faucheur",
    abbreviation: "RPR",
    role: "dps",
    icon: <GiSaberToothedCatHead className="w-6 h-6" />,
    description: "Le Faucheur manie une faux et invoque un avatar pour infliger des dégâts massifs, combinant style et efficacité dans un package facile à maîtriser.",
    difficulty: 2,
    strengths: [
      "Excellente balance entre facilité et dégâts",
      "Burst impressionnant",
      "Mobilité décente",
      "Buff de critique pour l'équipe"
    ],
    weaknesses: [
      "Moins d'utilitaires que d'autres DPS mêlée",
      "Dépendant des fenêtres de burst",
      "Vulnérable pendant certaines animations"
    ],
    primaryStat: "Force",
    bestPairedWith: ["DRG", "BRD", "DNC"]
  },

  // DPS DISTANCE PHYSIQUE
  {
    id: "bard",
    name: "Barde",
    abbreviation: "BRD",
    role: "dps",
    icon: <GiPocketBow className="w-6 h-6" />,
    description: "Le Barde soutient son équipe avec des chants tout en infligeant des dégâts à distance avec son arc, offrant flexibilité et utilitaire.",
    difficulty: 3,
    strengths: [
      "Excellents buffs pour toute l'équipe",
      "Mobilité complète",
      "Utilitaire riche (Cleanse, speed boost)",
      "Rotation adaptative"
    ],
    weaknesses: [
      "DPS personnel plus faible",
      "Dépendant des procs aléatoires",
      "Complexité de la gestion des chants"
    ],
    primaryStat: "Dextérité",
    bestPairedWith: ["DRG", "DNC", "RDM"]
  },
  {
    id: "machinist",
    name: "Machiniste",
    abbreviation: "MCH",
    role: "dps",
    icon: <GiPistolGun className="w-6 h-6" />,
    description: "Le Machiniste déploie des armes à feu et des tourelles automatisées pour infliger des dégâts constants et prévisibles à distance.",
    difficulty: 2,
    strengths: [
      "Dégâts consistants et non-RNG",
      "Excellente mobilité",
      "Simple à optimiser",
      "Indépendant des buffs externes"
    ],
    weaknesses: [
      "Pas de soutien pour l'équipe",
      "DPS plafonné en raid optimisé",
      "Répétitif à haut niveau"
    ],
    primaryStat: "Dextérité",
    bestPairedWith: ["DRG", "NIN", "AST"]
  },
  {
    id: "dancer",
    name: "Danseur",
    abbreviation: "DNC",
    role: "dps",
    icon: <GiDuality className="w-6 h-6" />,
    description: "Le Danseur excelle dans le soutien d'un partenaire désigné tout en maintenant une excellente mobilité et des dégâts de zone.",
    difficulty: 2,
    strengths: [
      "Buffs puissants pour un partenaire",
      "Excellents dégâts AoE",
      "Mobilité totale",
      "Facile à prendre en main"
    ],
    weaknesses: [
      "DPS personnel le plus faible",
      "Très dépendant des procs aléatoires",
      "Performance liée au partenaire choisi"
    ],
    primaryStat: "Dextérité",
    bestPairedWith: ["SAM", "MNK", "BLM"]
  },

  // DPS MAGIE
  {
    id: "black-mage",
    name: "Mage Noir",
    abbreviation: "BLM",
    role: "dps",
    icon: <GiMagicSwirl className="w-6 h-6" />,
    description: "Le Mage Noir canalise des sorts dévastateurs de feu et de glace, livrant des dégâts massifs au prix d'une mobilité limitée.",
    difficulty: 5,
    strengths: [
      "DPS magique le plus élevé",
      "Rotation flexible adaptable",
      "Ressources infinies",
      "AoE puissante"
    ],
    weaknesses: [
      "Mobilité très limitée",
      "Complexité de l'optimisation",
      "Vulnérabilité aux mécaniques",
      "Apprentissage spécifique à chaque combat"
    ],
    primaryStat: "Intelligence",
    bestPairedWith: ["DNC", "AST", "NIN"]
  },
  {
    id: "summoner",
    name: "Invocateur",
    abbreviation: "SMN",
    role: "dps",
    icon: <GiMagicSwirl className="w-6 h-6" />,
    description: "L'Invocateur appelle les pouvoirs des primordiaux pour infliger des dégâts variés tout en maintenant une bonne mobilité.",
    difficulty: 1,
    strengths: [
      "Excellente mobilité pour un lanceur",
      "Résurrection en combat",
      "AoE puissante",
      "Rotation accessible"
    ],
    weaknesses: [
      "DPS plafonné en situation optimale",
      "Peu de décisions stratégiques",
      "Manque d'adaptabilité"
    ],
    primaryStat: "Intelligence",
    bestPairedWith: ["RDM", "AST", "DRG"]
  },
  {
    id: "red-mage",
    name: "Mage Rouge",
    abbreviation: "RDM",
    role: "dps",
    icon: <GiMagicSwirl className="w-6 h-6" />,
    description: "Le Mage Rouge équilibre magie noire et blanche avant de se lancer dans des combinaisons d'attaques au corps à corps, offrant polyvalence et utilitaire.",
    difficulty: 3,
    strengths: [
      "Résurrection en combat",
      "Excellente mobilité pour un lanceur",
      "Burst régulier et prévisible",
      "Équilibre entre dégâts et soutien"
    ],
    weaknesses: [
      "DPS légèrement inférieur aux autres lanceurs",
      "Vulnérabilité pendant la phase de mêlée",
      "Dépendant des procs pour maximiser le DPS"
    ],
    primaryStat: "Intelligence",
    bestPairedWith: ["SMN", "BRD", "NIN"]
  },

  // HEALER
  {
    id: "white-mage",
    name: "Mage Blanc",
    abbreviation: "WHM",
    role: "healer",
    icon: <GiHealing className="w-6 h-6" />,
    description: "Le Mage Blanc offre des soins puissants et directs ainsi que le meilleur DPS brut parmi les soigneurs, au prix d'une mobilité réduite.",
    difficulty: 2,
    strengths: [
      "Soins directs très puissants",
      "DPS simple mais efficace",
      "Régénération solide",
      "Capacités de sauvetage d'urgence"
    ],
    weaknesses: [
      "Mobilité limitée",
      "Peu de mitigations préventives",
      "Gestion du mana parfois difficile"
    ],
    primaryStat: "Sagesse",
    bestPairedWith: ["SCH", "AST", "DRK"]
  },
  {
    id: "scholar",
    name: "Érudit",
    abbreviation: "SCH",
    role: "healer",
    icon: <GiHealing className="w-6 h-6" />,
    description: "L'Érudit utilise un familier fée et des barrières préventives pour protéger l'équipe avant les dégâts, offrant une approche tactique des soins.",
    difficulty: 4,
    strengths: [
      "Boucliers préventifs puissants",
      "Fée automatique pour soins passifs",
      "Excellente mitigation de groupe",
      "Grande mobilité"
    ],
    weaknesses: [
      "Soins directs moins puissants",
      "Complexité des ressources",
      "Courbe d'apprentissage abrupte"
    ],
    primaryStat: "Sagesse",
    bestPairedWith: ["WHM", "SGE", "WAR"]
  },
  {
    id: "astrologian",
    name: "Astromancien",
    abbreviation: "AST",
    role: "healer",
    icon: <GiHealing className="w-6 h-6" />,
    description: "L'Astromancien augmente les performances de l'équipe avec des cartes tout en offrant des soins flexibles, s'adaptant à chaque situation.",
    difficulty: 5,
    strengths: [
      "Buffs de dégâts uniques pour l'équipe",
      "Flexibilité entre régénération et boucliers",
      "Excellente mobilité",
      "Utilitaire riche (MP regen, mitigation)"
    ],
    weaknesses: [
      "Rotation complexe avec beaucoup de weaving",
      "Système de cartes exigeant",
      "DPS personnel plus faible"
    ],
    primaryStat: "Sagesse",
    bestPairedWith: ["SCH", "SGE", "SAM"]
  },
  {
    id: "sage",
    name: "Sage",
    abbreviation: "SGE",
    role: "healer",
    icon: <GiHealing className="w-6 h-6" />,
    description: "Le Sage utilise des nouliths pour soigner en infligeant des dégâts, créant une synergie unique entre offense et défense.",
    difficulty: 4,
    strengths: [
      "Soins par dégâts efficaces",
      "Excellente mobilité",
      "Mitigation préventive solide",
      "DPS passif pendant les soins"
    ],
    weaknesses: [
      "Soins directs moins puissants",
      "Apprentissage complexe",
      "Inefficace en cas de low DPS"
    ],
    primaryStat: "Sagesse",
    bestPairedWith: ["WHM", "AST", "GNB"]
  }
];

export default classesData;