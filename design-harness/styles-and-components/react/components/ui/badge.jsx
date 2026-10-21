import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minds status pill — the Profile pages' Pill (kit.jsx; .pill-v2 in
 * tokens.css). Small (22px), bold, mixed case, on a soft wash of its own
 * colour. A label, never an action.
 *
 * `variant`: neutral (default) · success · blue · warning · error.
 * `dot` adds a leading dot in the pill's own colour — e.g. a Telegram row's
 * green "On".
 */
const Badge = React.forwardRef(({ className, variant = "neutral", dot = false, children, ...props }, ref) => (
  <span ref={ref} className={cn("pill-v2", variant !== "neutral" && variant, className)} {...props}>
    {dot && <span className="pill-dot-v2" />}
    {children}
  </span>
));
Badge.displayName = "Badge";

export { Badge };
