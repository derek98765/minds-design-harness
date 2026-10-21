import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds checkbox. Unchecked is a white square with a cool hairline; checked
 * is a lit blue solid — the blue gradient plus its shadow — with a white
 * check. Never orange (DESIGN.md §4 Inputs). Pair it with a <label>.
 */
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-[var(--line-strong-cool)] bg-white",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-[image:var(--gradient-blue)] data-[state=checked]:shadow-[var(--shadow-lit-blue)]",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--blue)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check size={12} strokeWidth={3.5} className="text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
