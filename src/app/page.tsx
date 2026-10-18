import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BellRing,
  Flag,
  MessagesSquare,
  Network,
  Repeat,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ServicePanel } from '@/components/ServicePanel';
import { content as dict, type ServiceId } from '@/lib/content';

// Keyed by id rather than position, so reordering the content cannot desync them.
const serviceIcons: Record<ServiceId, LucideIcon> = {
  gateway: Network,
  flags: Flag,
  ai: MessagesSquare,
  oncall: BellRing,
  durable: Repeat,
  observability: Activity,
  slo: AlertTriangle,
  security: Shield,
};

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
            {dict.services.items.map((service) => {
              const Icon = serviceIcons[service.id];
              return (
                <article
                  key={service.id}
                  className="flex flex-col border-b border-r border-border p-6"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={18} strokeWidth={1.5} className="text-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
                    {service.status && <Badge className="ml-auto">{service.status}</Badge>}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                    {service.description}
                  </p>
                  {/* A fragment of the actual console, built from the same
                      tokens rather than illustrated. */}
                  <div className="mt-6 flex flex-1 items-end">
                    <ServicePanel id={service.id} />
                  </div>
                </article>
              );
            })}

            {/* Eight cards leave a hanging cell at three columns; this keeps the
                border grid rectangular. */}
            <div
              aria-hidden="true"
              className="hidden border-b border-r border-border bg-background-secondary lg:block"
            />
          </div>
        </div>
      </section>

      {/* Sovereignty */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.sovereignty.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {dict.sovereignty.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.sovereignty.lede}
          </p>
          <div className="mt-10 grid border-l border-t border-border bg-background md:grid-cols-2">
            {dict.sovereignty.points.map((point) => (
              <div key={point.title} className="border-b border-r border-border p-6">
                <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footprint */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.footprint.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {dict.footprint.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.footprint.lede}
          </p>
          <dl className="mt-10 grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
            {dict.footprint.stats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-border p-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-2 text-xs leading-relaxed text-foreground-secondary">{stat.label}</p>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-foreground-tertiary">{dict.footprint.note}</p>
        </div>
      </section>

      {/* Why Rust and WebAssembly */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.technology.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {dict.technology.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.technology.lede}
          </p>
          <div className="mt-10 grid border-l border-t border-border bg-background md:grid-cols-2 lg:grid-cols-3">
            {dict.technology.points.map((point) => (
              <div key={point.title} className="border-b border-r border-border p-6">
                <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How you buy it: managed or self-hosted */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="eyebrow">{dict.deployment.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {dict.deployment.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {dict.deployment.lede}
          </p>

          <div className="mt-10 grid border-l border-t border-border md:grid-cols-2">
            {dict.deployment.options.map((option) => (
              <div key={option.name} className="border-b border-r border-border p-6 md:p-8">
                <h3 className="text-sm font-semibold text-foreground">{option.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  {option.description}
                </p>
              </div>
            ))}
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
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                {dict.cta.primary}
                <ArrowRight size={16} strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/partners" size="lg" variant="secondary">
                {dict.cta.secondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
