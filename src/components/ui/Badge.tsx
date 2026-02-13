import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'featured' | 'popular' | 'category';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  featured: 'bg-amber-500/15 text-amber-600 border border-amber-500/20',
  popular: 'bg-forest-500/15 text-forest-600 border border-forest-500/20',
  category: 'bg-charcoal-900/10 text-charcoal-950 border border-charcoal-900/10',
};

export function Badge({ variant = 'category', children, className }: BadgeProps) {
  return (
    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider inline-block', variantStyles[variant], className)}>
      {children}
    </span>
  );
}
