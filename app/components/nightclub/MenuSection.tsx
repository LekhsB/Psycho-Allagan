"use client";

import { FC, useState } from 'react';
import { FaGlassMartiniAlt, FaWineGlassAlt, FaGlassWhiskey, FaCocktail, FaBeer, FaWineBottle } from 'react-icons/fa';

interface DrinkItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cocktail-signature' | 'cocktail-classique' | 'vin' | 'bière' | 'spiritueux' | 'sans-alcool';
  ingredients?: string[];
  isPopular?: boolean;
  themeTag?: string;
  imageUrl?: string;
}

// Données des boissons
const DRINKS_DATA: DrinkItem[] = [
  // Cocktails signature
  {
    id: 'drink-001',
    name: 'Néon Pulse',
    description: "Un cocktail électrisant aux couleurs de Neon Dreams. Vodka infusée au fruit du dragon, citron vert, sirop de litchi et un soupçon de soda tonic pour des bulles qui brillent sous les lumières néon.",
    price: 12,
    category: 'cocktail-signature',
    ingredients: ['Vodka infusée', 'Fruit du dragon', 'Citron vert', 'Sirop de litchi', 'Soda tonic'],
    isPopular: true,
    themeTag: 'Neon Dreams',
    imageUrl: '/images/drinks/neon-pulse.jpg'
  },
  {
    id: 'drink-002',
    name: 'Crystal Elixir',
    description: "Un mélange envoûtant qui capture l'essence des cristaux élémentaires. Gin infusé au thé bleu, liqueur de violette, jus de citron et sirop de lavande, garni d'une fleur comestible cristallisée.",
    price: 14,
    category: 'cocktail-signature',
    ingredients: ['Gin infusé au thé bleu', 'Liqueur de violette', 'Jus de citron', 'Sirop de lavande'],
    isPopular: true,
    themeTag: 'Crystal Mirage',
    imageUrl: '/images/drinks/crystal-elixir.jpg'
  },
  {
    id: 'drink-003',
    name: 'Dark Whisper',
    description: "Un cocktail mystérieux aux profondeurs insondables. Rhum noir, liqueur de café, encre de seiche et sirop d'érable, surmonté d'une brume glacée au charbon activé.",
    price: 14,
    category: 'cocktail-signature',
    ingredients: ['Rhum noir', 'Liqueur de café', 'Sirop d\'érable', 'Charbon activé'],
    themeTag: 'Void Whispers',
    imageUrl: '/images/drinks/dark-whisper.jpg'
  },
  {
    id: 'drink-004',
    name: 'Allagan Mechanism',
    description: "Un cocktail complexe comme la technologie ancestrale. Whisky fumé, vermouth épicé, bitter d'orange et une touche de cannelle, servi sur un glaçon gravé de motifs géométriques.",
    price: 16,
    category: 'cocktail-signature',
    ingredients: ['Whisky fumé', 'Vermouth épicé', 'Bitter d\'orange', 'Cannelle'],
    themeTag: 'Tech Rituals',
    imageUrl: '/images/drinks/allagan-mechanism.jpg'
  },
  {
    id: 'drink-005',
    name: 'Kupo Fizz',
    description: "Aussi doux et moelleux qu'un moogle! Sirop de fraise, jus de litchi, soda à la vanille et une touche de crème fouettée rose, garni d'une guimauve en forme de pompon.",
    price: 10,
    category: 'cocktail-signature',
    ingredients: ['Sirop de fraise', 'Jus de litchi', 'Soda vanille', 'Crème fouettée'],
    isPopular: true,
    themeTag: 'Moogle Mania',
    imageUrl: '/images/drinks/kupo-fizz.jpg'
  },
  
  // Cocktails classiques
  {
    id: 'drink-006',
    name: 'Cosmopolitan',
    description: "Le classique intemporel. Vodka, triple sec, jus de cranberry frais et une touche de citron vert.",
    price: 10,
    category: 'cocktail-classique',
    ingredients: ['Vodka', 'Triple sec', 'Jus de cranberry', 'Citron vert']
  },
  {
    id: 'drink-007',
    name: 'Old Fashioned',
    description: "Le cocktail original. Whisky bourbon, sucre, angostura bitter et zeste d'orange.",
    price: 12,
    category: 'cocktail-classique',
    ingredients: ['Bourbon', 'Sucre', 'Angostura bitter', 'Zeste d\'orange']
  },
  {
    id: 'drink-008',
    name: 'Mojito',
    description: "Le rafraîchissant cubain. Rhum blanc, menthe fraîche, citron vert, sucre et eau gazeuse.",
    price: 9,
    category: 'cocktail-classique',
    ingredients: ['Rhum blanc', 'Menthe fraîche', 'Citron vert', 'Sucre', 'Eau gazeuse']
  },
  {
    id: 'drink-009',
    name: 'Margarita',
    description: "L'incontournable mexicain. Tequila, triple sec et jus de citron vert frais.",
    price: 10,
    category: 'cocktail-classique',
    ingredients: ['Tequila', 'Triple sec', 'Jus de citron vert']
  },
  
  // Vins
  {
    id: 'drink-010',
    name: 'Sauvignon Blanc',
    description: "Vin blanc sec aux notes d'agrumes et de fruits exotiques. Parfait pour commencer la soirée.",
    price: 7,
    category: 'vin',
  },
  {
    id: 'drink-011',
    name: 'Shiraz',
    description: "Vin rouge corsé aux arômes de fruits noirs et d'épices. Idéal pour accompagner les moments forts.",
    price: 8,
    category: 'vin',
  },
  
  // Bières
  {
    id: 'drink-012',
    name: 'IPA Artisanale',
    description: "Bière houblonnée aux notes d'agrumes et de pin. Pour les amateurs de caractère.",
    price: 6,
    category: 'bière',
  },
  {
    id: 'drink-013',
    name: 'Stout Impériale',
    description: "Bière noire aux arômes de café et de chocolat. Profonde comme le néant.",
    price: 7,
    category: 'bière',
    themeTag: 'Void Whispers'
  },
  
  // Sans alcool
  {
    id: 'drink-014',
    name: 'Starlight Spritz',
    description: "Mocktail rafraîchissant à base de sirop d'érable, jus de pomme pétillant et thé aux épices.",
    price: 7,
    category: 'sans-alcool',
  },
  {
    id: 'drink-015',
    name: 'Éther Bleu',
    description: "Limonade bleue magique au thé papillon, citron et sirop de vanille, qui change de couleur quand on y ajoute du citron.",
    price: 8,
    category: 'sans-alcool',
    isPopular: true,
    themeTag: 'Crystal Mirage'
  }
];

const MenuSection: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('cocktail-signature');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const categoryOptions = [
    { id: 'cocktail-signature', label: 'Cocktails Signature', icon: <FaCocktail /> },
    { id: 'cocktail-classique', label: 'Cocktails Classiques', icon: <FaGlassMartiniAlt /> },
    { id: 'vin', label: 'Vins', icon: <FaWineGlassAlt /> },
    { id: 'bière', label: 'Bières', icon: <FaBeer /> },
    { id: 'spiritueux', label: 'Spiritueux', icon: <FaGlassWhiskey /> },
    { id: 'sans-alcool', label: 'Sans Alcool', icon: <FaWineBottle /> }
  ];
  
  const filteredDrinks = activeCategory === 'all' 
    ? DRINKS_DATA 
    : DRINKS_DATA.filter(drink => drink.category === activeCategory);
  
  const toggleDetails = (id: string) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };
  
  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-pink-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Notre </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Menu
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Découvrez nos cocktails signature inspirés par nos soirées thématiques, ainsi que notre sélection
            de boissons pour satisfaire tous les goûts et créer une expérience sensorielle complète.
          </p>
        </div>
        
        {/* Navigation de catégories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-black/60 border border-purple-800/30 text-gray-300 hover:text-white hover:border-purple-500/50'}
              `}
            >
              <span className="text-xs">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Liste des boissons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
              {/* Image de boisson (placeholder) */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-black/80">
                {/* Ici serait l'image de la boisson dans une véritable implémentation */}
                {drink.isPopular && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full z-10">
                    Populaire
                  </span>
                )}
                
                {drink.themeTag && (
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-purple-300 text-xs rounded-full z-10 border border-purple-500/30">
                    {drink.themeTag}
                  </span>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{drink.name}</h3>
                  <span className="bg-black/40 px-2 py-1 rounded text-purple-300 text-sm">{drink.price} €</span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{drink.description}</p>
                
                {drink.ingredients && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {drink.ingredients.map((ingredient, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-purple-900/30 text-purple-300 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => toggleDetails(drink.id)}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <span>{showDetails === drink.id ? 'Masquer les détails' : 'Voir les détails'}</span>
                  <span className="text-[8px]">▼</span>
                </button>
                
                {showDetails === drink.id && (
                  <div className="mt-3 pt-3 border-t border-purple-900/30 text-xs text-gray-400">
                    <p className="mb-1">Disponible aux comptoirs principal et VIP.</p>
                    <p>Allergènes potentiels: consulter le personnel.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="bg-black/70 border border-purple-800/30 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-purple-800/30 pb-2">
              Infos Pratiques
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">
                  <span className="font-medium text-white">Allergènes:</span> Si vous avez des allergies alimentaires, veuillez nous en informer lors de votre commande. Notre équipe sera heureuse de vous conseiller sur les options adaptées.
                </p>
              </div>
              
              <div className="bg-black/70 border border-violet-800/30 p-4 rounded-md mt-4">
                <p className="text-gray-400 text-sm">
                  <span className="font-medium text-white">Offres spéciales:</span> Happy hour de 21h à 22h les jeudis et vendredis avec 20% de réduction sur les boissons classiques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection; 