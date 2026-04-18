'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'city', label: 'City', type: 'text', required: true },
  { key: 'state', label: 'State', type: 'text' },
  { key: 'country', label: 'Country', type: 'text' },
  { key: 'postCode', label: 'Post Code', type: 'text' },
  { key: 'image', label: 'Image Path', type: 'text' },
];

export default function LocationsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Locations"
      dataFile="src/data/locations.json"
      fields={fields}
      basePath="/admin/locations"
      itemIndex={id}
    />
  );
}
