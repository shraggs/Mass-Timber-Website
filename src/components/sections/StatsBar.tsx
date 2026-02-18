'use client';

import { Container } from '@/components/ui/Container';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import { Building2, Users, Award, MapPin } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCounter } from '@/hooks/useCounter';

const stats = [
  { icon: Building2, end: 150, suffix: '+', label: 'Projects Completed' },
  { icon: Users, end: 50, suffix: '+', label: 'Certified Contractors' },
  { icon: Award, end: 25, suffix: '+', label: 'Years Experience' },
  { icon: MapPin, end: 40, suffix: '+', label: 'Cities Served' },
];

function StatCounter({ end, suffix }: { end: number; suffix: string }) {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  const count = useCounter(end, 2000, isVisible);

  return (
    <div ref={ref}>
      <span className="text-4xl md:text-5xl font-bold text-amber-400 font-[family-name:var(--font-jakarta)]">
        {count}{suffix}
      </span>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="py-16 md:py-20 gradient-mesh-dark">
      <Container>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center mb-2">
                  <stat.icon className="w-7 h-7 text-amber-400" />
                </div>
                <StatCounter end={stat.end} suffix={stat.suffix} />
                <p className="text-cream/60 text-sm font-medium">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
