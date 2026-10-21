import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Minds tabs — four shapes on one Radix root, matching the shipped pages in
 * animocaminds-frontend. The look lives in tokens.css (.tabs-*-v2 / .tab-*-v2).
 * Selected is always blue, never orange. Pick the shape by the job:
 *
 *  - "pill"    — two or three big choices (Launch modal: Templates | Custom).
 *                A soft grey track; blue labels; the selected pill is the blue
 *                gradient with white ink. Icons go solid when selected. Full
 *                width on phones.
 *  - "segment" — filters over a list (My Minds: All / Online / Offline).
 *                Free-standing pills, no track; only the selected one has a
 *                faint blue tint and edge. Takes `count` and `dot`.
 *  - "track"   — a small switcher inside a card (Mind detail: Skills | Apps).
 *                A frosted track; the selected option is a --glass-pill tint.
 *                `size="sm"` for a chart's range (1w 1m 3m).
 *  - "line"    — page sections (Referral: Refer a friend | Affiliate). Labels
 *                on a shared hairline; the selected one sits on a 2px gradient
 *                bar.
 *
 * Set `variant` on TabsList; every TabsTrigger inside follows it.
 */
const VariantContext = React.createContext("pill");

const LIST = {
  pill: "tabs-pill-v2",
  segment: "tabs-segment-v2",
  track: "tabs-track-v2",
  line: "tabs-line-v2",
};
const TRIGGER = {
  pill: "tab-pill-v2",
  segment: "tab-segment-v2",
  track: "tab-track-v2",
  line: "tab-line-v2",
};

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn("flex flex-col gap-24", className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, variant = "pill", size, ...props }, ref) => (
  <VariantContext.Provider value={variant}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(LIST[variant], variant === "track" && size === "sm" && "tabs-track-v2-sm", className)}
      {...props}
    />
  </VariantContext.Provider>
));
TabsList.displayName = "TabsList";

/** `count` (segment, track) shows a quieter number after the label.
 *  `dot` (segment) leads with a status dot: "online" | "offline". */
const TabsTrigger = React.forwardRef(({ className, count, dot, children, ...props }, ref) => {
  const variant = React.useContext(VariantContext);
  return (
    <TabsPrimitive.Trigger ref={ref} className={cn(TRIGGER[variant], className)} {...props}>
      {dot && <span className={`dot-${dot}-v2`} />}
      {children}
      {count != null && <span className="tab-count-v2">{count}</span>}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("outline-none", className)} {...props} />
));
TabsContent.displayName = "TabsContent";

// Kept so pages written against the older API still work.
const TabsListUnderline = React.forwardRef((props, ref) => <TabsList ref={ref} variant="line" {...props} />);
TabsListUnderline.displayName = "TabsListUnderline";
const TabsTriggerUnderline = TabsTrigger;

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsListUnderline, TabsTriggerUnderline };
