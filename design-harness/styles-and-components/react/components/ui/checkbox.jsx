import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds checkbox — matches the Profile Energy card's settings
 * (.checkbox-v2 in tokens.css). 18px; frosted with a cool hairline at rest,
 * the lit blue solid with a white check when on. Never orange.
 *
 * Pass `label` for the standard row — the box sits on the first line of a
 * body-cool label, 12px apart, and the whole row is clickable.
 */
const Checkbox = React.forwardRef(({ className, label, ...props }, ref) => {
  const box = (
    <CheckboxPrimitive.Root ref={ref} className={cn("checkbox-v2", !label && className)} {...props}>
      <CheckboxPrimitive.Indicator forceMount>
        <Check size={12} strokeWidth={3.4} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
  if (!label) return box;
  return (
    <label className={cn("flex cursor-pointer select-none items-start gap-12", className)}>
      <span className="mt-2 flex">{box}</span>
      <span className="t-sm text-[var(--text-body-cool)]">{label}</span>
    </label>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
