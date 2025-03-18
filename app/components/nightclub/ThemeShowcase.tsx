"use client";

import { useState } from 'react';
import { FaCalendarAlt, FaMusic, FaGlassMartiniAlt, FaImage } from 'react-icons/fa';

// Types pour les thèmes
interface ThemeMusic {
  genre: string;
  description: string;
  exampleTracks: string[];
}

interface ThemeDrink {
  name: string;
  description: string;
  ingredients?: string[];
}

interface ThemeEvent {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  date: string;
  music: ThemeMusic;
  specialDrink: ThemeDrink;
  visualStyle: string;
  isActive?: boolean;
}

// Données des thèmes
const THEMES_DATA: ThemeEvent[] = [
  {
    id: "neon-dreams",
    name: "Neon Dreams",
    description: "Plongez dans un futur cyberpunk éblouissant, entre gratte-ciels vertigineux et allées obscures illuminées par les néons. La frontière entre réalité et virtuel s'estompe dans cette atmosphère futuriste inspirée d'Amaurot et de la Tour Cristalline.",
    imageUrl: "/images/themes/neon-dreams.jpg",
    date: "Chaque premier vendredi du mois",
    music: {
      genre: "Synthwave / Darksynth / Cyberpunk",
      description: "Mélange envoûtant de rythmes électroniques, de basses profondes et de mélodies rétrofuturistes qui évoquent un monde entre dystopie et espoir technologique.",
      exampleTracks: [
        "Midnight Protocol - Digital Dreams",
        "Neon Vector - Crystal City",
        "Cyber Shadow - Night Terminal"
      ]
    },
    specialDrink: {
      name: "Néon Pulse",
      description: "Un cocktail électrisant aux couleurs changeantes. Vodka infusée au fruit du dragon, liqueur de lychee, et soda bleu qui brille sous les lumières noires.",
      ingredients: ["Vodka infusée", "Liqueur de lychee", "Citron vert", "Soda bleu", "Sirop phosphorescent"]
    },
    visualStyle: "Projections de paysages urbains futuristes, lumières néon en bleu, violet et rose. Animations holographiques et effets laser synchronisés avec la musique."
  },
  {
    id: "crystal-mirage",
    name: "Crystal Mirage",
    description: "Un sanctuaire éthéré inspiré des paysages cristallins de FFXIV, où lumières et reflets créent une atmosphère onirique. Le temps semble suspendu dans cet espace entre deux mondes, rappelant les plaines de Mor Dhona et le Lac de Cristal.",
    imageUrl: "/images/themes/crystal-mirage.jpg",
    date: "Chaque troisième samedi du mois",
    music: {
      genre: "Ambient / Chill / Ethereal",
      description: "Compositions atmosphériques aux sonorités cristallines, avec des nappes ambiantes et des mélodies contemplatives qui invitent au voyage intérieur.",
      exampleTracks: [
        "Aether Flow - Crystalline Memories",
        "Azure Reflection - Through the Veil",
        "Prismatic Echoes - Ethereal Whispers"
      ]
    },
    specialDrink: {
      name: "Crystal Elixir",
      description: "Un cocktail élégant qui capture la beauté des cristaux. Gin infusé au thé bleu, liqueur de violette, et élixir scintillant, surmonté d'une brume glacée.",
      ingredients: ["Gin infusé au thé bleu", "Liqueur de violette", "Jus de citron", "Sirop de lavande", "Brume glacée"]
    },
    visualStyle: "Structures cristallines suspendues, éclairages bleus et violets subtils. Projections d'eau et de cristaux en mouvement. Effets brumeux et délicats."
  },
  {
    id: "void-whispers",
    name: "Void Whispers",
    description: "Osez pénétrer dans les mystères obscurs du Néant, où les ombres dansent et murmurent des secrets anciens. Cette soirée s'inspire des zones les plus sombres de FFXIV, comme le Palais des Morts et l'Abîme.",
    imageUrl: "/images/themes/void-whispers.jpg",
    date: "Nuits spéciales (annoncées à l'avance)",
    music: {
      genre: "Dark Ambient / Witch House / Industrial",
      description: "Sons caverneux, rythmiques lentes et distordues, nappes atmosphériques inquiétantes qui évoquent les profondeurs du Néant.",
      exampleTracks: [
        "Abyssal Call - Descent",
        "Void Vessel - The Thirteenth",
        "Shadow Protocol - Ancient Whispers"
      ]
    },
    specialDrink: {
      name: "Dark Whisper",
      description: "Un cocktail mystérieux aux profondeurs insondables. Rhum noir, liqueur de café, encre de seiche et sirop d'érable, surmonté d'une brume au charbon activé.",
      ingredients: ["Rhum noir", "Liqueur de café", "Sirop d'érable", "Encre de seiche comestible", "Charbon activé"]
    },
    visualStyle: "Éclairage minimaliste en violet profond et noir. Fumée basse, projections de symboles arcanes et de motifs du Néant. Performance d'artistes évoquant des êtres du Vide."
  },
  {
    id: "tech-rituals",
    name: "Tech Rituals",
    description: "Une fusion fascinante entre technologie ancienne et magie, inspirée par les Allagois et leurs merveilles technologiques. La soirée rend hommage aux ruines d'Azys Lla et aux mystères de la technologie Allagoise.",
    imageUrl: "/images/themes/tech-rituals.jpg",
    date: "Chaque deuxième jeudi du mois",
    music: {
      genre: "Tribal Techno / Ritualistic Electronic / Tech-House",
      description: "Battements électroniques hypnotiques mêlés à des éléments de musique rituelle, créant une transe moderne évoquant une cérémonie technologique ancestrale.",
      exampleTracks: [
        "Ancient Algorithm - Binary Ritual",
        "Allagan Construct - Primal Circuit",
        "Machine Spirit - Technological Shamanism"
      ]
    },
    specialDrink: {
      name: "Allagan Mechanism",
      description: "Un cocktail complexe comme la technologie ancestrale. Whisky fumé, vermouth épicé, bitter d'orange et une touche de cannelle, servi sur un glaçon gravé.",
      ingredients: ["Whisky fumé", "Vermouth épicé", "Bitter d'orange", "Cannelle", "Glaçon gravé de motifs géométriques"]
    },
    visualStyle: "Décoration combinant éléments mécaniques et symboles rituels. Projections de circuits lumineux et de glyphes Allagois. Maquettes d'artefacts technologiques anciens."
  }
];

const ThemeShowcase = () => {
  const [activeTheme, setActiveTheme] = useState(THEMES_DATA[0].id);
  
  const currentTheme = THEMES_DATA.find(theme => theme.id === activeTheme) || THEMES_DATA[0];
  
  return (
    <section id="themes" className="py-20 bg-black relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Nos Soirées </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Thématiques
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explorez nos univers immersifs inspirés de Final Fantasy XIV, chaque thème 
            offrant une expérience sensorielle unique avec sa propre ambiance visuelle et sonore.
          </p>
        </div>
        
        {/* Navigation des thèmes */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {THEMES_DATA.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                ${activeTheme === theme.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-black/60 border border-purple-800/30 text-gray-300 hover:text-white hover:border-purple-500/50'}
              `}
            >
              {theme.name}
            </button>
          ))}
        </div>
        
        {/* Affichage du thème actif */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image du thème */}
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/70 to-pink-900/30"></div>
            <div className="absolute inset-0 bg-black/70"></div>
            {/* Ici serait l'image du thème dans une implémentation réelle */}
            <div className="absolute inset-0 bg-[url('/nightclub-interior.jpg')] bg-cover bg-center opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600/70 to-pink-600/70 text-white text-xs font-medium rounded-full mb-3">
                {currentTheme.date}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{currentTheme.name}</h3>
              <p className="text-gray-300 line-clamp-3">{currentTheme.description}</p>
            </div>
          </div>
          
          {/* Détails du thème */}
          <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
                <p className="text-gray-300">{currentTheme.description}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center">
                    <FaMusic className="text-pink-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Ambiance Musicale</h4>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300"><span className="text-pink-400 font-medium">Genre:</span> {currentTheme.music.genre}</li>
                  <li className="text-gray-300"><span className="text-pink-400 font-medium">Style:</span> {currentTheme.music.description}</li>
                  <li>
                    <span className="text-pink-400 font-medium">Titres représentatifs:</span>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {currentTheme.music.exampleTracks.map((track, index) => (
                        <li key={index} className="text-gray-400">{track}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center">
                    <FaGlassMartiniAlt className="text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Cocktail Signature</h4>
                </div>
                <div className="pl-1">
                  <h5 className="text-white font-semibold">{currentTheme.specialDrink.name}</h5>
                  <p className="text-gray-300 mt-1 mb-2">{currentTheme.specialDrink.description}</p>
                  
                  {currentTheme.specialDrink.ingredients && (
                    <div>
                      <span className="text-blue-400 font-medium">Ingrédients:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {currentTheme.specialDrink.ingredients.map((ingredient, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-black/80 border border-blue-900/50 text-blue-300 rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center">
                    <FaImage className="text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Design & Ambiance</h4>
                </div>
                <p className="text-gray-300">{currentTheme.visualStyle}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#events" 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-flex items-center gap-2"
          >
            Voir tous les événements
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThemeShowcase; 