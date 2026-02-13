import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getImageClasses } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard hover padding="none">
      <div className="relative h-56 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={`object-cover ${getImageClasses(project.image)}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-charcoal-900/5">
            <svg className="w-12 h-12 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="category">{project.category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-1">
          {project.name}
        </h3>
        <p className="flex items-center gap-2 text-sm text-charcoal-950/60 mb-4">
          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {project.location}
        </p>
        <Button variant="outline" size="sm" href={`/projects/${project.slug}`} className="w-full">
          Details
        </Button>
      </div>
    </GlassCard>
  );
}
