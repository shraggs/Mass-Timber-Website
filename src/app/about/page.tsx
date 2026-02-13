import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/layout/PageBanner';
import { slideshowImages } from '@/data/slideshow-images';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsSection } from '@/components/sections/StatsSection';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { NetworkSection } from '@/components/sections/NetworkSection';
import { TeamPreview } from '@/components/sections/TeamPreview';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { ProjectsOfTheYear } from '@/components/sections/ProjectsOfTheYear';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the International Association of Bridge, Structural, Ornamental and Reinforcing Iron Workers and their expertise in mass timber construction.',
};

const featuredProjects = [
  { name: 'Bellingham Public Schools Administrative Offices', location: 'Bellingham, Washington 98226', image: '/images/construction-wide.png' },
  { name: 'Santa Barbara Police Station', location: '215 E Figueroa St, Santa Barbara, CA 93101', image: '/images/timber-beams-wide.png' },
  { name: 'T3 Mount Pleasant', location: '123 East 6th Avenue, Vancouver, BC, CA V5T 1J6', image: '/images/panoramic-beams.png' },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="Building the future with Ironworker precision"
        backgroundImage="/images/about-hero.jpg"
        images={slideshowImages.about}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Who we are' }]}
      />

      {/* About the Union */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading title="About the Union" eyebrow="Our Heritage" />
              <p className="mt-6 text-charcoal-950/70 leading-relaxed">
                The International Association of Bridge, Structural, Ornamental and Reinforcing Iron Workers, AFL-CIO (IW), is a proud trade association whose beginnings go back to the 1890s. The IW represents 120,000 members in North America. Members of our union have worked on nearly every major construction project you can think of – the Golden Gate Bridge, the Sears Tower, the St. Louis Arch, the Oil Sands Plant Expansion in Alberta, the World Trade Center and Freedom Tower.
              </p>
              <p className="mt-4 text-charcoal-950/70 leading-relaxed">
                We represent ironworkers who work on bridges, structural steel, ornamental, architectural and miscellaneous metals, rebar and in shops. Across North America, we build. And we build safely and skillfully, getting the job done right and on time.
              </p>
              <p className="mt-4 text-charcoal-950/70 leading-relaxed">
                We provide many benefits and support for our members. These benefits include the advantage of working under a collective bargaining agreement that brings bigger paychecks, better health and retirement benefits, more secure jobs and safe working conditions. Explore our site and find out how ironworkers are building the infrastructure of North America!
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden glass-light">
              <Image
                src="/images/our-union-workers.jpg"
                alt="Ironworkers on mass timber beams"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <StatsSection />
      <PartnerLogos />
      <NetworkSection />

      {/* Featured Projects */}
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

      <TeamPreview />
      <TestimonialSlider />
      <ProjectsOfTheYear />
    </>
  );
}
