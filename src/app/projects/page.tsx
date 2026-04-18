import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import projectsConfig from '@/data/pages/projects.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: projectsConfig.metadata?.title || 'Projects',
  description: projectsConfig.metadata?.description,
};

export default function ProjectsPage() {
  return <PageRenderer config={projectsConfig as PageConfig} />;
}
