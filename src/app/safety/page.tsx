import type { Metadata } from 'next';
import { GraduationCap, Shield, BadgeCheck, Zap, Users, Award, RefreshCw } from 'lucide-react';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideshowImages } from '@/data/slideshow-images';

export const metadata: Metadata = {
  title: 'Safety',
  description: 'Iron Workers bring proven safety and performance to mass timber construction through specialized training, fall protection expertise, and OSHA-certified workforce standards.',
};

const safetyPillars = [
  {
    title: 'Specialized Mass Timber Training',
    description: 'Iron Workers receive targeted training in the handling, rigging, and installation of mass timber systems, ensuring safe and precise execution from delivery to final placement.',
    Icon: GraduationCap,
  },
  {
    title: 'Advanced Fall Protection & Rigging Expertise',
    description: 'Our members are extensively trained in fall protection, critical lift planning, and complex rigging operations required for large-scale prefabricated timber components.',
    Icon: Shield,
  },
  {
    title: 'Certified, Safety-First Workforce',
    description: 'Iron Workers complete OSHA education, jobsite safety certifications, and ongoing skills upgrades to meet or exceed contractor and project-specific safety requirements.',
    Icon: BadgeCheck,
  },
  {
    title: 'Experience with Prefabrication & Rapid Installation',
    description: 'With deep experience in prefabricated construction, Iron Workers safely manage fast-paced erection schedules while maintaining strict safety controls.',
    Icon: Zap,
  },
  {
    title: 'Efficient Coordination with Multi-Trade Teams',
    description: 'Iron Workers are trained to work seamlessly alongside other trades, minimizing risk, improving workflow, and keeping projects on schedule.',
    Icon: Users,
  },
  {
    title: 'Proven Track Record on Complex Structures',
    description: 'From hybrid steel-and-timber systems to large-scale commercial builds, Iron Workers bring disciplined safety practices to demanding, high-profile projects.',
    Icon: Award,
  },
  {
    title: 'Continuous Safety Training & Accountability',
    description: 'Ongoing education through union training centers ensures Iron Workers stay current on evolving mass timber methods, site conditions, and safety standards.',
    Icon: RefreshCw,
  },
];

export default function SafetyPage() {
  return (
    <>
      <PageBanner
        title="Safety"
        subtitle="Proven safety & performance in mass timber construction"
        backgroundImage="/images/safety-1.jpeg"
        images={slideshowImages.safety}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Safety' }]}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="amber" size="lg" speed="slow" className="-right-20 top-10 opacity-15" />
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Iron Workers"
              title="Proven Safety & Performance in Mass Timber Construction"
            />
            <p className="text-charcoal-950/70 leading-relaxed mb-6">
              The safety page showcases the exceptional training Iron Workers bring to mass timber projects, reinforcing the expertise and professionalism of the IW workforce. From handling and rigging to fall protection and multi-trade coordination, our members are prepared to deliver every mass timber project safely and on schedule.
            </p>
            <p className="text-charcoal-950/70 leading-relaxed">
              Every Iron Worker on a mass timber jobsite is backed by ongoing union training, OSHA-aligned certifications, and decades of disciplined field experience — the foundation of a safety-first workforce.
            </p>
          </div>
        </Container>
      </section>

      {/* Safety Pillars */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <SectionHeading
            eyebrow="Our Standards"
            title="How Iron Workers Lead on Safety"
            dark
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {safetyPillars.map(({ title, description, Icon }) => (
              <GlassCard key={title} variant="dark" padding="lg">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-cream mb-2">
                  {title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">{description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="md" speed="normal" className="-left-20 bottom-10 opacity-10" />
        <Container>
          <GlassPanel className="text-center">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">
              Build Safer with Iron Workers
            </h2>
            <p className="text-charcoal-950/60 mb-8 max-w-xl mx-auto">
              Connect with certified Iron Worker contractors who bring proven safety standards to every mass timber project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/contractors">Find a Contractor</Button>
              <Button variant="outline" href="/contact">Get in Touch</Button>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}
