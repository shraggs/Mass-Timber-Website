'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Search, Menu, ChevronDown, ExternalLink } from 'lucide-react';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Union', href: '/about' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'What is Mass Timber?', href: '/about/what-is-mass-timber' },
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
  { label: 'Safety', href: '/safety' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contractors', href: '/contractors' },
  { label: 'Suppliers & Manufacturers', href: '/suppliers' },
  { label: 'Partners', href: 'https://www.woodworksinnovationnetwork.org/', external: true },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hysteresis: shrink when scrolling past 80, only expand again when back above 20.
    // Without this dead-zone, shrinking the header reduces page height and snaps the
    // scroll position back across the threshold, causing an infinite expand/shrink loop.
    let isCompact = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!isCompact && y > 80) {
        isCompact = true;
        setScrolled(true);
      } else if (isCompact && y < 20) {
        isCompact = false;
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div className="hidden md:block bg-[#162D21] text-cream/80 text-sm py-2 border-b border-white/[0.04]">
        <div className="w-full px-6 lg:px-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Mail className="w-4 h-4" />
              {CONTACT_EMAIL}
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
                { href: SOCIAL_LINKS.youtube, label: 'YouTube' },
                { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors hover:scale-110 inline-block" aria-label={social.label}>
                  <SocialIcon name={social.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation - no framer motion height animation to avoid glitching */}
      <header
        className={`sticky top-0 z-[100] bg-[#1E3A2A] border-b border-white/[0.06] transition-all duration-300 ease-out ${
          scrolled ? 'h-[96px] shadow-lg shadow-black/30' : 'h-[140px]'
        }`}
      >
        <div className="w-full h-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-full">
            {/* Left - Main Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/Main_Mass_Timber_Logo.PNG"
                alt="Ironworkers Mass Timber"
                className={`object-contain hover:brightness-110 transition-all duration-300 ease-out rounded-full ${
                  scrolled ? 'h-[80px] w-[80px]' : 'h-[124px] w-[124px]'
                }`}
              />
            </Link>

            {/* Center - Navigation with even spacing */}
            <nav className="hidden lg:flex items-center justify-center gap-2 mx-6">
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
                      className="px-4 py-2 text-sm font-semibold text-cream/90 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:text-amber-400 hover:border-amber-400/30 transition-all rounded-lg inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {item.label}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-semibold text-cream/90 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:text-amber-400 hover:border-amber-400/30 transition-all rounded-lg inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 pt-2 z-[60]"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="w-60 bg-[#1E3A2A] rounded-xl py-2 border border-white/10 shadow-xl shadow-black/40">
                          {item.children.map((child, i) => (
                            <motion.div
                              key={child.href}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.15 }}
                            >
                              <Link
                                href={child.href}
                                className="block px-5 py-3 text-base text-cream/80 hover:text-amber-400 hover:bg-amber-400/10 hover:pl-7 transition-all duration-200"
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

            {/* Right - CTA Buttons, Search, Secondary Logo */}
            <div className="flex items-center gap-3 h-full">
              <Link
                href="/projects"
                className="hidden xl:inline-flex px-4 py-2 bg-amber-400 text-charcoal-950 text-xs font-bold rounded-md hover:bg-amber-500 transition-colors whitespace-nowrap"
              >
                Explore Projects
              </Link>
              <Link
                href="/contractors"
                className="hidden xl:inline-flex px-4 py-2 border border-cream/30 text-cream text-xs font-bold rounded-md hover:bg-cream hover:text-charcoal-950 transition-colors whitespace-nowrap"
              >
                Find a Contractor
              </Link>
              <button className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:text-amber-400 hover:border-amber-400 transition-colors" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>

              {/* Secondary Logo */}
              <Link href="/" className="hidden lg:flex flex-shrink-0 items-center">
                <img
                  src="/images/Secondary_Mass_Timber_Logo.PNG"
                  alt="Impact Mass Timber"
                  className={`w-auto object-contain hover:brightness-110 transition-all duration-300 ease-out ${
                    scrolled ? 'h-[80px]' : 'h-[124px]'
                  }`}
                />
              </Link>

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
      </header>

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
    case 'YouTube':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'LinkedIn':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    default:
      return null;
  }
}
