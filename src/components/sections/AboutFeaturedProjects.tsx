import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const featuredProjects = [
  { name: 'Bellingham Public Schools Administrative Offices', location: 'Bellingham, Washington 98226', image: '/images/construction-wide.png' },
  { name: 'Santa Barbara Police Station', location: '215 E Figueroa St, Santa Barbara, CA 93101', image: '/images/timber-beams-wide.png' },
  { name: 'T3 Mount Pleasant', location: '123 East 6th Avenue, Vancouver, BC, CA V5T 1J6', image: '/images/panoramic-beams.png' },
];

export function AboutFeaturedProjects() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title="Featured Projects" align="center" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <GlassCard key={project.name} hover padding="none">
              <div className="relative h-48 overflow-hidden">
                <Image src={project.image} alt={project.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)] mb-1">{project.name}</h3>
                <p className="text-sm text-charcoal-950/60 flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {project.location}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
