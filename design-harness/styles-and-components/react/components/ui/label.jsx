import * as React from "react"
import { cn } from "@/lib/utils"

function Label({ className, ...props }) {
  return (
    <label
      className={cn("m-0 font-normal text-neutral-900", className)}
      style={{ fontSize: "18px", lineHeight: "29px", opacity: 0.8 }}
      {...props}
    />
  );
}

export { Label }
