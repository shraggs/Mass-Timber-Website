'use client';

import { ContentList, type FieldConfig } from '@/components/admin/ContentEditor';

const fields: FieldConfig[] = [
  { key: 'question', label: 'Question', type: 'text', required: true },
  { key: 'answer', label: 'Answer', type: 'textarea', required: true },
];

export default function FAQListPage() {
  return (
    <ContentList
      title="FAQ"
      dataFile="src/data/faq.json"
      fields={fields}
      nameField="question"
      editBasePath="/admin/faq"
    />
  );
}
