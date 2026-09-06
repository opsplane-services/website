import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { withBasePath } from '@/lib/paths';
import { content } from '@/lib/content';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={withBasePath('/logo-icon.png')}
                alt="OpsPlane Services"
                width={24}
                height={24}
                className="dark:invert"
              />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                OpsPlane Services
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground-secondary">
              {content.footer.tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow">{content.footer.navTitle}</p>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/', label: content.nav.home },
                { href: '/about', label: content.nav.about },
                { href: '/blog', label: content.nav.blog },
                { href: '/contact', label: content.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">{content.footer.resourcesTitle}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
                >
                  <Mail size={14} strokeWidth={1.5} />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-foreground-tertiary">
            © {new Date().getFullYear()} OpsPlane Services. {content.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
