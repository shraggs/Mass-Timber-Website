import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { getImageClasses } from '@/lib/utils';
import { slideshowImages } from '@/data/slideshow-images';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const projects = projectsData as Project[];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    return {
      title: project?.name || 'Project',
      description: project ? `${project.name} - Mass Timber Project in ${project.location}` : '',
    };
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <>
      <PageBanner
        title={project.name}
        subtitle={project.location}
        backgroundImage={project.image || '/images/construction-wide.png'}
        images={slideshowImages.default}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.name },
        ]}
      />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="lg" speed="slow" className="-left-40 top-20 opacity-15" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden glass-light">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className={`object-cover ${getImageClasses(project.image)}`}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-charcoal-900/5">
                    <svg className="w-20 h-20 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                )}
              </div>

              <GlassPanel>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Project Overview</h2>
                <p className="text-charcoal-950/70 leading-relaxed mb-4">
                  {project.name} is a {project.category.toLowerCase()} mass timber project located in {project.location}. This project showcases the capabilities of Ironworker-led mass timber construction, combining engineered wood products with steel connections for a modern, sustainable structural system.
                </p>
                <p className="text-charcoal-950/70 leading-relaxed">
                  The construction involved precision erection of Cross-Laminated Timber (CLT) panels, Glulam beams, and steel connector systems — all assembled by skilled Ironworker crews with expertise in structural assembly, crane operations, and high-elevation work.
                </p>
              </GlassPanel>

              <GlassPanel>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-6">Construction Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['CLT Panel Erection', 'Glulam Beam Installation', 'Steel-to-Timber Connections', 'Crane & Rigging Operations', 'Fall Protection Systems', 'Precision Structural Alignment'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-forest-500/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-forest-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-charcoal-950/70">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <GlassCard padding="lg">
                <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-950">Category</p>
                    <Badge variant="category" className="mt-1">{project.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-950">Location</p>
                    <p className="text-sm text-charcoal-950/60 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {project.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-950">Structure Type</p>
                    <p className="text-sm text-charcoal-950/60 mt-1">Mass Timber</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-950">Construction Method</p>
                    <p className="text-sm text-charcoal-950/60 mt-1">Ironworker-Led Erection</p>
                  </div>
                </div>
              </GlassCard>

              <Button variant="primary" size="lg" href="/contact" className="w-full">
                Inquire About This Project
              </Button>
              <Button variant="outline" size="md" href="/projects" className="w-full">
                Back to All Projects
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
