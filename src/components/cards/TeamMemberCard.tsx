import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

interface TeamMemberCardProps {
  name: string;
  image?: string | null;
}

export function TeamMemberCard({ name, image }: TeamMemberCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <GlassCard hover padding="md" className="text-center">
      {image ? (
        <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden relative">
          <Image src={image} alt={name} fill className="object-cover" sizes="80px" />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-forest-500 mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold font-[family-name:var(--font-jakarta)]">
          {initials}
        </div>
      )}
      <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">{name}</h3>
    </GlassCard>
  );
}
