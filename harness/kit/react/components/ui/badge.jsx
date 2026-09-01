import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Minds badge. Always a pill, always uppercase caption type.
 * Tint surfaces only — a badge is a label, never an action.
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center gap-4 rounded-full px-12 py-4 text-caption font-medium uppercase whitespace-nowrap",
  {
    variants: {
      variant: {
        orange: "bg-brand-orange-100 text-brand-orange-800",
        blue: "bg-brand-blue-100 text-brand-blue-700",
        neutral: "bg-neutral-100 text-neutral-700",
        success: "bg-[color:var(--color-success)] text-white",
        outline: "border border-neutral-200 bg-white text-neutral-900",
      },
    },
    defaultVariants: { variant: "blue" },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
));
Badge.displayName = "Badge";

export { Badge, badgeVariants };
