'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  LayoutGrid, Home, Info, Phone, Briefcase, Building2,
  Package, HelpCircle, Shield, GraduationCap, Loader2
} from 'lucide-react';
import type { PageConfig } from '@/types/page-builder';

const pages = [
  { slug: 'home', label: 'Home', icon: Home, description: 'Main landing page with hero, stats, and featured projects' },
  { slug: 'about', label: 'About Us', icon: Info, description: 'About the union, team, partners, testimonials' },
  { slug: 'contact', label: 'Contact', icon: Phone, description: 'Contact form, location cards, business info' },
  { slug: 'projects', label: 'Projects', icon: Briefcase, description: 'Project directory with search and filters' },
  { slug: 'contractors', label: 'Contractors', icon: Building2, description: 'Contractor directory with search and filters' },
  { slug: 'suppliers', label: 'Suppliers', icon: Package, description: 'Supplier directory with search and filters' },
  { slug: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions with AI chat' },
  { slug: 'safety', label: 'Safety', icon: Shield, description: 'Safety pillars and CTA section' },
  { slug: 'training', label: 'Training', icon: GraduationCap, description: 'Training program overview and links' },
];

export default function PageBuilderList() {
  const [configs, setConfigs] = useState<Record<string, PageConfig>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfigs() {
      const loaded: Record<string, PageConfig> = {};
      for (const page of pages) {
        try {
          const res = await fetch(`/api/admin/data?file=src/data/pages/${page.slug}.json`);
          if (res.ok) {
            const data = await res.json();
            loaded[page.slug] = JSON.parse(data.content);
          }
        } catch { /* config doesn't exist yet */ }
      }
      setConfigs(loaded);
      setLoading(false);
    }
    loadConfigs();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <LayoutGrid className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">Page Builder</h1>
          <p className="text-sm text-cream/40">Drag and drop sections to customize page layouts</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => {
            const Icon = page.icon;
            const config = configs[page.slug];
            const sectionCount = config?.sections?.length || 0;

            return (
              <Link
                key={page.slug}
                href={`/admin/pages/${page.slug}`}
                className="bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-5 hover:border-amber-500/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-cream font-[family-name:var(--font-jakarta)] group-hover:text-amber-400 transition-colors">{page.label}</h3>
                    <p className="text-xs text-cream/40 mt-1">{page.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-amber-400/70 px-2 py-1 rounded bg-amber-500/10">
                        {sectionCount} sections
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
