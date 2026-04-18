'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Pencil, Trash2, Save, ArrowLeft, Loader2 } from 'lucide-react';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'array' | 'boolean';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  columns?: string[];  // For array-of-strings fields, column label if needed
}

interface ContentEditorListProps {
  title: string;
  dataFile: string;
  fields: FieldConfig[];
  nameField: string;
  editBasePath: string;
}

// Helper to fetch data from the admin API
async function fetchData(file: string) {
  const res = await fetch(`/api/admin/data?file=${encodeURIComponent(file)}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  const { content } = await res.json();
  return JSON.parse(content);
}

async function saveData(file: string, data: unknown, message: string) {
  const res = await fetch('/api/admin/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, content: JSON.stringify(data, null, 2) + '\n', message }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Save failed');
  }
}

// ============================================
// LIST VIEW - shows all entries with search
// ============================================
export function ContentList({ title, dataFile, fields, nameField, editBasePath }: ContentEditorListProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData(dataFile)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [dataFile]);

  const filtered = data.filter((item) => {
    const name = String(item[nameField] || '').toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const handleDelete = useCallback(async (index: number) => {
    const item = data[index];
    const name = String(item[nameField] || `Item ${index}`);
    if (!confirm(`Delete "${name}"? This action creates a commit to the repo.`)) return;

    setDeleting(String(index));
    try {
      const updated = data.filter((_, i) => i !== index);
      await saveData(dataFile, updated, `Admin: Delete ${name} from ${title}`);
      setData(updated);
    } catch (e) {
      alert(`Delete failed: ${e}`);
    } finally {
      setDeleting(null);
    }
  }, [data, dataFile, nameField, title]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
        {error}
      </div>
    );
  }

  // Determine which fields to show as columns (first 3 short fields)
  const displayFields = fields.filter(f => f.type !== 'textarea' && f.type !== 'array').slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">{title}</h1>
        <button
          onClick={() => router.push(`${editBasePath}/new`)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-charcoal-950 text-sm font-bold rounded-lg hover:bg-amber-400 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#1E3A2A] border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="bg-[#1E3A2A] border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {displayFields.map((f) => (
                <th key={f.key} className="px-4 py-3 text-left text-xs font-semibold text-cream/50 uppercase tracking-wider">
                  {f.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold text-cream/50 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const originalIndex = data.indexOf(item);
              return (
                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  {displayFields.map((f) => (
                    <td key={f.key} className="px-4 py-3 text-sm text-cream/80 max-w-[200px] truncate">
                      {f.type === 'image' && item[f.key] ? (
                        <img src={String(item[f.key])} alt="" className="w-8 h-8 rounded-full object-cover" />
                      ) : f.type === 'boolean' ? (
                        item[f.key] ? '✓' : '—'
                      ) : (
                        String(item[f.key] ?? '—')
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`${editBasePath}/${originalIndex}`)}
                        className="p-1.5 rounded-lg hover:bg-amber-500/10 text-cream/50 hover:text-amber-400 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(originalIndex)}
                        disabled={deleting === String(originalIndex)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-cream/50 hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === String(originalIndex) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={displayFields.length + 1} className="px-4 py-8 text-center text-cream/40 text-sm">
                  {search ? 'No results found' : 'No entries yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-cream/30">{data.length} total entries</p>
    </div>
  );
}

// ============================================
// EDIT VIEW - form for a single entry
// ============================================
interface ContentEditProps {
  title: string;
  dataFile: string;
  fields: FieldConfig[];
  basePath: string;
  itemIndex: string; // "new" or numeric index
}

export function ContentEdit({ title, dataFile, fields, basePath, itemIndex }: ContentEditProps) {
  const [allData, setAllData] = useState<Record<string, unknown>[]>([]);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const isNew = itemIndex === 'new';

  useEffect(() => {
    fetchData(dataFile)
      .then((data) => {
        setAllData(data);
        if (!isNew) {
          const idx = parseInt(itemIndex, 10);
          if (data[idx]) {
            setFormData(data[idx]);
          } else {
            setError('Item not found');
          }
        } else {
          // Initialize with empty values
          const empty: Record<string, unknown> = {};
          fields.forEach((f) => {
            if (f.type === 'array') empty[f.key] = [];
            else if (f.type === 'boolean') empty[f.key] = false;
            else if (f.type === 'number') empty[f.key] = 0;
            else empty[f.key] = '';
          });
          // Generate new ID
          const maxId = data.reduce((max: number, item: Record<string, unknown>) => {
            const id = parseInt(String(item.id || '0'), 10);
            return id > max ? id : max;
          }, 0);
          empty.id = String(maxId + 1);
          setFormData(empty);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [dataFile, itemIndex, isNew, fields]);

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayAdd = (key: string) => {
    const arr = (formData[key] as string[]) || [];
    handleChange(key, [...arr, '']);
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    const arr = [...((formData[key] as string[]) || [])];
    arr[index] = value;
    handleChange(key, arr);
  };

  const handleArrayRemove = (key: string, index: number) => {
    const arr = ((formData[key] as string[]) || []).filter((_, i) => i !== index);
    handleChange(key, arr);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      let updated: Record<string, unknown>[];
      const name = String(formData.name || formData.question || formData.city || `Item`);

      if (isNew) {
        updated = [...allData, formData];
      } else {
        const idx = parseInt(itemIndex, 10);
        updated = [...allData];
        updated[idx] = formData;
      }

      const action = isNew ? 'Add' : 'Update';
      await saveData(dataFile, updated, `Admin: ${action} ${name} in ${title}`);
      setSuccess(`${action}d successfully! Changes will go live in ~2-3 minutes.`);
      setAllData(updated);

      if (isNew) {
        setTimeout(() => router.push(basePath), 1500);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push(basePath)}
          className="p-2 rounded-lg hover:bg-white/5 text-cream/50 hover:text-cream transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">
          {isNew ? `New ${title.replace(/s$/, '')}` : `Edit ${title.replace(/s$/, '')}`}
        </h1>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
          {success}
        </div>
      )}

      <div className="bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-6 space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-cream/80 mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                value={String(formData[field.key] ?? '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={5}
                className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors resize-y"
              />
            ) : field.type === 'select' ? (
              <select
                value={String(formData[field.key] ?? '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'boolean' ? (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500/30"
                />
                <span className="text-sm text-cream/60">Enabled</span>
              </label>
            ) : field.type === 'number' ? (
              <input
                type="number"
                value={Number(formData[field.key] ?? 0)}
                onChange={(e) => handleChange(field.key, parseFloat(e.target.value) || 0)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
              />
            ) : field.type === 'array' ? (
              <div className="space-y-2">
                {((formData[field.key] as string[]) || []).map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleArrayChange(field.key, i, e.target.value)}
                      className="flex-1 px-3 py-2 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      onClick={() => handleArrayRemove(field.key, i)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-cream/50 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleArrayAdd(field.key)}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add item
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={String(formData[field.key] ?? '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-charcoal-950 text-sm font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={() => router.push(basePath)}
            className="px-6 py-2.5 text-cream/60 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
