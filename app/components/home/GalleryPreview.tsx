import Link from 'next/link';
import { FaBullhorn, FaCalendarAlt, FaInfoCircle, FaTrophy } from 'react-icons/fa';

export default function NewsAndAnnouncements() {
  // Données des annonces (à remplacer par vos propres annonces)
  const announcements = [
    { 
      id: 1, 
      title: 'Raid Bahamut - Ouverture des inscriptions', 
      type: 'event',
      date: '12 Juillet 2023',
      excerpt: 'Les inscriptions pour le prochain raid contre Bahamut sont maintenant ouvertes. Rejoignez-nous pour cette aventure épique !',
      icon: FaCalendarAlt,
      color: 'from-blue-600 to-violet-600'
    },
    { 
      id: 2, 
      title: 'Mise à jour des règles de la compagnie', 
      type: 'info',
      date: '5 Juillet 2023',
      excerpt: 'Suite à notre dernière réunion des officiers, nous avons actualisé la charte de conduite de notre compagnie libre.',
      icon: FaInfoCircle,
      color: 'from-green-600 to-blue-600'
    },
    { 
      id: 3, 
      title: 'Félicitations à notre équipe de raid !', 
      type: 'achievement',
      date: '30 Juin 2023',
      excerpt: 'Notre équipe a terminé avec succès le raid Pandaemonium Savage. Un grand bravo à tous les participants !',
      icon: FaTrophy,
      color: 'from-yellow-600 to-red-600'
    },
    { 
      id: 4, 
      title: 'Recrutement de nouveaux Mages Noirs', 
      type: 'announcement',
      date: '25 Juin 2023',
      excerpt: 'Nous recherchons activement des Mages Noirs pour compléter nos équipes de raid. Partagez l\'information !',
      icon: FaBullhorn,
      color: 'from-red-600 to-violet-600'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-violet-950/50 relative overflow-hidden">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Lignes de néon verticales */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              Annonces et Actualités
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Restez informés des dernières nouvelles, événements à venir et décisions importantes concernant notre compagnie libre.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="bg-black/60 border border-violet-900/30 rounded-lg p-6 relative group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${announcement.color} opacity-0 group-hover:opacity-20 blur-md -z-10 transition-opacity duration-300`}></div>
              
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${announcement.color} flex items-center justify-center`}>
                  <announcement.icon className="text-white text-xl" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                    <span className="text-sm text-gray-400">{announcement.date}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{announcement.excerpt}</p>
                  
                  <Link 
                    href={`/actualites/${announcement.id}`}
                    className="text-violet-400 hover:text-violet-300 text-sm inline-flex items-center gap-1 group/link"
                  >
                    Lire la suite
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${announcement.color} group-hover:w-full transition-all duration-500`}></div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/actualites" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 via-blue-600 to-red-600 text-white font-bold rounded-md hover:from-violet-700 hover:via-blue-700 hover:to-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            Toutes les actualités
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 