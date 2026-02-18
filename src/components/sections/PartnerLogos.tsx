import { Container } from '@/components/ui/Container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import partnersData from '@/data/partners.json';

export function PartnerLogos() {
  return (
    <section className="py-12 md:py-16 border-y border-charcoal-900/10">
      <Container>
        <ScrollReveal>
          <p className="text-center text-sm text-charcoal-950/40 font-semibold uppercase tracking-wider mb-8">Trusted Partners</p>
        </ScrollReveal>
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partnersData.map((partner) => (
            <StaggerItem key={partner.id}>
              <div className="glass-light rounded-xl px-6 py-4 text-charcoal-950/50 font-bold font-[family-name:var(--font-jakarta)] text-sm hover:text-amber-500 hover:border-amber-500/20 transition-all cursor-default grayscale hover:grayscale-0 hover:-translate-y-1">
                {partner.name}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
