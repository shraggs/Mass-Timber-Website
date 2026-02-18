import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { LeaderCard } from '@/components/cards/LeaderCard';
import { slideshowImages } from '@/data/slideshow-images';
import leadersData from '@/data/leadership.json';
import type { Leader } from '@/types';

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the leadership team of the International Association of Bridge, Structural, Ornamental and Reinforcing Iron Workers.',
};

export default function LeadershipPage() {
  const leaders = leadersData as Leader[];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leaders.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
