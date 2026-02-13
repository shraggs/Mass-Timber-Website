'use client';

import Image from 'next/image';
import { cn, isRotatedImage, getImageRotation } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from './Breadcrumb';
import { useImageSlideshow } from '@/hooks/useImageSlideshow';
import type { SlideshowImage } from '@/data/slideshow-images';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  images?: SlideshowImage[];
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

function StaticBackground({ src, alt }: { src: string; alt: string }) {
  const rotated = isRotatedImage(src);
  return (
    <div className={cn('absolute', rotated ? 'inset-[-50%] w-[200%] h-[200%]' : 'inset-0')}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn('object-cover', getImageRotation(src))}
        priority
        sizes="100vw"
      />
    </div>
  );
}

function SlideshowBackground({ images }: { images: SlideshowImage[] }) {
  const { currentIndex } = useImageSlideshow({
    imageCount: images.length,
    interval: 6000,
  });

  return (
    <>
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
    </>
  );
}

export function PageBanner({ title, subtitle, backgroundImage, images, breadcrumbs, className }: PageBannerProps) {
  const useSlideshow = images && images.length > 1;

  return (
    <section className={cn('relative h-[300px] md:h-[400px] overflow-hidden flex items-center', className)}>
      {useSlideshow ? (
        <SlideshowBackground images={images} />
      ) : (
        <StaticBackground src={backgroundImage} alt={title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/60 to-charcoal-950/40 z-[2]" />
      <Container className="relative z-10">
        <Breadcrumb items={breadcrumbs} dark />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream font-[family-name:var(--font-jakarta)] mt-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-cream/70 text-lg mt-3 max-w-xl">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
