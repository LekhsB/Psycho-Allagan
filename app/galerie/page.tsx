import { Metadata } from "next";
import GalleryHeader from "@/app/components/gallery/GalleryHeader";
import GalleryFilters from "@/app/components/gallery/GalleryFilters";
import MediaGrid from "@/app/components/gallery/MediaGrid";
import CarouselSection from "@/app/components/gallery/CarouselSection";
import FeaturedClips from "@/app/components/gallery/FeaturedClips";
import UploadSection from "@/app/components/gallery/UploadSection";
import CategoryTabs from "@/app/components/gallery/CategoryTabs";

export const metadata: Metadata = {
  title: "Galerie | Psycho Allagan",
  description: "Découvrez les images et vidéos de notre compagnie libre Psycho Allagan sur FFXIV - Raids, Soirées, RP, Housing et bien plus encore.",
};

export default function GalleryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <GalleryHeader />
      
      {/* Section Carrousel - Images en vedette */}
      <section className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Images en vedette</h2>
        <CarouselSection />
      </section>
      
      {/* Section vidéos/clips */}
      <section className="w-full mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Clips vidéo</h2>
        <FeaturedClips />
      </section>
      
      {/* Galerie principale avec filtres */}
      <section className="w-full mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-gradient-primary">Galerie complète</h2>
          <UploadSection />
        </div>
        
        <div className="bg-glass rounded-lg p-6 mb-8">
          <CategoryTabs />
          <GalleryFilters />
        </div>
        
        <MediaGrid />
      </section>
    </main>
  );
} 