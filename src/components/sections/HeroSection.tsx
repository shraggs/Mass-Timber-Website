'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, User } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';

const contactCards = [
  {
    name: 'Tom Baun',
    title: 'Special Project Director',
    phone: '(000) 000-0000',
    email: 'tbaun@placeholder.com',
    image: '/images/leadership/tom-baun.jpeg',
  },
  {
    name: 'Mike Smith',
    title: 'Contact Representative',
    phone: '(000) 000-0000',
    email: 'msmith@placeholder.com',
    image: null,
  },
  {
    name: 'Eddie Joslit',
    title: 'Contact Representative',
    phone: '(000) 000-0000',
    email: 'ejoslit@placeholder.com',
    image: null,
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full bg-charcoal-950">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Left side - Contact Cards */}
        <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 bg-gradient-to-b from-[#1E3A2A] to-charcoal-950 border-r border-white/[0.06] px-6 py-8 lg:py-12 flex flex-col">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="mb-8">
              <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                Your Contacts
              </span>
              <h2 className="text-cream text-xl font-bold font-[family-name:var(--font-jakarta)]">
                Get in Touch
              </h2>
              <p className="text-cream/50 text-sm mt-1">
                Reach out to our team for Mass Timber inquiries.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.15} className="flex flex-col gap-4 flex-1">
            {contactCards.map((contact) => (
              <StaggerItem key={contact.name}>
                <motion.div
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 hover:border-amber-400/30 hover:bg-white/[0.06] transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/10 group-hover:border-amber-400/40 transition-colors">
                      {contact.image ? (
                        <Image
                          src={contact.image}
                          alt={contact.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center">
                          <User className="w-6 h-6 text-cream/60" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-cream font-semibold text-base leading-tight">
                        {contact.name}
                      </h3>
                      <p className="text-amber-400/80 text-xs font-medium mt-0.5">
                        {contact.title}
                      </p>

                      <div className="mt-3 space-y-1.5">
                        <a
                          href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                          className="flex items-center gap-2 text-cream/50 text-sm hover:text-amber-400 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{contact.phone}</span>
                        </a>
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-2 text-cream/50 text-sm hover:text-amber-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right side - Video */}
        <div className="flex-1 relative overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Subtle gradient on left edge for seamless blend */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-950/40 to-transparent z-[2]" />

          {/* Bottom gradient for scroll indicator */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-950/60 to-transparent z-[2]" />

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-cream/40 text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
            <motion.div
              className="w-[1px] h-12 bg-gradient-to-b from-amber-400/80 to-transparent origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Hero text banner below */}
      <div className="relative z-10 bg-gradient-to-r from-[#1E3A2A] via-[#1E3A2A] to-forest-900 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block glass-dark text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wider uppercase">
                Ironworker Precision
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream font-[family-name:var(--font-jakarta)] leading-tight">
                Mass Timber Construction.
                <span className="block text-amber-400 mt-1">
                  Ironworker Precision.
                </span>
              </h1>
              <p className="text-cream/60 text-base mt-4 max-w-lg leading-relaxed">
                The leading network of Ironworker contractors and suppliers for mass timber construction across North America.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-amber-400 text-charcoal-950 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-base"
              >
                Explore Projects
              </a>
              <a
                href="/contractors"
                className="inline-flex items-center px-6 py-3 border border-cream/30 text-cream font-semibold rounded-lg hover:bg-cream hover:text-charcoal-950 transition-colors text-base"
              >
                Find a Contractor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
