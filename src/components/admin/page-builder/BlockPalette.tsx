'use client';

import { useState } from 'react';
import { Plus, Search, Sparkles } from 'lucide-react';
import { blockDefinitions } from '@/lib/page-builder/registry';
import * as LucideIcons from 'lucide-react';

interface BlockPaletteProps {
  onAdd: (type: string) => void;
}

const categories = [
  { key: 'hero', label: 'Hero / Banner' },
  { key: 'content', label: 'Pre-built Content' },
  { key: 'data', label: 'Data Sections' },
  { key: 'social-proof', label: 'Social Proof' },
  { key: 'cta', label: 'Call to Action' },
] as const;

// Order the Build Your Own items so the primitives come first
const customOrder = [
  'HeadingBlock', 'RichTextSection', 'ImageSection', 'ButtonBlock',
  'VideoBlock', 'QuoteBlock', 'CustomCardGrid', 'TwoColumnSection',
  'CustomCTA', 'DividerBlock', 'SpacerSection',
];

export function BlockPalette({ onAdd }: BlockPaletteProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const customBlocks = Object.entries(blockDefinitions)
    .filter(([, def]) => def.category === 'custom')
    .sort(([a], [b]) => {
      const ai = customOrder.indexOf(a);
      const bi = customOrder.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .filter(([, def]) => !q || def.label.toLowerCase().includes(q) || def.description?.toLowerCase().includes(q));

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-cream/40 uppercase tracking-wider px-1 mb-2">Add Sections</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blocks..."
            className="w-full pl-7 pr-2 py-1.5 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* HERO: Build Your Own — the primary way to add truly custom content */}
      <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-500/[0.02] p-3">
        <div className="flex items-center gap-2 mb-1 px-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Build Your Own</h4>
        </div>
        <p className="text-[10px] text-cream/50 px-1 mb-2.5 leading-snug">
          Start blank and write your own text, upload images, add buttons &amp; video. These are the fully-editable primitives.
        </p>
        {customBlocks.length === 0 ? (
          <p className="text-[11px] text-cream/40 px-1 py-2">No matches.</p>
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {customBlocks.map(([type, def]) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[def.icon] || LucideIcons.Box;
              return (
                <button
                  key={type}
                  onClick={() => onAdd(type)}
                  title={def.description || def.label}
                  className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-center text-[11px] font-semibold text-cream/80 bg-white/[0.02] hover:bg-amber-500/20 hover:text-amber-300 border border-white/5 hover:border-amber-500/40 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-amber-400/80 group-hover:text-amber-300" />
                  <span className="leading-tight">{def.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pre-built site-specific sections */}
      {categories.map((cat) => {
        const blocks = Object.entries(blockDefinitions).filter(([, def]) => {
          if (def.category !== cat.key) return false;
          if (!q) return true;
          return def.label.toLowerCase().includes(q) || (def.description?.toLowerCase().includes(q));
        });
        if (blocks.length === 0) return null;
        return (
          <div key={cat.key}>
            <p className="text-[10px] font-bold uppercase tracking-wider px-1 mb-1.5 text-cream/30">
              {cat.label}
            </p>
            <div className="space-y-1">
              {blocks.map(([type, def]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[def.icon] || LucideIcons.Box;
                return (
                  <button
                    key={type}
                    onClick={() => onAdd(type)}
                    title={def.description || def.label}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs text-cream/60 hover:text-cream hover:bg-white/5 transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-cream/30 group-hover:text-amber-400" />
                    <span className="flex-1 truncate">{def.label}</span>
                    <Plus className="w-3 h-3 text-cream/20 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
