'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Settings, Trash2 } from 'lucide-react';
import type { SectionConfig } from '@/types/page-builder';
import { blockDefinitions } from '@/lib/page-builder/registry';
import * as LucideIcons from 'lucide-react';

interface SortableSectionCardProps {
  section: SectionConfig;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
}

export function SortableSectionCard({ section, onToggle, onEdit, onDelete, isEditing }: SortableSectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const def = blockDefinitions[section.type];
  const label = def?.label || section.type;
  const iconName = def?.icon || 'Box';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Box;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
        isEditing
          ? 'bg-amber-500/10 border-amber-500/30'
          : section.enabled
            ? 'bg-[#1E3A2A] border-white/[0.06] hover:border-white/10'
            : 'bg-[#1E3A2A]/50 border-white/[0.04]'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-cream/30 hover:text-cream/60 touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <IconComponent className={`w-4 h-4 ${section.enabled ? 'text-amber-400' : 'text-cream/20'}`} />
      </div>

      <span className={`flex-1 text-sm font-medium ${section.enabled ? 'text-cream' : 'text-cream/40 line-through'}`}>
        {label}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onToggle(section.id)}
          className="p-1.5 rounded hover:bg-white/5 transition-colors"
          title={section.enabled ? 'Hide section' : 'Show section'}
        >
          {section.enabled ? (
            <Eye className="w-4 h-4 text-cream/40 hover:text-cream/60" />
          ) : (
            <EyeOff className="w-4 h-4 text-cream/20 hover:text-cream/40" />
          )}
        </button>

        {def?.fields && def.fields.length > 0 && (
          <button
            onClick={() => onEdit(section.id)}
            className="p-1.5 rounded hover:bg-white/5 transition-colors"
            title="Edit properties"
          >
            <Settings className="w-4 h-4 text-cream/40 hover:text-cream/60" />
          </button>
        )}

        <button
          onClick={() => onDelete(section.id)}
          className="p-1.5 rounded hover:bg-red-500/10 transition-colors"
          title="Remove section"
        >
          <Trash2 className="w-4 h-4 text-cream/20 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
}
