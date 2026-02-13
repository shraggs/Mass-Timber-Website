'use client';

import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { TabGroup } from '@/components/ui/TabGroup';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { ContractorCard } from '@/components/cards/ContractorCard';
import { Button } from '@/components/ui/Button';
import { useSearch } from '@/hooks/useSearch';
import { slideshowImages } from '@/data/slideshow-images';
import contractorsData from '@/data/contractors.json';
import type { Contractor } from '@/types';

const tabs = [
  { label: 'Contractors', value: 'contractors', href: '/contractors' },
  { label: 'Projects', value: 'projects', href: '/projects' },
  { label: 'Suppliers and Manufacturers', value: 'suppliers', href: '/suppliers' },
];

const categories = ['Mass Timber'];
const locations = ['Burbank', 'California', 'Colorado', 'Las Vegas', 'Maryland', 'Michigan', 'New York', 'Seattle', 'Texas', 'Walnut', 'Washington'];

export default function ContractorsPage() {
  const contractors = contractorsData as Contractor[];
  const {
    filteredItems,
    query,
    setQuery,
    category,
    setCategory,
    location,
    setLocation,
    sortBy,
    setSortBy,
  } = useSearch({
    items: contractors,
    searchFields: ['name', 'description', 'address'],
    categoryField: 'categories',
    locationField: 'location',
  });

  return (
    <>
      <PageBanner
        title="Mass Timber Contractors"
        subtitle="The professionals who turn your sustainable vision into reality."
        backgroundImage="/images/workers-installing.png"
        images={slideshowImages.contractors}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contractors' }]}
      />

      <section className="py-12 md:py-16">
        <Container>
          <TabGroup tabs={tabs} activeTab="contractors" className="mb-8" />

          <SearchFilter
            query={query}
            onQueryChange={setQuery}
            categories={categories}
            category={category}
            onCategoryChange={setCategory}
            locations={locations}
            location={location}
            onLocationChange={setLocation}
            sortBy={sortBy}
            onSortChange={setSortBy}
            className="mb-8"
          />

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-charcoal-950/50">
              Showing {filteredItems.length} of {contractors.length} contractors
            </p>
            <Button variant="outline" size="sm" href="/contractors/map">
              <svg className="w-4 h-4 mr-1.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View Map
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((contractor) => (
              <ContractorCard key={contractor.id} contractor={contractor} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 glass-light rounded-xl">
              <svg className="w-12 h-12 text-charcoal-900/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <p className="text-charcoal-950/50">No contractors found matching your criteria.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
