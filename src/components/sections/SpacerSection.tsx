'use client';

interface SpacerSectionProps {
  height?: string;
  showDivider?: boolean;
  darkBackground?: boolean;
}

export function SpacerSection({
  height = '64',
  showDivider = false,
  darkBackground = false,
}: SpacerSectionProps) {
  const h = parseInt(height) || 64;
  return (
    <div
      className={`${darkBackground ? 'bg-charcoal-950' : ''} flex items-center justify-center`}
      style={{ height: h }}
    >
      {showDivider && (
        <div className={`w-full max-w-xs h-px ${darkBackground ? 'bg-white/10' : 'bg-charcoal-950/10'}`} />
      )}
    </div>
  );
}
