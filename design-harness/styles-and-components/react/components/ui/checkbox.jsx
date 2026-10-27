"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-neutral-400 bg-base-white transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-brand-orange-01 focus-visible:ring-2 focus-visible:ring-brand-orange-01/40 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-brand-orange-01 data-[state=checked]:bg-brand-orange-01 data-[state=checked]:text-base-white",
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5">
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox }
