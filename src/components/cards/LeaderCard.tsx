'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Leader } from '@/types';

interface LeaderCardProps {
  leader: Leader;
}

export function LeaderCard({ leader }: LeaderCardProps) {
  const [imageError, setImageError] = useState(false);
  const initials = leader.name.split(' ').map(n => n[0]).join('');
  const showImage = leader.image && !imageError;

  return (
    <GlassCard padding="lg">
      <div className="flex items-start gap-5 mb-5">
        <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          {showImage ? (
            <Image
              src={leader.image!}
              alt={leader.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-white text-2xl font-bold font-[family-name:var(--font-jakarta)]">
              {initials}
            </span>
          )}
        </div>
        <div className="pt-2">
          <h3 className="text-xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950">
            {leader.name}
          </h3>
          <p className="text-amber-500 text-sm font-semibold mt-1">{leader.title}</p>
        </div>
      </div>
      <p className="text-sm text-charcoal-950/70 leading-relaxed border-t border-charcoal-900/10 pt-4">
        {leader.bio}
      </p>
    </GlassCard>
  );
}
