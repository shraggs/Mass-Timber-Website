import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { isRotatedImage, getImageRotation, cn } from '@/lib/utils';
import type { LocationCardType } from '@/types';

interface LocationCardProps {
  location: LocationCardType;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <GlassCard hover padding="none">
      <div className="relative h-40 overflow-hidden">
        {location.image ? (
          <div className={cn('absolute', isRotatedImage(location.image) ? 'inset-[-50%] w-[200%] h-[200%]' : 'inset-0')}>
            <Image
              src={location.image}
              alt={location.city}
              fill
              className={cn('object-cover', getImageRotation(location.image))}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-forest-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">{location.city}, {location.state}</h3>
        <p className="text-sm text-charcoal-950/50">{location.country} &middot; {location.postCode}</p>
      </div>
    </GlassCard>
  );
}
