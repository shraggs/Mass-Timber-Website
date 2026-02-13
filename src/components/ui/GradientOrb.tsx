import { cn } from '@/lib/utils';

interface GradientOrbProps {
  color: 'amber' | 'forest';
  size?: 'sm' | 'md' | 'lg';
  speed?: 'normal' | 'slow';
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: 'w-[200px] h-[200px]',
  md: 'w-[400px] h-[400px]',
  lg: 'w-[600px] h-[600px]',
};

export function GradientOrb({ color, size = 'md', speed = 'normal', className, style }: GradientOrbProps) {
  return (
    <div
      className={cn(
        'absolute rounded-full pointer-events-none blur-3xl',
        sizeMap[size],
        color === 'amber' ? 'gradient-orb-amber' : 'gradient-orb-forest',
        speed === 'normal' ? 'animate-float' : 'animate-float-slow',
        'animate-pulse-glow',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
