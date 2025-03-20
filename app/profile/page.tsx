import { Metadata } from 'next';
import Link from 'next/link';
import { FaUserCog, FaCalendarAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';

import UserProfileDisplay from '../components/user/UserProfileDisplay';

export const metadata: Metadata = {
  title: 'Profil | Psycho Allagan',
  description: 'Gérez votre profil et vos paramètres personnels',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 mb-2">
            Mon Profil
          </h1>
          <p className="text-gray-400">
            Gérez votre profil et vos paramètres personnels
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-4">
          <Link 
            href="/profile/edit" 
            className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:from-violet-700 hover:to-blue-700 transition-colors"
          >
            <FaUserEdit className="mr-2" />
            Modifier mon profil
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfileDisplay />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaUserCog className="mr-2 text-blue-400" />
                Gestion du compte
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/events/my-events" className="group flex flex-col p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-3">
                      <FaCalendarAlt className="text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white">Mes événements</h3>
                  </div>
                  <p className="text-sm text-gray-400">Gérez vos inscriptions aux événements</p>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-violet-500 mt-3 transition-all duration-300"></div>
                </Link>
                
                <Link href="/auth/signout" className="group flex flex-col p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center mr-3">
                      <FaSignOutAlt className="text-red-400" />
                    </div>
                    <h3 className="font-semibold text-white">Déconnexion</h3>
                  </div>
                  <p className="text-sm text-gray-400">Se déconnecter du site</p>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-500 to-violet-500 mt-3 transition-all duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 