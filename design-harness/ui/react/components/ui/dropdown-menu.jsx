import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds dropdown — the shared Radix shell behind SortDropdown and
 * FilterDropdown. Matches the Profile pages' GlassTrigger + glass menu
 * (components/glass/GlassMenu.jsx in animocaminds-frontend); the look lives in
 * tokens.css (.select-v2, .menu-v2, .menu-item-v2):
 *  - the trigger is a frosted pill that turns --blue-lit on hover and while open;
 *  - the panel is near-solid white glass with a three-layer blue-grey drop;
 *  - the selected row is a --glass-pill tint in --blue-lit, bold, with a check.
 * Blue marks the current choice, never orange.
 */
function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/** The glass pill trigger. `dot` ("online" | "offline") leads the label with a status dot. */
const DropdownMenuTrigger = React.forwardRef(
  ({ className, children, dot, size = "md", ...props }, ref) => (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      className={cn("select-v2", size === "sm" && "select-v2-sm", className)}
      {...props}
    >
      {dot && <span className={cn("select-dot-v2", `dot-${dot}-v2`)} />}
      <span className="min-w-0 truncate">{children}</span>
      <ChevronDown size={14} strokeWidth={2.4} />
    </DropdownMenuPrimitive.Trigger>
  )
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

function DropdownMenuContent({ className, align = "end", sideOffset = 8, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        align={align}
        sideOffset={sideOffset}
        collisionPadding={16}
        className={cn("menu-v2 z-50", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/** A row. `selected` gives it the tint, the blue and the check. */
function DropdownMenuItem({ className, selected, dot, children, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-selected={selected ? "true" : undefined}
      className={cn("menu-item-v2", className)}
      {...props}
    >
      {dot && <span className={cn("menu-dot-v2", `dot-${dot}-v2`)} />}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {selected && <Check size={16} strokeWidth={3} />}
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuSeparator({ className, ...props }) {
  return <DropdownMenuPrimitive.Separator className={cn("menu-separator-v2", className)} {...props} />;
}

function DropdownMenuLabel({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("menu-label-v2", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
