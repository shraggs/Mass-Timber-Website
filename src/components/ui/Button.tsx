import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg hover:-translate-y-0.5',
  secondary: 'bg-forest-500 text-white hover:bg-forest-600 shadow-md hover:shadow-lg hover:-translate-y-0.5',
  outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white',
  ghost: 'text-amber-500 hover:bg-amber-500/10',
};

const sizeStyles = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

export function Button({ variant = 'primary', size = 'md', href, external, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center min-h-[44px] font-[family-name:var(--font-jakarta)]',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
