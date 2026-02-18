'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import { comparisonItems } from '@/data/comparison';

export function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 gradient-mesh-dark">
      <Container>
        <SectionHeading
          title="Why Ironworkers?"
          subtitle="The difference between generic labor and specialized expertise."
          align="center"
          dark
          className="mb-12"
        />

        <div className="max-w-3xl mx-auto">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 mb-6 px-4">
            <div />
            <div className="w-28 text-center text-sm font-bold text-amber-400 uppercase tracking-wider">
              Ironworkers
            </div>
            <div className="w-28 text-center text-sm font-bold text-cream/40 uppercase tracking-wider">
              Others
            </div>
          </div>

          {/* Comparison rows */}
          <StaggerContainer staggerDelay={0.08} className="space-y-3">
            {comparisonItems.map((item) => (
              <StaggerItem key={item.feature}>
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center glass-dark rounded-xl px-4 py-4 md:px-6">
                  <span className="text-cream/80 text-sm md:text-base font-medium">
                    {item.feature}
                  </span>
                  <div className="w-28 flex justify-center">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-forest-500/20 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                    >
                      <Check className="w-4 h-4 text-forest-500" />
                    </motion.div>
                  </div>
                  <div className="w-28 flex justify-center">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }}
                    >
                      <X className="w-4 h-4 text-error" />
                    </motion.div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
