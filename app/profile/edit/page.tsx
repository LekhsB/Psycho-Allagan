"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaPlus, FaTrash, FaSave, FaTimes, FaUser } from 'react-icons/fa';
import { GiTwoHandedSword, GiMagicSwirl, GiHealing, GiArrowsShield } from 'react-icons/gi';

// Types
interface MemberClass {
  name: string;
  icon: string;
  level: number;
  specialization?: string;
}

interface EditableProfile {
  name: string;
  race: string;
  level: number;
  mainClass: MemberClass;
  secondaryClass: MemberClass;
  responsibilities: string[];
  lore: string;
  highlights: string[];
}

// Options pour les classes
const classOptions = [
  {
    category: "Tanks",
    classes: [
      { name: "PLD", label: "Paladin", icon: "GiArrowsShield" },
      { name: "WAR", label: "Guerrier", icon: "GiArrowsShield" },
      { name: "DRK", label: "Chevalier Noir", icon: "GiArrowsShield" },
      { name: "GNB", label: "Pistosabreur", icon: "GiArrowsShield" },
    ]
  },
  {
    category: "Healers",
    classes: [
      { name: "WHM", label: "Mage Blanc", icon: "GiHealing" },
      { name: "SCH", label: "Érudit", icon: "GiHealing" },
      { name: "AST", label: "Astromancien", icon: "GiHealing" },
      { name: "SGE", label: "Sage", icon: "GiHealing" },
    ]
  },
  {
    category: "DPS - Mêlée",
    classes: [
      { name: "MNK", label: "Moine", icon: "GiTwoHandedSword" },
      { name: "DRG", label: "Chevalier Dragon", icon: "GiTwoHandedSword" },
      { name: "NIN", label: "Ninja", icon: "GiTwoHandedSword" },
      { name: "SAM", label: "Samouraï", icon: "GiTwoHandedSword" },
      { name: "RPR", label: "Faucheur", icon: "GiTwoHandedSword" },
    ]
  },
  {
    category: "DPS - Distance",
    classes: [
      { name: "BRD", label: "Barde", icon: "GiTwoHandedSword" },
      { name: "MCH", label: "Machiniste", icon: "GiTwoHandedSword" },
      { name: "DNC", label: "Danseur", icon: "GiTwoHandedSword" },
    ]
  },
  {
    category: "DPS - Magique",
    classes: [
      { name: "BLM", label: "Mage Noir", icon: "GiMagicSwirl" },
      { name: "SMN", label: "Invocateur", icon: "GiMagicSwirl" },
      { name: "RDM", label: "Mage Rouge", icon: "GiMagicSwirl" },
    ]
  }
];

// Options pour les races
const raceOptions = [
  "Hyur",
  "Elezen",
  "Lalafell",
  "Miqo'te",
  "Roegadyn",
  "Au Ra", 
  "Hrothgar",
  "Viera"
];

// Fonction pour obtenir l'icône basée sur le nom de classe
const getClassIcon = (className: string) => {
  for (const category of classOptions) {
    for (const cls of category.classes) {
      if (cls.name === className) {
        return cls.icon;
      }
    }
  }
  return "GiTwoHandedSword"; // Icône par défaut
};

export default function EditProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success' | 'error'} | null>(null);
  const [profile, setProfile] = useState<EditableProfile>({
    name: "",
    race: "",
    level: 90,
    mainClass: { name: "", icon: "", level: 90 },
    secondaryClass: { name: "", icon: "", level: 80 },
    responsibilities: [],
    lore: "",
    highlights: []
  });
  
  // Afficher une notification
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Charger les données du profil existant
  useEffect(() => {
    // Simuler un appel API pour récupérer les données
    setTimeout(() => {
      setProfile({
        name: "Joueur FFXIV",
        race: "Miqo'te",
        level: 90,
        mainClass: {
          name: "BLM",
          icon: "GiMagicSwirl",
          level: 90,
          specialization: "Magie temporelle"
        },
        secondaryClass: {
          name: "SMN",
          icon: "GiMagicSwirl", 
          level: 85
        },
        responsibilities: ["Raid leader", "Events"],
        lore: "Un aventurier venant de loin, à la recherche de défis et de nouvelles expériences.",
        highlights: ["A vaincu Bahamut Ultimate", "Triple Legend"]
      });
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Gérer les changements de champs de base
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gérer les changements de classe
  const handleClassChange = (field: 'mainClass' | 'secondaryClass', property: string, value: string | number) => {
    setProfile(prev => {
      const updatedClass = { ...prev[field] };
      
      if (property === 'name') {
        updatedClass.name = value as string;
        updatedClass.icon = getClassIcon(value as string);
      } else {
        updatedClass[property as keyof MemberClass] = value;
      }
      
      return {
        ...prev,
        [field]: updatedClass
      };
    });
  };
  
  // Ajouter un élément à une liste
  const handleAddItem = (field: 'responsibilities' | 'highlights') => {
    setProfile(prev => {
      const newItem = field === 'responsibilities' ? "Nouvelle responsabilité" : "Nouvel accomplissement";
      return {
        ...prev,
        [field]: [...prev[field], newItem]
      };
    });
  };
  
  // Modifier un élément dans une liste
  const handleItemChange = (field: 'responsibilities' | 'highlights', index: number, value: string) => {
    setProfile(prev => {
      const updatedItems = [...prev[field]];
      updatedItems[index] = value;
      return {
        ...prev,
        [field]: updatedItems
      };
    });
  };
  
  // Supprimer un élément d'une liste
  const handleRemoveItem = (field: 'responsibilities' | 'highlights', index: number) => {
    setProfile(prev => {
      const updatedItems = [...prev[field]];
      updatedItems.splice(index, 1);
      return {
        ...prev,
        [field]: updatedItems
      };
    });
  };
  
  // Enregistrer les modifications
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simuler une requête API pour enregistrer les données
    setTimeout(() => {
      showNotification('Profil mis à jour avec succès');
      setIsSaving(false);
      router.push('/profile');
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-violet-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      {notification && notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-md shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            Éditer mon profil
          </h1>
          <p className="text-gray-400 mt-2">
            Personnalisez vos informations pour les autres membres
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 space-x-3 flex">
          <Link href="/profile" className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md bg-black/20 text-gray-300 hover:bg-gray-800 transition-colors">
            <FaTimes className="mr-2" />
            Annuler
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:from-violet-700 hover:to-blue-700 transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations générales */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Informations générales</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="race" className="block text-sm font-medium text-gray-300 mb-1">Race</label>
              <select
                id="race"
                name="race"
                value={profile.race}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Sélectionner une race</option>
                {raceOptions.map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-1">Niveau</label>
              <input
                type="number"
                id="level"
                name="level"
                min="1"
                max="90"
                value={profile.level}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>
        
        {/* Classes */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Classes</h2>
          
          <div className="space-y-6">
            {/* Classe principale */}
            <div>
              <h3 className="text-md font-medium text-violet-300 mb-3">Classe principale</h3>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="mainClass" className="block text-sm font-medium text-gray-300 mb-1">Job</label>
                  <select
                    id="mainClass"
                    value={profile.mainClass.name}
                    onChange={(e) => handleClassChange('mainClass', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Sélectionner un job</option>
                    {classOptions.map(category => (
                      <optgroup key={category.category} label={category.category}>
                        {category.classes.map(cls => (
                          <option key={cls.name} value={cls.name}>{cls.name} - {cls.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mainClassLevel" className="block text-sm font-medium text-gray-300 mb-1">Niveau</label>
                  <input
                    type="number"
                    id="mainClassLevel"
                    min="1"
                    max="90"
                    value={profile.mainClass.level}
                    onChange={(e) => handleClassChange('mainClass', 'level', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="mainClassSpec" className="block text-sm font-medium text-gray-300 mb-1">Spécialisation (optionnel)</label>
                  <input
                    type="text"
                    id="mainClassSpec"
                    value={profile.mainClass.specialization || ''}
                    onChange={(e) => handleClassChange('mainClass', 'specialization', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Ex: Magie noire temporelle"
                  />
                </div>
              </div>
            </div>
            
            {/* Classe secondaire */}
            <div>
              <h3 className="text-md font-medium text-blue-300 mb-3">Classe secondaire</h3>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="secondaryClass" className="block text-sm font-medium text-gray-300 mb-1">Job</label>
                  <select
                    id="secondaryClass"
                    value={profile.secondaryClass.name}
                    onChange={(e) => handleClassChange('secondaryClass', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Sélectionner un job</option>
                    {classOptions.map(category => (
                      <optgroup key={category.category} label={category.category}>
                        {category.classes.map(cls => (
                          <option key={cls.name} value={cls.name}>{cls.name} - {cls.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="secondaryClassLevel" className="block text-sm font-medium text-gray-300 mb-1">Niveau</label>
                  <input
                    type="number"
                    id="secondaryClassLevel"
                    min="1"
                    max="90"
                    value={profile.secondaryClass.level}
                    onChange={(e) => handleClassChange('secondaryClass', 'level', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="secondaryClassSpec" className="block text-sm font-medium text-gray-300 mb-1">Spécialisation (optionnel)</label>
                  <input
                    type="text"
                    id="secondaryClassSpec"
                    value={profile.secondaryClass.specialization || ''}
                    onChange={(e) => handleClassChange('secondaryClass', 'specialization', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Ex: Invocation avancée"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Responsabilités */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Responsabilités</h2>
            <button
              onClick={() => handleAddItem('responsibilities')}
              className="inline-flex items-center px-2 py-1 rounded-md bg-violet-700/50 text-violet-200 text-sm hover:bg-violet-700/70 transition-colors"
            >
              <FaPlus className="mr-1" size={12} />
              Ajouter
            </button>
          </div>
          
          <div className="space-y-3">
            {profile.responsibilities.length === 0 ? (
              <p className="text-gray-400 text-sm italic">Aucune responsabilité définie</p>
            ) : (
              profile.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => handleItemChange('responsibilities', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    onClick={() => handleRemoveItem('responsibilities', index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-md transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Histoire du personnage */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Histoire du personnage</h2>
          
          <div>
            <textarea
              name="lore"
              value={profile.lore}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Décrivez l'histoire de votre personnage..."
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">Cette section est optionnelle et permet de décrire le lore de votre personnage</p>
          </div>
        </div>
        
        {/* Points forts */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 p-6 shadow-lg md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Moments marquants</h2>
            <button
              onClick={() => handleAddItem('highlights')}
              className="inline-flex items-center px-2 py-1 rounded-md bg-blue-700/50 text-blue-200 text-sm hover:bg-blue-700/70 transition-colors"
            >
              <FaPlus className="mr-1" size={12} />
              Ajouter
            </button>
          </div>
          
          <div className="space-y-3">
            {profile.highlights.length === 0 ? (
              <p className="text-gray-400 text-sm italic">Aucun moment marquant défini</p>
            ) : (
              profile.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleItemChange('highlights', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    onClick={() => handleRemoveItem('highlights', index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-md transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Ajoutez vos réussites les plus impressionnantes (raids ultimates, titres rares, etc.)
          </p>
        </div>
      </div>
    </div>
  );
} 