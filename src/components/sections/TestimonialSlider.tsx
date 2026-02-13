'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GradientOrb } from '@/components/ui/GradientOrb';
import testimonials from '@/data/testimonials.json';

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <GradientOrb color="amber" size="md" speed="slow" className="top-10 right-20 opacity-20" />

      <Container>
        <SectionHeading title="What Our Partners Say?" align="center" className="mb-12" />

        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <GlassPanel className="text-center relative">
            <GradientOrb color="forest" size="sm" speed="normal" className="-bottom-10 -left-10 opacity-20" />

            <svg className="w-10 h-10 text-amber-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <blockquote className="text-lg md:text-xl text-charcoal-950/80 leading-relaxed italic mb-8 relative z-10">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto mb-3 flex items-center justify-center text-white font-bold font-[family-name:var(--font-jakarta)]">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">{testimonial.name}</p>
              <p className="text-sm text-amber-500 font-semibold">{testimonial.title}</p>
            </div>
          </GlassPanel>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-amber-500/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 text-charcoal-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-amber-500 w-8' : 'bg-charcoal-900/20'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-amber-500/10 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4 text-charcoal-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
