import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/**
 * Minds single-choice dropdown — sort order ("Recently Created"), a status
 * filter ("Online"), and the like. The glass trigger shows the current
 * option; the menu lists the rest, the current one tinted blue with a check.
 * See dropdown-menu.jsx for the look.
 *
 * `options` is `{ value, label, dot? }[]`. `dot` ("online" | "offline") puts a
 * status dot before the label, in the menu and on the trigger, e.g.
 * `{ value: "online", label: "Online", dot: "online" }`.
 * `menuClassName` sizes the panel; it defaults to w-200.
 */
function SortDropdown({ options, value, onChange, size, className, menuClassName = "w-200" }) {
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger dot={current?.dot} size={size} className={className}>
        {current?.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={menuClassName}>
        {options.map((o) => (
          <DropdownMenuItem
            key={o.value}
            dot={o.dot}
            selected={o.value === value}
            onSelect={() => onChange(o.value)}
          >
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SortDropdown };
