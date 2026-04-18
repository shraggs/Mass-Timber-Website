import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutUnionSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading title="About the Union" eyebrow="Our Heritage" />
            <p className="mt-6 text-charcoal-950/70 leading-relaxed">
              The International Association of Bridge, Structural, Ornamental and Reinforcing Iron Workers, AFL-CIO (IW), is a proud trade association whose beginnings go back to the 1890s. The IW represents 120,000 members in North America. Members of our union have worked on nearly every major construction project you can think of – the Golden Gate Bridge, the Sears Tower, the St. Louis Arch, the Oil Sands Plant Expansion in Alberta, the World Trade Center and Freedom Tower.
            </p>
            <p className="mt-4 text-charcoal-950/70 leading-relaxed">
              We represent ironworkers who work on bridges, structural steel, ornamental, architectural and miscellaneous metals, rebar and in shops. Across North America, we build. And we build safely and skillfully, getting the job done right and on time.
            </p>
            <p className="mt-4 text-charcoal-950/70 leading-relaxed">
              We provide many benefits and support for our members. These benefits include the advantage of working under a collective bargaining agreement that brings bigger paychecks, better health and retirement benefits, more secure jobs and safe working conditions. Explore our site and find out how ironworkers are building the infrastructure of North America!
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden glass-light">
            <Image
              src="/images/our-union-workers.jpg"
              alt="Ironworkers on mass timber beams"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
