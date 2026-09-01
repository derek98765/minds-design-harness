import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minds card.
 *
 * Background rule: white cards on the warm canvas, warm-canvas cards on white.
 * Never the same tone as the section behind them.
 *
 * Shadow is none by default — separation comes from background change and
 * whitespace, not elevation. Pass `hover` only where the card genuinely lifts.
 */
const Card = React.forwardRef(
  ({ className, surface = "white", hover = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-neutral-200 p-24",
        surface === "white" ? "bg-white" : "bg-beige-100",
        hover && "transition-shadow hover:shadow-hover",
        className
      )}
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
  <h3 ref={ref} className={cn("text-h4 font-extrabold leading-heading", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-body-large text-neutral-600 leading-body", className)} {...props} />
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
