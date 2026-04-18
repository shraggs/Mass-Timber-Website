'use client';

import { ContentList, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'quote', label: 'Quote', type: 'textarea', required: true },
];

export default function TestimonialsListPage() {
  return (
    <ContentList
      title="Testimonials"
      dataFile="src/data/testimonials.json"
      fields={fields}
      nameField="name"
      editBasePath="/admin/testimonials"
    />
  );
}
