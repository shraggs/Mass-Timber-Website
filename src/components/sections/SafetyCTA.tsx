import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';

export function SafetyCTA() {
  return (
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
  );
}
