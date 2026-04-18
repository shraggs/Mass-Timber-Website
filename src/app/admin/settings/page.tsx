'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface SiteSettings {
  SITE_NAME: string;
  SITE_TAGLINE: string;
  CONTACT_EMAIL: string;
  CONTACT_PHONE: string;
  CONTACT_PHONE_SECONDARY: string;
  BUSINESS_HOURS: string;
  ADDRESS: string;
  SOCIAL_FACEBOOK: string;
  SOCIAL_TWITTER: string;
  SOCIAL_LINKEDIN: string;
  SOCIAL_INSTAGRAM: string;
}

const defaultSettings: SiteSettings = {
  SITE_NAME: 'IW Mass Timber',
  SITE_TAGLINE: 'Expert Fabrication for Mass Timber Construction. Built on Ironworker Precision.',
  CONTACT_EMAIL: 'info@iwmasstimber.com',
  CONTACT_PHONE: '(202) 383-4800',
  CONTACT_PHONE_SECONDARY: '(800) 555-1212',
  BUSINESS_HOURS: 'Monday - Friday: 7 AM – 6 PM',
  ADDRESS: 'Washington D.C., United States',
  SOCIAL_FACEBOOK: '#',
  SOCIAL_TWITTER: '#',
  SOCIAL_LINKEDIN: '#',
  SOCIAL_INSTAGRAM: '#',
};

const fieldLabels: Record<keyof SiteSettings, string> = {
  SITE_NAME: 'Site Name',
  SITE_TAGLINE: 'Tagline',
  CONTACT_EMAIL: 'Contact Email',
  CONTACT_PHONE: 'Phone (Primary)',
  CONTACT_PHONE_SECONDARY: 'Phone (Secondary)',
  BUSINESS_HOURS: 'Business Hours',
  ADDRESS: 'Address',
  SOCIAL_FACEBOOK: 'Facebook URL',
  SOCIAL_TWITTER: 'Twitter/X URL',
  SOCIAL_LINKEDIN: 'LinkedIn URL',
  SOCIAL_INSTAGRAM: 'Instagram URL',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Try loading settings from a JSON file, fall back to defaults
    fetch('/api/admin/data?file=src/data/settings.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.content) {
          try {
            setSettings(JSON.parse(data.content));
          } catch {
            // Use defaults
          }
        }
      })
      .catch(() => {
        // Use defaults
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: 'src/data/settings.json',
          content: JSON.stringify(settings, null, 2) + '\n',
          message: 'Admin: Update site settings',
        }),
      });

      if (!res.ok) throw new Error('Save failed');
      setSuccess('Settings saved! Note: Some settings like contact info require updating src/lib/constants.ts to take effect. Changes will deploy in ~2-3 minutes.');
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">Site Settings</h1>
        <p className="text-cream/50 text-sm mt-1">Manage global site configuration, contact info, and social links.</p>
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
        <h2 className="text-sm font-bold text-cream/60 uppercase tracking-wider">General</h2>
        {(['SITE_NAME', 'SITE_TAGLINE', 'ADDRESS', 'BUSINESS_HOURS'] as (keyof SiteSettings)[]).map(key => (
          <div key={key}>
            <label className="block text-sm font-semibold text-cream/80 mb-2">{fieldLabels[key]}</label>
            <input
              type="text"
              value={settings[key]}
              onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
              className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        ))}

        <div className="pt-4 border-t border-white/[0.06]">
          <h2 className="text-sm font-bold text-cream/60 uppercase tracking-wider mb-4">Contact Info</h2>
          {(['CONTACT_EMAIL', 'CONTACT_PHONE', 'CONTACT_PHONE_SECONDARY'] as (keyof SiteSettings)[]).map(key => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-semibold text-cream/80 mb-2">{fieldLabels[key]}</label>
              <input
                type="text"
                value={settings[key]}
                onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/[0.06]">
          <h2 className="text-sm font-bold text-cream/60 uppercase tracking-wider mb-4">Social Media Links</h2>
          {(['SOCIAL_FACEBOOK', 'SOCIAL_TWITTER', 'SOCIAL_LINKEDIN', 'SOCIAL_INSTAGRAM'] as (keyof SiteSettings)[]).map(key => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-semibold text-cream/80 mb-2">{fieldLabels[key]}</label>
              <input
                type="text"
                value={settings[key]}
                onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-charcoal-950 text-sm font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
