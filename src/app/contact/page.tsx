import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { content } from '@/lib/content';

export const metadata: Metadata = {
  title: content.contact.title,
  description: content.contact.lede,
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{content.nav.contact}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {content.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {content.contact.lede}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <ContactForm />
      </section>
    </>
  );
}
