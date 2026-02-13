import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LocationCard } from '@/components/cards/LocationCard';
import { Button } from '@/components/ui/Button';
import locationsData from '@/data/locations.json';
import type { LocationCardType } from '@/types';

export function ContactPreview() {
  const locations = locationsData as LocationCardType[];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title="Contact Us" align="center" className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="primary" size="lg" href="/contact">
            Get in Touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
