import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import aboutConfig from '@/data/pages/about.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: aboutConfig.metadata?.title || 'About Us',
  description: aboutConfig.metadata?.description,
};

export default function AboutPage() {
  return <PageRenderer config={aboutConfig as PageConfig} />;
}
