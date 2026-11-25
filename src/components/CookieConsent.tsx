'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { content } from '@/lib/content';
import {
  OPEN_CONSENT_EVENT,
  analyticsEnabled,
  loadAnalytics,
  readConsent,
  saveConsent,
  type Consent,
} from '@/lib/consent';

/**
 * Cookie banner. Only rendered when analytics is configured (NEXT_PUBLIC_GA_ID);
 * without it the site sets no cookies, so there is nothing to ask about.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const saved = readConsent();
    if (saved === 'granted') loadAnalytics();
    if (!saved) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: Consent) => {
    saveConsent(c);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={content.cookies.title}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background-secondary"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-foreground">{content.cookies.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
            {content.cookies.body}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {/* Equal weight for both choices, as EU regulators expect. */}
          <Button variant="secondary" size="md" onClick={() => choose('denied')}>
            {content.cookies.reject}
          </Button>
          <Button variant="primary" size="md" onClick={() => choose('granted')}>
            {content.cookies.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so visitors can change their mind. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      {content.cookies.settings}
    </button>
  );
}
