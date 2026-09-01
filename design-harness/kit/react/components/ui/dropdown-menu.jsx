import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

/**
 * Minds dropdown menu — the shared Radix shell used by FilterDropdown and
 * SortDropdown (see filter-dropdown.jsx / sort-dropdown.jsx). Popover surface
 * is white with a neutral-200 hairline and a soft shadow, never the fill
 * colors used for a selected state — see DESIGN.md §4 Tabs, Dropdowns &
 * Selection State for the blue-means-"current choice" rule.
 */
function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger(props) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({ className, align = "start", sideOffset = 8, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-160 overflow-hidden rounded-md border border-neutral-200 bg-white p-4 text-neutral-900 shadow-hover",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ className, active, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "flex cursor-pointer items-center justify-between gap-8 rounded-sm px-12 py-8 text-body-small outline-none",
        active
          ? "font-semibold text-brand-blue-500"
          : "text-neutral-900 hover:bg-beige-100",
        className
      )}
      {...props}
    />
  );
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
