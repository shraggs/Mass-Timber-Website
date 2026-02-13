import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  return phone;
}

export function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Images needing clockwise rotation (+90deg)
const ROTATED_CW_IMAGES: string[] = [
  // rotated-site-1, rotated-site-2, rotated-contact removed - Next.js handles EXIF
];

// Images needing counterclockwise rotation (-90deg)
const ROTATED_CCW_IMAGES = [
  'rotated-site-3',
  'rotated-frame-1',
  'rotated-training',
  'rotated-projects',
];

export function isRotatedImage(filename: string): boolean {
  return [...ROTATED_CW_IMAGES, ...ROTATED_CCW_IMAGES].some(name => filename.includes(name));
}

export function getImageRotation(filename: string): string {
  if (ROTATED_CW_IMAGES.some(name => filename.includes(name))) {
    return 'rotate-[90deg] scale-[2.5] origin-center';
  }
  if (ROTATED_CCW_IMAGES.some(name => filename.includes(name))) {
    return 'rotate-[-90deg] scale-[2.5] origin-center';
  }
  return '';
}

export function getImageClasses(filename: string): string {
  return getImageRotation(filename);
}
