'use client';

import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';

interface CustomCTAProps {
  heading?: string;
  body?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  darkBackground?: boolean;
}

export function CustomCTA({
  heading = 'Ready to Get Started?',
  body = 'Connect with our team to learn more.',
  primaryButtonText = 'Contact Us',
  primaryButtonHref = '/contact',
  secondaryButtonText = '',
  secondaryButtonHref = '',
  darkBackground = false,
}: CustomCTAProps) {
  return (
    <section className={`py-16 md:py-24 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        <GlassPanel className="text-center">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">
            {heading}
          </h2>
          {body && (
            <p className="text-charcoal-950/60 mb-8 max-w-xl mx-auto">{body}</p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            {primaryButtonText && (
              <Button variant="primary" href={primaryButtonHref}>{primaryButtonText}</Button>
            )}
            {secondaryButtonText && (
              <Button variant="outline" href={secondaryButtonHref}>{secondaryButtonText}</Button>
            )}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}
