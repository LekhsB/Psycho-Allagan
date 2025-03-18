"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

// Liste des classes/jobs de FFXIV
const jobOptions = [
  // Tanks
  { value: "paladin", label: "Paladin", role: "tank" },
  { value: "warrior", label: "Guerrier", role: "tank" },
  { value: "darkknight", label: "Chevalier Noir", role: "tank" },
  { value: "gunbreaker", label: "Pistosabreur", role: "tank" },
  
  // Healers
  { value: "whitemage", label: "Mage Blanc", role: "healer" },
  { value: "scholar", label: "Érudit", role: "healer" },
  { value: "astrologian", label: "Astromancien", role: "healer" },
  { value: "sage", label: "Sage", role: "healer" },
  
  // Mêlée DPS
  { value: "monk", label: "Moine", role: "dps" },
  { value: "dragoon", label: "Chevalier Dragon", role: "dps" },
  { value: "ninja", label: "Ninja", role: "dps" },
  { value: "samurai", label: "Samouraï", role: "dps" },
  { value: "reaper", label: "Faucheur", role: "dps" },
  
  // Ranged Physical DPS
  { value: "bard", label: "Barde", role: "dps" },
  { value: "machinist", label: "Machiniste", role: "dps" },
  { value: "dancer", label: "Danseur", role: "dps" },
  
  // Ranged Magical DPS
  { value: "blackmage", label: "Mage Noir", role: "dps" },
  { value: "summoner", label: "Invocateur", role: "dps" },
  { value: "redmage", label: "Mage Rouge", role: "dps" },
  { value: "bluemage", label: "Mage Bleu (limité)", role: "dps" },
];

const experienceOptions = [
  { value: "beginner", label: "Débutant (< 6 mois)" },
  { value: "intermediate", label: "Intermédiaire (6 mois - 2 ans)" },
  { value: "experienced", label: "Expérimenté (2 - 5 ans)" },
  { value: "veteran", label: "Vétéran (5+ ans)" }
];

export default function RecruitmentForm() {
  const [formState, setFormState] = useState({
    name: "",
    characterName: "",
    server: "Moogle",
    mainJob: "",
    experience: "",
    otherJobs: "",
    raiding: "",
    motivation: "",
    discord: "",
    email: ""
  });
  
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.characterName.trim()) {
      newErrors.characterName = "Veuillez entrer votre nom de personnage";
    }
    
    if (!formState.mainJob) {
      newErrors.mainJob = "Veuillez sélectionner votre classe principale";
    }
    
    if (!formState.experience) {
      newErrors.experience = "Veuillez indiquer votre niveau d'expérience";
    }
    
    if (!formState.motivation.trim()) {
      newErrors.motivation = "Veuillez nous parler de votre motivation";
    }
    
    if (!formState.discord.trim()) {
      newErrors.discord = "Veuillez entrer votre identifiant Discord";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitStatus("submitting");
    
    // Simuler un appel API de soumission du formulaire
    try {
      // Dans une implémentation réelle, vous feriez un appel à votre API ici
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    }
  };
  
  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="mx-auto w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <FaCheckCircle className="text-3xl text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Candidature envoyée !</h3>
        <p className="text-gray-300 mb-4">
          Merci pour votre intérêt envers notre compagnie libre. Nous examinerons votre candidature 
          et vous contacterons sur Discord pour organiser un entretien.
        </p>
        <p className="text-violet-400">
          Assurez-vous d'avoir activé les messages directs de la part des membres du serveur Discord.
        </p>
      </motion.div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom de personnage */}
        <div>
          <label htmlFor="characterName" className="block text-sm font-medium text-gray-300 mb-1">
            Nom de personnage *
          </label>
          <input
            type="text"
            id="characterName"
            name="characterName"
            value={formState.characterName}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black/60 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.characterName 
                ? "border-red-500 focus:ring-red-500/50" 
                : "border-violet-500/30 focus:ring-violet-500/50"
            }`}
            placeholder="Ex: Warrior Of Light"
          />
          {errors.characterName && (
            <p className="mt-1 text-sm text-red-400">{errors.characterName}</p>
          )}
        </div>
        
        {/* Serveur */}
        <div>
          <label htmlFor="server" className="block text-sm font-medium text-gray-300 mb-1">
            Serveur
          </label>
          <select
            id="server"
            name="server"
            value={formState.server}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/60 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option value="Moogle">Moogle</option>
            <option value="Louisoix">Louisoix</option>
            <option value="Omega">Omega</option>
            <option value="Phantom">Phantom</option>
            <option value="Ragnarok">Ragnarok</option>
            <option value="Spriggan">Spriggan</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Autre">Autre serveur</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Classe principale */}
        <div>
          <label htmlFor="mainJob" className="block text-sm font-medium text-gray-300 mb-1">
            Classe principale *
          </label>
          <select
            id="mainJob"
            name="mainJob"
            value={formState.mainJob}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black/60 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.mainJob 
                ? "border-red-500 focus:ring-red-500/50" 
                : "border-violet-500/30 focus:ring-violet-500/50"
            }`}
          >
            <option value="">Sélectionnez votre classe principale</option>
            <optgroup label="Tanks">
              {jobOptions.filter(job => job.role === "tank").map(job => (
                <option key={job.value} value={job.value}>{job.label}</option>
              ))}
            </optgroup>
            <optgroup label="Healers">
              {jobOptions.filter(job => job.role === "healer").map(job => (
                <option key={job.value} value={job.value}>{job.label}</option>
              ))}
            </optgroup>
            <optgroup label="DPS">
              {jobOptions.filter(job => job.role === "dps").map(job => (
                <option key={job.value} value={job.value}>{job.label}</option>
              ))}
            </optgroup>
          </select>
          {errors.mainJob && (
            <p className="mt-1 text-sm text-red-400">{errors.mainJob}</p>
          )}
        </div>
        
        {/* Niveau d'expérience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
            Niveau d'expérience *
          </label>
          <select
            id="experience"
            name="experience"
            value={formState.experience}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black/60 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.experience 
                ? "border-red-500 focus:ring-red-500/50" 
                : "border-violet-500/30 focus:ring-violet-500/50"
            }`}
          >
            <option value="">Sélectionnez votre niveau d'expérience</option>
            {experienceOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-red-400">{errors.experience}</p>
          )}
        </div>
      </div>
      
      {/* Autres classes */}
      <div>
        <label htmlFor="otherJobs" className="block text-sm font-medium text-gray-300 mb-1">
          Autres classes jouées (optionnel)
        </label>
        <input
          type="text"
          id="otherJobs"
          name="otherJobs"
          value={formState.otherJobs}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black/60 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          placeholder="Ex: Ninja 90, Mage Blanc 90, Samouraï 87..."
        />
      </div>
      
      {/* Expérience de raid */}
      <div>
        <label htmlFor="raiding" className="block text-sm font-medium text-gray-300 mb-1">
          Expérience en raid (optionnel)
        </label>
        <input
          type="text"
          id="raiding"
          name="raiding"
          value={formState.raiding}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black/60 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          placeholder="Ex: Pandaemonium Savage, Eden's Promise, etc."
        />
      </div>
      
      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-300 mb-1">
          Motivation *
        </label>
        <textarea
          id="motivation"
          name="motivation"
          value={formState.motivation}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 bg-black/60 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.motivation 
              ? "border-red-500 focus:ring-red-500/50" 
              : "border-violet-500/30 focus:ring-violet-500/50"
          }`}
          placeholder="Dites-nous pourquoi vous souhaitez rejoindre Psycho Allagan et ce que vous recherchez dans une compagnie libre."
        />
        {errors.motivation && (
          <p className="mt-1 text-sm text-red-400">{errors.motivation}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Discord */}
        <div>
          <label htmlFor="discord" className="block text-sm font-medium text-gray-300 mb-1">
            Discord *
          </label>
          <input
            type="text"
            id="discord"
            name="discord"
            value={formState.discord}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black/60 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.discord 
                ? "border-red-500 focus:ring-red-500/50" 
                : "border-violet-500/30 focus:ring-violet-500/50"
            }`}
            placeholder="Ex: username#1234 ou username"
          />
          {errors.discord && (
            <p className="mt-1 text-sm text-red-400">{errors.discord}</p>
          )}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email (optionnel)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/60 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            placeholder="votre.email@exemple.com"
          />
        </div>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-all ${
            submitStatus === "submitting"
              ? "bg-violet-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg hover:shadow-violet-500/20"
          }`}
        >
          {submitStatus === "submitting" ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Envoi en cours...
            </span>
          ) : (
            "Envoyer ma candidature"
          )}
        </button>
        
        <p className="mt-3 text-xs text-gray-400 text-center">
          En soumettant ce formulaire, vous acceptez que nous conservions vos informations 
          à des fins de recrutement. Nous ne partagerons jamais vos données avec des tiers.
        </p>
      </div>
    </form>
  );
} 