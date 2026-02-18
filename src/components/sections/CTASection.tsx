'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { TextReveal, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 gradient-mesh-dark overflow-hidden">
      {/* Floating decorative orbs */}
      <GradientOrb color="amber" size="lg" speed="slow" className="top-10 -right-20 opacity-30" />
      <GradientOrb color="forest" size="md" speed="normal" className="bottom-10 -left-10 opacity-20" />
      <GradientOrb color="amber" size="sm" speed="slow" className="top-1/2 left-1/3 opacity-15" />

      <Container>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream font-[family-name:var(--font-jakarta)] leading-tight mb-6">
            <TextReveal text="Ready to Build with" delay={0.1} />
            <span className="block text-amber-400 mt-2">
              <TextReveal text="Mass Timber?" delay={0.4} />
            </span>
          </h2>

          <ScrollReveal delay={0.6}>
            <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Connect with certified Ironworker contractors trained in mass timber construction across North America.
            </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.15} className="flex flex-wrap justify-center gap-4">
            <StaggerItem>
              <Button variant="primary" size="lg" href="/contractors">
                Find a Contractor
              </Button>
            </StaggerItem>
            <StaggerItem>
              <Button variant="outline" size="lg" href="/contact" className="border-cream/30 text-cream hover:bg-cream hover:text-charcoal-950">
                Contact Us
              </Button>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
