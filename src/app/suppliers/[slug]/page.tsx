import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { getImageClasses } from '@/lib/utils';
import { slideshowImages } from '@/data/slideshow-images';
import suppliersData from '@/data/suppliers.json';
import type { Supplier } from '@/types';

const suppliers = suppliersData as Supplier[];

export function generateStaticParams() {
  return suppliers.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const supplier = suppliers.find((s) => s.slug === slug);
    return {
      title: supplier?.name || 'Supplier',
      description: supplier ? `${supplier.name} - Mass Timber Supplier in ${supplier.location}` : '',
    };
  });
}

export default async function SupplierDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supplier = suppliers.find((s) => s.slug === slug);

  if (!supplier) return notFound();

  return (
    <>
      <PageBanner
        title={supplier.name}
        subtitle={supplier.location}
        backgroundImage={supplier.image || '/images/connector-detail.png'}
        images={slideshowImages.default}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Suppliers', href: '/suppliers' },
          { label: supplier.name },
        ]}
      />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="amber" size="lg" speed="slow" className="-right-40 top-10 opacity-15" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden glass-light">
                {supplier.image ? (
                  <Image
                    src={supplier.image}
                    alt={supplier.name}
                    fill
                    className={`object-cover ${getImageClasses(supplier.image)}`}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-charcoal-900/5">
                    <svg className="w-20 h-20 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                )}
              </div>

              <GlassPanel>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">About {supplier.name}</h2>
                <p className="text-charcoal-950/70 leading-relaxed mb-4">
                  {supplier.name} is a leading supplier and manufacturer serving the mass timber construction industry from {supplier.location}. They provide high-quality engineered wood products and structural connection systems used in mass timber projects across North America.
                </p>
                <p className="text-charcoal-950/70 leading-relaxed">
                  Their product line supports the growing demand for sustainable, high-performance building materials that meet the rigorous structural requirements of modern mass timber construction. As a partner in the IW Mass Timber network, they work closely with Ironworker contractors to ensure seamless integration between material supply and field installation.
                </p>
              </GlassPanel>

              <GlassPanel>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-6">Products & Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Cross-Laminated Timber (CLT)', 'Glulam Beams & Columns', 'Laminated Veneer Lumber (LVL)', 'Mass Plywood Panels (MPP)', 'Steel Connectors & Hardware', 'Custom Fabrication Services'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-forest-500/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-forest-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-charcoal-950/70">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>

            <div className="space-y-6">
              <GlassCard padding="lg">
                <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Supplier Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-950">Location</p>
                    <p className="text-sm text-charcoal-950/60 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {supplier.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-950">Categories</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {supplier.categories.map((cat) => (
                        <Badge key={cat} variant="category">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              <Button variant="primary" size="lg" href="/contact" className="w-full">
                Request Product Info
              </Button>
              <Button variant="outline" size="md" href="/suppliers" className="w-full">
                Back to All Suppliers
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
