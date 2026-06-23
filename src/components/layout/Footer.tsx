'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion';
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, CONTACT_PHONE_SECONDARY, ADDRESS, SOCIAL_LINKS } from '@/lib/constants';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Suppliers & Manufacturers', href: '/suppliers' },
  { label: 'Contractors Directory', href: '/contractors' },
  { label: 'Contact Us', href: '/contact' },
];

const galleryImages = [
  '/images/timber-ceiling.png',
  '/images/construction-wide.png',
  '/images/hero-interior.png',
  '/images/workers-installing.png',
  '/images/connector-detail.png',
  '/images/panoramic-beams.png',
];

export function Footer() {
  return (
    <footer className="relative bg-charcoal-950 text-cream pt-16 pb-8 overflow-hidden">
      {/* Decorative watermark logo in left dead space */}
      <Image
        src="/images/Main_Mass_Timber_Logo.PNG"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        className="hidden lg:block absolute left-[14%] xl:left-[16%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] xl:w-[280px] xl:h-[280px] opacity-[0.08] pointer-events-none select-none"
      />
      <Container>
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10 relative">
            {/* Column 1: Brand */}
            <div>
              <div className="mb-4">
                <Image
                  src="/images/Main_Mass_Timber_Logo.PNG"
                  alt="Ironworkers Mass Timber"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full"
                />
              </div>
              <p className="text-cream/60 text-sm leading-relaxed mb-6">{SITE_TAGLINE}</p>
              <div className="space-y-2 text-sm text-cream/60">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  {ADDRESS}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  {CONTACT_EMAIL}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  {CONTACT_PHONE_SECONDARY}
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/60 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Social */}
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] mb-6">Follow Us</h3>
              <div className="space-y-3">
                {[
                  { href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                  { href: SOCIAL_LINKS.twitter, label: 'X / Twitter' },
                  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                  { href: SOCIAL_LINKS.youtube, label: 'YouTube' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-cream/60 hover:text-amber-400 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400/20 transition-colors">
                      <SocialIcon name={social.label} />
                    </div>
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 4: Gallery */}
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] mb-6">Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((src, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="80px"
                    />
                    <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm text-cream/40">
          <p>&copy; {new Date().getFullYear()} Copyrights by {SITE_NAME}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-amber-400 transition-colors">Terms &amp; Conditions</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
        <div className="pt-4 text-center text-xs text-cream/30">
          Website powered by <span className="text-cream/50 font-semibold">Northstar AI Solutions</span>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'Facebook':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    case 'X / Twitter':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    case 'YouTube':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'LinkedIn':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    default:
      return null;
  }
}
