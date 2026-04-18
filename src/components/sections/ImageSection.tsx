'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface ImageSectionProps {
  src?: string;
  alt?: string;
  caption?: string;
  fullWidth?: boolean;
  height?: string;
}

export function ImageSection({
  src = '/images/hero-interior.png',
  alt = 'Image',
  caption = '',
  fullWidth = false,
  height = '400',
}: ImageSectionProps) {
  const h = parseInt(height) || 400;

  if (fullWidth) {
    return (
      <section className="relative" style={{ height: h }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
        {caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal-950/80 to-transparent p-6">
            <p className="text-cream text-sm text-center">{caption}</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative rounded-2xl overflow-hidden" style={{ height: h }}>
          <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
        </div>
        {caption && (
          <p className="text-sm text-charcoal-950/50 text-center mt-3">{caption}</p>
        )}
      </Container>
    </section>
  );
}
