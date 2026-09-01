import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "leading-body",
        // Font-size lives in a class (not inline) so callers can override it responsively
        // — e.g. a 16px-on-mobile floor to stop iOS auto-zooming on focus. Default 18px is
        // already ≥16px, so the default case never zooms.
        "flex-1 min-w-0 bg-transparent border-none outline-none text-neutral-900 placeholder:text-neutral-400 font-[family-name:var(--font-family-primary)] text-[18px]",
        className
      )}
      {...props}
    />
  );
}

export { Input }
