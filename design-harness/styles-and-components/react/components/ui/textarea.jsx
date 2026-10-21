import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared multi-line text input — matches the Launch a Mind modal's task box
 * in animocaminds-frontend (.textarea-v2 in tokens.css): white, --r-lg
 * corners, a --line-strong-cool edge that turns --blue-lit on focus.
 *
 * 16px on phones keeps iOS Safari from zooming on focus. Route new textareas
 * through this component so that fix stays in one place.
 */
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} data-slot="textarea" className={cn("textarea-v2", className)} {...props} />
));
Textarea.displayName = "Textarea";

export { Textarea };
