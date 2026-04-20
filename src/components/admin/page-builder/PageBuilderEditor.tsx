'use client';

import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Save, RotateCcw, Eye, Loader2, ArrowLeft, Settings, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { PageConfig, SectionConfig } from '@/types/page-builder';
import { blockDefinitions } from '@/lib/page-builder/registry';
import { SortableSectionCard } from './SortableSectionCard';
import { BlockPalette } from './BlockPalette';
import { PropertyEditor } from './PropertyEditor';

interface PageBuilderEditorProps {
  initialConfig: PageConfig;
  slug: string;
}

let idCounter = 0;
function generateId() {
  idCounter++;
  return `section-${Date.now()}-${idCounter}`;
}

export function PageBuilderEditor({ initialConfig, slug }: PageBuilderEditorProps) {
  const [config, setConfig] = useState<PageConfig>(initialConfig);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const updateSections = useCallback((sections: SectionConfig[]) => {
    setConfig((prev) => ({ ...prev, sections }));
    setHasChanges(true);
    setSaved(false);
  }, []);

  const updateMetadata = useCallback((updates: Partial<PageConfig> & { metadata?: PageConfig['metadata'] }) => {
    setConfig((prev) => ({
      ...prev,
      ...updates,
      metadata: { ...prev.metadata, ...(updates.metadata || {}) },
    }));
    setHasChanges(true);
    setSaved(false);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setConfig((prev) => {
      const oldIndex = prev.sections.findIndex((s) => s.id === active.id);
      const newIndex = prev.sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(prev.sections, oldIndex, newIndex);
      setHasChanges(true);
      setSaved(false);
      return { ...prev, sections: newSections };
    });
  }, []);

  const handleToggle = useCallback((id: string) => {
    updateSections(
      config.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  }, [config.sections, updateSections]);

  const handleDelete = useCallback((id: string) => {
    if (!confirm('Remove this section from the page?')) return;
    updateSections(config.sections.filter((s) => s.id !== id));
    if (editingId === id) setEditingId(null);
  }, [config.sections, editingId, updateSections]);

  const handleAdd = useCallback((type: string) => {
    const def = blockDefinitions[type];
    const newSection: SectionConfig = {
      id: generateId(),
      type,
      props: { ...def?.defaultProps },
      enabled: true,
    };
    updateSections([...config.sections, newSection]);
  }, [config.sections, updateSections]);

  const handleUpdateProps = useCallback((id: string, props: Record<string, unknown>) => {
    updateSections(
      config.sections.map((s) => (s.id === id ? { ...s, props } : s))
    );
  }, [config.sections, updateSections]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: `src/data/pages/${slug}.json`,
          content: JSON.stringify(config, null, 2),
          message: `Admin: Update ${config.title} page layout`,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      setSaved(true);
      setHasChanges(false);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!confirm('Discard all changes?')) return;
    setConfig(initialConfig);
    setHasChanges(false);
    setEditingId(null);
  };

  const handlePreview = () => {
    sessionStorage.setItem(`page-builder-preview-${slug}`, JSON.stringify(config));
    setShowPreview(true);
  };

  const editingSection = editingId ? config.sections.find((s) => s.id === editingId) : null;

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-4 h-4 text-cream/40" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-cream font-[family-name:var(--font-jakarta)]">
              {config.title}
            </h1>
            <p className="text-xs text-cream/40">{config.sections.length} sections</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/${slug === 'home' ? '' : slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
            title="Open live page in new tab"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>

          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          {hasChanges && (
            <button
              onClick={handleDiscard}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Discard
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-charcoal-950 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Status messages */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
      )}
      {saved && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-500/10 text-green-400 text-sm">
          Layout saved! Changes will be live after Render redeploys (~2-3 min).
        </div>
      )}

      {/* 3-panel layout */}
      <div className="flex gap-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* Left: Block palette */}
        <div className="w-52 shrink-0 bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <BlockPalette onAdd={handleAdd} />
        </div>

        {/* Center: Section list */}
        <div className="flex-1 bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <h3 className="text-xs font-semibold text-cream/40 uppercase tracking-wider mb-3">Page Sections</h3>

          {config.sections.length === 0 ? (
            <div className="text-center py-16 text-cream/30 text-sm">
              No sections yet. Add sections from the palette on the left.
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={config.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {config.sections.map((section) => (
                    <SortableSectionCard
                      key={section.id}
                      section={section}
                      onToggle={handleToggle}
                      onEdit={setEditingId}
                      onDelete={handleDelete}
                      isEditing={editingId === section.id}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Right: Property editor */}
        {editingSection && (
          <div className="w-72 shrink-0 bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            <PropertyEditor
              section={editingSection}
              onUpdate={handleUpdateProps}
              onClose={() => setEditingId(null)}
            />
          </div>
        )}
      </div>

      {/* Page settings modal */}
      {showSettings && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSettings(false); }}
        >
          <div className="bg-[#1E3A2A] border border-white/10 rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div>
                <h2 className="font-bold text-cream font-[family-name:var(--font-jakarta)]">Page Settings</h2>
                <p className="text-xs text-cream/40 mt-0.5">Metadata and SEO for this page.</p>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-charcoal-950 bg-amber-500 hover:bg-amber-400 transition-colors"
              >
                Done
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-cream/40 mb-1.5">Page Title (shown in admin)</label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => updateMetadata({ title: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/40 mb-1.5">Browser Tab Title (SEO)</label>
                <input
                  type="text"
                  value={config.metadata?.title || ''}
                  onChange={(e) => updateMetadata({ metadata: { title: e.target.value } })}
                  placeholder={config.title}
                  className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/40 mb-1.5">Meta Description</label>
                <textarea
                  value={config.metadata?.description || ''}
                  onChange={(e) => updateMetadata({ metadata: { description: e.target.value } })}
                  rows={3}
                  placeholder="Short description for search engines and social previews."
                  className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500 resize-y"
                />
              </div>
              <div className="text-xs text-cream/30 pt-2 border-t border-white/[0.06]">
                <p><span className="text-cream/50">Slug:</span> <code className="text-amber-400">{config.slug}</code></p>
                <p className="mt-1"><span className="text-cream/50">URL:</span> <code className="text-amber-400">/{slug === 'home' ? '' : slug}</code></p>
                <p className="mt-2 italic">Changes save when you click Save in the top toolbar.</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Preview modal - rendered via portal to escape admin layout scroll container */}
      {showPreview && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowPreview(false); }}
        >
          <div className="bg-[#0f1f17] rounded-xl border border-white/10 w-full max-w-6xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <span className="text-sm text-cream font-semibold">Preview: {config.title}</span>
              <button
                onClick={() => setShowPreview(false)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-charcoal-950 bg-amber-500 hover:bg-amber-400 transition-colors"
              >
                Close Preview
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`/preview/${slug}`}
                className="w-full h-full border-0"
                title="Page preview"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
