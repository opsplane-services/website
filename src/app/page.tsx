'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { defaultLocale, isLocale } from '@/lib/i18n';

/**
 * `/` has no content of its own. Static export rules out a server redirect, so
 * this page picks a locale from the browser and hops there. Visitors without
 * JavaScript get the plain links below.
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const preferred = (navigator.language || '').slice(0, 2).toLowerCase();
    router.replace(`/${isLocale(preferred) ? preferred : defaultLocale}`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="border border-border bg-background px-6 py-5 text-center">
        <p className="text-sm text-foreground-secondary">OpsPlane Services</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Link
            href="/en"
            className="border border-accent bg-accent px-4 py-1.5 text-sm font-medium text-[var(--color-accent-foreground)]"
          >
            English
          </Link>
          <Link
            href="/hu"
            className="border border-accent bg-background px-4 py-1.5 text-sm font-medium text-foreground"
          >
            Magyar
          </Link>
        </div>
      </div>
    </main>
  );
}
