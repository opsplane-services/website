import type { ServiceId } from '@/lib/content';

/**
 * A composition per service, in place of a bullet list.
 *
 * These are deliberately not schematics: no annotations, no arrowheads, no
 * boxes-and-labels. Each one is a small geometric figure built from the same
 * vocabulary — hairline structure, one solid focal form — so the row reads as
 * a designed set rather than seven diagrams. The card's heading and sentence
 * carry the meaning; the figure carries the feeling.
 *
 * Everything is drawn on a shared 200×96 grid in `currentColor` at graded
 * opacities, so a single set works in both themes.
 */

/** Opacity steps, used everywhere so the set stays visually consistent. */
const HAIRLINE = 0.16;
const STRUCTURE = 0.28;
const SECONDARY = 0.5;
const FOCAL = 0.92;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      className="h-auto w-full"
    >
      {children}
    </svg>
  );
}

/** Many flows, one plane they all pass through. */
function GatewayDiagram() {
  const lanes = [24, 40, 56, 72];
  return (
    <Frame>
      {lanes.map((y) => (
        <line key={`in-${y}`} x1="8" y1={y} x2="80" y2={y} opacity={STRUCTURE} />
      ))}

      <rect x="92" y="12" width="16" height="72" fill="currentColor" stroke="none" opacity={FOCAL} />
      {/* Two cuts in the plane: the request and response phases. */}
      <line x1="92" y1="38" x2="108" y2="38" stroke="var(--color-background)" strokeWidth={1.5} />
      <line x1="92" y1="58" x2="108" y2="58" stroke="var(--color-background)" strokeWidth={1.5} />

      {lanes.map((y) => (
        <line key={`out-${y}`} x1="120" y1={y} x2="192" y2={y} opacity={STRUCTURE} />
      ))}
    </Frame>
  );
}

/** A change moving across an estate, one step at a time. */
function FlagsDiagram() {
  const cells = [8, 40, 72, 104, 136, 168];
  return (
    <Frame>
      {cells.map((x, i) => (
        <rect
          key={x}
          x={x}
          y="30"
          width="24"
          height="24"
          fill={i < 3 ? 'currentColor' : 'none'}
          stroke={i < 3 ? 'none' : 'currentColor'}
          opacity={i < 2 ? FOCAL : i === 2 ? SECONDARY : STRUCTURE}
        />
      ))}
      <line x1="8" y1="68" x2="192" y2="68" opacity={HAIRLINE} />
      <line x1="8" y1="68" x2="104" y2="68" opacity={SECONDARY} strokeWidth={1.5} />
    </Frame>
  );
}

/** Many components, one surface in front of them. */
function AiDiagram() {
  const rows = [16, 34, 52, 70, 88];
  return (
    <Frame>
      <rect x="8" y="30" width="48" height="36" fill="currentColor" stroke="none" opacity={FOCAL} />
      {rows.map((y) => (
        <g key={y}>
          <line x1="56" y1="48" x2="118" y2={y} opacity={HAIRLINE} />
          <line x1="128" y1={y} x2="192" y2={y} opacity={STRUCTURE} strokeWidth={1.5} />
        </g>
      ))}
    </Frame>
  );
}

/** Work that carries on across the breaks. */
function DurableDiagram() {
  const breaks = [58, 100, 142];
  return (
    <Frame>
      {breaks.map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="82" opacity={HAIRLINE} />
      ))}
      <line x1="8" y1="48" x2="192" y2="48" opacity={SECONDARY} strokeWidth={1.5} />
      {/* A mark only where the work carries through an interruption. */}
      {breaks.map((x) => (
        <rect
          key={x}
          x={x - 5}
          y="43"
          width="10"
          height="10"
          fill="currentColor"
          stroke="none"
          opacity={FOCAL}
        />
      ))}
    </Frame>
  );
}

/** Three signals, one surface. */
function ObservabilityDiagram() {
  const ticks = Array.from({ length: 14 }, (_, i) => i);
  const heights = [8, 14, 10, 18, 12, 22, 15, 9, 19, 13, 24, 11, 16, 10];
  return (
    <Frame>
      {/* The line is the focal element; the strata below settle back. */}
      <polyline
        points="8,26 38,14 68,22 98,10 128,20 158,13 192,19"
        opacity={FOCAL}
        strokeWidth={1.5}
      />

      {ticks.map((i) => (
        <line
          key={i}
          x1={8 + i * 14.2}
          y1={62}
          x2={8 + i * 14.2}
          y2={62 - heights[i]}
          opacity={STRUCTURE}
        />
      ))}
      <line x1="8" y1="62" x2="192" y2="62" opacity={HAIRLINE} />

      {[
        [8, 150],
        [30, 104],
        [52, 62],
      ].map(([x, w], i) => (
        <rect
          key={i}
          x={x}
          y={72 + i * 8}
          width={w}
          height="4"
          fill="currentColor"
          stroke="none"
          opacity={i === 0 ? SECONDARY : STRUCTURE}
        />
      ))}
    </Frame>
  );
}

/** A budget drawn down until it meets the line that matters. */
function SloDiagram() {
  return (
    <Frame>
      <line x1="8" y1="54" x2="192" y2="54" opacity={STRUCTURE} />
      <path
        d="M8 20 C 46 24, 74 32, 104 54 S 158 82, 192 88"
        opacity={SECONDARY}
        strokeWidth={1.5}
      />
      <rect x="98" y="48" width="12" height="12" fill="currentColor" stroke="none" opacity={FOCAL} />
    </Frame>
  );
}

/** Layers around the thing worth protecting. */
function SecurityDiagram() {
  return (
    <Frame>
      <rect x="8" y="10" width="184" height="76" opacity={HAIRLINE} />
      <rect x="30" y="22" width="140" height="52" opacity={STRUCTURE} />
      <rect x="56" y="34" width="88" height="28" opacity={SECONDARY} />
      <rect x="88" y="42" width="24" height="12" fill="currentColor" stroke="none" opacity={FOCAL} />
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
