import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minds card — the Profile pages' Card (kit.jsx). Frosted glass on the cool
 * wash: translucent white, a --line-cool hairline, a lit top edge and a
 * blue-grey drop that deepens on hover, 20px in (.glass-card + .card-v2).
 * Needs a non-flat ground behind it (the page wash, plus .canvas-blooms on
 * marketing pages). Use a card only where it carries real content — a
 * divider separates things more quietly.
 */
const Card = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("glass-card card-v2 text-[var(--text-body-cool)]", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-8", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-h4 font-extrabold leading-heading text-[var(--text-title-cool)]", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-body-large text-[var(--text-body-cool)] leading-body", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-16", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-24 flex items-center gap-12", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
