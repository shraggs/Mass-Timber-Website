import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import safetyConfig from '@/data/pages/safety.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: safetyConfig.metadata?.title || 'Safety',
  description: safetyConfig.metadata?.description,
};

export default function SafetyPage() {
  return <PageRenderer config={safetyConfig as PageConfig} />;
}
