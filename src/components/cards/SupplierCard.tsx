import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getImageClasses } from '@/lib/utils';
import type { Supplier } from '@/types';

interface SupplierCardProps {
  supplier: Supplier;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <GlassCard hover padding="none">
      <div className="relative h-48 overflow-hidden">
        {supplier.image ? (
          <Image
            src={supplier.image}
            alt={supplier.name}
            fill
            className={`object-cover ${getImageClasses(supplier.image)}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-charcoal-900/5">
            <svg className="w-12 h-12 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-2">
          {supplier.name}
        </h3>
        <p className="flex items-center gap-2 text-sm text-charcoal-950/60 mb-3">
          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {supplier.location}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {supplier.categories.map((cat) => (
            <Badge key={cat} variant="category">{cat}</Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" href={`/suppliers/${supplier.slug}`} className="w-full">
          Details
        </Button>
      </div>
    </GlassCard>
  );
}
