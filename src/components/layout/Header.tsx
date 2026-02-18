'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Search, Menu, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Union', href: '/about' },
      { label: 'Leadership Team', href: '/about/leadership' },
    ],
  },
  {
    label: 'Training',
    href: '/training',
    children: [
      { label: 'About Training', href: '/training/about' },
      { label: 'Find a Training Center', href: '/training/centers' },
      { label: 'For Contractors', href: '/training/contractors' },
      { label: 'For Members', href: '/training/members' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Contractors', href: '/contractors' },
  { label: 'Suppliers & Manufacturers', href: '/suppliers' },
  { label: 'Partners', href: 'https://www.woodworksinnovationnetwork.org/', external: true },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useState<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(26,26,23,0)', 'rgba(26,26,23,0.92)']);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 24]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(0,0,0,0.3)']
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.88]);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef[0]) {
      clearTimeout(dropdownTimeoutRef[0]);
      dropdownTimeoutRef[1](null);
    }
    setActiveDropdown(label);
  }, [dropdownTimeoutRef]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    dropdownTimeoutRef[1](timeout);
  }, [dropdownTimeoutRef]);

  return (
    <>
      {/* Top info bar */}
      <div className="hidden md:block bg-charcoal-950 text-cream/80 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Mail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4" />
              {CONTACT_PHONE}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-amber-400 transition-colors">Sign in</Link>
            <span className="text-cream/30">or</span>
            <Link href="#" className="hover:text-amber-400 transition-colors">Register</Link>
            <div className="flex items-center gap-3 ml-4 border-l border-cream/10 pl-4">
              {[
                { href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                { href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
              ].map((social) => (
                <a key={social.label} href={social.href} className="hover:text-amber-400 transition-colors hover:scale-110 inline-block" aria-label={social.label}>
                  <SocialIcon name={social.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation with smooth scroll-responsive glassmorphism */}
      <motion.header
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{
          backgroundColor: headerBg,
          backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          boxShadow: headerShadow,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with scale on scroll */}
            <Link href="/" className="flex items-center group">
              <motion.div style={{ scale: logoScale }}>
                <Image
                  src="/images/iw-logo.webp"
                  alt="Ironworkers Mass Timber"
                  width={200}
                  height={56}
                  className="h-10 md:h-14 w-auto group-hover:brightness-110 transition-all"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-amber-400 transition-colors rounded-lg inline-flex items-center gap-1"
                    >
                      {item.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-amber-400 transition-colors rounded-lg inline-flex items-center gap-1"
                    >
                      {item.label}
                      {item.children && (
                        <motion.span
                          animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.span>
                      )}
                    </Link>
                  )}

                  {/* Animated dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 pt-3 z-50"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <div className="w-56 glass-dark rounded-xl py-2">
                          {item.children.map((child, i) => (
                            <motion.div
                              key={child.href}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05, duration: 0.2 }}
                            >
                              <Link
                                href={child.href}
                                className="block px-4 py-2.5 text-sm text-cream/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA + Search + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex px-4 py-2 bg-amber-400 text-charcoal-950 text-sm font-semibold rounded-lg hover:bg-amber-500 transition-colors animate-pulse-glow"
              >
                Get Started
              </Link>
              <button className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:text-amber-400 hover:border-amber-400 transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button
                className="lg:hidden w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:text-amber-400 hover:border-amber-400 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navItems={navItems} />
        )}
      </AnimatePresence>
    </>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'Facebook':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    case 'Twitter':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    case 'Instagram':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    case 'LinkedIn':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    default:
      return null;
  }
}
