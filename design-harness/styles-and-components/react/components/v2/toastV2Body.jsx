/* ==========================================================================
   Profile — toast body
   --------------------------------------------------------------------------
   The panel toastV2.jsx hands to sonner, split out so it can also be rendered
   statically (the dev style guide). Behaviour lives in toastV2.jsx.
   ========================================================================== */

import { useMemo } from "react";
import { toast as sonnerToast } from "sonner";
import { X, Loader2 } from "lucide-react";

/* ── State marks ─────────────────────────────────────────────────────────────
   SOLID SHAPES WITH THE GLYPH KNOCKED OUT, not a lucide outline sitting inside
   a tinted disc. The badge IS the icon: a filled circle (or triangle) in the
   state colour with a white mark cut through it, which is what the reference
   shows and what reads at 20px — an outline glyph inside a circular chip put
   two concentric rings in the same 20px box.

   DRAWN HERE RATHER THAN IMPORTED. Lucide is an outline set: every glyph is a
   stroked path, so adding `fill` paints the shape but keeps the stroke, and
   the result is a heavy double edge rather than a solid.

   Silhouettes stay distinct, not just hues — warning is a TRIANGLE, so it
   separates from error without depending on amber-vs-red, which is the pair
   most colour-vision deficiencies collapse. The panel's own tint (see
   .toast-*-v2 in tokens-v2.css) is the primary state signal; these
   reinforce it rather than carrying it alone.

   The glyph is stroked in WHITE so the mark reads as a HOLE punched through
   the badge rather than paint laid on top of it. Hardcoded, not tokenised:
   the badge is always a saturated lit solid, so the knockout is white in
   every state — the same way the checked checkbox and every lit-solid button
   on this page state their white directly. */

/* THE BADGE IS A LIT SOLID, not a flat disc: light stop at the top, dark at
   the bottom — the same top-lit construction as the page's buttons and the
   online switch's capsule, so the toast reads as part of that vocabulary.

   The gradient is defined INSIDE each svg rather than once in a shared <defs>,
   and it has to be. Its stops read --notify-tint-v2 / --notify-tint-2-v2, which are set by
   the state class on the toast panel; a single shared gradient in a portal or
   at the document root would resolve those against ITS own ancestors, not the
   toast's, so every badge would come out the same colour. Per-instance ids are
   scoped by `gid` so two toasts on screen cannot collide. */
function LitGradient({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--notify-tint-2-v2)" />
        <stop offset="100%" stopColor="var(--notify-tint-v2)" />
      </linearGradient>
    </defs>
  );
}

let gidSeq = 0;

function SolidCircle({ d, strokeWidth = 2.6 }) {
  const gid = useMemo(() => `toast-grad-v2-${++gidSeq}`, []);
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <LitGradient id={gid} />
      <circle cx="10" cy="10" r="10" fill={`url(#${gid})`} />
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SuccessMark = () => <SolidCircle d="M5.9 10.2l2.7 2.7 5.5-5.6" />;
const ErrorMark = () => <SolidCircle d="M7 7l6 6M13 7l-6 6" strokeWidth={2.4} />;
const InfoMark = () => <SolidCircle d="M10 9.2v4.9M10 6.2v.1" strokeWidth={2.4} />;

const WarningMark = () => {
  const gid = useMemo(() => `toast-grad-v2-${++gidSeq}`, []);
  return (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
    <LitGradient id={gid} />
    <path
      d="M8.7 2.9a1.5 1.5 0 0 1 2.6 0l6.9 12.3a1.5 1.5 0 0 1-1.3 2.2H3.1a1.5 1.5 0 0 1-1.3-2.2z"
      fill={`url(#${gid})`}
    />
    <path
      d="M10 7.6v3.8M10 14.1v.1"
      fill="none"
      stroke="#ffffff"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </svg>
  );
};

/* Loading keeps lucide's spinner: it is a moving stroke rather than a badge,
   and a filled disc cannot show rotation. */
const LoadingMark = () => <Loader2 size={18} strokeWidth={2.6} className="animate-spin" />;

const STATES = {
  default: { Mark: InfoMark, tone: "info" },
  info: { Mark: InfoMark, tone: "info" },
  success: { Mark: SuccessMark, tone: "success" },
  error: { Mark: ErrorMark, tone: "error" },
  warning: { Mark: WarningMark, tone: "warning" },
  loading: { Mark: LoadingMark, tone: "info" },
};

/** The toast's badge for a tone, so inline notices wear the same mark. */
export function StateMark({ tone }) {
  const Mark = { success: SuccessMark, error: ErrorMark, warning: WarningMark }[tone] || InfoMark;
  return <Mark />;
}

/** The toast body. Owns its own markup — see toastV2.jsx's header for why.
 *  `id` is the sonner toast to dismiss; a static preview can leave it out. */
export function ToastV2({ id, title, description, action, variant = "default" }) {
  const { Mark, tone } = STATES[variant];
  return (
    <div className={`toast-v2 toast-${tone}-v2`} role="status">
      <span className="toast-mark-v2">
        <Mark />
      </span>

      {/* min-w-0 lets a long message wrap instead of pushing the close button
          out of the row. */}
      <div className="toast-body-v2">
        <span className="toast-title-v2">{title}</span>
        {description ? <span className="toast-desc-v2">{description}</span> : null}
        {action ? (
          <button
            type="button"
            className="toast-action-v2"
            onClick={event => {
              action.onClick?.(event);
              sonnerToast.dismiss(id);
            }}
          >
            {action.label}
          </button>
        ) : null}
      </div>

      {/* LAST in the DOM, so it sits right without any positioning trick. */}
      <button
        type="button"
        aria-label="Dismiss"
        className="toast-close-v2"
        onClick={() => sonnerToast.dismiss(id)}
      >
        <X size={14} strokeWidth={2.4} />
      </button>
    </div>
  );
}
