'use client';

import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface QuoteBlockProps {
  quote?: string;
  attribution?: string;
  role?: string;
  darkBackground?: boolean;
  align?: 'left' | 'center';
}

export function QuoteBlock({
  quote = 'A powerful quote goes here.',
  attribution = '',
  role = '',
  darkBackground = false,
  align = 'center',
}: QuoteBlockProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const color = darkBackground ? 'text-cream' : 'text-charcoal-950';
  const muted = darkBackground ? 'text-cream/60' : 'text-charcoal-950/60';

  return (
    <section className={`py-16 md:py-24 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        <div className={`max-w-3xl ${alignClass}`}>
          <Quote className={`w-10 h-10 mb-4 text-amber-500 ${align === 'center' ? 'mx-auto' : ''}`} />
          <blockquote className={`text-2xl md:text-3xl font-medium font-[family-name:var(--font-jakarta)] leading-snug ${color}`}>
            &ldquo;{quote}&rdquo;
          </blockquote>
          {(attribution || role) && (
            <div className={`mt-6 text-sm ${muted}`}>
              {attribution && <span className={`font-bold ${color}`}>{attribution}</span>}
              {attribution && role && <span> &middot; </span>}
              {role && <span>{role}</span>}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
