import type { ReactNode } from 'react';
import clsx from 'clsx';

// Mirrored from platform/web/src/components/ui/Badge.tsx
type BadgeVariant = 'default' | 'active' | 'success' | 'warning' | 'error';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'border border-border bg-background text-foreground-secondary',
  active: 'bg-accent text-[var(--color-accent-foreground)] border border-accent',
  success: 'border border-green-300 bg-green-50 text-green-800',
  warning: 'border border-yellow-300 bg-yellow-50 text-yellow-800',
  error: 'border border-red-300 bg-red-50 text-red-800',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
