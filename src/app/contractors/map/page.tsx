'use client';

import dynamic from 'next/dynamic';

const ContractorMap = dynamic(
  () => import('@/components/map/ContractorMap').then((mod) => mod.ContractorMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal-950/50 text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function ContractorMapPage() {
  return <ContractorMap />;
}
