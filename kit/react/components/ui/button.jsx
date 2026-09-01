import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * Minds button.
 *
 * Every variant is a pill — there is no square button in this design system.
 * Text is extrabold at all sizes; the generous horizontal padding is part of
 * the brand silhouette, not an accident.
 *
 * Use `primary` (orange) on any background, and only ONE per section.
 * `secondary` / `tertiary` on light backgrounds; `tertiary-light` /
 * `outline-light` on the indigo canvas or over photography.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-extrabold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        // ── Filled ────────────────────────────────────────────────────────
        // The action color. One per section.
        primary:
          "bg-brand-orange-500 text-white hover:brightness-110",
        // Structure. Light backgrounds only.
        secondary:
          "bg-brand-blue-500 text-white hover:brightness-125",
        tertiary:
          "bg-neutral-900 text-white hover:bg-neutral-600",
        // For dark / coloured backgrounds.
        "tertiary-light":
          "bg-white text-neutral-900 hover:bg-neutral-50",

        // ── Outline ───────────────────────────────────────────────────────
        "outline-primary":
          "border border-brand-orange-500 bg-transparent text-brand-orange-500 hover:bg-brand-orange-500 hover:text-white",
        "outline-secondary":
          "border border-brand-blue-500 bg-transparent text-brand-blue-500 hover:bg-brand-blue-500 hover:text-white",
        // The quiet companion to a primary CTA.
        "outline-muted":
          "border border-neutral-400 bg-transparent text-neutral-900 hover:border-neutral-900",
        // For dark / coloured backgrounds.
        "outline-light":
          "border border-beige-100 bg-transparent text-beige-100 hover:bg-white hover:text-neutral-900",

        // ── Link ──────────────────────────────────────────────────────────
        "link-primary":
          "bg-transparent !px-0 font-semibold text-brand-orange-500 underline underline-offset-4 hover:brightness-110",
        "link-secondary":
          "bg-transparent !px-0 font-semibold text-brand-blue-500 underline underline-offset-4 hover:text-brand-blue-400",
      },
      size: {
        sm: "px-36 py-8 text-[16px]",
        "sm-tall": "px-36 py-12 text-[16px]",
        md: "px-36 py-16 text-[18px]",
        lg: "px-40 py-12 text-[18px]",
        xl: "px-60 py-20 text-[20px]",
        // Link variants carry no padding.
        none: "p-0 text-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
