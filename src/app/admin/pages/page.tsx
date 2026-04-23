'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutGrid, Home, Info, Phone, Briefcase, Building2,
  Package, HelpCircle, Shield, GraduationCap, Loader2, Plus, Trash2, FileText, X
} from 'lucide-react';

interface PageListItem {
  slug: string;
  title: string;
  sectionCount: number;
  description: string;
  isBuiltIn: boolean;
}

const builtInIcons: Record<string, typeof Home> = {
  home: Home,
  about: Info,
  contact: Phone,
  projects: Briefcase,
  contractors: Building2,
  suppliers: Package,
  faq: HelpCircle,
  safety: Shield,
  training: GraduationCap,
};

export default function PageBuilderList() {
  const router = useRouter();
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPages = async () => {
    try {
      const res = await fetch('/api/admin/pages');
      if (!res.ok) throw new Error('Failed to load pages');
      const data = await res.json();
      setPages(data.pages || []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete page "${slug}"? This cannot be undone. The page file will be removed from GitHub.`)) return;
    setDeleting(slug);
    setError(null);
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      await loadPages();
    } catch (err) {
      setError(String(err));
    } finally {
      setDeleting(null);
    }
  };

  const builtIn = pages.filter((p) => p.isBuiltIn);
  const custom = pages.filter((p) => !p.isBuiltIn);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">Page Builder</h1>
            <p className="text-sm text-cream/40">Create, edit, and organize every page on your site</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-charcoal-950 hover:bg-amber-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Page
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-sm flex items-start justify-between gap-3">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="shrink-0 text-red-400/60 hover:text-red-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          <PageGroup
            label="Built-in Pages"
            hint="Core pages tied to the main navigation — content is editable but the page itself cannot be deleted."
            pages={builtIn}
            onDelete={handleDelete}
            deleting={deleting}
          />
          <PageGroup
            label="Custom Pages"
            hint="Pages you created. These render automatically at the URL matching their slug (e.g. /services)."
            pages={custom}
            onDelete={handleDelete}
            deleting={deleting}
            emptyText="No custom pages yet. Click 'New Page' to create one."
          />
        </div>
      )}

      {showCreate && (
        <CreatePageModal
          onClose={() => setShowCreate(false)}
          existingSlugs={pages.map((p) => p.slug)}
          onCreated={(slug) => {
            setShowCreate(false);
            router.push(`/admin/pages/${slug}`);
          }}
        />
      )}
    </div>
  );
}

function PageGroup({
  label, hint, pages, onDelete, deleting, emptyText,
}: {
  label: string;
  hint: string;
  pages: PageListItem[];
  onDelete: (slug: string) => void;
  deleting: string | null;
  emptyText?: string;
}) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-xs font-bold text-cream/50 uppercase tracking-wider">{label}</h2>
        <p className="text-xs text-cream/30 mt-0.5">{hint}</p>
      </div>
      {pages.length === 0 ? (
        <div className="text-center py-10 text-cream/30 text-sm border border-dashed border-white/10 rounded-xl">
          {emptyText || 'None yet.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => {
            const Icon = builtInIcons[page.slug] || FileText;
            return (
              <div
                key={page.slug}
                className="bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-5 hover:border-amber-500/30 transition-all group relative"
              >
                <Link href={`/admin/pages/${page.slug}`} className="block">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <h3 className="font-semibold text-cream font-[family-name:var(--font-jakarta)] group-hover:text-amber-400 transition-colors truncate">{page.title}</h3>
                      <p className="text-xs text-cream/40 mt-1 line-clamp-2">{page.description || `/${page.slug === 'home' ? '' : page.slug}`}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-amber-400/70 px-2 py-1 rounded bg-amber-500/10">
                          {page.sectionCount} sections
                        </span>
                        <span className="text-xs text-cream/40 font-mono">/{page.slug === 'home' ? '' : page.slug}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {!page.isBuiltIn && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(page.slug);
                    }}
                    disabled={deleting === page.slug}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-cream/30 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    title="Delete page"
                  >
                    {deleting === page.slug ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CreatePageModal({
  onClose, onCreated, existingSlugs,
}: {
  onClose: () => void;
  onCreated: (slug: string) => void;
  existingSlugs: string[];
}) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [metaDescription, setMetaDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const autoSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  const finalSlug = slugTouched ? slug : autoSlug(title);
  const slugConflict = finalSlug && existingSlugs.includes(finalSlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !finalSlug) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: finalSlug,
          title: title.trim(),
          metaTitle: title.trim(),
          metaDescription: metaDescription.trim(),
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const raw = await res.text();
      let data: { error?: string; slug?: string } = {};
      if (contentType.includes('application/json')) {
        try { data = JSON.parse(raw); } catch { /* leave as {} */ }
      }

      if (!res.ok) {
        const detail = data.error || raw.slice(0, 200) || `HTTP ${res.status}`;
        throw new Error(detail);
      }
      if (!data.slug) {
        throw new Error('Server returned no slug — page may not have saved.');
      }
      onCreated(data.slug);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#1E3A2A] border border-white/10 rounded-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h2 className="font-bold text-cream font-[family-name:var(--font-jakarta)]">Create New Page</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/5">
            <X className="w-4 h-4 text-cream/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-cream/40 mb-1.5">Page Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Services, News, Events"
              required
              autoFocus
              className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs text-cream/40 mb-1.5">URL Slug <span className="text-red-400">*</span></label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-cream/40 font-mono">/</span>
              <input
                type="text"
                value={finalSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value.toLowerCase());
                }}
                placeholder="services"
                pattern="[a-z0-9][a-z0-9-]*"
                required
                className="flex-1 px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-xs text-cream/30 mt-1">Lowercase letters, numbers, and dashes. This becomes the page URL.</p>
            {slugConflict && (
              <p className="text-xs text-red-400 mt-1">A page with this slug already exists.</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-cream/40 mb-1.5">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Short description for search engines and social previews."
              rows={2}
              className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500 resize-y"
            />
          </div>

          {error && (
            <div className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs">{error}</div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-sm text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !title.trim() || !finalSlug || !!slugConflict}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-charcoal-950 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {saving ? 'Creating...' : 'Create Page'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
