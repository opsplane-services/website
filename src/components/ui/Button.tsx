import { forwardRef, type ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

// Mirrored from platform/web/src/components/ui/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-[var(--color-accent-foreground)] hover:opacity-90 border border-accent',
  secondary:
    'bg-background text-foreground border border-accent hover:bg-background-hover',
  ghost:
    'bg-transparent text-foreground-secondary hover:bg-background-hover border border-transparent',
  danger:
    'bg-severity-critical text-white hover:bg-red-700 border border-severity-critical',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, disabled, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-medium transition-colors',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Same visual treatment as Button, for links. Internal hrefs go through
 * next/link so the basePath is applied; external ones stay plain anchors.
 */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 font-medium transition-colors',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // mailto:, tel: and off-site URLs must not be routed by next/link.
  const isExternal = external || /^[a-z][a-z0-9+.-]*:/i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={classes}
      >
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
