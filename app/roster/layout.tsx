import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Roster de Raid | Psycho Allagan',
  description: 'Gestion des équipes de raid, suivi des équipements et analyse des performances',
};

export default function RosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-400 hover:text-white"
        >
          <FaArrowLeft className="mr-2 h-3 w-3" />
          Retour à l'accueil
        </Link>
        
        {children}
      </div>
    </div>
  );
} 