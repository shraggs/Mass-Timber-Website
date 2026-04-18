import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';

const trainingLinks = [
  { title: 'About Training', description: 'Learn about our comprehensive mass timber training programs designed for ironworkers.', href: '/training/about', icon: '📋' },
  { title: 'Find a Training Center', description: 'Locate a training center near you with hands-on mass timber courses.', href: '/training/centers', icon: '📍' },
  { title: 'For Contractors', description: 'Access specialized training resources and certification paths for contractors.', href: '/training/contractors', icon: '🏗️' },
  { title: 'For Members', description: 'Member-exclusive training materials, schedules, and career advancement resources.', href: '/training/members', icon: '👷' },
];

export function TrainingLinks() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <GradientOrb color="amber" size="lg" speed="slow" className="-right-40 top-0 opacity-15" />
      <GradientOrb color="forest" size="md" speed="normal" className="-left-20 bottom-20 opacity-10" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingLinks.map((link) => (
            <GlassCard key={link.href} hover padding="lg">
              <div className="text-3xl mb-4">{link.icon}</div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-2">{link.title}</h3>
              <p className="text-charcoal-950/60 mb-6">{link.description}</p>
              <Button variant="outline" size="sm" href={link.href}>Learn More</Button>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
