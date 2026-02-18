import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamMemberCard } from '@/components/cards/TeamMemberCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import leadershipData from '@/data/leadership.json';

const otherNames = ['Mike Hess', 'Zach Gorman', 'Johnny Cangey', 'Bert Royer'];

export function TeamPreview() {
  const tomBaun = leadershipData.find(m => m.name === 'Tom Baun');
  const otherMembers = otherNames.map(name => {
    const member = leadershipData.find(m => m.name === name);
    return { name, image: member?.image ?? null };
  });

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title="Meet Our Team" align="center" className="mb-12" />

        {/* Tom Baun - Featured larger card centered */}
        <div className="flex justify-center mb-8">
          <GlassCard hover padding="lg" className="text-center max-w-xs">
            {tomBaun?.image ? (
              <div className="w-36 h-36 rounded-full mx-auto mb-4 overflow-hidden relative">
                <Image src={tomBaun.image} alt="Tom Baun" fill className="object-cover" sizes="144px" />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-400 to-forest-500 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold font-[family-name:var(--font-jakarta)]">
                TB
              </div>
            )}
            <h3 className="text-lg font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">Tom Baun</h3>
            <p className="text-sm text-amber-500 font-semibold mt-1">Special Project Director</p>
          </GlassCard>
        </div>

        {/* Other team members */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {otherMembers.map((member) => (
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
