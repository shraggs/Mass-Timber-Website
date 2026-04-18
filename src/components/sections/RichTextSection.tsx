'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface RichTextSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  align?: 'left' | 'center';
  darkBackground?: boolean;
}

export function RichTextSection({
  eyebrow = '',
  title = 'Section Title',
  subtitle = '',
  body = '',
  align = 'left',
  darkBackground = false,
}: RichTextSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        <div className={align === 'center' ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}>
          {(title || eyebrow) && (
            <SectionHeading
              title={title}
              eyebrow={eyebrow || undefined}
              subtitle={subtitle || undefined}
              align={align}
              dark={darkBackground}
            />
          )}
          {body && (
            <div className={`mt-6 space-y-4 ${darkBackground ? 'text-cream/70' : 'text-charcoal-950/70'} leading-relaxed`}>
              {body.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
