'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/motion';
import { faqItems } from '@/data/faq';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 gradient-mesh">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about mass timber construction and our network."
          align="center"
          className="mb-12"
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="glass-light rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left min-h-[56px]"
                >
                  <span className="font-semibold text-charcoal-950 font-[family-name:var(--font-jakarta)] pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-amber-500" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-charcoal-950/70 leading-relaxed border-t border-charcoal-900/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
