'use client';

import { Container } from '@/components/ui/Container';

interface DividerBlockProps {
  style?: 'line' | 'dots' | 'dashes' | 'wave';
  spacing?: 'sm' | 'md' | 'lg';
  darkBackground?: boolean;
  label?: string;
}

export function DividerBlock({
  style = 'line',
  spacing = 'md',
  darkBackground = false,
  label = '',
}: DividerBlockProps) {
  const padY = spacing === 'sm' ? 'py-6' : spacing === 'lg' ? 'py-20' : 'py-12';
  const lineColor = darkBackground ? 'border-white/10' : 'border-charcoal-950/10';

  const divider = () => {
    if (style === 'dots') {
      return (
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${darkBackground ? 'bg-cream/30' : 'bg-charcoal-950/30'}`} />
          ))}
        </div>
      );
    }
    if (style === 'dashes') {
      return <div className={`border-t border-dashed ${lineColor}`} />;
    }
    if (style === 'wave') {
      return (
        <svg viewBox="0 0 120 12" className={`w-24 mx-auto ${darkBackground ? 'text-cream/30' : 'text-charcoal-950/30'}`} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6" />
        </svg>
      );
    }
    return <div className={`border-t ${lineColor}`} />;
  };

  return (
    <section className={`${padY} ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        {label ? (
          <div className="flex items-center gap-4">
            <div className="flex-1">{divider()}</div>
            <span className={`text-xs font-bold uppercase tracking-widest ${darkBackground ? 'text-cream/50' : 'text-charcoal-950/50'}`}>{label}</span>
            <div className="flex-1">{divider()}</div>
          </div>
        ) : (
          divider()
        )}
      </Container>
    </section>
  );
}
