"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FaTachometerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaGlassCheers, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaLock, 
  FaChevronRight
} from "react-icons/fa";

// Type pour les liens de navigation admin
type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Vérifier que l'utilisateur a le rôle admin
  useEffect(() => {
    // Attendre que le statut d'authentification soit résolu
    if (status === "loading") return;

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    // Vérifier que l'utilisateur a le rôle administrateur
    const userRole = session?.user?.role;
    if (userRole !== "admin") {
      // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
      router.push("/");
      return;
    }

    setLoading(false);
  }, [status, session, router]);

  // Liens de navigation admin
  const navLinks: NavLink[] = [
    {
      href: "/admin",
      label: "Tableau de bord",
      icon: <FaTachometerAlt className="w-5 h-5" />,
      active: pathname === "/admin",
    },
    {
      href: "/admin/evenements",
      label: "Événements",
      icon: <FaCalendarAlt className="w-5 h-5" />,
      active: pathname?.startsWith("/admin/evenements"),
    },
    {
      href: "/admin/nightclub",
      label: "Nightclub",
      icon: <FaGlassCheers className="w-5 h-5" />,
      active: pathname?.startsWith("/admin/nightclub"),
    },
    {
      href: "/admin/membres",
      label: "Membres",
      icon: <FaUsers className="w-5 h-5" />,
      active: pathname?.startsWith("/admin/membres"),
    },
    {
      href: "/admin/parametres",
      label: "Paramètres",
      icon: <FaCog className="w-5 h-5" />,
      active: pathname?.startsWith("/admin/parametres"),
    },
  ];

  // Si chargement en cours, afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black/95">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 lg:relative transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out 
        w-64 bg-black/95 border-r border-violet-900/30 flex flex-col`}
      >
        <div className="p-5 border-b border-violet-900/30">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center mr-3">
              <FaLock className="text-violet-400 text-xl" />
            </div>
            <h1 className="text-xl font-bold text-white">Administration</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Connecté en tant que {session?.user?.name || "Admin"}
          </p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 text-gray-300 rounded-lg transition-all duration-200
              ${link.active 
                ? 'bg-violet-900/30 border border-violet-500/30 text-white' 
                : 'hover:bg-gray-900/60 hover:text-white'
              }`}
            >
              <div className={`flex-shrink-0 ${link.active ? 'text-violet-400' : 'text-gray-400'}`}>
                {link.icon}
              </div>
              <span className="ml-3 flex-1">{link.label}</span>
              {link.active && <FaChevronRight className="w-3 h-3 text-violet-400" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-violet-900/30">
          <Link 
            href="/"
            className="flex items-center justify-center w-full px-4 py-2 text-sm 
            text-white bg-violet-900/30 hover:bg-violet-900/50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4 mr-2" />
            Retour au Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-black/80 border-b border-violet-900/30 shadow-sm py-3 px-4 sm:px-6 lg:px-8 flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-4 text-gray-400 hover:text-white"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-white">
            {navLinks.find(link => link.active)?.label || "Administration"}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 