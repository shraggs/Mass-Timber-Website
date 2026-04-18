'use client';

import { use } from 'react';
import { ContentEdit, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'question', label: 'Question', type: 'text', required: true },
  { key: 'answer', label: 'Answer', type: 'textarea', required: true },
];

export default function FAQEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ContentEdit
      title="FAQ"
      dataFile="src/data/faq.json"
      fields={fields}
      basePath="/admin/faq"
      itemIndex={id}
    />
  );
}
