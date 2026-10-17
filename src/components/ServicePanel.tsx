import clsx from 'clsx';
import type { ServiceId } from '@/lib/content';

/**
 * A fragment of product UI per service, in place of an illustration.
 *
 * These are built from the same tokens and table styling as the platform
 * console (`platform/web`), so they read as the product rather than as a
 * metaphor for it. Rendered rather than screenshotted: they stay crisp at any
 * size, follow the theme, and do not go stale as images would.
 */

const HEAD =
  'bg-background-secondary px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-foreground-tertiary';
const CELL = 'px-2.5 py-[7px] text-[10px] text-foreground-secondary';
const MONO =
  'font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[10px] text-foreground';

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden border border-border bg-background">
      {children}
    </div>
  );
}

function Dot({ tone = 'ok' }: { tone?: 'ok' | 'warn' | 'crit' }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-block h-1.5 w-1.5 shrink-0',
        tone === 'ok' && 'bg-emerald-500',
        tone === 'warn' && 'bg-severity-medium',
        tone === 'crit' && 'bg-severity-critical'
      )}
    />
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone?: 'crit' | 'high' | 'mute' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center border px-1.5 py-px text-[9px] font-medium',
        tone === 'crit' && 'border-severity-critical text-severity-critical',
        tone === 'high' && 'border-severity-high text-severity-high',
        (!tone || tone === 'mute') && 'border-border text-foreground-tertiary'
      )}
    >
      {children}
    </span>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-flex h-3 w-6 items-center border p-px',
        on ? 'border-accent bg-accent' : 'border-border'
      )}
    >
      <span
        className={clsx(
          'h-2 w-2.5',
          on
            ? 'ml-auto bg-[var(--color-accent-foreground)]'
            : 'bg-foreground-tertiary opacity-50'
        )}
      />
    </span>
  );
}

/** Gateway — the routes table. */
function GatewayPanel() {
  const routes = [
    ['GET', '/api/v1/incidents', 'incidents-api'],
    ['POST', '/api/v1/flags', 'flags-api'],
    ['GET', '/api/v1/secrets', 'security-api'],
  ];
  return (
    <Panel>
      <div className={clsx('grid grid-cols-[38px_1fr_auto] gap-2', HEAD)}>
        <span>Method</span>
        <span>Path</span>
        <span>Upstream</span>
      </div>
      {routes.map(([method, path, upstream]) => (
        <div
          key={path}
          className={clsx('grid grid-cols-[38px_1fr_auto] items-center gap-2 border-t border-border', CELL)}
        >
          <span className="text-[9px] font-medium text-foreground">{method}</span>
          <span className={MONO}>{path}</span>
          <span className="flex items-center gap-1.5">
            {upstream}
            <Dot />
          </span>
        </div>
      ))}
    </Panel>
  );
}

/** Feature Flags — flags and their environments. */
function FlagsPanel() {
  const flags: [string, string, boolean][] = [
    ['checkout-v2', 'prod', true],
    ['new-onboarding', 'staging', false],
    ['pricing-banner', 'prod', true],
  ];
  return (
    <Panel>
      <div className={clsx('grid grid-cols-[1fr_auto_auto] gap-2', HEAD)}>
        <span>Flag</span>
        <span>Env</span>
        <span />
      </div>
      {flags.map(([name, env, on]) => (
        <div
          key={name}
          className={clsx('grid grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-border', CELL)}
        >
          <span className={MONO}>{name}</span>
          <Pill>{env}</Pill>
          <Toggle on={on} />
        </div>
      ))}
    </Panel>
  );
}

/** AI Hub — a governed chat turn. */
function AiPanel() {
  return (
    <Panel>
      <div className={clsx('flex items-center justify-between', HEAD)}>
        <span>On-call assistant</span>
        <Pill>mistral · EU</Pill>
      </div>
      <div className="space-y-1.5 p-2.5">
        <div className="ml-auto w-[78%] border border-border bg-background-secondary px-2 py-1 text-[10px] text-foreground-secondary">
          Postgres primary is down. Page me at [EMAIL]
        </div>
        <div className="border-l-2 border-severity-medium pl-1.5 text-[9px] text-foreground-tertiary">
          Guardrail · 1 email removed before reaching the model
        </div>
        <div className="w-[88%] border border-border px-2 py-1 text-[10px] text-foreground-secondary">
          Per runbook <span className={MONO}>db-failover</span>: promote the replica, then check lag.
        </div>
      </div>
    </Panel>
  );
}

/** On-call — noise reduction funnel. */
function OncallPanel() {
  const rows: [string, string, 'ok' | 'warn' | 'crit'][] = [
    ['Alerts received', '1,284', 'warn'],
    ['Deduplicated', '1,019', 'ok'],
    ['Suppressed (maintenance, flapping)', '172', 'ok'],
    ['Paged a human', '37', 'crit'],
  ];
  return (
    <Panel>
      <div className={clsx('flex items-center justify-between', HEAD)}>
        <span>Noise, last 24h</span>
        <span className="normal-case tracking-normal text-foreground-secondary">−97%</span>
      </div>
      {rows.map(([label, value, tone]) => (
        <div
          key={label}
          className={clsx('grid grid-cols-[1fr_auto] items-center gap-2 border-t border-border', CELL)}
        >
          <span className="flex items-center gap-1.5">
            <Dot tone={tone} />
            {label}
          </span>
          <span className={MONO}>{value}</span>
        </div>
      ))}
    </Panel>
  );
}

/** Durable Execution — workflow runs. */
function DurablePanel() {
  const runs: [string, string, string, 'ok' | 'warn'][] = [
    ['wf_8c21f4', 'Running', '4m 12s', 'warn'],
    ['wf_7b04ae', 'Completed', '1m 03s', 'ok'],
    ['wf_6a91c7', 'Completed', '52s', 'ok'],
  ];
  return (
    <Panel>
      <div className={clsx('grid grid-cols-[1fr_auto_auto] gap-2', HEAD)}>
        <span>Run</span>
        <span>Status</span>
        <span>Duration</span>
      </div>
      {runs.map(([id, status, duration, tone]) => (
        <div
          key={id}
          className={clsx('grid grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-border', CELL)}
        >
          <span className={MONO}>{id}</span>
          <span className="flex items-center gap-1.5">
            <Dot tone={tone} />
            {status}
          </span>
          <span className={MONO}>{duration}</span>
        </div>
      ))}
    </Panel>
  );
}

/** Observability — a latency chart. */
function ObservabilityPanel() {
  return (
    <Panel>
      <div className={clsx('flex items-center justify-between', HEAD)}>
        <span>p95 latency</span>
        <span className="normal-case tracking-normal text-foreground-secondary">142 ms</span>
      </div>
      <div className="p-2.5">
        <svg viewBox="0 0 220 56" fill="none" className="h-auto w-full" role="presentation">
          {[14, 28, 42].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="220"
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
            />
          ))}
          <polyline
            points="0,40 24,34 48,38 72,26 96,30 120,18 144,24 168,14 196,20 220,12"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground"
          />
        </svg>
      </div>
    </Panel>
  );
}

/** SLOs & Incidents — the incident queue. */
function SloPanel() {
  const incidents: [string, string, 'crit' | 'high', string][] = [
    ['INC-482', 'Checkout latency', 'crit', 'Investigating'],
    ['INC-479', 'Queue backlog', 'high', 'Monitoring'],
  ];
  return (
    <Panel>
      <div className={clsx('grid grid-cols-[auto_1fr_auto] gap-2', HEAD)}>
        <span>ID</span>
        <span>Incident</span>
        <span>Severity</span>
      </div>
      {incidents.map(([id, title, tone, status]) => (
        <div
          key={id}
          className={clsx('grid grid-cols-[auto_1fr_auto] items-center gap-2 border-t border-border', CELL)}
        >
          <span className={MONO}>{id}</span>
          <span className="truncate">{title}</span>
          <Pill tone={tone}>{tone === 'crit' ? 'Critical' : 'High'}</Pill>
          <span className="col-span-3 -mt-0.5 text-[9px] text-foreground-tertiary">{status}</span>
        </div>
      ))}
    </Panel>
  );
}

/** Security & Identity — secret connectors. */
function SecurityPanel() {
  const connectors = [
    ['vault-prod', 'HashiCorp Vault'],
    ['aws-secrets', 'AWS Secrets Manager'],
    ['azure-kv', 'Azure Key Vault'],
  ];
  return (
    <Panel>
      <div className={clsx('grid grid-cols-[1fr_auto] gap-2', HEAD)}>
        <span>Connector</span>
        <span>Backend</span>
      </div>
      {connectors.map(([name, backend]) => (
        <div
          key={name}
          className={clsx('grid grid-cols-[1fr_auto] items-center gap-2 border-t border-border', CELL)}
        >
          <span className="flex items-center gap-1.5">
            <Dot />
            <span className={MONO}>{name}</span>
          </span>
          <span className="truncate">{backend}</span>
        </div>
      ))}
    </Panel>
  );
}

const panels: Record<ServiceId, () => JSX.Element> = {
  gateway: GatewayPanel,
  flags: FlagsPanel,
  ai: AiPanel,
  oncall: OncallPanel,
  durable: DurablePanel,
  observability: ObservabilityPanel,
  slo: SloPanel,
  security: SecurityPanel,
};

export function ServicePanel({ id }: { id: ServiceId }) {
  const P = panels[id];
  return <P />;
}
