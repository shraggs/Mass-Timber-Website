'use client';

import { useState, useMemo } from 'react';

interface UseSearchOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  categoryField?: keyof T;
  locationField?: keyof T;
}

export function useSearch<T>({ items, searchFields, categoryField, locationField }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('a-z');

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return typeof value === 'string' && value.toLowerCase().includes(lowerQuery);
        })
      );
    }

    if (category && categoryField) {
      result = result.filter(item => {
        const value = item[categoryField];
        if (Array.isArray(value)) {
          return value.some(v => v.toLowerCase() === category.toLowerCase());
        }
        return typeof value === 'string' && value.toLowerCase() === category.toLowerCase();
      });
    }

    if (location && locationField) {
      result = result.filter(item => {
        const value = item[locationField];
        return typeof value === 'string' && value.toLowerCase().includes(location.toLowerCase());
      });
    }

    const nameField = searchFields[0];
    switch (sortBy) {
      case 'a-z':
        result.sort((a, b) => String(a[nameField]).localeCompare(String(b[nameField])));
        break;
      case 'z-a':
        result.sort((a, b) => String(b[nameField]).localeCompare(String(a[nameField])));
        break;
      case 'latest':
        result.reverse();
        break;
    }

    return result;
  }, [items, query, category, location, sortBy, searchFields, categoryField, locationField]);

  return {
    filteredItems,
    query,
    setQuery,
    category,
    setCategory,
    location,
    setLocation,
    sortBy,
    setSortBy,
  };
}
