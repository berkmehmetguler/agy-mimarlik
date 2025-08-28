import { Hero } from '@/components/Hero';
import { AtolyeAIPromo } from '@/components/AtolyeAI/AtolyeAIPromo';
import { FeaturedProjects } from '@/components/FeaturedProjects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AtolyeAIPromo />
      <FeaturedProjects />
    </>
  );
}