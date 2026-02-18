'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { ScrollReveal } from '@/components/motion';
import testimonials from '@/data/testimonials.json';

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden gradient-mesh">
      <GradientOrb color="amber" size="md" speed="slow" className="top-10 right-20 opacity-20" />

      <Container>
        <ScrollReveal>
          <SectionHeading title="What Our Partners Say" align="center" className="mb-12" />
        </ScrollReveal>

        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <ScrollReveal>
            <GlassPanel className="text-center relative min-h-[300px] flex flex-col items-center justify-center">
              <GradientOrb color="forest" size="sm" speed="normal" className="-bottom-10 -left-10 opacity-20" />

              <Quote className="w-10 h-10 text-amber-400 mx-auto mb-6" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
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
                </motion.div>
              </AnimatePresence>
            </GlassPanel>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-amber-500/10 transition-colors"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 text-charcoal-950" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-amber-500 w-8' : 'bg-charcoal-900/20 w-3'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-amber-500/10 transition-colors"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 text-charcoal-950" />
            </motion.button>
          </div>
        </div>
      </Container>
    </section>
  );
}
