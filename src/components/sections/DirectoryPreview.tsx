import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TabGroup } from '@/components/ui/TabGroup';
import { ContractorCard } from '@/components/cards/ContractorCard';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import contractorsData from '@/data/contractors.json';
import type { Contractor } from '@/types';

const tabs = [
  { label: 'Contractors', value: 'contractors', href: '/contractors' },
  { label: 'Projects', value: 'projects', href: '/projects' },
  { label: 'Suppliers and Manufacturers', value: 'suppliers', href: '/suppliers' },
];

export function DirectoryPreview() {
  const contractors = contractorsData as Contractor[];
  const featured = contractors
    .sort((a, b) => b.badges.length - a.badges.length || b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden gradient-mesh">
      <GradientOrb color="amber" size="lg" speed="slow" className="-right-40 top-20 opacity-20" />
      <GradientOrb color="forest" size="md" speed="normal" className="-left-20 bottom-20 opacity-15" />

      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <SectionHeading
              title="Explore the Industry Leaders"
              eyebrow="Mass Timber"
            />
            <TabGroup tabs={tabs} activeTab="contractors" />
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((contractor) => (
            <StaggerItem key={contractor.id}>
              <ContractorCard contractor={contractor} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Button variant="primary" size="lg" href="/contractors">
              View All Contractors
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
