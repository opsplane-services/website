'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Github, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';
import { withBasePath, type Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';
import { site } from '@/lib/site';

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home, exact: true },
    { href: `/${locale}/blog`, label: dict.nav.blog, exact: false },
    { href: `/${locale}/contact`, label: dict.nav.contact, exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    const current = pathname.replace(/\/$/, '') || '/';
    const target = href.replace(/\/$/, '');
    return exact ? current === target : current === target || current.startsWith(`${target}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src={withBasePath("/logo-icon.png")}
            alt="OpsPlane Services"
            width={28}
            height={28}
            priority
            className="dark:invert"
          />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            OpsPlane Services
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium transition-colors',
                isActive(link.href, link.exact)
                  ? 'bg-accent text-[var(--color-accent-foreground)]'
                  : 'text-foreground-secondary hover:bg-background-hover'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.github}
            className="flex h-[26px] w-[26px] items-center justify-center border border-border text-foreground-secondary transition-colors hover:bg-background-hover"
          >
            <Github size={14} strokeWidth={1.5} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.close : dict.nav.menu}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center border border-border md:hidden"
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'border-b border-border px-4 py-3 text-sm font-medium transition-colors',
                  isActive(link.href, link.exact)
                    ? 'bg-accent text-[var(--color-accent-foreground)]'
                    : 'text-foreground-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between px-4 py-3">
            <LocaleSwitcher locale={locale} />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.nav.github}
                className="flex h-[26px] w-[26px] items-center justify-center border border-border text-foreground-secondary"
              >
                <Github size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
