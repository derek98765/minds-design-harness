import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/**
 * Minds sort dropdown — a pill trigger showing the current choice, opening a
 * flat list of options. The active option goes brand-blue-500 + semibold;
 * no checkmark, no fill — see DESIGN.md §4 Tabs, Dropdowns & Selection State.
 *
 * `options` is `{ value, label }[]`.
 */
function SortDropdown({ options, value, onChange, prefix = "Sort:", className }) {
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-36 shrink-0 cursor-pointer items-center gap-8 whitespace-nowrap rounded-full border border-neutral-200 px-16 text-body-small font-medium text-neutral-900 hover:border-neutral-400",
          className
        )}
      >
        <span className="hidden text-neutral-600 md:inline">{prefix}</span>
        <span>{current?.label}</span>
        <ChevronDown size={14} strokeWidth={2.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-160">
        {options.map((o) => (
          <DropdownMenuItem key={o.value} active={o.value === value} onSelect={() => onChange(o.value)}>
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SortDropdown };
