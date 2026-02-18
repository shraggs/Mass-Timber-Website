import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LocationCard } from '@/components/cards/LocationCard';
import { Button } from '@/components/ui/Button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import locationsData from '@/data/locations.json';
import type { LocationCardType } from '@/types';

export function ContactPreview() {
  const locations = locationsData as LocationCardType[];

  return (
    <section className="py-16 md:py-24 gradient-mesh">
      <Container>
        <ScrollReveal>
          <SectionHeading title="Contact Us" align="center" className="mb-12" />
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <StaggerItem key={location.id}>
              <LocationCard location={location} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Button variant="primary" size="lg" href="/contact">
              Get in Touch
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
