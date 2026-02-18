interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'diagonal-reverse';
  fillColor?: string;
  className?: string;
}

export function SectionDivider({
  variant = 'wave',
  fillColor = '#FDFCF8',
  className = '',
}: SectionDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] -mt-1 ${className}`}>
      {variant === 'wave' && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[80px] lg:h-[100px]"
        >
          <path
            d="M0,40 C360,120 720,0 1080,60 C1260,90 1380,40 1440,40 L1440,120 L0,120 Z"
            fill={fillColor}
          />
        </svg>
      )}
      {variant === 'diagonal' && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[80px]"
        >
          <polygon points="0,120 1440,0 1440,120" fill={fillColor} />
        </svg>
      )}
      {variant === 'diagonal-reverse' && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[80px]"
        >
          <polygon points="0,0 1440,120 0,120" fill={fillColor} />
        </svg>
      )}
    </div>
  );
}
