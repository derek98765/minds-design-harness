import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds radio — matches the Profile Mind picker on Redeem (.pick-radio-v2 and
 * .pick-tile-v2 in tokens.css).
 *
 * `RadioGroupItem` is a 20px ring that turns blue on hover and fills with a
 * blue gradient and a white check when chosen. Never orange.
 *
 * `RadioGroupCard` is a selectable tile — the pattern for choosing one of a
 * few rich options (a Mind, an Energy amount). At rest it's a pale frosted
 * tile; hover goes white and lifts. CHOSEN is white with a 2px --blue-tint
 * edge and a blue drop — not a solid blue fill. Pass `leading` for an avatar
 * or icon before the title.
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("flex flex-col gap-8", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item ref={ref} className={cn("pick-radio-v2", className)} {...props}>
    <RadioGroupPrimitive.Indicator forceMount>
      <Check size={12} strokeWidth={3.4} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

function RadioGroupCard({ value, selected, onSelect, title, subtitle, leading, trailing, trailingLabel, className }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={cn("pick-tile-v2", className)}
    >
      <span className="pick-radio-v2" aria-hidden="true">
        <Check size={12} strokeWidth={3.4} />
      </span>
      {leading}
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "truncate t-sm",
            selected ? "font-extrabold text-[var(--text-title-cool)]" : "font-semibold text-[var(--text-body-cool)]"
          )}
        >
          {title}
        </span>
        {subtitle && <span className="truncate t-xs t-num text-[var(--text-muted-cool)]">{subtitle}</span>}
      </span>
      {trailing !== undefined && (
        <span className="flex shrink-0 flex-col items-end">
          <span className="t-sm t-num font-bold text-[var(--blue-lit)]">{trailing}</span>
          {trailingLabel && <span className="t-xs text-[var(--text-muted-cool)]">{trailingLabel}</span>}
        </span>
      )}
    </button>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupCard };
