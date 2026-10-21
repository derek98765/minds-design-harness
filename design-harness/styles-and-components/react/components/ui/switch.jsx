import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/**
 * Minds on/off switch — matches the Profile page's OnlineToggle (MindDetail.jsx
 * in animocaminds-frontend). For a binary "running" state, like a Mind being
 * online. The look lives in tokens.css (.switch-v2, .switch-knob-v2,
 * .switch-shell-v2):
 *  - a bevelled solid, not a flat capsule: green when on (a status, not an
 *    action — neither blue nor orange), neutral grey when off;
 *  - the knob reads as a hole punched through the solid.
 *
 * `labels` (default) wraps the switch in the lifted white shell with "Off" and
 * "On" at its sides; the active side goes bold, and green for On. Pass
 * `labels={false}` for the bare track, e.g. in a row with its own label.
 * Either way, give it an `aria-label` — the Off/On words are decoration.
 *
 * `pending` dims the whole control and blocks input while a slow write runs.
 *
 * Don't use it for a choice among options — that's a segmented filter, which
 * marks the current option in --blue-lit.
 */
const Switch = React.forwardRef(
  (
    {
      labels = true,
      offLabel = "Off",
      onLabel = "On",
      pending = false,
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // Track the value ourselves when uncontrolled, so the label shell knows
    // which side to bold.
    const [inner, setInner] = React.useState(defaultChecked);
    const checked = checkedProp ?? inner;

    const track = (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn("switch-v2", !labels && className)}
        checked={checked}
        onCheckedChange={(v) => {
          setInner(v);
          onCheckedChange?.(v);
        }}
        disabled={pending || disabled}
        aria-busy={pending || undefined}
        {...props}
      >
        <SwitchPrimitive.Thumb className="switch-knob-v2" />
      </SwitchPrimitive.Root>
    );

    if (!labels) return track;

    return (
      <div
        className={cn("switch-shell-v2", pending && "opacity-50", className)}
        data-state={checked ? "checked" : "unchecked"}
      >
        <span className="switch-label-off-v2" aria-hidden="true">{offLabel}</span>
        {track}
        <span className="switch-label-on-v2" aria-hidden="true">{onLabel}</span>
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
