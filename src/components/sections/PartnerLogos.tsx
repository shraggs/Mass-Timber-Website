import { Container } from '@/components/ui/Container';
import partnersData from '@/data/partners.json';

export function PartnerLogos() {
  return (
    <section className="py-12 md:py-16 border-y border-charcoal-900/10">
      <Container>
        <p className="text-center text-sm text-charcoal-950/40 font-semibold uppercase tracking-wider mb-8">Trusted Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              className="glass-light rounded-xl px-6 py-4 text-charcoal-950/50 font-bold font-[family-name:var(--font-jakarta)] text-sm hover:text-amber-500 hover:border-amber-500/20 transition-all cursor-default grayscale hover:grayscale-0"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
