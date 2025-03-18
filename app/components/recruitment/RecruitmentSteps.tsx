"use client";

import { motion } from "framer-motion";
import { FaUserEdit, FaDiscord, FaUserCheck, FaUsers } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserEdit className="text-2xl text-violet-400" />,
    title: "Candidature",
    description: "Remplissez le formulaire de candidature avec toutes les informations demandées."
  },
  {
    icon: <FaDiscord className="text-2xl text-blue-400" />,
    title: "Entretien",
    description: "Nos officiers examinent votre candidature et organisent un entretien sur Discord."
  },
  {
    icon: <FaUserCheck className="text-2xl text-green-400" />,
    title: "Validation",
    description: "Après examen, nous vous informons de la décision concernant votre candidature."
  },
  {
    icon: <FaUsers className="text-2xl text-pink-400" />,
    title: "Intégration",
    description: "Vous obtenez le grade de recrue et accédez progressivement aux ressources de la CL."
  }
];

export default function RecruitmentSteps() {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex gap-4 bg-black/50 p-4 rounded-lg border border-violet-500/20 hover:border-violet-500/40 transition-colors"
        >
          <div className="w-12 h-12 flex-shrink-0 bg-black/60 rounded-full flex items-center justify-center">
            {step.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span className="text-sm text-violet-400">Étape {index + 1}</span>
              <span className="w-4 h-px bg-violet-500/50"></span>
              <span>{step.title}</span>
            </h3>
            <p className="text-gray-300 mt-1 text-sm">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 