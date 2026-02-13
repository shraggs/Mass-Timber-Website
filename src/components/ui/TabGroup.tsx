'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  value: string;
  href: string;
  icon?: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  className?: string;
}

export function TabGroup({ tabs, activeTab, className }: TabGroupProps) {
  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={tab.href}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 min-h-[44px]',
            activeTab === tab.value
              ? 'bg-amber-500 text-white shadow-md'
              : 'glass-light text-charcoal-950/70 hover:text-charcoal-950 hover:bg-amber-500/10'
          )}
        >
          {tab.icon}
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
