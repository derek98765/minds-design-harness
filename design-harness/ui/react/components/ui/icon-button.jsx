import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minds icon button — round, white, a cool hairline and a soft drop (the
 * Profile Mind card's "…" button, .icon-btn-v2 in tokens.css). Hover keeps the
 * white fill and lights the icon and edge blue.
 *
 * Use it for repeated secondary actions — a "more" menu on every card in a
 * grid — never a text button repeated down a list. `label` is required: it
 * becomes the accessible name and the tooltip.
 */
const IconButton = React.forwardRef(({ label, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label={label}
    title={label}
    className={cn("icon-btn-v2", className)}
    {...props}
  >
    {children}
  </button>
));
IconButton.displayName = "IconButton";

export { IconButton };
