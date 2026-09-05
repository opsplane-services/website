'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

/**
 * `/` has no content of its own. English is always the default — Hungarian is
 * reached by choosing it, never by browser language — so this just hops to the
 * default locale. Visitors without JavaScript get the links below.
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
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
