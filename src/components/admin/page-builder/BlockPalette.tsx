'use client';

import { Plus } from 'lucide-react';
import { blockDefinitions } from '@/lib/page-builder/registry';
import * as LucideIcons from 'lucide-react';

interface BlockPaletteProps {
  onAdd: (type: string) => void;
}

const categories = [
  { key: 'hero', label: 'Hero' },
  { key: 'content', label: 'Content' },
  { key: 'data', label: 'Data' },
  { key: 'social-proof', label: 'Social Proof' },
  { key: 'cta', label: 'Call to Action' },
] as const;

export function BlockPalette({ onAdd }: BlockPaletteProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-cream/40 uppercase tracking-wider px-1">Add Sections</h3>
      {categories.map((cat) => {
        const blocks = Object.entries(blockDefinitions).filter(([, def]) => def.category === cat.key);
        if (blocks.length === 0) return null;
        return (
          <div key={cat.key}>
            <p className="text-[10px] font-medium text-cream/25 uppercase tracking-wider px-1 mb-1.5">{cat.label}</p>
            <div className="space-y-1">
              {blocks.map(([type, def]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[def.icon] || LucideIcons.Box;
                return (
                  <button
                    key={type}
                    onClick={() => onAdd(type)}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs text-cream/60 hover:text-cream hover:bg-white/5 transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 text-cream/30 group-hover:text-amber-400 shrink-0" />
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
