"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EventsCalendar from '../components/events/EventsCalendar';
import EventsList from '../components/events/EventsList';
import EventsFilters from '../components/events/EventsFilters';
import ProjectsList from '../components/events/ProjectsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function EventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 animate-pulse opacity-70 blur-lg"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-violet-500 animate-spin"></div>
          <div className="absolute inset-5 rounded-full bg-black"></div>
        </div>
      </div>
    );
  }

  // Ne rien afficher si l'utilisateur n'est pas authentifié
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-xl"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-violet-500/30">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
              Événements
            </h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              Consultez le calendrier des événements, inscrivez-vous aux activités et suivez les projets en cours de la Compagnie Libre.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-lg shadow-violet-500/20 transition-all duration-200">
              Créer un événement
            </button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-4 max-w-md mb-8">
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="mine">Mes événements</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <EventsFilters />
            </div>
            <div className="md:w-3/4">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-violet-500/20">
                <EventsCalendar />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-violet-500/20">
            <EventsList />
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-violet-500/20">
            <ProjectsList />
          </div>
        </TabsContent>

        <TabsContent value="mine">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-violet-500/20">
            <h2 className="text-2xl font-bold mb-4 text-violet-300">Mes événements</h2>
            <p className="text-gray-400 mb-6">Événements auxquels vous êtes inscrit(e).</p>
            {/* Liste des événements de l'utilisateur */}
            <div className="text-center py-8 text-gray-400">
              <p>Vous n'êtes actuellement inscrit(e) à aucun événement.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 