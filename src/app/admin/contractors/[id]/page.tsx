'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Company Name', type: 'text', required: true },
  { key: 'slug', label: 'URL Slug', type: 'text', required: true },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'rating', label: 'Rating', type: 'number' },
  { key: 'reviewCount', label: 'Review Count', type: 'number' },
  { key: 'image', label: 'Image Path', type: 'text' },
  { key: 'categories', label: 'Categories', type: 'array' },
  { key: 'badges', label: 'Badges', type: 'array' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function ContractorsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Contractors"
      dataFile="src/data/contractors.json"
      fields={fields}
      basePath="/admin/contractors"
      itemIndex={id}
    />
  );
}
