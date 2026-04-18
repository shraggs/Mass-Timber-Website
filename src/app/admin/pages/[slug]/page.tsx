'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { PageConfig } from '@/types/page-builder';
import { PageBuilderEditor } from '@/components/admin/page-builder/PageBuilderEditor';

export default function PageEditorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/data?file=src/data/pages/${slug}.json`);
        if (!res.ok) throw new Error('Page config not found');
        const data = await res.json();
        setConfig(JSON.parse(data.content));
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error || 'Page config not found'}</p>
        <Link href="/admin/pages" className="text-amber-400 hover:text-amber-300 text-sm">
          Back to Page Builder
        </Link>
      </div>
    );
  }

  return <PageBuilderEditor initialConfig={config} slug={slug} />;
}
