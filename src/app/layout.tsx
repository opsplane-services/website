import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { withBasePath } from '@/lib/i18n';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // No template here — the locale layout owns it, otherwise its own title
  // gets wrapped and renders as "OpsPlane Services · OpsPlane Services".
  title: 'OpsPlane Services',
  description:
    'A Kubernetes-native operations platform. Auth, incident management, feature flags, secret management and an API gateway — self-hosted on your own infrastructure.',
  // Next does not apply basePath to metadata icons or the manifest, so these
  // are prefixed by hand — otherwise they 404 under /website.
  icons: {
    icon: [
      { url: withBasePath('/favicon.ico'), sizes: 'any' },
      { url: withBasePath('/favicons/favicon-16x16.png'), sizes: '16x16', type: 'image/png' },
      { url: withBasePath('/favicons/favicon-32x32.png'), sizes: '32x32', type: 'image/png' },
    ],
    apple: withBasePath('/apple-touch-icon.png'),
  },
  manifest: withBasePath('/favicons/site.webmanifest'),
};

// Applies the saved theme before first paint so there is no light/dark flash.
const themeScript = `
(function(){try{
  var t=localStorage.getItem('opsplane_theme')||'system';
  var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark',d);
}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
