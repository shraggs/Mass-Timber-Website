import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden min-h-[60vh] flex items-center">
      <GradientOrb color="amber" size="lg" speed="slow" className="top-10 -right-20 opacity-20" />
      <GradientOrb color="forest" size="md" speed="normal" className="-left-20 bottom-10 opacity-15" />

      <Container className="relative z-10">
        <GlassPanel className="max-w-lg mx-auto text-center">
          <div className="text-7xl font-bold text-amber-500 font-[family-name:var(--font-jakarta)] mb-4">404</div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Page Not Found</h1>
          <p className="text-charcoal-950/60 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Button variant="primary" size="lg" href="/">
            Return Home
          </Button>
        </GlassPanel>
      </Container>
    </section>
  );
}
