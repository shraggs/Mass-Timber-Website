import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, eyebrow, align = 'left', dark = false, className }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className={cn('text-sm font-semibold uppercase tracking-wider mb-2', dark ? 'text-amber-400' : 'text-amber-500')}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-jakarta)]', dark ? 'text-cream' : 'text-charcoal-950')}>
        {title}
      </h2>
      <div className={cn('w-16 h-1 bg-amber-500 rounded-full mt-4', align === 'center' && 'mx-auto')} />
      {subtitle && (
        <p className={cn('mt-4 text-lg max-w-2xl', dark ? 'text-cream/70' : 'text-charcoal-950/60', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
