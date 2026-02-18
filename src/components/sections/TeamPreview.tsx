import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamMemberCard } from '@/components/cards/TeamMemberCard';
import { Button } from '@/components/ui/Button';
import leadershipData from '@/data/leadership.json';

const featuredNames = ['Tom Baun', 'Mike Hess', 'Zach Gorman', 'Johnny Cangey', 'Bert Royer'];

export function TeamPreview() {
  const teamMembers = featuredNames.map(name => {
    const member = leadershipData.find(m => m.name === name);
    return { name, image: member?.image ?? null };
  });

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title="Meet Our Team" align="center" className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} name={member.name} image={member.image} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" size="md" href="/about/leadership">
            View Leadership Team
          </Button>
        </div>
      </Container>
    </section>
  );
}
