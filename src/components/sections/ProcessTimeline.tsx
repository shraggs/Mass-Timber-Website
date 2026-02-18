'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ruler, Factory, Truck, HardHat, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion';

const steps = [
  {
    icon: Ruler,
    title: 'Design & Engineering',
    description: 'Structural design, load calculations, and BIM modeling tailored for mass timber construction.',
  },
  {
    icon: Factory,
    title: 'Prefabrication',
    description: 'CNC-cut CLT panels, Glulam beams, and precision-fabricated steel connectors ready for assembly.',
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    description: 'Just-in-time delivery coordination, crane planning, and site logistics management.',
  },
  {
    icon: HardHat,
    title: 'Erection & Assembly',
    description: 'Ironworker-led installation with crane operations and precision steel-to-timber connections.',
  },
  {
    icon: CheckCircle,
    title: 'Inspection & Completion',
    description: 'Quality assurance, structural verification, and final project handoff.',
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-16 md:py-24 gradient-mesh" ref={containerRef}>
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="From blueprint to completed structure, our proven process delivers results."
          align="center"
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Animated center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <div className="w-full h-full bg-charcoal-900/10 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-400 to-forest-500 rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px]">
            <div className="w-full h-full bg-charcoal-900/10 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-400 to-forest-500 rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={step.title} className="relative">
                  {/* Desktop: alternating left/right */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                    {isLeft ? (
                      <>
                        <ScrollReveal direction="right" delay={0.1}>
                          <div className="text-right pr-8">
                            <h3 className="text-xl font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)] mb-2">
                              {step.title}
                            </h3>
                            <p className="text-charcoal-950/60">{step.description}</p>
                          </div>
                        </ScrollReveal>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <ScrollReveal direction="left" delay={0.1}>
                          <div className="pl-8">
                            <h3 className="text-xl font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)] mb-2">
                              {step.title}
                            </h3>
                            <p className="text-charcoal-950/60">{step.description}</p>
                          </div>
                        </ScrollReveal>
                      </>
                    )}
                  </div>

                  {/* Desktop center node */}
                  <ScrollReveal direction="none" className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-forest-500 flex items-center justify-center shadow-lg">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                  </ScrollReveal>

                  {/* Mobile: left-aligned */}
                  <ScrollReveal direction="up" delay={0.1} className="md:hidden">
                    <div className="flex items-start gap-4 pl-14">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-forest-500 flex items-center justify-center shadow-lg">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-charcoal-950/60 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
