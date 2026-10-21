import * as React from "react";
import { toast as sonnerToast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds toast — the Profile pages' floating notification (toastV2.jsx in
 * animocaminds-frontend; .toast-v2 in tokens.css). For the RESULT of something
 * the user just did ("Copied", "Redeemed", "Couldn't save"). A state the user
 * should know about on this screen is an inline Notice instead.
 *
 * Same call shape as sonner, which it renders through — mount sonner's
 * <Toaster /> once in the app:
 *
 *   toast("Link copied")
 *   toast.success("Redeemed", { description: "1,000 Energy is on its way." })
 *   toast.error("Couldn't save", { action: { label: "Retry", onClick: save } })
 *   toast.warning(…)  toast.info(…)  toast.loading(…)  toast.dismiss(id)
 *
 * The card is drawn by us (sonner's `custom` + `unstyled`), so the close
 * button sits on the right and nothing needs !important. `<Toast>` is the
 * card on its own, for static use.
 */

/* Solid badges with the glyph knocked out in white. Lucide is an outline set,
   so these are drawn here. The gradient's stops are classed so they pick up
   the state colours set on the toast; ids come from useId so two toasts on
   screen can't share one. */
function Gradient({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" className="toast-stop-a-v2" />
        <stop offset="100%" className="toast-stop-b-v2" />
      </linearGradient>
    </defs>
  );
}

function SolidCircle({ d, strokeWidth = 2.6 }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <Gradient id={id} />
      <circle cx="10" cy="10" r="10" fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningMark() {
  const id = React.useId();
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <Gradient id={id} />
      <path d="M8.7 2.9a1.5 1.5 0 0 1 2.6 0l6.9 12.3a1.5 1.5 0 0 1-1.3 2.2H3.1a1.5 1.5 0 0 1-1.3-2.2z" fill={`url(#${id})`} />
      <path d="M10 7.6v3.8M10 14.1v.1" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}

const MARKS = {
  info: () => <SolidCircle d="M10 9.2v4.9M10 6.2v.1" strokeWidth={2.4} />,
  success: () => <SolidCircle d="M5.9 10.2l2.7 2.7 5.5-5.6" />,
  error: () => <SolidCircle d="M7 7l6 6M13 7l-6 6" strokeWidth={2.4} />,
  warning: WarningMark,
  loading: () => <Loader2 size={18} strokeWidth={2.6} className="toast-spin-v2" />,
};

/** The card. `tone`: info (default) · success · warning · error · loading. */
function Toast({ tone = "info", title, description, action, onDismiss, className }) {
  const Mark = MARKS[tone] ?? MARKS.info;
  const state = tone === "loading" ? "info" : tone;
  return (
    <div role="status" className={cn("toast-v2", `toast-${state}-v2`, className)}>
      <span className="toast-mark-v2">
        <Mark />
      </span>
      <div className="toast-body-v2">
        <span className="toast-title-v2">{title}</span>
        {description && <span className="toast-desc-v2">{description}</span>}
        {action && (
          <button type="button" className="toast-action-v2" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button type="button" aria-label="Dismiss" className="toast-close-v2" onClick={onDismiss}>
          <X size={14} strokeWidth={2.4} />
        </button>
      )}
    </div>
  );
}

function make(tone) {
  return (message, { description, action, ...options } = {}) =>
    sonnerToast.custom(
      (id) => (
        <Toast
          tone={tone}
          title={message}
          description={description}
          action={action && {
            label: action.label,
            onClick: (event) => {
              action.onClick?.(event);
              sonnerToast.dismiss(id);
            },
          }}
          onDismiss={() => sonnerToast.dismiss(id)}
        />
      ),
      { unstyled: true, ...(tone === "loading" ? { duration: Infinity } : null), ...options }
    );
}

const toast = Object.assign(make("info"), {
  success: make("success"),
  error: make("error"),
  info: make("info"),
  warning: make("warning"),
  loading: make("loading"),
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
});

export { Toast, toast };
