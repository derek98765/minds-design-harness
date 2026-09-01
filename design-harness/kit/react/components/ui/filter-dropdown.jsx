import * as React from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

/**
 * Minds filter dropdown — a pill trigger opening grouped option sections
 * (e.g. Status, Auth), each with an uppercase label and its own radio-like
 * option list. The active option per group gets a light indigo tint and a
 * checkmark — see DESIGN.md §4 Tabs, Dropdowns & Selection State.
 *
 * `groups` is `{ label, value, onChange, options: { value, label }[] }[]`.
 * `activeCount` renders a small numeric badge on the trigger when any group
 * has moved off its default; omit or pass 0 to hide it.
 */
function FilterDropdown({ groups, activeCount = 0, className }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-36 shrink-0 cursor-pointer items-center gap-8 whitespace-nowrap rounded-full border border-neutral-200 px-16 text-body-small font-medium text-neutral-900 hover:border-neutral-400",
          className
        )}
      >
        <SlidersHorizontal size={14} strokeWidth={2.5} />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="flex h-16 min-w-16 items-center justify-center rounded-full bg-brand-blue-500 px-4 text-caption font-bold leading-none text-white">
            {activeCount}
          </span>
        )}
        <ChevronDown size={14} strokeWidth={2.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-240 p-0">
        <div className="flex flex-col py-12">
          {groups.map((group, i) => (
            <React.Fragment key={group.label}>
              {i > 0 && <div className="my-12 border-t border-neutral-200" />}
              <FilterSection {...group} />
            </React.Fragment>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FilterSection({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="px-16 pb-2 pt-4 text-body-small font-bold uppercase tracking-wide text-neutral-900">
        {label}
      </span>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex cursor-pointer items-center justify-between px-16 py-8 text-body-small",
              active
                ? "bg-brand-blue-50 font-semibold text-brand-blue-500"
                : "text-neutral-900 hover:bg-beige-100"
            )}
          >
            <span>{opt.label}</span>
            {active && <Check size={14} strokeWidth={2.5} className="text-brand-blue-500" />}
          </button>
        );
      })}
    </div>
  );
}

export { FilterDropdown };
