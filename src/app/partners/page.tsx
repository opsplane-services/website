import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { content } from '@/lib/content';

export const metadata: Metadata = {
  title: content.nav.partners,
  description: content.partners.lede,
};

export default function PartnersPage() {
  const p = content.partners;
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {p.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-secondary">{p.lede}</p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <h2 className="text-sm font-semibold text-foreground">{p.offerTitle}</h2>
          <div className="mt-6 grid border-l border-t border-border md:grid-cols-3">
            {p.offer.map((item, i) => (
              <div key={item.title} className="border-b border-r border-border p-6">
                <span className="font-mono-id text-foreground-tertiary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-16">
          {[
            { title: p.fitTitle, items: p.fit },
            { title: p.askTitle, items: p.ask },
          ].map((list) => (
            <div key={list.title}>
              <h2 className="text-sm font-semibold text-foreground">{list.title}</h2>
              <ul className="mt-4 space-y-3">
                {list.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground-secondary">
                    <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <ButtonLink href="/contact" size="lg">
            {p.cta}
            <ArrowRight size={16} strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
