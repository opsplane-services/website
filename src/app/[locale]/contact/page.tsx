import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Github, Mail } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { getDictionary } from '@/lib/dictionaries';
import { locales, isLocale, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return { title: dict.contact.title, description: dict.contact.lede };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.nav.contact}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {dict.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.contact.lede}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm dict={dict} />

          <aside className="border border-border">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-medium text-foreground">{dict.contact.elsewhere}</h2>
            </div>
            <ul className="px-4 py-3">
              {/* Without a form, ContactForm already leads with the address —
                  no need to print it twice on the same page. */}
              {site.formspreeId && (
                <li className="border-b border-border py-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    {site.email}
                  </a>
                </li>
              )}
              <li className="py-3">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
                >
                  <Github size={14} strokeWidth={1.5} />
                  github.com/opsplane-services
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
