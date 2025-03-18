import { Metadata } from 'next';
import TutorialsHero from '../components/tutorials/TutorialsHero';
import ClassGuides from '../components/tutorials/ClassGuides';
import RoleGuides from '../components/tutorials/RoleGuides';
import AdvancedTips from '../components/tutorials/AdvancedTips';
import BuildsRotations from '../components/tutorials/BuildsRotations';
import GearGuides from '../components/tutorials/GearGuides';
import ExternalResources from '../components/tutorials/ExternalResources';

export const metadata: Metadata = {
  title: 'Tutoriels | Psycho Allagan',
  description: 'Guides et tutoriels pour tous les aspects de Final Fantasy XIV, incluant les classes, rôles et rotations optimales.',
};

export default function TutorialsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-8 text-gradient-primary">
          Centre de Tutoriels
        </h1>
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16">
          Explorez nos guides complets pour maîtriser tous les aspects de Final Fantasy XIV, 
          des spécificités de chaque classe aux stratégies de combat avancées.
        </p>

        <div className="space-y-32">
          <ClassGuides />
          <RoleGuides />
          <BuildsRotations />
        </div>
      </div>
    </main>
  );
} 