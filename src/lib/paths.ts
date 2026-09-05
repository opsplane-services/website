/** Prefix a site-internal path with the base path, so links work under /website. */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path}`;
}
