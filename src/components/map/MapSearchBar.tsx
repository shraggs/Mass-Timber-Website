'use client';

import { useState } from 'react';

interface MapSearchBarProps {
  onSearch: (lat: number, lng: number, displayName: string) => void;
  onUseMyLocation: () => void;
  isLoading: boolean;
}

export function MapSearchBar({ onSearch, onUseMyLocation, isLoading }: MapSearchBarProps) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setError('');

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) {
        setError('Location not found. Try a city name or zip code.');
        return;
      }
      const data = await res.json();
      onSearch(data.lat, data.lng, data.displayName);
    } catch {
      setError('Search failed. Please try again.');
    }
  };

  return (
    <div className="p-4 border-b border-charcoal-900/10">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-950/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City, state, or zip..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-charcoal-900/15 text-sm text-charcoal-950 placeholder-charcoal-950/40 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
        >
          Search
        </button>
      </form>
      <button
        type="button"
        onClick={onUseMyLocation}
        className="mt-2 text-xs text-forest-500 hover:text-forest-600 font-semibold flex items-center gap-1 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Use my current location
      </button>
      {error && (
        <p className="text-xs text-error mt-2">{error}</p>
      )}
    </div>
  );
}
