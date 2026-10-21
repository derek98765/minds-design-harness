import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Minds field label — the Launch modal's prompt line above its task box:
 * body size, regular weight, --text-body-cool. The field carries the weight;
 * the label just introduces it.
 */
function Label({ className, ...props }) {
  return (
    <label
      className={cn("m-0 text-body-default leading-body text-[var(--text-body-cool)]", className)}
      {...props}
    />
  );
}

export { Label }
