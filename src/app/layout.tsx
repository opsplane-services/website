import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/lib/theme';
import { withBasePath } from '@/lib/paths';
import { content } from '@/lib/content';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: content.meta.title, template: `%s · ${content.meta.title}` },
  description: content.meta.description,
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
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    locale: 'en_US',
    type: 'website',
  },
};

// Tints mobile browser chrome to match the page.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

// Applies the saved theme before first paint so there is no light/dark flash.
const themeScript = `
(function(){try{
  var t=localStorage.getItem('opsplane_theme')||'dark';
  var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark',d);
}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Dark is the default, so the static HTML ships with it already applied —
    // the script below only removes it when a visitor has chosen otherwise.
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
