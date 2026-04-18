'use client';

import type { PageConfig, SectionConfig } from '@/types/page-builder';
import { blockComponents } from '@/lib/page-builder/registry';
import { slideshowImages } from '@/data/slideshow-images';

interface PageRendererProps {
  config: PageConfig;
}

function resolveProps(section: SectionConfig): Record<string, unknown> {
  const props = { ...(section.props || {}) };

  // Resolve slideshowKey to actual images array for PageBanner
  if (section.type === 'PageBanner' && typeof props.slideshowKey === 'string') {
    props.images = slideshowImages[props.slideshowKey] || [];
    delete props.slideshowKey;
  }

  return props;
}

export function PageRenderer({ config }: PageRendererProps) {
  return (
    <>
      {config.sections
        .filter((section) => section.enabled)
        .map((section) => {
          const Component = blockComponents[section.type];
          if (!Component) {
            if (process.env.NODE_ENV === 'development') {
              return (
                <div key={section.id} className="p-4 bg-red-100 text-red-700 text-center">
                  Unknown block type: {section.type}
                </div>
              );
            }
            return null;
          }
          return <Component key={section.id} {...resolveProps(section)} />;
        })}
    </>
  );
}
