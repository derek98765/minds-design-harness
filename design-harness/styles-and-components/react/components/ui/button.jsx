import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        // ── Filled ──────────────────────────────────────────────────────────
        // Primary: orange — use on any background
        primary:
          "rounded-full bg-brand-orange-01 text-base-white hover:brightness-110",
        // Secondary: blue — use on light backgrounds
        secondary:
          "rounded-full bg-brand-blue-01 text-base-white hover:brightness-125",
        // Tertiary dark: black — use on light backgrounds
        tertiary:
          "rounded-full bg-neutral-900 text-base-white hover:bg-neutral-600",
        // Tertiary light: white — use on dark/coloured backgrounds
        "tertiary-light":
          "rounded-full bg-base-white text-neutral-900 hover:bg-neutral-50",

        // ── Outline ─────────────────────────────────────────────────────────
        // Matches the outlined row in Figma
        "outline-primary":
          "rounded-full border border-brand-orange-01 bg-transparent text-brand-orange-01 hover:bg-brand-orange-01 hover:text-base-white",
        "outline-secondary":
          "rounded-full border border-brand-blue-01 bg-transparent text-brand-blue-01 hover:bg-brand-blue-01 hover:text-base-white",
        "outline-tertiary":
          "rounded-full border border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-base-white",
        // Muted outline — "View all minds" style (neutral-400 border)
        "outline-muted":
          "rounded-full border border-neutral-400 bg-transparent text-semantic-text hover:border-neutral-900 hover:text-neutral-900",
        // Light outline — for dark/coloured backgrounds
        "outline-light":
          "rounded-full border border-neutral-50 bg-transparent text-neutral-50 hover:bg-base-white hover:text-neutral-900",

        // ── Disabled ────────────────────────────────────────────────────────
        // A flat grey status pill ("Current plan"), not a faded button: no
        // border and no opacity drop, so it reads as a state, not an action.
        // Pair it with the `disabled` attribute.
        disabled:
          "rounded-full bg-neutral-100 text-neutral-400 cursor-default disabled:opacity-100",

        // ── Link / text ──────────────────────────────────────────────────────
        "link-primary":
          "bg-transparent font-semibold !px-0 text-brand-orange-01 underline underline-offset-4 hover:brightness-110",
        "link-secondary":
          "bg-transparent font-semibold !px-0 text-brand-blue-01 underline underline-offset-4 hover:text-brand-blue-02",
        "link-dark":
          "bg-transparent font-semibold !px-0 text-neutral-900 underline underline-offset-4 hover:text-neutral-600",
        "link-muted":
          "bg-transparent font-semibold !px-0 text-neutral-600 underline underline-offset-4 hover:text-neutral-900",

        // ── Legacy brand aliases (ProfilePage) ──────────────────────────────
        "brand-primary":
          "rounded-full bg-brand-blue-01 text-base-white hover:bg-brand-blue-02",
        "brand-outline-blue":
          "rounded-full border border-brand-blue-01 bg-transparent text-brand-blue-01 hover:bg-brand-blue-01 hover:text-base-white",
        "brand-ghost-blue":
          "rounded-full border border-neutral-400 bg-transparent text-semantic-text hover:border-brand-blue-01 hover:text-brand-blue-01",
        "brand-ghost-orange":
          "rounded-full border border-neutral-400 bg-transparent text-semantic-text hover:border-brand-orange-01 hover:text-brand-orange-01",
        "brand-chip":
          "rounded-full bg-base-white text-brand-blue-01 border border-neutral-200 hover:bg-brand-blue-01 hover:text-base-white hover:border-brand-blue-01",
        "brand-arrow":
          "rounded-full bg-base-white text-semantic-text border border-neutral-200 hover:bg-brand-blue-01 hover:text-base-white hover:border-brand-blue-01",
        "icon-circle":
          "rounded-full bg-base-white text-brand-orange-01 border border-neutral-200 hover:bg-brand-orange-01 hover:text-base-white hover:border-brand-orange-01",

        // ── Legacy shadcn (kept for non-homepage usage) ──────────────────────
        default: "rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "rounded-md bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "rounded-md hover:bg-accent hover:text-accent-foreground",
        link: "rounded-md text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Brand pill sizes
        md: "px-[32px] py-[16px] text-[18px] leading-[26px]",
        sm: "px-[32px] py-[8px] text-[16px] leading-[24px]",
        "sm-tall": "px-[32px] py-[12px] text-[16px] leading-[24px]",
        lg: "px-[40px] py-[12px] text-[18px] leading-[26px]",
        xl: "px-[64px] py-[20px] text-[20px] leading-[28px]",
        // No padding — for link/text variants
        none: "p-0 text-[16px] leading-[24px]",
        // Legacy shadcn sizes
        default: "h-9 px-4 py-2 text-sm",
        "legacy-sm": "h-8 rounded-md px-3 text-xs",
        "legacy-lg": "h-10 rounded-md px-8",
        icon: "h-9 w-9 rounded-md",
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
