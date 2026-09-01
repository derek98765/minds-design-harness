import * as React from "react"
import { cn } from "@/lib/utils"

function Label({ className, ...props }) {
  return (
    <label
      className={cn("m-0 font-medium text-body-large leading-body text-neutral-900", className)}
      {...props}
    />
  );
}

export { Label }
