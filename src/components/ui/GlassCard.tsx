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
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        variant === 'light' ? 'glass-light' : 'glass-dark',
        hover && 'glass-hover-glow cursor-pointer',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
