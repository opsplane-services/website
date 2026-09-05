/** Single place for the handful of values you will actually want to change. */
export const site = {
  name: 'OpsPlane Services',
  /** Used for canonical URLs and Open Graph tags. Change when a custom domain is attached. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://opsplane-services.github.io/website',
  github: 'https://github.com/opsplane-services',
  githubPlatform: 'https://github.com/opsplane-services/platform',
  docs: 'https://github.com/opsplane-services/platform#readme',
  /** TODO: replace with the real company address before launch. */
  email: 'hello@opsplane.io',
  /**
   * Formspree form id (the part after /f/ in the endpoint URL). Set it as a repo
   * variable named NEXT_PUBLIC_FORMSPREE_ID and the contact form posts there.
   * Left empty, the form falls back to a mailto: link so the page still works.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
} as const;
