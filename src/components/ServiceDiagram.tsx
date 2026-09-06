import type { ServiceId } from '@/lib/content';

/**
 * A small schematic per service, in place of a bullet list.
 *
 * All of them are drawn on the same 240×80 grid with 1.5px strokes in
 * `currentColor`, so they inherit the card's text colour and work in both
 * themes without a second set of assets. They aim to show the mechanism —
 * what flows where — rather than decorate.
 */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      className="h-auto w-full"
    >
      {children}
    </svg>
  );
}

function Label({ x, y, children, anchor = 'middle' }: {
  x: number;
  y: number;
  children: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize="9"
      fontFamily={MONO}
      textAnchor={anchor}
      fill="currentColor"
      stroke="none"
      opacity="0.75"
    >
      {children}
    </text>
  );
}

/** Traffic in, one proxy with WASM phases on each side, services out. */
function GatewayDiagram() {
  return (
    <Frame>
      {[20, 40, 60].map((y) => (
        <g key={y}>
          <line x1="2" y1={y} x2="56" y2={y} opacity="0.55" />
          <path d={`M52 ${y - 3.5} L56 ${y} L52 ${y + 3.5}`} opacity="0.55" />
        </g>
      ))}

      <rect x="68" y="8" width="46" height="64" />
      {/* request phase / response phase */}
      <rect x="74" y="16" width="34" height="9" fill="currentColor" stroke="none" opacity="0.35" />
      <rect x="74" y="55" width="34" height="9" fill="currentColor" stroke="none" opacity="0.35" />
      <Label x={91} y={43}>WASM</Label>

      <line x1="114" y1="40" x2="130" y2="40" opacity="0.55" />
      <line x1="130" y1="16" x2="130" y2="64" opacity="0.55" />
      {[16, 40, 64].map((y) => (
        <g key={y}>
          <line x1="130" y1={y} x2="148" y2={y} opacity="0.55" />
          <path d={`M144 ${y - 3.5} L148 ${y} L144 ${y + 3.5}`} opacity="0.55" />
          <rect x="150" y={y - 9} width="88" height="18" opacity="0.85" />
        </g>
      ))}
    </Frame>
  );
}

/** Flags toggled per environment, plus a percentage rollout. */
function FlagsDiagram() {
  const rows = [
    { y: 14, on: true },
    { y: 38, on: false },
  ];
  return (
    <Frame>
      {rows.map(({ y, on }) => (
        <g key={y}>
          <rect x="2" y={y - 7} width="150" height="15" opacity="0.85" />
          <rect x="166" y={y - 7} width="30" height="15" />
          <rect
            x={on ? 183 : 168}
            y={y - 5}
            width="11"
            height="11"
            fill="currentColor"
            stroke="none"
            opacity={on ? 0.9 : 0.35}
          />
        </g>
      ))}

      {/* percentage rollout */}
      <rect x="2" y="55" width="194" height="15" opacity="0.85" />
      <rect x="2" y="55" width="68" height="15" fill="currentColor" stroke="none" opacity="0.35" />
      <Label x={224} y={66} anchor="end">35%</Label>
    </Frame>
  );
}

/** One front end, many model providers behind it. */
function AiDiagram() {
  return (
    <Frame>
      {/* chat surface */}
      <path d="M2 8 H104 V60 H26 L14 72 V60 H2 Z" />
      <line x1="14" y1="24" x2="92" y2="24" opacity="0.5" />
      <line x1="14" y1="36" x2="76" y2="36" opacity="0.5" />
      <line x1="14" y1="48" x2="86" y2="48" opacity="0.5" />

      <line x1="104" y1="34" x2="126" y2="34" opacity="0.55" />
      <line x1="126" y1="14" x2="126" y2="66" opacity="0.55" />
      {[14, 40, 66].map((y) => (
        <g key={y}>
          <line x1="126" y1={y} x2="150" y2={y} opacity="0.55" />
          <rect x="150" y={y - 8} width="88" height="16" opacity="0.85" />
        </g>
      ))}
    </Frame>
  );
}

/** A workflow that keeps going across a restart, retrying where it must. */
function DurableDiagram() {
  const steps = [4, 92, 180];
  return (
    <Frame>
      {steps.map((x, i) => (
        <g key={x}>
          <rect x={x} y="34" width="56" height="24" opacity="0.85" />
          {i < steps.length - 1 && (
            <>
              <line x1={x + 56} y1="46" x2={steps[i + 1] - 4} y2="46" opacity="0.55" />
              <path
                d={`M${steps[i + 1] - 8} 42.5 L${steps[i + 1] - 4} 46 L${steps[i + 1] - 8} 49.5`}
                opacity="0.55"
              />
            </>
          )}
        </g>
      ))}

      {/* retry loop on the middle step */}
      <path d="M100 34 A16 12 0 0 1 140 34" opacity="0.6" />
      <path d="M136 30 L140 34.5 L135 37" opacity="0.6" />

      {/* the restart the work survives */}
      <line x1="76" y1="12" x2="76" y2="62" strokeDasharray="3 4" opacity="0.55" />
      <Label x={76} y={74}>restart</Label>
    </Frame>
  );
}

/** Three signals under one surface. */
function ObservabilityDiagram() {
  return (
    <Frame>
      <Label x={2} y={16} anchor="start">metrics</Label>
      <polyline
        points="62,20 82,10 100,18 118,6 138,16 158,9 178,19 198,12 236,16"
        opacity="0.8"
      />

      <Label x={2} y={44} anchor="start">logs</Label>
      {[[62, 150], [62, 196], [62, 122]].map(([x1, x2], i) => (
        <line key={i} x1={x1} y1={36 + i * 6} x2={x2} y2={36 + i * 6} opacity="0.45" />
      ))}

      <Label x={2} y={70} anchor="start">traces</Label>
      {[[62, 174], [78, 132], [96, 108]].map(([x, w], i) => (
        <rect
          key={i}
          x={x}
          y={58 + i * 7}
          width={w}
          height="5"
          fill="currentColor"
          stroke="none"
          opacity="0.4"
        />
      ))}
    </Frame>
  );
}

/** An error budget burning down through its objective, raising an incident. */
function SloDiagram() {
  return (
    <Frame>
      <line x1="2" y1="34" x2="150" y2="34" strokeDasharray="3 4" opacity="0.6" />
      <Label x={2} y={28} anchor="start">objective</Label>

      {/* budget burning down and crossing the line */}
      <polyline points="2,14 32,18 62,22 92,28 108,34 126,46 150,58" opacity="0.85" />

      {/* alert at the crossing */}
      <path d="M108 24 L115 36 H101 Z" opacity="0.9" />

      <line x1="150" y1="46" x2="172" y2="46" opacity="0.55" />
      <path d="M168 42.5 L172 46 L168 49.5" opacity="0.55" />
      <rect x="172" y="34" width="66" height="24" opacity="0.85" />
      <Label x={205} y={49}>incident</Label>
    </Frame>
  );
}

/** One identity deciding who reaches which store. */
function SecurityDiagram() {
  const cols = [96, 146, 196];
  const rows = [30, 50, 70];
  const granted = new Set(['0-0', '0-1', '1-1', '2-0', '2-2', '1-2']);

  return (
    <Frame>
      <Label x={2} y={16} anchor="start">roles</Label>
      <Label x={146} y={16}>stores</Label>

      {rows.map((y, r) => (
        <g key={y}>
          <rect x="2" y={y - 11} width="72" height="16" opacity="0.85" />
          {cols.map((x, c) => {
            const on = granted.has(`${r}-${c}`);
            return on ? (
              <rect
                key={x}
                x={x - 8}
                y={y - 11}
                width="16"
                height="16"
                fill="currentColor"
                stroke="none"
                opacity="0.55"
              />
            ) : (
              <rect key={x} x={x - 8} y={y - 11} width="16" height="16" opacity="0.35" />
            );
          })}
        </g>
      ))}
    </Frame>
  );
}

const diagrams: Record<ServiceId, () => JSX.Element> = {
  gateway: GatewayDiagram,
  flags: FlagsDiagram,
  ai: AiDiagram,
  durable: DurableDiagram,
  observability: ObservabilityDiagram,
  slo: SloDiagram,
  security: SecurityDiagram,
};

export function ServiceDiagram({ id }: { id: ServiceId }) {
  const Diagram = diagrams[id];
  return <Diagram />;
}
