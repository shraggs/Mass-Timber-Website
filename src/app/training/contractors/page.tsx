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
  title: 'Training for Contractors',
  description: 'Contractor certification programs and specialized training for mass timber erection and construction.',
};

const benefits = [
  {
    title: 'Qualified Workforce',
    description: 'Access a pipeline of certified ironworkers trained specifically in mass timber erection, ensuring your projects are staffed with skilled professionals.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
  },
  {
    title: 'Safety Compliance',
    description: 'Our training programs exceed OSHA requirements and cover mass-timber-specific safety protocols, reducing on-site incidents.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
  },
  {
    title: 'Project Efficiency',
    description: 'Trained crews complete mass timber erection faster and with fewer errors, keeping your projects on schedule and budget.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
  {
    title: 'Competitive Edge',
    description: 'Partnering with certified Ironworker crews positions your company as a leader in the growing mass timber market.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
];

const certificationSteps = [
  { step: '01', title: 'Contact Us', description: 'Reach out to discuss your project needs and workforce requirements.' },
  { step: '02', title: 'Assess Requirements', description: 'We evaluate your project scope and recommend the appropriate training level.' },
  { step: '03', title: 'Schedule Training', description: 'Enroll your crew at the nearest accredited training facility.' },
  { step: '04', title: 'Deploy Certified Crews', description: 'Your trained ironworkers are ready to execute mass timber erection on-site.' },
];

export default function TrainingContractorsPage() {
  return (
    <>
      <PageBanner
        title="For Contractors"
        subtitle="Specialized training resources for mass timber contractors"
        backgroundImage="/images/timber-beams-wide.png"
        images={slideshowImages.trainingContractors}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Training', href: '/training' }, { label: 'For Contractors' }]}
      />

      {/* Overview */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="amber" size="lg" speed="slow" className="-right-20 top-10 opacity-15" />
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="For Contractors"
              title="Partner with Trained Mass Timber Professionals"
            />
            <p className="text-charcoal-950/70 leading-relaxed mb-6">
              As mass timber construction expands across North America, contractors need access to crews with specialized training in engineered wood erection. The Ironworkers&apos; training program produces certified professionals who understand CLT panel systems, Glulam beam assemblies, and hybrid steel-timber connections.
            </p>
            <p className="text-charcoal-950/70 leading-relaxed">
              Whether you&apos;re a general contractor looking to bid on your first mass timber project or an experienced builder expanding your capabilities, our certified workforce gives you the skilled labor you need to deliver projects safely and on time.
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <SectionHeading
            eyebrow="Advantages"
            title="Why Work with Certified Ironworkers"
            dark
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {benefits.map((benefit) => (
              <GlassCard key={benefit.title} variant="dark" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-cream mb-2">{benefit.title}</h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="md" speed="normal" className="-left-20 bottom-10 opacity-10" />
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="How to Get Started"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {certificationSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-500 font-[family-name:var(--font-jakarta)]">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-2">{item.title}</h3>
                <p className="text-charcoal-950/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <GlassPanel variant="dark" className="text-center">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-jakarta)] text-cream mb-4">
              Ready to Build with Mass Timber?
            </h2>
            <p className="text-cream/60 mb-8 max-w-xl mx-auto">
              Let us connect you with certified Ironworker crews trained in mass timber construction. Contact us to discuss your next project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/contact">Get in Touch</Button>
              <Button variant="outline" href="/contractors">Browse Contractors</Button>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}
