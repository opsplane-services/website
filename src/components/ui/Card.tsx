import type { ReactNode } from 'react';
import clsx from 'clsx';

// Mirrored from platform/web/src/components/ui/Card.tsx
interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={clsx('border border-border bg-background', className)}>
      {title && (
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
      )}
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}
