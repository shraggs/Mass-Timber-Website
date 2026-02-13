'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { useImageSlideshow } from '@/hooks/useImageSlideshow';
import { slideshowImages } from '@/data/slideshow-images';
import { isRotatedImage, getImageRotation, cn } from '@/lib/utils';

const images = slideshowImages.hero;

export function HeroSection() {
  const { currentIndex } = useImageSlideshow({
    imageCount: images.length,
    interval: 6000,
  });

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Slideshow background images - all rendered for smooth CSS transitions */}
      {images.map((image, index) => {
        const rotated = isRotatedImage(image.src);
        const isActive = index === currentIndex;

        return (
          <div
            key={image.src}
            className={cn(
              'absolute slideshow-image',
              rotated ? 'inset-[-50%] w-[200%] h-[200%]' : 'inset-0',
              isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={cn('object-cover', getImageRotation(image.src))}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-charcoal-950/50 to-transparent z-[2]" />

      <GradientOrb color="amber" size="lg" speed="slow" className="top-20 -left-20 opacity-40" />
      <GradientOrb color="forest" size="md" speed="normal" className="bottom-20 right-10 opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <span className="inline-block glass-dark text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
            Ironworker Precision
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream font-[family-name:var(--font-jakarta)] leading-tight">
            Mass Timber<br />
            Construction.
            <span className="block text-amber-400 mt-2">Ironworker Precision.</span>
          </h1>
          <p className="text-cream/70 text-lg mt-6 max-w-lg">
            The leading network of Ironworker contractors and suppliers for mass timber construction across North America.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" size="lg" href="/projects">
              Explore Projects
            </Button>
            <Button variant="outline" size="lg" href="/contractors" className="border-cream/30 text-cream hover:bg-cream hover:text-charcoal-950">
              Find a Contractor
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
}
