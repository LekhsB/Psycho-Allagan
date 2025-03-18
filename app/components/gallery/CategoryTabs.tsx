"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChampagneGlasses, FaHouse, FaImages } from "react-icons/fa6";
import { GiCrossedSwords, GiTheaterCurtains } from "react-icons/gi";

interface CategoryTabProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
}

// Les catégories disponibles
const categories = [
  { id: "all", label: "Tous", icon: <FaImages />, count: 425 },
  { id: "raids", label: "Raids", icon: <GiCrossedSwords />, count: 157 },
  { id: "parties", label: "Soirées", icon: <FaChampagneGlasses />, count: 128 },
  { id: "rp", label: "RP", icon: <GiTheaterCurtains />, count: 67 },
  { id: "housing", label: "Housing", icon: <FaHouse />, count: 73 }
];

export default function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 md:gap-0 md:flex-nowrap">
        {categories.map((category) => (
          <CategoryTab
            key={category.id}
            icon={category.icon}
            label={category.label}
            count={category.count}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryTab({ icon, label, isActive, count, onClick }: CategoryTabProps) {
  return (
    <button
      className={`flex-1 relative flex flex-col items-center py-3 px-1 text-sm md:text-base transition-colors ${
        isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="text-xl mb-1 transition-transform transform-gpu group-hover:scale-110">
        {icon}
      </div>
      <span>{label}</span>
      <span className="text-xs opacity-60">({count})</span>
      
      {/* Indicateur actif */}
      {isActive && (
        <motion.div
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500"
          layoutId="categoryIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
} 