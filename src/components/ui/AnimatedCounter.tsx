'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCounter } from '@/hooks/useCounter';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
  dark?: boolean;
  className?: string;
}

export function AnimatedCounter({ end, suffix = '', label, duration = 2000, dark = false, className }: AnimatedCounterProps) {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  const count = useCounter(end, duration, isVisible);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className={cn('text-4xl md:text-5xl font-bold font-[family-name:var(--font-jakarta)]', dark ? 'text-amber-400' : 'text-amber-500')}>
        {count.toLocaleString()}{suffix}
      </div>
      <p className={cn('mt-2 text-base font-medium', dark ? 'text-cream/70' : 'text-charcoal-950/60')}>
        {label}
      </p>
    </div>
  );
}
