'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function GlassCard({ children, variant = 'light', hover = false, padding = 'md', className }: GlassCardProps) {
  const classes = cn(
    'rounded-xl overflow-hidden',
    variant === 'light' ? 'glass-light' : 'glass-dark',
    hover && 'cursor-pointer',
    paddingMap[padding],
    className
  );

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{
          y: -6,
          scale: 1.02,
          boxShadow: '0 8px 32px rgba(52, 173, 119, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
