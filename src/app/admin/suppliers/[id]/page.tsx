'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Company Name', type: 'text', required: true },
  { key: 'slug', label: 'URL Slug', type: 'text', required: true },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'image', label: 'Image Path', type: 'text' },
  { key: 'categories', label: 'Categories', type: 'array' },
];

export default function SuppliersEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Suppliers"
      dataFile="src/data/suppliers.json"
      fields={fields}
      basePath="/admin/suppliers"
      itemIndex={id}
    />
  );
}
