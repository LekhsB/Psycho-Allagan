import { Member } from "@/app/types/member";
import { GiTwoHandedSword, GiMagicSwirl, GiHealing, GiArrowsShield } from 'react-icons/gi';

// Données de démonstration pour les membres
const membersData: Member[] = [
  {
    id: "azura-shadowcrest",
    name: "Azura Shadowcrest",
    avatar: "/placeholder-avatar.jpg",
    race: "Miqo'te",
    level: 90,
    mainClass: {
      name: "BLM",
      icon: <GiMagicSwirl className="w-6 h-6" />,
      level: 90,
      specialization: "Magie temporelle"
    },
    secondaryClass: {
      name: "SMN",
      icon: <GiMagicSwirl className="w-6 h-6" />,
      level: 88
    },
    rank: {
      title: "Maître de Guilde",
      color: "from-red-600 to-violet-600"
    },
    responsibilities: ["Direction stratégique", "Relations externes", "Organisation des raids"],
    lore: "Originaire d'une lignée de mages d'Ul'dah, Azura a découvert très jeune ses affinités avec la magie noire. Après avoir étudié à l'université de Sharlayan, elle s'est aventurée en Éorzéa où elle a rencontré les membres fondateurs de Psycho Allagan lors d'une expédition dans le Laboratoire d'Azys Lla.",
    highlights: [
      "A découvert un grimoire ancestral lors d'une exploration des ruines de Nym",
      "A mené avec succès l'assaut contre Bahamut Prime",
      "A forgé une alliance avec les Scions de la Septième Aube"
    ],
    joinDate: "Fondatrice (2022-04-15)",
    lastActive: "Aujourd'hui",
    participation: {
      raids: 87,
      events: 52,
      projects: 12
    }
  },
  {
    id: "thorian-ironheart",
    name: "Thorian Ironheart",
    avatar: "/placeholder-avatar.jpg",
    race: "Hrothgar",
    level: 90,
    mainClass: {
      name: "WAR",
      icon: <GiTwoHandedSword className="w-6 h-6" />,
      level: 90,
      specialization: "Combat défensif"
    },
    secondaryClass: {
      name: "PLD",
      icon: <GiArrowsShield className="w-6 h-6" />,
      level: 85
    },
    rank: {
      title: "Officier",
      color: "from-violet-600 to-blue-600"
    },
    responsibilities: ["Formation des tanks", "Coordination en combat", "Planification tactique"],
    lore: "Vétéran de nombreuses batailles, Thorian a servi dans les forces de défense d'Ishgard pendant la Guerre du Chant des Dragons. Son expertise en tant que tank l'a rapidement propulsé au rang d'officier au sein de Psycho Allagan, où il forme les nouveaux membres aux techniques de combat défensif.",
    highlights: [
      "A tenu la ligne face à Nidhogg pendant 15 minutes sans soutien de guérison",
      "A développé une nouvelle stratégie de tank-swap pour l'Eden Savage",
      "A forgé lui-même son armure légendaire à partir de matériaux rares"
    ],
    joinDate: "2022-06-30",
    lastActive: "Hier",
    participation: {
      raids: 76,
      events: 38,
      projects: 7
    }
  },
  {
    id: "elysia-moonwhisper",
    name: "Elysia Moonwhisper",
    avatar: "/placeholder-avatar.jpg",
    race: "Elezen",
    level: 90,
    mainClass: {
      name: "SCH",
      icon: <GiHealing className="w-6 h-6" />,
      level: 90,
      specialization: "Guérison préventive"
    },
    secondaryClass: {
      name: "AST",
      icon: <GiHealing className="w-6 h-6" />,
      level: 88
    },
    rank: {
      title: "Vétéran",
      color: "from-blue-600 to-cyan-600"
    },
    responsibilities: ["Coordination des soigneurs", "Archives et lore", "Mentorat"],
    lore: "Descendante d'une lignée ancienne de Gridania, Elysia a toujours eu une connexion forte avec les éléments. Ses talents de guérisseuse se sont manifestés lors d'une catastrophe qui a frappé sa forêt natale. Après des années d'études à l'école des Conjurateurs, elle a rejoint Psycho Allagan pour mettre ses compétences au service d'une cause plus grande.",
    highlights: [
      "A sauvé l'équipe entière lors d'un wipe imminent contre Omega",
      "A rédigé un traité sur les techniques de guérison avancées",
      "A créé un jardin médicinal dans le domaine de la compagnie"
    ],
    joinDate: "2022-09-15",
    lastActive: "Il y a 2 jours",
    participation: {
      raids: 62,
      events: 47,
      projects: 15
    }
  },
  {
    id: "kaz-steelclaw",
    name: "Kaz Steelclaw",
    avatar: "/placeholder-avatar.jpg",
    race: "Au Ra",
    level: 87,
    mainClass: {
      name: "MNK",
      icon: <GiTwoHandedSword className="w-6 h-6" />,
      level: 87,
      specialization: "Combat à mains nues"
    },
    secondaryClass: {
      name: "NIN",
      icon: <GiTwoHandedSword className="w-6 h-6" />,
      level: 78
    },
    rank: {
      title: "Membre",
      color: "from-cyan-600 to-emerald-600"
    },
    responsibilities: ["Reconnaissance", "Missions d'exploration"],
    lore: "Originaire des tribus nomades des steppes d'Azim, Kaz a quitté son clan pour explorer le monde. Sa maîtrise des arts martiaux lui vient d'un enseignement rigoureux auprès des moines du Temple de Rhalgr. Son tempérament discipliné mais aventureux en fait un atout précieux pour les missions de reconnaissance.",
    highlights: [
      "A établi un record de DPS lors du combat contre Titan",
      "A découvert un passage secret dans le Palais des Morts",
      "A complété seul un donjon de niveau 85"
    ],
    joinDate: "2023-02-10",
    lastActive: "Il y a 5 jours",
    participation: {
      raids: 31,
      events: 22,
      projects: 3
    }
  },
  {
    id: "lianna-dawnsinger",
    name: "Lianna Dawnsinger",
    avatar: "/placeholder-avatar.jpg",
    race: "Hyur",
    level: 75,
    mainClass: {
      name: "BRD",
      icon: <GiMagicSwirl className="w-6 h-6" />,
      level: 75,
      specialization: "Soutien offensif"
    },
    secondaryClass: {
      name: "DNC",
      icon: <GiMagicSwirl className="w-6 h-6" />,
      level: 67
    },
    rank: {
      title: "Recrue",
      color: "from-emerald-600 to-yellow-600"
    },
    responsibilities: ["Organisation d'événements culturels"],
    lore: "Fille d'un célèbre ménestrel d'Ul'dah, Lianna a grandi entourée de musique et d'art. Son talent naturel pour le chant et la composition l'a amenée à rejoindre Psycho Allagan après avoir assisté à l'un de leurs événements communautaires. Elle apporte une touche créative et artistique à la compagnie.",
    highlights: [
      "A composé l'hymne officiel de Psycho Allagan",
      "A organisé le premier festival de musique inter-compagnies d'Éorzéa",
      "A découvert une mélodie ancienne ayant des effets magiques"
    ],
    joinDate: "2023-11-20",
    lastActive: "Aujourd'hui",
    participation: {
      raids: 8,
      events: 15,
      projects: 2
    }
  },
  {
    id: "ryodan-blacksteel",
    name: "Ryodan Blacksteel",
    avatar: "/placeholder-avatar.jpg",
    race: "Hyur",
    level: 90,
    mainClass: {
      name: "DRK",
      icon: <GiTwoHandedSword className="w-6 h-6" />,
      level: 90,
      specialization: "Arts ténébreux"
    },
    secondaryClass: {
      name: "RPR",
      icon: <GiTwoHandedSword className="w-6 h-6" />,
      level: 83
    },
    rank: {
      title: "Officier",
      color: "from-violet-600 to-blue-600"
    },
    responsibilities: ["Maître des recrutements", "Formateur des DPS", "Intendance"],
    lore: "Ancien mercenaire hanté par un passé sombre, Ryodan a trouvé dans les enseignements des Chevaliers Noirs une voie pour canaliser ses émotions. Son expertise en matière de combat et sa connaissance approfondie du marché d'Éorzéa en font un officier précieux pour la gestion des ressources de la compagnie.",
    highlights: [
      "A vaincu seul un Béhémoth lors d'une mission de sauvetage",
      "A négocié un partenariat avec la Compagnie des Immortels pour l'accès aux ressources rares",
      "A repoussé une attaque surprise sur le domaine de la guilde"
    ],
    joinDate: "2022-05-22",
    lastActive: "Aujourd'hui",
    participation: {
      raids: 92,
      events: 41,
      projects: 17
    }
  },
  {
    id: "neria-lightbringer",
    name: "Neria Lightbringer",
    avatar: "/placeholder-avatar.jpg",
    race: "Elezen",
    level: 90,
    mainClass: {
      name: "PLD",
      icon: <GiArrowsShield className="w-6 h-6" />,
      level: 90,
      specialization: "Protection divine"
    },
    secondaryClass: {
      name: "WHM",
      icon: <GiHealing className="w-6 h-6" />,
      level: 86
    },
    rank: {
      title: "Vétéran",
      color: "from-blue-600 to-cyan-600"
    },
    responsibilities: ["Formatrice des tanks", "Organisation des événements", "Relations publiques"],
    lore: "Issue d'une noble famille d'Ishgard, Neria a rejeté les privilèges de son rang pour servir comme garde au Temple des Douze. Sa foi et son dévouement à protéger les autres l'ont amenée à Psycho Allagan, où elle inspire les nouveaux membres par son exemple et sa sagesse.",
    highlights: [
      "A reçu la bénédiction personnelle de l'archevêque d'Ishgard",
      "A survécu au Corridor des Ténèbres sans subir de dégâts",
      "A établi un réseau de contacts dans toutes les cités-états d'Éorzéa"
    ],
    joinDate: "2022-08-14",
    lastActive: "Hier",
    participation: {
      raids: 68,
      events: 59,
      projects: 11
    }
  }
];

export default membersData; 