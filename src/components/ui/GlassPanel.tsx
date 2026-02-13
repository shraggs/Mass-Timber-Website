import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export function GlassPanel({ children, variant = 'light', className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-8 md:p-12',
        variant === 'light' ? 'glass-light' : 'glass-dark',
        className
      )}
    >
      {children}
    </div>
  );
}
