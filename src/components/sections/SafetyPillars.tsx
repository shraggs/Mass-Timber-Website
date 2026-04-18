import { GraduationCap, Shield, BadgeCheck, Zap, Users, Award, RefreshCw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const safetyPillars = [
  { title: 'Specialized Mass Timber Training', description: 'Iron Workers receive targeted training in the handling, rigging, and installation of mass timber systems, ensuring safe and precise execution from delivery to final placement.', Icon: GraduationCap },
  { title: 'Advanced Fall Protection & Rigging Expertise', description: 'Our members are extensively trained in fall protection, critical lift planning, and complex rigging operations required for large-scale prefabricated timber components.', Icon: Shield },
  { title: 'Certified, Safety-First Workforce', description: 'Iron Workers complete OSHA education, jobsite safety certifications, and ongoing skills upgrades to meet or exceed contractor and project-specific safety requirements.', Icon: BadgeCheck },
  { title: 'Experience with Prefabrication & Rapid Installation', description: 'With deep experience in prefabricated construction, Iron Workers safely manage fast-paced erection schedules while maintaining strict safety controls.', Icon: Zap },
  { title: 'Efficient Coordination with Multi-Trade Teams', description: 'Iron Workers are trained to work seamlessly alongside other trades, minimizing risk, improving workflow, and keeping projects on schedule.', Icon: Users },
  { title: 'Proven Track Record on Complex Structures', description: 'From hybrid steel-and-timber systems to large-scale commercial builds, Iron Workers bring disciplined safety practices to demanding, high-profile projects.', Icon: Award },
  { title: 'Continuous Safety Training & Accountability', description: 'Ongoing education through union training centers ensures Iron Workers stay current on evolving mass timber methods, site conditions, and safety standards.', Icon: RefreshCw },
];

export function SafetyPillars() {
  return (
    <section className="py-16 md:py-24 bg-charcoal-950">
      <Container>
        <SectionHeading eyebrow="Our Standards" title="How Iron Workers Lead on Safety" dark align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {safetyPillars.map(({ title, description, Icon }) => (
            <GlassCard key={title} variant="dark" padding="lg">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-cream mb-2">{title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed">{description}</p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
