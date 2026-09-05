import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowRight,
  Flag,
  Github,
  Network,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { getDictionary } from '@/lib/dictionaries';
import { locales, isLocale, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Same icons the product sidebar uses for these areas.
const serviceIcons: LucideIcon[] = [Users, AlertTriangle, Flag, Shield, Network];

const QUICKSTART = `git clone https://github.com/opsplane-services/platform.git
cd platform

make dev-db     # PostgreSQL via docker compose
make dev-all    # every service, the operator and the web UI`;

export default function LandingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="eyebrow">{dict.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl md:leading-[1.1]">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-secondary">
            {dict.hero.lede}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/${locale}/contact`} size="lg">
              {dict.hero.primary}
              <ArrowRight size={16} strokeWidth={1.5} />
            </ButtonLink>
            <ButtonLink href={site.githubPlatform} variant="secondary" size="lg" external>
              <Github size={16} strokeWidth={1.5} />
              {dict.hero.secondary}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <dl className="grid grid-cols-2 border-l border-border md:grid-cols-4">
            {dict.stats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-border p-6 md:border-b-0">
                <dt className="text-3xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-foreground-secondary">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.services.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.services.lede}
          </p>

          <div className="mt-10 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {dict.services.items.map((service, i) => {
              const Icon = serviceIcons[i] ?? Network;
              return (
                <article key={service.name} className="border-b border-r border-border p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Icon size={18} strokeWidth={1.5} className="text-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
                    </div>
                    <span className="font-mono-id text-foreground-tertiary">{service.port}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-xs leading-relaxed text-foreground-secondary"
                      >
                        <span aria-hidden="true" className="text-foreground-tertiary">
                          —
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            {/* Trailing cell keeps the grid rectangular on 3-up layouts */}
            <div className="hidden border-b border-r border-border bg-background-secondary p-6 lg:block">
              <p className="eyebrow">{dict.operator.eyebrow}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {dict.operator.title}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4"
              >
                {dict.cta.primary}
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Operator / declarative */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">{dict.operator.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {dict.operator.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                {dict.operator.lede}
              </p>
            </div>
            <div className="border-t border-border">
              {dict.operator.points.map((point) => (
                <div key={point.title} className="border-b border-border py-5">
                  <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.principles.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {dict.principles.title}
          </h2>

          <div className="mt-10 grid border-l border-t border-border md:grid-cols-2">
            {dict.principles.items.map((item, i) => (
              <div key={item.title} className="border-b border-r border-border p-6">
                <span className="font-mono-id text-foreground-tertiary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">{dict.quickstart.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {dict.quickstart.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                {dict.quickstart.lede}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                {dict.quickstart.note}
              </p>
              <ButtonLink href={site.docs} variant="secondary" className="mt-6" external>
                {dict.quickstart.cta}
                <ArrowRight size={16} strokeWidth={1.5} />
              </ButtonLink>
            </div>
            <div className="border border-border bg-background-secondary">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="h-1.5 w-1.5 bg-severity-info" aria-hidden="true" />
                <span className="font-mono-id text-foreground-tertiary">bash</span>
              </div>
              <pre className="overflow-x-auto p-4">
                <code className="font-mono-id leading-relaxed text-foreground-secondary">
                  {QUICKSTART}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="border border-border p-8 md:p-12">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {dict.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
              {dict.cta.lede}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/contact`} size="lg">
                {dict.cta.primary}
                <ArrowRight size={16} strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href={site.githubPlatform} variant="secondary" size="lg" external>
                <Github size={16} strokeWidth={1.5} />
                {dict.cta.secondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
