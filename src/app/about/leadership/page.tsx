import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { LeaderCard } from '@/components/cards/LeaderCard';
import { FeaturedLeaderCard } from '@/components/cards/FeaturedLeaderCard';
import { slideshowImages } from '@/data/slideshow-images';
import leadersData from '@/data/leadership.json';
import type { Leader } from '@/types';

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the leadership team of the International Association of Bridge, Structural, Ornamental and Reinforcing Iron Workers.',
};

const TOM_BAUN_ID = '13';

export default function LeadershipPage() {
  const leaders = leadersData as Leader[];
  const tomBaun = leaders.find((l) => l.id === TOM_BAUN_ID)!;
  const otherLeaders = leaders.filter((l) => l.id !== TOM_BAUN_ID);
  const midpoint = Math.ceil(otherLeaders.length / 2);
  const topGroup = otherLeaders.slice(0, midpoint);
  const bottomGroup = otherLeaders.slice(midpoint);

  return (
    <>
      <PageBanner
        title="Leadership Team"
        subtitle="The experienced leaders guiding our union forward"
        backgroundImage="/images/clean-interior.png"
        images={slideshowImages.leadership}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Leadership Team' }]}
      />

      <section className="py-16 md:py-24">
        <Container>
          {/* Top group */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {topGroup.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>

          {/* Tom Baun - Featured card in the middle */}
          <div className="my-12 flex justify-center">
            <div className="w-full max-w-3xl">
              <FeaturedLeaderCard leader={tomBaun} />
            </div>
          </div>

          {/* Bottom group */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bottomGroup.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
