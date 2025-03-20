import { useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  
  // Vérifier si l'utilisateur est administrateur
  const isAdmin = session?.user?.role === 'admin';
  
  const navigationLinks = [
    { 
      name: 'Accueil', 
      href: '/', 
      active: pathname === '/' 
    },
    { 
      name: 'Roster', 
      href: '/roster', 
      active: pathname.startsWith('/roster'),
      authRequired: true
    },
    { 
      name: 'Stratégies', 
      href: '/strategies', 
      active: pathname.startsWith('/strategies'),
      authRequired: true
    },
    { 
      name: 'Événements', 
      href: '/evenements', 
      active: pathname.startsWith('/evenements') 
    },
    { 
      name: 'Nightclub', 
      href: '/nightclub', 
      active: pathname.startsWith('/nightclub') 
    },
    { 
      name: 'Galerie', 
      href: '/galerie', 
      active: pathname.startsWith('/galerie') 
    },
    // Ajouter le lien d'administration uniquement pour les admins
    { 
      name: 'Administration', 
      href: '/admin', 
      active: pathname.startsWith('/admin'),
      adminRequired: true
    },
  ];
  
  return (
    <div className="hidden lg:flex lg:gap-x-8">
      {navigationLinks.map((link) => {
        // Vérifier les conditions d'affichage des liens
        if (
          (link.authRequired && !session) || 
          (link.adminRequired && !isAdmin)
        ) {
          return null; // Ne pas afficher le lien
        }
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              link.active
                ? 'text-white font-semibold'
                : 'text-gray-300 hover:text-white'
            } transition duration-300 ease-in-out`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
    
    {/* Menu mobile */}
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } lg:hidden absolute top-full left-0 w-full bg-gray-900 shadow-lg shadow-purple-900/20 rounded-b-xl z-50`}
    >
      <div className="px-4 pt-2 pb-4 space-y-1">
        {navigationLinks.map((link) => {
          // Vérifier les conditions d'affichage des liens
          if (
            (link.authRequired && !session) || 
            (link.adminRequired && !isAdmin)
          ) {
            return null; // Ne pas afficher le lien
          }
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                link.active
                  ? 'text-white bg-violet-900/30 border-l-2 border-violet-500 pl-3'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
} 