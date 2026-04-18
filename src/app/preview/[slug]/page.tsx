'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { PageConfig } from '@/types/page-builder';
import { PageRenderer } from '@/components/page-builder/PageRenderer';

export default function PreviewPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [config, setConfig] = useState<PageConfig | null>(null);

  useEffect(() => {
    // Try sessionStorage first (unsaved draft from admin editor)
    const draft = sessionStorage.getItem(`page-builder-preview-${slug}`);
    if (draft) {
      try {
        setConfig(JSON.parse(draft));
        return;
      } catch { /* fall through to fetch */ }
    }

    // Fall back to saved config
    fetch(`/api/admin/data?file=src/data/pages/${slug}.json`)
      .then((res) => res.json())
      .then((data) => setConfig(JSON.parse(data.content)))
      .catch(() => setConfig(null));
  }, [slug]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center text-charcoal-950/50">
        Loading preview...
      </div>
    );
  }

  return <PageRenderer config={config} />;
}
