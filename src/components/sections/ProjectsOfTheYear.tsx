import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

const projectCategories = [
  { name: 'Commercial', count: 6 },
  { name: 'Industrial', count: 5 },
  { name: 'Educational', count: 7 },
];

export function ProjectsOfTheYear() {
  return (
    <section className="py-16 md:py-24 bg-ivory">
      <Container>
        <SectionHeading title="Projects of the Year" align="center" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {projectCategories.map((cat) => (
            <GlassCard key={cat.name} hover padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-500 font-[family-name:var(--font-jakarta)]">{cat.count}</span>
              </div>
              <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">{cat.name}</h3>
              <p className="text-sm text-charcoal-950/50 mt-1">Projects</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="primary" size="lg" href="/projects">
            Find Projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
