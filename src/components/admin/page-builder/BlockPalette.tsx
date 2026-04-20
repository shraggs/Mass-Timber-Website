'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { blockDefinitions } from '@/lib/page-builder/registry';
import * as LucideIcons from 'lucide-react';

interface BlockPaletteProps {
  onAdd: (type: string) => void;
}

const categories = [
  { key: 'custom', label: 'Build Your Own', hint: 'Fully editable blocks — write your own text, images, and buttons' },
  { key: 'hero', label: 'Hero' },
  { key: 'content', label: 'Pre-built Content' },
  { key: 'data', label: 'Data Sections' },
  { key: 'social-proof', label: 'Social Proof' },
  { key: 'cta', label: 'Call to Action' },
] as const;

export function BlockPalette({ onAdd }: BlockPaletteProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  return (
    <div className="space-y-4">
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

      {categories.map((cat) => {
        const blocks = Object.entries(blockDefinitions).filter(([, def]) => {
          if (def.category !== cat.key) return false;
          if (!q) return true;
          return def.label.toLowerCase().includes(q) || (def.description?.toLowerCase().includes(q));
        });
        if (blocks.length === 0) return null;
        const highlight = cat.key === 'custom';
        return (
          <div key={cat.key}>
            <p className={`text-[10px] font-bold uppercase tracking-wider px-1 mb-1.5 ${highlight ? 'text-amber-400' : 'text-cream/30'}`}>
              {cat.label}
            </p>
            {'hint' in cat && cat.hint && !q && (
              <p className="text-[10px] text-cream/30 px-1 mb-2 leading-snug">{cat.hint}</p>
            )}
            <div className="space-y-1">
              {blocks.map(([type, def]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[def.icon] || LucideIcons.Box;
                return (
                  <button
                    key={type}
                    onClick={() => onAdd(type)}
                    title={def.description || def.label}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs transition-colors group ${
                      highlight
                        ? 'text-cream/80 hover:text-cream bg-amber-500/[0.04] hover:bg-amber-500/10 border border-amber-500/10 hover:border-amber-500/30'
                        : 'text-cream/60 hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${highlight ? 'text-amber-400' : 'text-cream/30 group-hover:text-amber-400'}`} />
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
