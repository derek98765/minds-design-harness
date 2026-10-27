import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A pill you tick on or off: one of several short answers ("Daily briefing",
 * "Slack"). Selected state lives on aria-pressed, shows a blue fill and a tick.
 * Lay several out in a `flex flex-wrap gap-8` row; for a pick-one set of
 * larger options use a radio card instead.
 */
function ChoiceChip({ selected = false, className, children, ...props }) {
  return (
    <button
      type="button"
      data-slot="choice-chip"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-[6px] h-[32px] px-12 rounded-[var(--r-pill)] cursor-pointer",
        "text-body-sm font-bold transition-colors border",
        "disabled:cursor-not-allowed disabled:opacity-45",
        selected
          ? "bg-[var(--blue-soft)] text-[var(--blue)] border-[var(--blue-200)]"
          : "bg-[var(--bg-card)] text-[var(--text-body-cool)] border-[var(--line-cool)] hover:border-[var(--line-strong-cool)] hover:text-[var(--text-title-cool)]",
        className
      )}
      {...props}>
      {children}
      {selected && <Check size={13} strokeWidth={3} />}
    </button>
  );
}

export { ChoiceChip }
