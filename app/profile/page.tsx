import UserProfileDisplay from "../components/user/UserProfileDisplay";
import Link from "next/link";

export const metadata = {
  title: "Profil | Psycho Allagan",
  description: "Gérez votre profil membre de la compagnie libre Psycho Allagan sur Final Fantasy XIV.",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 mb-2">
            Profil Utilisateur
          </h1>
          <p className="text-gray-400">
            Gérez votre profil et vos informations personnelles
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 rounded-full mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Colonne de gauche - Profil */}
          <div className="md:col-span-5">
            <UserProfileDisplay showDetails={true} />
          </div>
          
          {/* Colonne de droite - Options et liens */}
          <div className="md:col-span-7">
            <div className="bg-black/40 backdrop-blur-md rounded-xl border border-violet-500/20 overflow-hidden shadow-[0_5px_20px_rgba(147,51,234,0.2)] p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Options du profil
              </h2>
              
              <div className="space-y-4">
                <Link 
                  href="/events/my-events"
                  className="flex items-center p-4 bg-gradient-to-r from-violet-900/30 to-blue-900/30 rounded-lg border border-violet-500/20 hover:border-violet-500/50 transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] group"
                >
                  <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center mr-4 group-hover:bg-violet-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Mes événements</h3>
                    <p className="text-sm text-gray-400">Gérez vos inscriptions aux événements</p>
                  </div>
                </Link>
                
                <Link 
                  href="/auth/signout"
                  className="flex items-center p-4 bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-lg border border-red-500/20 hover:border-red-500/50 transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] group"
                >
                  <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4 group-hover:bg-red-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Déconnexion</h3>
                    <p className="text-sm text-gray-400">Se déconnecter de votre compte</p>
                  </div>
                </Link>
              </div>
              
              <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informations
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Votre profil est automatiquement créé à partir de votre compte Discord. Pour modifier votre nom ou votre avatar, vous devez les changer sur Discord directement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 