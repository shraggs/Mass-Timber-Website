'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { useImageSlideshow } from '@/hooks/useImageSlideshow';
import { slideshowImages } from '@/data/slideshow-images';
import { isRotatedImage, getImageRotation, cn } from '@/lib/utils';
import { TextReveal, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';

const images = slideshowImages.hero;

export function HeroSection() {
  const { currentIndex } = useImageSlideshow({
    imageCount: images.length,
    interval: 6000,
  });

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Slideshow background images */}
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

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/60 to-charcoal-950/30 z-[2]" />

      {/* Noise/grain overlay for depth */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      <GradientOrb color="amber" size="lg" speed="slow" className="top-20 -left-20 opacity-40" />
      <GradientOrb color="forest" size="md" speed="normal" className="bottom-20 right-10 opacity-30" />

      {/* Content with animated text reveals */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Animated eyebrow badge */}
          <ScrollReveal direction="none" delay={0.2}>
            <span className="inline-block glass-dark text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
              Ironworker Precision
            </span>
          </ScrollReveal>

          {/* Animated headline - words fade in staggered */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream font-[family-name:var(--font-jakarta)] leading-tight">
            <TextReveal text="Mass Timber" delay={0.3} />
            <br />
            <TextReveal text="Construction." delay={0.5} />
            <span className="block text-amber-400 mt-2">
              <TextReveal text="Ironworker Precision." delay={0.7} />
            </span>
          </h1>

          {/* Animated subtitle */}
          <ScrollReveal direction="up" delay={1.0}>
            <p className="text-cream/70 text-lg mt-6 max-w-lg">
              The leading network of Ironworker contractors and suppliers for mass timber construction across North America.
            </p>
          </ScrollReveal>

          {/* Staggered CTA buttons */}
          <StaggerContainer staggerDelay={0.15} className="flex flex-wrap gap-4 mt-8">
            <StaggerItem>
              <Button variant="primary" size="lg" href="/projects">
                Explore Projects
              </Button>
            </StaggerItem>
            <StaggerItem>
              <Button variant="outline" size="lg" href="/contractors" className="border-cream/30 text-cream hover:bg-cream hover:text-charcoal-950">
                Find a Contractor
              </Button>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      {/* Premium animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-cream/40 text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-amber-400/80 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
