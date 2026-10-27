import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/**
 * Minds grouped filter — one glass trigger opening several option groups
 * (e.g. Status, Auth), each with its own current choice tinted blue with a
 * check. Same trigger and menu as SortDropdown (see dropdown-menu.jsx).
 * When there's only one group, use SortDropdown instead.
 *
 * `groups` is `{ label, value, onChange, options: { value, label, dot? }[] }[]`.
 * `activeCount` shows a small blue count on the trigger when any group has
 * moved off its default; omit or pass 0 to hide it.
 */
function FilterDropdown({ groups, activeCount = 0, label = "Filters", className }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <span className="inline-flex items-center gap-4">
          <SlidersHorizontal size={14} strokeWidth={2.4} />
          {label}
          {activeCount > 0 && (
            <span className="flex h-16 min-w-16 items-center justify-center rounded-full bg-[image:var(--gradient-blue)] px-4 text-body-xs font-bold leading-none text-white">
              {activeCount}
            </span>
          )}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-240">
        {groups.map((group, i) => (
          <React.Fragment key={group.label}>
            {i > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            {group.options.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                dot={opt.dot}
                selected={opt.value === group.value}
                onSelect={(e) => {
                  e.preventDefault(); // keep the menu open to set other groups
                  group.onChange(opt.value);
                }}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { FilterDropdown };
