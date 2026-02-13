import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { GradientOrb } from '@/components/ui/GradientOrb';
import categoriesData from '@/data/categories.json';
import type { Category } from '@/types';

export function ProjectCategories() {
  const categories = categoriesData as Category[];

  return (
    <section className="py-16 md:py-24 bg-charcoal-950 relative overflow-hidden">
      <GradientOrb color="amber" size="lg" speed="slow" className="top-10 -right-40 opacity-15" />
      <GradientOrb color="forest" size="md" speed="normal" className="bottom-10 -left-20 opacity-10" />

      <Container className="relative z-10">
        <SectionHeading
          title="Explore Mass Timber"
          subtitle="Bring Ironworker Strength to Your Mass Timber Project"
          eyebrow="Projects"
          align="center"
          dark
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {categories.slice(0, 3).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2">
          {categories.slice(3).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
