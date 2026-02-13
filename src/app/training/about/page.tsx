import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideshowImages } from '@/data/slideshow-images';

export const metadata: Metadata = {
  title: 'About Training',
  description: 'Learn about mass timber training programs designed for ironworkers. Comprehensive curriculum covering CLT installation, structural erection, and safety.',
};

const programHighlights = [
  {
    title: 'CLT Panel Installation',
    description: 'Hands-on training in Cross-Laminated Timber panel handling, positioning, and secure fastening techniques.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
    ),
  },
  {
    title: 'Glulam Beam Erection',
    description: 'Master the precision erection of Glulam beams including rigging, lifting, and alignment procedures.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
  },
  {
    title: 'Steel-to-Timber Connections',
    description: 'Learn hybrid connection systems that join engineered wood with steel components for modern structural assemblies.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
  },
  {
    title: 'Crane & Rigging Operations',
    description: 'Specialized rigging techniques for mass timber elements, including signal communication and load management.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: 'Fall Protection Systems',
    description: 'Comprehensive fall protection training specific to mass timber construction environments and elevated work.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
  },
  {
    title: 'Blueprint Reading & Layout',
    description: 'Interpret mass timber construction drawings, shop drawings, and erection plans for accurate field execution.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
  },
];

const certificationLevels = [
  {
    level: 'Level 1',
    title: 'Mass Timber Fundamentals',
    hours: '40 hours',
    description: 'Introduction to mass timber products, basic safety, tool identification, and material handling procedures.',
  },
  {
    level: 'Level 2',
    title: 'Structural Assembly',
    hours: '80 hours',
    description: 'Advanced erection techniques, connection systems, crane operations, and quality control for mass timber structures.',
  },
  {
    level: 'Level 3',
    title: 'Advanced Specialist',
    hours: '120 hours',
    description: 'Expert-level training in complex assemblies, hybrid systems, project leadership, and specialized inspection methods.',
  },
];

export default function AboutTrainingPage() {
  return (
    <>
      <PageBanner
        title="About Training"
        subtitle="Mass timber training programs for the modern ironworker"
        backgroundImage="/images/rotated-training.jpeg"
        images={slideshowImages.trainingAbout}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Training', href: '/training' }, { label: 'About Training' }]}
      />

      {/* Overview Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="amber" size="lg" speed="slow" className="-right-20 top-10 opacity-15" />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Programs"
                title="Building Expertise in Mass Timber Construction"
              />
              <p className="text-charcoal-950/70 leading-relaxed mb-6">
                The Ironworkers&apos; mass timber training program equips members with the specialized skills needed to erect modern engineered wood structures. As mass timber construction grows across North America, trained ironworkers are essential for safe, precise, and efficient assembly of CLT panels, Glulam beams, and hybrid steel-timber systems.
              </p>
              <p className="text-charcoal-950/70 leading-relaxed mb-8">
                Our curriculum is developed in partnership with industry leaders, manufacturers, and engineering professionals to ensure our members are at the forefront of this expanding sector. Training combines classroom instruction with hands-on field exercises at accredited facilities.
              </p>
              <Button variant="primary" href="/training/centers">Find a Training Center</Button>
            </div>
            <div className="relative h-[350px] rounded-2xl overflow-hidden glass-light">
              <Image
                src="/images/workers-installing.png"
                alt="Ironworkers training on mass timber installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Program Highlights */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <SectionHeading
            eyebrow="Curriculum"
            title="What You'll Learn"
            dark
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {programHighlights.map((item) => (
              <GlassCard key={item.title} variant="dark" padding="lg">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-cream mb-2">{item.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Certification Levels */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="md" speed="normal" className="-left-20 bottom-10 opacity-10" />
        <Container>
          <SectionHeading
            eyebrow="Certification"
            title="Training Certification Levels"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {certificationLevels.map((cert) => (
              <GlassPanel key={cert.level}>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-4">
                    {cert.level}
                  </span>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-2">{cert.title}</h3>
                  <p className="text-forest-500 font-semibold text-sm mb-4">{cert.hours}</p>
                  <p className="text-charcoal-950/60 text-sm leading-relaxed">{cert.description}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-jakarta)] text-cream mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-cream/60 mb-8">
              Contact us to learn more about enrollment, schedules, and training center locations near you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/contact">Contact Us</Button>
              <Button variant="outline" href="/training/centers">Find a Training Center</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
