import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const featuredProjects = (projectsData as Project[]).filter((p) => p.featured);

function AwardRibbon({ award }: { award: 'winner' | 'submitted' }) {
  if (award === 'winner') {
    return (
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-amber-500/30">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        PotY Winner
      </div>
    );
  }
  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-charcoal-950 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
      <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      PotY Nominee
    </div>
  );
}

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Award-Winning Projects"
            subtitle="Recognized for excellence in mass timber construction by IMPACT"
            align="center"
            className="mb-12"
          />
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden">
                  {/* Image */}
                  <Image
                    src={project.image || '/images/construction-wide.png'}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />

                  {/* Award ribbon */}
                  {project.award && <AwardRibbon award={project.award} />}

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-amber-400 text-sm font-semibold mb-2">{project.location}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-cream font-[family-name:var(--font-jakarta)] mb-3 group-hover:text-amber-400 transition-colors">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-cream/70 text-sm leading-relaxed line-clamp-2 mb-4 max-w-lg">
                        {project.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-cream/60 text-xs">
                      {project.contractor && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          {project.contractor}
                        </span>
                      )}
                      {project.ironworkerHours && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {project.ironworkerHours.toLocaleString()} hours
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-600 transition-colors"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
