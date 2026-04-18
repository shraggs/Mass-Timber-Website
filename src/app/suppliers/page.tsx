import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import suppliersConfig from '@/data/pages/suppliers.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: suppliersConfig.metadata?.title || 'Suppliers',
  description: suppliersConfig.metadata?.description,
};

export default function SuppliersPage() {
  return <PageRenderer config={suppliersConfig as PageConfig} />;
}
