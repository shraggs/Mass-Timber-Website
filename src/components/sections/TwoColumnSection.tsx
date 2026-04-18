'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface TwoColumnSectionProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  darkBackground?: boolean;
}

export function TwoColumnSection({
  eyebrow = '',
  title = 'Section Title',
  body = '',
  imageSrc = '/images/hero-interior.png',
  imageAlt = 'Image',
  imagePosition = 'right',
  darkBackground = false,
}: TwoColumnSectionProps) {
  const textContent = (
    <div>
      {(title || eyebrow) && (
        <SectionHeading title={title} eyebrow={eyebrow || undefined} dark={darkBackground} />
      )}
      {body && (
        <div className={`mt-6 space-y-4 ${darkBackground ? 'text-cream/70' : 'text-charcoal-950/70'} leading-relaxed`}>
          {body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );

  const imageContent = (
    <div className="relative h-[400px] rounded-2xl overflow-hidden glass-light">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
    </div>
  );

  return (
    <section className={`py-16 md:py-24 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {imagePosition === 'left' ? (
            <>{imageContent}{textContent}</>
          ) : (
            <>{textContent}{imageContent}</>
          )}
        </div>
      </Container>
    </section>
  );
}
