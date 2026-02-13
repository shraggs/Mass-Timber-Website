'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseImageSlideshowOptions {
  imageCount: number;
  interval?: number;
}

interface UseImageSlideshowReturn {
  currentIndex: number;
  previousIndex: number;
  isTransitioning: boolean;
  pause: () => void;
  resume: () => void;
}

export function useImageSlideshow({
  imageCount,
  interval = 6000,
}: UseImageSlideshowOptions): UseImageSlideshowReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    setPreviousIndex((prev) => {
      // Capture current index before advancing
      return currentIndex;
    });
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % imageCount);

    // Reset transition flag after CSS transition completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [imageCount, currentIndex]);

  useEffect(() => {
    if (isPaused || imageCount <= 1) return;
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [isPaused, advance, interval, imageCount]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { currentIndex, previousIndex, isTransitioning, pause, resume };
}
