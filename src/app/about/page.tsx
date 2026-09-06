import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { content } from '@/lib/content';

export const metadata: Metadata = {
  title: content.nav.about,
  description: content.about.lede,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{content.about.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {content.about.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-secondary">
            {content.about.lede}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-2xl space-y-5">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-foreground-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <div className="grid border-l border-t border-border md:grid-cols-3">
            {content.about.points.map((point, i) => (
              <div key={point.title} className="border-b border-r border-border p-6">
                <span className="font-mono-id text-foreground-tertiary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 text-sm font-semibold text-foreground">{point.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <ButtonLink href="/contact" size="lg">
            {content.about.cta}
            <ArrowRight size={16} strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
