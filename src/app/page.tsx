import { HeroSection } from '@/components/sections/HeroSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedProjects />
    </>
  );
}
