'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'city', label: 'City', type: 'text', required: true },
  { key: 'state', label: 'State/Province', type: 'text' },
  { key: 'region', label: 'Region', type: 'text' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'courses', label: 'Courses', type: 'array' },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Coming Soon'] },
];

export default function TrainingCentersEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Training Centers"
      dataFile="src/data/training-centers.json"
      fields={fields}
      basePath="/admin/training-centers"
      itemIndex={id}
    />
  );
}
