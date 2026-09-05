'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';

/**
 * Only the root layout renders <html>, so the lang attribute is set here once
 * the active locale is known — screen readers and translation tools need it.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
