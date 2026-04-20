'use client';

import { useRef, useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import type { SectionConfig } from '@/types/page-builder';
import { blockDefinitions } from '@/lib/page-builder/registry';

interface PropertyEditorProps {
  section: SectionConfig;
  onUpdate: (id: string, props: Record<string, unknown>) => void;
  onClose: () => void;
}

export function PropertyEditor({ section, onUpdate, onClose }: PropertyEditorProps) {
  const def = blockDefinitions[section.type];

  if (!def) return null;

  const props = { ...def.defaultProps, ...(section.props || {}) };

  const handleChange = (key: string, value: unknown) => {
    onUpdate(section.id, { ...props, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-cream font-[family-name:var(--font-jakarta)]">
            {def.label}
          </h3>
          {def.description && (
            <p className="text-[11px] text-cream/40 mt-0.5">{def.description}</p>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/5 shrink-0">
          <X className="w-4 h-4 text-cream/40" />
        </button>
      </div>

      {def.fields.length === 0 ? (
        <div className="py-8 text-center text-xs text-cream/40 border border-dashed border-white/10 rounded-lg">
          This block uses site data and has no editable properties. Manage its content from the related admin section.
        </div>
      ) : (
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
                    rows={4}
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

            if (field.type === 'image') {
              return (
                <ImageField
                  key={field.key}
                  label={field.label}
                  required={field.required}
                  value={(value as string) || ''}
                  onChange={(v) => handleChange(field.key, v)}
                />
              );
            }

            // Heuristic: any text field whose key looks like an image path also gets upload
            const isImageKey = /(^|[A-Z])(image|src|photo|backgroundImage|imageSrc)/i.test(field.key) || /(image|photo|src)/i.test(field.key);

            if (isImageKey && field.type === 'text') {
              return (
                <ImageField
                  key={field.key}
                  label={field.label}
                  required={field.required}
                  value={(value as string) || ''}
                  onChange={(v) => handleChange(field.key, v)}
                  placeholder={field.placeholder}
                />
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
      )}
    </div>
  );
}

function ImageField({
  label, value, onChange, required, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const r = reader.result as string;
          resolve(r.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const imagePath = `images/uploads/${Date.now()}-${safeName}`;

      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upload-image',
          imagePath,
          imageData: base64,
          message: `Admin: Upload ${safeName}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.path);
    } catch (err) {
      setError(String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs text-cream/40 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {value && (
        <div className="relative mb-2 rounded-lg overflow-hidden border border-white/10 bg-charcoal-950/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-24 object-cover" />
        </div>
      )}
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '/images/filename.jpg'}
          className="flex-1 px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-xs font-mono focus:outline-none focus:border-amber-500"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 disabled:opacity-50 transition-colors flex items-center justify-center"
          title="Upload image"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
