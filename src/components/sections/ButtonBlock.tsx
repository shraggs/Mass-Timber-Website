'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface ButtonBlockProps {
  text?: string;
  href?: string;
  variant?: 'primary' | 'outline';
  align?: 'left' | 'center' | 'right';
  darkBackground?: boolean;
  openInNewTab?: boolean;
}

export function ButtonBlock({
  text = 'Learn More',
  href = '#',
  variant = 'primary',
  align = 'center',
  darkBackground = false,
  openInNewTab = false,
}: ButtonBlockProps) {
  const alignClass = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';

  return (
    <section className={`py-8 md:py-10 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        <div className={`flex ${alignClass}`}>
          {openInNewTab ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-colors ${
                variant === 'primary'
                  ? 'bg-amber-500 text-charcoal-950 hover:bg-amber-400'
                  : `border ${darkBackground ? 'border-cream/30 text-cream hover:bg-cream hover:text-charcoal-950' : 'border-charcoal-950/30 text-charcoal-950 hover:bg-charcoal-950 hover:text-cream'}`
              }`}
            >
              {text}
            </a>
          ) : (
            <Button variant={variant} href={href}>{text}</Button>
          )}
        </div>
      </Container>
    </section>
  );
}
