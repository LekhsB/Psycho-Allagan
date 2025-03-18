import type { Metadata } from 'next';
import NightclubHero from '@/app/components/nightclub/NightclubHero';
import EventCalendar from '@/app/components/nightclub/EventCalendar';
import ThemeShowcase from '@/app/components/nightclub/ThemeShowcase';
import DjProfiles from '@/app/components/nightclub/DjProfiles';
import MenuSection from '@/app/components/nightclub/MenuSection';
import ReservationSystem from '@/app/components/nightclub/ReservationSystem';
import GallerySection from '@/app/components/nightclub/GallerySection';
import FeedbackSection from '@/app/components/nightclub/FeedbackSection';

export const metadata: Metadata = {
  title: 'Nébula Nightclub | Free Company Psycho Allagan',
  description: 'Découvrez notre nightclub exclusif avec ses soirées thématiques, DJs talentueux, cocktails signature et ambiances uniques. Réservez dès maintenant pour une expérience inoubliable.',
  keywords: 'nightclub, FFXIV, Psycho Allagan, soirées thématiques, DJs, cocktails, réservation'
};

export default function NightclubPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Section Héro */}
      <NightclubHero />
      
      {/* Calendrier des événements */}
      <EventCalendar />
      
      {/* Présentation des thèmes */}
      <ThemeShowcase />
      
      {/* Profils des DJs */}
      <DjProfiles />
      
      {/* Menu des consommations */}
      <MenuSection />
      
      {/* Système de réservation */}
      <ReservationSystem />
      
      {/* Galerie d'images et vidéos */}
      <GallerySection />
      
      {/* Système de feedback */}
      <FeedbackSection />
    </main>
  );
} 