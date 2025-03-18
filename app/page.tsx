import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import NewsAndAnnouncements from "./components/home/GalleryPreview";
import OrganizationStructure from "./components/home/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <OrganizationStructure />
      <NewsAndAnnouncements />
    </>
  );
}
