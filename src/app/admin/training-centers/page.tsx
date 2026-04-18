'use client';

import { ContentList, type FieldConfig } from '@/components/admin/ContentEditor';

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

export default function TrainingCentersListPage() {
  return (
    <ContentList
      title="Training Centers"
      dataFile="src/data/training-centers.json"
      fields={fields}
      nameField="name"
      editBasePath="/admin/training-centers"
    />
  );
}
