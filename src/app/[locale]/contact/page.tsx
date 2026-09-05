import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/ContactForm';
import { getDictionary } from '@/lib/dictionaries';
import { locales, isLocale, type Locale } from '@/lib/i18n';

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

      <section className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <ContactForm dict={dict} />
      </section>
    </>
  );
}
