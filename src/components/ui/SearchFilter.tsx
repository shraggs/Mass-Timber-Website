'use client';

import { cn } from '@/lib/utils';

interface SearchFilterProps {
  query: string;
  onQueryChange: (query: string) => void;
  categories?: string[];
  category?: string;
  onCategoryChange?: (category: string) => void;
  locations?: string[];
  location?: string;
  onLocationChange?: (location: string) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  className?: string;
}

export function SearchFilter({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  locations,
  location,
  onLocationChange,
  sortBy,
  onSortChange,
  className,
}: SearchFilterProps) {
  return (
    <div className={cn('glass-light rounded-xl p-4 md:p-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-950/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by keyword..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border border-charcoal-900/10 text-charcoal-950 placeholder:text-charcoal-950/40 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] outline-none"
          />
        </div>

        {categories && onCategoryChange && (
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-3 px-4 rounded-lg bg-white/50 border border-charcoal-900/10 text-charcoal-950 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] outline-none appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}

        {locations && onLocationChange && (
          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full py-3 px-4 rounded-lg bg-white/50 border border-charcoal-900/10 text-charcoal-950 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] outline-none appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        )}

        {onSortChange && (
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-3 px-4 rounded-lg bg-white/50 border border-charcoal-900/10 text-charcoal-950 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] outline-none appearance-none cursor-pointer"
          >
            <option value="a-z">Sort: A-Z</option>
            <option value="z-a">Sort: Z-A</option>
            <option value="latest">Sort: Latest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
        )}
      </div>
    </div>
  );
}
