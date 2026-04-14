'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InlineChat } from '@/components/chat/InlineChat';
import { ScrollReveal } from '@/components/motion';
import { slideshowImages } from '@/data/slideshow-images';
import { faqItems } from '@/data/faq';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageBanner
        title="FAQ"
        subtitle="Frequently asked questions & AI assistant"
        backgroundImage="/images/hero-interior.png"
        images={slideshowImages.faq}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="py-10 md:py-14 gradient-mesh">
        <Container>
          <div className="flex items-center gap-2 justify-center text-amber-600 text-sm font-semibold mb-2">
            <MessageCircle className="w-4 h-4" />
            Our AI assistant is also available as a floating button on every page
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-16 gradient-mesh">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left: FAQ accordion */}
            <div>
              <SectionHeading
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about mass timber construction and our network."
                className="mb-8"
              />
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.04}>
                    <div className="glass-light rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left min-h-[56px]"
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
                            <div className="px-5 pb-4 text-charcoal-950/70 leading-relaxed border-t border-charcoal-900/5 pt-3 text-sm">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: Inline chatbot */}
            <div>
              <SectionHeading
                title="Ask the IW Mass Timber Assistant"
                subtitle="Get instant answers from our AI — trained on contractors, suppliers, training programs, and projects."
                className="mb-8"
              />
              <InlineChat />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
