'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

interface CustomCardGridProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  columns?: string;
  darkBackground?: boolean;
  cards?: string;
}

interface CardData {
  title: string;
  description: string;
  icon?: string;
}

function parseCards(cardsStr: string): CardData[] {
  try {
    return JSON.parse(cardsStr);
  } catch {
    // Support simple format: "Title 1|Description 1\nTitle 2|Description 2"
    return cardsStr.split('\n').filter(Boolean).map((line) => {
      const [title, description] = line.split('|');
      return { title: title?.trim() || '', description: description?.trim() || '' };
    });
  }
}

export function CustomCardGrid({
  eyebrow = '',
  title = 'Section Title',
  subtitle = '',
  columns = '3',
  darkBackground = false,
  cards = 'Card Title|Card description goes here\nAnother Card|Another description here\nThird Card|Third card description',
}: CustomCardGridProps) {
  const cols = parseInt(columns) || 3;
  const parsedCards = parseCards(cards);
  const gridCols = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className={`py-16 md:py-24 ${darkBackground ? 'bg-charcoal-950' : ''}`}>
      <Container>
        {(title || eyebrow) && (
          <SectionHeading
            title={title}
            eyebrow={eyebrow || undefined}
            subtitle={subtitle || undefined}
            align="center"
            dark={darkBackground}
            className="mb-12"
          />
        )}
        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {parsedCards.map((card, i) => (
            <GlassCard key={i} variant={darkBackground ? 'dark' : 'light'} hover padding="lg">
              {card.icon && <div className="text-3xl mb-3">{card.icon}</div>}
              <h3 className={`text-lg font-bold font-[family-name:var(--font-jakarta)] mb-2 ${darkBackground ? 'text-cream' : 'text-charcoal-950'}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed ${darkBackground ? 'text-cream/60' : 'text-charcoal-950/60'}`}>
                {card.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
