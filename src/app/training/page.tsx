import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import trainingConfig from '@/data/pages/training.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: trainingConfig.metadata?.title || 'Training',
  description: trainingConfig.metadata?.description,
};

export default function TrainingPage() {
  return <PageRenderer config={trainingConfig as PageConfig} />;
}
