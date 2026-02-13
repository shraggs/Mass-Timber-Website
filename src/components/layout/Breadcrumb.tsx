import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  dark?: boolean;
  className?: string;
}

export function Breadcrumb({ items, dark = false, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm', className)}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && (
            <svg className={cn('w-3 h-3', dark ? 'text-cream/40' : 'text-charcoal-950/40')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          )}
          {item.href ? (
            <Link href={item.href} className={cn('hover:text-amber-400 transition-colors', dark ? 'text-cream/60' : 'text-charcoal-950/60')}>
              {item.label}
            </Link>
          ) : (
            <span className={cn(dark ? 'text-amber-400' : 'text-amber-500', 'font-medium')}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
