import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GradientOrb } from '@/components/ui/GradientOrb';

export function NetworkSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <GradientOrb color="forest" size="lg" speed="slow" className="-right-40 top-10 opacity-15" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="The Leading Network of Mass Timber Experts." />
            <p className="mt-6 text-charcoal-950/70 leading-relaxed">
              The Industrialized Wood Mass Timber (IWMT) platform connects signatory Ironworker contractors, designers, and manufacturers to accelerate the adoption of sustainable construction. We are dedicated to providing the trusted connections and resources needed for your next project.
            </p>
            <div className="flex items-center gap-3 mt-6 text-charcoal-950/80">
              <svg className="w-5 h-5 text-forest-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span className="font-medium">Find Qualified Mass Timber Suppliers</span>
            </div>
            <Button variant="secondary" size="lg" href="/contact" className="mt-8">
              Connect with an IW Mass Timber Expert
            </Button>
          </div>

          <GlassPanel className="relative">
            <GradientOrb color="amber" size="sm" speed="normal" className="-top-10 -right-10 opacity-25" />
            <div className="grid grid-cols-2 gap-8 relative z-10">
              <AnimatedCounter end={44} suffix="+" label="Contractors" />
              <AnimatedCounter end={7000} suffix="+" label="Projects" />
            </div>
          </GlassPanel>
        </div>
      </Container>
    </section>
  );
}
