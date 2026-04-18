import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GradientOrb } from '@/components/ui/GradientOrb';

export function SafetyIntro() {
  return (
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
  );
}
