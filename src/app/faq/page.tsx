import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import faqConfig from '@/data/pages/faq.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: faqConfig.metadata?.title || 'FAQ',
  description: faqConfig.metadata?.description,
};

export default function FAQPage() {
  return <PageRenderer config={faqConfig as PageConfig} />;
}
