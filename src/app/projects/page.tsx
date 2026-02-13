'use client';

import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { TabGroup } from '@/components/ui/TabGroup';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { useSearch } from '@/hooks/useSearch';
import { slideshowImages } from '@/data/slideshow-images';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const tabs = [
  { label: 'Contractors', value: 'contractors', href: '/contractors' },
  { label: 'Projects', value: 'projects', href: '/projects' },
  { label: 'Suppliers and Manufacturers', value: 'suppliers', href: '/suppliers' },
];

const categories = ['Civic Recreational', 'Commercial', 'Education', 'Industrial', 'Low Rise', 'Mass Timber'];
const locations = ['Anaheim', 'Boston', 'California', 'Iowa', 'Las Vegas', 'Los Angeles', 'Milpitas', 'New York', 'Renton', 'Tacoma'];

export default function ProjectsPage() {
  const projects = projectsData as Project[];
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
    items: projects,
    searchFields: ['name', 'location'],
    categoryField: 'category',
    locationField: 'location',
  });

  return (
    <>
      <PageBanner
        title="Our Projects"
        subtitle="Your vision, transformed into timeless timber structures."
        backgroundImage="/images/rotated-projects.jpeg"
        images={slideshowImages.projects}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      <section className="py-12 md:py-16">
        <Container>
          <TabGroup tabs={tabs} activeTab="projects" className="mb-8" />

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

          <p className="text-sm text-charcoal-950/50 mb-6">
            Showing {filteredItems.length} of {projects.length} projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 glass-light rounded-xl">
              <svg className="w-12 h-12 text-charcoal-900/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <p className="text-charcoal-950/50">No projects found matching your criteria.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
