import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import contractorsConfig from '@/data/pages/contractors.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: contractorsConfig.metadata?.title || 'Contractors',
  description: contractorsConfig.metadata?.description,
};

export default function ContractorsPage() {
  return <PageRenderer config={contractorsConfig as PageConfig} />;
}
