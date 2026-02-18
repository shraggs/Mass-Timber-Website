'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Leader } from '@/types';

interface FeaturedLeaderCardProps {
  leader: Leader;
}

export function FeaturedLeaderCard({ leader }: FeaturedLeaderCardProps) {
  const [imageError, setImageError] = useState(false);
  const initials = leader.name.split(' ').map(n => n[0]).join('');
  const showImage = leader.image && !imageError;

  return (
    <GlassCard padding="lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-6">
        <div className="w-40 h-52 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
          {showImage ? (
            <Image
              src={leader.image!}
              alt={leader.name}
              width={160}
              height={208}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-white text-4xl font-bold font-[family-name:var(--font-jakarta)]">
              {initials}
            </span>
          )}
        </div>
        <div className="text-center sm:text-left pt-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">Featured Leader</p>
          <h3 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950">
            {leader.name}
          </h3>
          <p className="text-amber-500 font-semibold mt-1">{leader.title}</p>
        </div>
      </div>
      <p className="text-sm text-charcoal-950/70 leading-relaxed border-t border-charcoal-900/10 pt-5">
        {leader.bio}
      </p>
    </GlassCard>
  );
}
