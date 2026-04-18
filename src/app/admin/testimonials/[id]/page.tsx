'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'quote', label: 'Quote', type: 'textarea', required: true },
];

export default function TestimonialsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Testimonials"
      dataFile="src/data/testimonials.json"
      fields={fields}
      basePath="/admin/testimonials"
      itemIndex={id}
    />
  );
}
