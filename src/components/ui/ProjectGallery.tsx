'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const next = () => setSelectedIndex((i) => (i + 1) % images.length);
  const prev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative w-full h-[420px] md:h-[600px] lg:h-[680px] rounded-2xl overflow-hidden glass-light cursor-zoom-in block"
          aria-label="Open image fullscreen"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedIndex]}
                alt={`${projectName} - Photo ${selectedIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={selectedIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-3 right-3 bg-charcoal-950/60 text-cream p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div className="absolute bottom-3 right-3 bg-charcoal-950/60 text-cream text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((src, index) => (
              <button
                key={src}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative w-28 h-20 md:w-32 md:h-24 rounded-lg overflow-hidden shrink-0 transition-all duration-200',
                  index === selectedIndex
                    ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-cream'
                    : 'opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={src}
                  alt={`${projectName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${projectName} - Photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
