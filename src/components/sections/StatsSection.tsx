import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GradientOrb } from '@/components/ui/GradientOrb';

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <Image
        src="/images/clean-interior.png"
        alt="Clean timber interior ceiling"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charcoal-950/80" />
      <GradientOrb color="amber" size="lg" speed="slow" className="top-0 left-1/4 opacity-15" />

      <Container className="relative z-10">
        <SectionHeading
          title="No One Understands Structure Like an Ironworker."
          subtitle="Structural Strength. Superior Safety."
          align="center"
          dark
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <AnimatedCounter end={20500} suffix="+" label="Featured Projects" dark />
          <AnimatedCounter end={100500} suffix="+" label="Luxury Design" dark />
          <AnimatedCounter end={150500} suffix="+" label="Satisfied Clients" dark />
        </div>
      </Container>
    </section>
  );
}
