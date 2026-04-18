'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'image', label: 'Image Path', type: 'text', placeholder: '/images/leadership/name.jpg' },
  { key: 'bio', label: 'Biography', type: 'textarea' },
];

export default function LeadershipEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="Leadership"
      dataFile="src/data/leadership.json"
      fields={fields}
      basePath="/admin/leadership"
      itemIndex={id}
    />
  );
}
