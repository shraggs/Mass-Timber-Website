import { PageRenderer } from '@/components/page-builder/PageRenderer';
import homeConfig from '@/data/pages/home.json';
import type { PageConfig } from '@/types/page-builder';

export default function Home() {
  return <PageRenderer config={homeConfig as PageConfig} />;
}
