import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideshowImages } from '@/data/slideshow-images';

export const metadata: Metadata = {
  title: 'Training for Members',
  description: 'Member-exclusive mass timber training resources, course materials, schedules, and career development pathways.',
};

const memberResources = [
  {
    title: 'Course Catalog',
    description: 'Browse available mass timber courses, prerequisites, and certification pathways tailored for union members.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    ),
  },
  {
    title: 'Training Schedules',
    description: 'View upcoming training sessions at facilities across the U.S. and Canada, and register for available slots.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: 'Career Development',
    description: 'Mass timber skills open doors to new project types and leadership roles. Explore advancement opportunities.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    ),
  },
  {
    title: 'Safety Resources',
    description: 'Access safety manuals, toolbox talk guides, and fall protection protocols specific to mass timber work.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
  },
];

const trainingTracks = [
  {
    title: 'Structural Ironworker',
    description: 'For members with structural erection experience looking to add mass timber capabilities to their skill set.',
    skills: ['CLT Panel Handling', 'Glulam Erection', 'Hybrid Connections', 'Crane Signaling'],
  },
  {
    title: 'Reinforcing Ironworker',
    description: 'For reinforcing ironworkers expanding into mass timber construction, focusing on concrete-to-timber interfaces.',
    skills: ['Foundation Connections', 'Post-Tensioning', 'Concrete-Timber Systems', 'Anchor Systems'],
  },
  {
    title: 'Apprentice Program',
    description: 'Supplemental mass timber training integrated into the existing ironworker apprenticeship curriculum.',
    skills: ['Material Identification', 'Basic Assembly', 'Tool Proficiency', 'Safety Fundamentals'],
  },
];

export default function TrainingMembersPage() {
  return (
    <>
      <PageBanner
        title="For Members"
        subtitle="Exclusive training resources for union members"
        backgroundImage="/images/site-overview.jpg"
        images={slideshowImages.trainingMembers}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Training', href: '/training' }, { label: 'For Members' }]}
      />

      {/* Overview */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="lg" speed="slow" className="-right-20 top-10 opacity-15" />
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Member Resources"
              title="Advance Your Career in Mass Timber"
            />
            <p className="text-charcoal-950/70 leading-relaxed mb-6">
              Mass timber construction is one of the fastest-growing sectors in the building industry. As an Ironworker member, you have access to specialized training that positions you at the forefront of this expanding field. Our programs build on your existing skills in structural erection and add the specific knowledge needed for engineered wood assemblies.
            </p>
            <p className="text-charcoal-950/70 leading-relaxed">
              Training is available at accredited facilities across the United States and Canada, with schedules designed to accommodate working members. Certification demonstrates your expertise to contractors and opens doors to new project opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* Resources Grid */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <SectionHeading
            eyebrow="Resources"
            title="What's Available to You"
            dark
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {memberResources.map((resource) => (
              <GlassCard key={resource.title} variant="dark" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-500/10 flex items-center justify-center text-forest-500 shrink-0">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-cream mb-2">{resource.title}</h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{resource.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Training Tracks */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="amber" size="md" speed="normal" className="-left-20 bottom-10 opacity-10" />
        <Container>
          <SectionHeading
            eyebrow="Pathways"
            title="Training Tracks"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {trainingTracks.map((track) => (
              <GlassPanel key={track.title}>
                <h3 className="text-xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-3">{track.title}</h3>
                <p className="text-charcoal-950/60 text-sm leading-relaxed mb-6">{track.description}</p>
                <div className="space-y-2">
                  {track.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-forest-500/10 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-forest-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-sm text-charcoal-950/70">{skill}</span>
                    </div>
                  ))}
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
              Start Your Mass Timber Training
            </h2>
            <p className="text-cream/60 mb-8">
              Contact your local training center or reach out to us directly to learn about upcoming sessions and enrollment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/training/centers">Find a Training Center</Button>
              <Button variant="outline" href="/contact">Contact Us</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
