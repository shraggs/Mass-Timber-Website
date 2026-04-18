import type { Metadata } from 'next';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import contactConfig from '@/data/pages/contact.json';
import type { PageConfig } from '@/types/page-builder';

export const metadata: Metadata = {
  title: contactConfig.metadata?.title || 'Contact',
  description: contactConfig.metadata?.description,
};

export default function ContactPage() {
  return <PageRenderer config={contactConfig as PageConfig} />;
}
