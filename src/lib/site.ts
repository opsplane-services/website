/** Single place for the handful of values you will actually want to change. */
export const site = {
  name: 'OpsPlane Services',
  /** Used for canonical URLs and Open Graph tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://opsplane.eu',
  /**
   * Public contact address. Override without touching code by setting a
   * NEXT_PUBLIC_CONTACT_EMAIL repository variable (the Pages workflow passes
   * it through), or by putting it in .env.local for development.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'opsplane@opsplane.eu',
  /**
   * Formspree form id (the part after /f/ in the endpoint URL). Set it as a repo
   * variable named NEXT_PUBLIC_FORMSPREE_ID and the contact form posts there.
   * Left empty, the form falls back to a mailto: link so the page still works.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
} as const;
