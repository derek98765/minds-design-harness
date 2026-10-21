import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds radio. The circle follows the checked-control rule (DESIGN.md §4
 * Inputs): unchecked stays neutral, checked is a lit blue solid — the blue
 * gradient plus its shadow — with a white check. Never orange.
 *
 * `RadioGroupCard` wraps the circle in a full selectable row/card, matching
 * the redeem-flow pattern: the card itself flips to a solid --blue-lit fill
 * with white text when selected. On that blue card the circle inverts to
 * white with a blue check, so it doesn't vanish into the fill.
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("flex flex-col gap-8", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "flex size-16 shrink-0 items-center justify-center rounded-full border border-neutral-400 bg-white",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-[image:var(--gradient-blue)] data-[state=checked]:shadow-[var(--shadow-lit-blue)]",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator>
      <Check size={10} strokeWidth={3} className="text-white" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

function RadioGroupCard({ value, selected, onSelect, title, subtitle, trailing, trailingLabel, className }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "flex items-center gap-8 rounded-md border p-12 text-left transition-colors cursor-pointer",
        selected
          ? "border-transparent bg-brand-blue-500"
          : "border-neutral-200 bg-white hover:border-brand-blue-200",
        className
      )}
    >
      <span
        className={cn(
          "flex size-16 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-white bg-white" : "border-neutral-400 bg-white"
        )}
      >
        {selected && <Check size={10} strokeWidth={3} className="text-[var(--blue-lit)]" />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn("truncate text-body-default font-bold leading-body", selected ? "text-white" : "text-neutral-900")}>
          {title}
        </span>
        {subtitle && (
          <span className={cn("truncate text-body-small", selected ? "text-brand-blue-200" : "text-neutral-400")}>
            {subtitle}
          </span>
        )}
      </span>
      {trailing !== undefined && (
        <span className="flex shrink-0 flex-col items-end">
          <span className={cn("text-body-default font-bold leading-body", selected ? "text-white" : "text-brand-blue-500")}>
            {trailing}
          </span>
          {trailingLabel && (
            <span className={cn("text-body-xsmall leading-body", selected ? "text-brand-blue-200" : "text-neutral-400")}>
              {trailingLabel}
            </span>
          )}
        </span>
      )}
    </button>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupCard };
