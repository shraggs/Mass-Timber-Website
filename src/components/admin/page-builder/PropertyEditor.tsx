'use client';

import { X } from 'lucide-react';
import type { SectionConfig } from '@/types/page-builder';
import { blockDefinitions } from '@/lib/page-builder/registry';

interface PropertyEditorProps {
  section: SectionConfig;
  onUpdate: (id: string, props: Record<string, unknown>) => void;
  onClose: () => void;
}

export function PropertyEditor({ section, onUpdate, onClose }: PropertyEditorProps) {
  const def = blockDefinitions[section.type];
  if (!def || def.fields.length === 0) return null;

  const props = { ...def.defaultProps, ...(section.props || {}) };

  const handleChange = (key: string, value: unknown) => {
    onUpdate(section.id, { ...props, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-cream font-[family-name:var(--font-jakarta)]">
          {def.label} Properties
        </h3>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/5">
          <X className="w-4 h-4 text-cream/40" />
        </button>
      </div>

      <div className="space-y-3">
        {def.fields.map((field) => {
          const value = props[field.key];

          if (field.type === 'boolean') {
            return (
              <label key={field.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!value}
                  onChange={(e) => handleChange(field.key, e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-cream/70">{field.label}</span>
              </label>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.key}>
                <label className="block text-xs text-cream/40 mb-1.5">
                  {field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}
                </label>
                <textarea
                  value={(value as string) || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500 resize-y"
                />
              </div>
            );
          }

          if (field.type === 'select' && field.options) {
            return (
              <div key={field.key}>
                <label className="block text-xs text-cream/40 mb-1.5">{field.label}</label>
                <select
                  value={(value as string) || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select...</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={field.key}>
              <label className="block text-xs text-cream/40 mb-1.5">
                {field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                type={field.type === 'number' ? 'number' : 'text'}
                value={(value as string) || ''}
                onChange={(e) => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
