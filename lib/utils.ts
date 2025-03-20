import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitaire pour fusionner les classes CSS avec tailwindcss
 * Combine clsx et tailwind-merge pour une gestion optimale des classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 