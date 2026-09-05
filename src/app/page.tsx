import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Flag,
  MessagesSquare,
  Network,
  Repeat,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { content as dict } from '@/lib/content';

// Same icons the product console uses for these areas.
const serviceIcons: LucideIcon[] = [
  Shield, // Security & Identity
  Activity, // Observability
  AlertTriangle, // SLOs & Incident Management
  Flag, // Feature Flags
  Network, // Gateway
  MessagesSquare, // AI Stack
  Repeat, // Durable Execution
];

export default function LandingPage() {
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
          <div className="mt-8">
            <ButtonLink href="/contact" size="lg">
              {dict.hero.primary}
              <ArrowRight size={16} strokeWidth={1.5} />
            </ButtonLink>
          </div>
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
                    {service.port && (
                      <span className="font-mono-id shrink-0 whitespace-nowrap text-foreground-tertiary">
                        {service.port}
                      </span>
                    )}
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

            {/* Seven cards leave a hanging cell in the border grid. These keep
                it rectangular: one fills the gap at two columns, both at three. */}
            <div
              aria-hidden="true"
              className="hidden border-b border-r border-border bg-background-secondary md:block"
            />
            <div
              aria-hidden="true"
              className="hidden border-b border-r border-border bg-background-secondary lg:block"
            />
          </div>
        </div>
      </section>

      {/* The consolidation argument */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">{dict.value.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {dict.value.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                {dict.value.lede}
              </p>
            </div>
            <div className="border-t border-border">
              {dict.value.points.map((point) => (
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

      {/* Operator / declarative */}
      <section className="border-b border-border">
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
            <div className="mt-8">
              <ButtonLink href="/contact" size="lg">
                {dict.cta.primary}
                <ArrowRight size={16} strokeWidth={1.5} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
