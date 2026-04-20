'use client';

import { Container } from '@/components/ui/Container';

interface HeadingBlockProps {
  eyebrow?: string;
  text?: string;
  level?: string;
  align?: 'left' | 'center' | 'right';
  darkBackground?: boolean;
  underline?: boolean;
}

export function HeadingBlock({
  eyebrow = '',
  text = 'Heading',
  level = 'h2',
  align = 'left',
  darkBackground = false,
  underline = false,
}: HeadingBlockProps) {
  const sizeClass = level === 'h1'
    ? 'text-4xl md:text-5xl lg:text-6xl'
    : level === 'h3'
      ? 'text-2xl md:text-3xl'
      : level === 'h4'
        ? 'text-xl md:text-2xl'
        : 'text-3xl md:text-4xl lg:text-5xl';

  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const Tag = (['h1', 'h2', 'h3', 'h4'].includes(level) ? level : 'h2') as 'h1' | 'h2' | 'h3' | 'h4';
  const color = darkBackground ? 'text-cream' : 'text-charcoal-950';

  return (
    <section className={`py-10 md:py-14 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        <div className={alignClass}>
          {eyebrow && (
            <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${darkBackground ? 'text-amber-400' : 'text-amber-600'}`}>
              {eyebrow}
            </p>
          )}
          <Tag className={`${sizeClass} font-bold font-[family-name:var(--font-jakarta)] leading-tight ${color}`}>
            {text}
          </Tag>
          {underline && (
            <div className={`mt-4 h-1 w-16 bg-amber-500 rounded-full ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`} />
          )}
        </div>
      </Container>
    </section>
  );
}
