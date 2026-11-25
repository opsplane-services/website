import { site } from './site';

/**
 * Analytics consent. Nothing that sets a cookie is loaded until the visitor
 * accepts, and the choice is remembered in localStorage (not a cookie). The
 * theme preference is also in localStorage and is strictly functional, so it
 * needs no consent.
 */
export type Consent = 'granted' | 'denied';

const STORAGE_KEY = 'opsplane_consent';
/** Fired to reopen the banner, e.g. from the footer's "Cookie settings" link. */
export const OPEN_CONSENT_EVENT = 'opsplane:open-consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsEnabled = Boolean(site.gaId);

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    /* private mode — the choice lasts for this page view only */
  }
  if (consent === 'granted') loadAnalytics();
  else revokeAnalytics();
}

/** Loads Google Analytics 4 once. Safe to call repeatedly. */
export function loadAnalytics() {
  if (!site.gaId || typeof window === 'undefined') return;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
    window.gtag('js', new Date());
    window.gtag('config', site.gaId, { anonymize_ip: true });

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.gaId)}`;
    document.head.appendChild(s);
  } else {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}

/** Stops analytics and removes the cookies it set (_ga, _ga_<id>). */
function revokeAnalytics() {
  if (typeof window === 'undefined') return;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });

  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid')
    .forEach((name) => {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
      });
    });
}
