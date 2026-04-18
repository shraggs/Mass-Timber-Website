export interface PageConfig {
  slug: string;
  title: string;
  metadata?: {
    title?: string;
    description?: string;
  };
  sections: SectionConfig[];
}

export interface SectionConfig {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  enabled: boolean;
}

export interface BlockFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'array' | 'boolean';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface BlockDefinition {
  label: string;
  icon: string;
  category: 'hero' | 'content' | 'data' | 'cta' | 'social-proof';
  fields: BlockFieldConfig[];
  defaultProps: Record<string, unknown>;
}
