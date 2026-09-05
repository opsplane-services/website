'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { locales, type Locale } from '@/lib/i18n';

/**
 * Swaps the first path segment for the other locale, so /hu/blog/foo maps to
 * /en/blog/foo. usePathname() already has the basePath stripped off.
 */
export function LocaleSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || '/';

  const pathFor = (target: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    segments[0] = target;
    return `/${segments.join('/')}`;
  };

  return (
    <div className={clsx('flex border border-border', className)}>
      {locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l)}
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          className={clsx(
            'px-2 py-1 text-xs font-medium uppercase tracking-wide transition-colors',
            l === locale
              ? 'bg-accent text-[var(--color-accent-foreground)]'
              : 'text-foreground-tertiary hover:text-foreground-secondary'
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
