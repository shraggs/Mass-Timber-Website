'use client';

import { ContentList, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'image', label: 'Image Path', type: 'text', placeholder: '/images/leadership/name.jpg' },
  { key: 'bio', label: 'Biography', type: 'textarea' },
];

export default function LeadershipListPage() {
  return (
    <ContentList
      title="Leadership"
      dataFile="src/data/leadership.json"
      fields={fields}
      nameField="name"
      editBasePath="/admin/leadership"
    />
  );
}
