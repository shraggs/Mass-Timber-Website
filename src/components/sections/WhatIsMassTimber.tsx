import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GradientOrb } from '@/components/ui/GradientOrb';

export function WhatIsMassTimber() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <GradientOrb color="forest" size="lg" speed="slow" className="-left-40 top-0 opacity-20" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <div className="relative space-y-4">
            <div className="relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden glass-light">
              <Image
                src="/images/timber-ceiling.png"
                alt="Interior timber ceiling with structural beams and steel connections"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-[200px] md:h-[250px] rounded-2xl overflow-hidden glass-light ml-8 md:ml-16">
              <Image
                src="/images/connector-detail.png"
                alt="Mass timber connector detail with metal bracket"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionHeading title="What is Mass Timber?" eyebrow="Ironworkers" />
            <div className="mt-8 space-y-4 text-charcoal-950/70 leading-relaxed">
              <p>
                Mass Timber refers to a new generation of engineered wood products—including Cross-Laminated Timber (CLT), Glulam Beams, and Laminated Veneer Lumber (LVL)—that are manufactured for structural performance and designed to replace or integrate with traditional steel and concrete framing systems.
              </p>
              <p>
                From an Ironworker&apos;s point of view, Mass Timber is not about finishes or interiors — it&apos;s about the structure. Each piece of Mass Timber is prefabricated, engineered, and installed as part of a load-bearing frame that carries the weight of the building.
              </p>
              <p>
                At its core, Mass Timber construction is structural assembly at scale. It requires the same engineering collaboration, load calculations, lift plans, and high-risk erection procedures that define Ironworker jurisdiction.
              </p>
              <p className="font-semibold text-charcoal-950">
                That&apos;s why Ironworkers across North America are leading the way in Mass Timber erection.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
