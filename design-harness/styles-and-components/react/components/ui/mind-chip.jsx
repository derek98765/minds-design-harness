import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

function MindChipGroup({ className, ...props }) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      data-slot="mind-chip-group"
      className={cn("flex flex-wrap gap-[8px] items-center", className)}
      {...props}
    />
  );
}

function MindChip({ className, children, ...props }) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="mind-chip"
      className={cn(
        "group inline-flex items-center gap-[6px] cursor-pointer rounded-[100px] whitespace-nowrap",
        "transition-[background-color,border-color,color]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-01",
        "px-[12px] py-[6px] border border-solid",
        "bg-base-white border-neutral-200 text-neutral-600 hover:border-neutral-400",
        "data-[state=on]:bg-brand-orange-05 data-[state=on]:border-brand-orange-01 data-[state=on]:text-neutral-900 data-[state=on]:font-semibold",
        className
      )}
      style={{ fontSize: "12px", lineHeight: "normal" }}
      {...props}
    >
      {children}
      <svg
        className="hidden group-data-[state=on]:inline-block shrink-0"
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="var(--color-brand-orange-01)" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </ToggleGroupPrimitive.Item>
  );
}

export { MindChipGroup, MindChip };
