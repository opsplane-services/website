/** @type {import('next').NextConfig} */

// When served from https://opsplane-services.github.io/website the site lives under
// a path prefix. The Pages workflow sets NEXT_PUBLIC_BASE_PATH=/website.
// For a custom domain (e.g. https://opsplane.io) leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

module.exports = nextConfig;
