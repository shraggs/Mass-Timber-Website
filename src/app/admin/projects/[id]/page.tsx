'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Project Name', type: 'text', required: true },
  { key: 'slug', label: 'URL Slug', type: 'text', required: true },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'image', label: 'Image Path', type: 'text' },
  { key: 'featured', label: 'Featured', type: 'boolean' },
  { key: 'award', label: 'Award', type: 'select', options: ['', 'winner', 'submitted'] },
  { key: 'contractor', label: 'Contractor', type: 'text' },
  { key: 'ironworkerHours', label: 'Ironworker Hours', type: 'number' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'scope', label: 'Scope', type: 'textarea' },
];

export default function ProjectsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Projects"
      dataFile="src/data/projects.json"
      fields={fields}
      basePath="/admin/projects"
      itemIndex={id}
    />
  );
}
