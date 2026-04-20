import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { PageRenderer } from '@/components/page-builder/PageRenderer';
import type { PageConfig } from '@/types/page-builder';

export const dynamic = 'force-dynamic';

const RESERVED = new Set([
  'about', 'contact', 'projects', 'contractors', 'suppliers',
  'faq', 'safety', 'training', 'admin', 'api', 'preview',
]);

function loadConfig(slug: string): PageConfig | null {
  if (RESERVED.has(slug)) return null;
  const filePath = join(process.cwd(), 'src/data/pages', `${slug}.json`);
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as PageConfig;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = loadConfig(slug);
  if (!config) return { title: 'Page Not Found' };
  return {
    title: config.metadata?.title || config.title,
    description: config.metadata?.description,
  };
}

export async function generateStaticParams() {
  try {
    const dir = join(process.cwd(), 'src/data/pages');
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .filter((slug) => !RESERVED.has(slug) && slug !== 'home');
  } catch {
    return [];
  }
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = loadConfig(slug);
  if (!config) notFound();
  return <PageRenderer config={config} />;
}
