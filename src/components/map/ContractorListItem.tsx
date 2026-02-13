import type { Contractor } from '@/types';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';

interface ContractorListItemProps {
  contractor: Contractor;
  distance?: number | null;
  isActive: boolean;
  onClick: () => void;
}

export function ContractorListItem({ contractor, distance, isActive, onClick }: ContractorListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-charcoal-900/10 transition-all hover:bg-amber-500/5 ${
        isActive ? 'bg-amber-500/10 border-l-4 border-l-amber-500' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)] text-sm truncate">
            {contractor.name}
          </h3>
          {contractor.address && (
            <p className="text-xs text-charcoal-950/60 mt-1 flex items-start gap-1">
              <svg className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-2">{contractor.address}</span>
            </p>
          )}
          {contractor.rating > 0 && (
            <div className="mt-1">
              <StarRating rating={contractor.rating} reviewCount={contractor.reviewCount} />
            </div>
          )}
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          {contractor.badges.map((badge) => (
            <Badge key={badge} variant={badge}>{badge}</Badge>
          ))}
          {distance != null && (
            <span className="text-xs text-forest-500 font-semibold mt-1">
              {distance < 1 ? '<1' : Math.round(distance)} mi
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
