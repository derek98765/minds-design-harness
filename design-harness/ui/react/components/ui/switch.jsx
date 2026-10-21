import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/**
 * Minds on/off switch — for a binary "running" state, like a Mind being
 * online. ON is the green lit gradient (--gradient-switch-on), OFF is the
 * neutral one (--gradient-switch-off). Green, not blue: ON is a status, not
 * a primary action. Not orange either (DESIGN.md §4 Inputs).
 *
 * Don't confuse it with a segmented filter (All / Online / Offline) — that is
 * a choice among options and marks the current one in --blue-lit.
 */
const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-24 w-48 shrink-0 cursor-pointer items-center rounded-full p-2",
      "bg-[image:var(--gradient-switch-off)] shadow-[inset_0_1px_0_var(--glass-card-line)]",
      "data-[state=checked]:bg-[image:var(--gradient-switch-on)]",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--blue)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block size-20 rounded-full bg-white shadow-[var(--elev-card)] transition-transform duration-150",
        "data-[state=checked]:translate-x-24 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };
