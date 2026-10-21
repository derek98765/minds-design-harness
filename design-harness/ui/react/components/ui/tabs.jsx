import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Minds tabs — two shapes, same root primitive.
 *
 * Pill variant (TabsList/TabsTrigger below): pill triggers on a quiet track,
 * active tab fills indigo. Use for a tight, contained group — switching a
 * card or panel's content.
 *
 * Underline variant (TabsListUnderline/TabsTriggerUnderline further down):
 * active label + underline bar in brand-blue-500, no fill, full-width
 * neutral-200 baseline under the row. Use for top-level page/section
 * navigation (e.g. "Minds (21)" / "My Network"). Comes in two sizes —
 * `sm` (default) for a secondary nav row, `lg` for a page's primary section
 * switcher, where the tabs need to hold their own against a headline.
 *
 * Don't mix the two shapes within one tab group. See DESIGN.md §4 Tabs,
 * Dropdowns & Selection State.
 */
const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn("flex flex-col gap-24", className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex w-fit items-center gap-4 rounded-full bg-beige-100 p-4",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-8 whitespace-nowrap rounded-full px-24 py-8",
      "text-body-default font-semibold text-neutral-600 transition-colors cursor-pointer",
      "hover:text-neutral-900",
      "data-[state=active]:bg-brand-blue-500 data-[state=active]:text-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("outline-none", className)} {...props} />
));
TabsContent.displayName = "TabsContent";

/**
 * Underline variant — top-level page/section navigation (e.g. "Minds (21)" /
 * "My Network"), not a contained panel switch. TabsListUnderline carries the
 * full-width neutral-200 baseline; each trigger owns its own transparent
 * bottom border that flips to brand-blue-500 when active. Share one root
 * `Tabs` and `TabsContent` between both variants — only List/Trigger differ.
 *
 * `size` on TabsListUnderline sets the gap between tabs; pass the matching
 * `size` to every TabsTriggerUnderline in that list — the two scales are
 * tuned as a pair, not independently.
 */
const tabsListUnderlineVariants = cva("flex items-center border-b border-neutral-200", {
  variants: {
    size: {
      sm: "gap-20",
      lg: "gap-36",
    },
  },
  defaultVariants: { size: "sm" },
});

const TabsListUnderline = React.forwardRef(({ className, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListUnderlineVariants({ size }), className)}
    {...props}
  />
));
TabsListUnderline.displayName = "TabsListUnderline";

const tabsTriggerUnderlineVariants = cva(
  "border-0 border-transparent px-0 font-semibold uppercase tracking-wide text-neutral-600 transition-colors cursor-pointer hover:text-neutral-900 data-[state=active]:text-brand-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // sm holds the original size exactly. lg steps the type up one tier
      // (body-small -> body-large) and thickens the active bar from 2px to
      // 4px so it still reads next to a bigger headline — the same reasoning
      // as the button sizes, where a bigger control needs a bit more of
      // everything, not just a bigger font. 4px, not an arbitrary 3px: this
      // project has no border-width token scale, so border weight is a
      // Tailwind default step (border-2 / border-4), never a bracket value.
      size: {
        sm: "border-b-2 py-8 text-body-small",
        lg: "border-b-4 py-12 text-body-large",
      },
    },
    defaultVariants: { size: "sm" },
  }
);

const TabsTriggerUnderline = React.forwardRef(({ className, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerUnderlineVariants({ size }),
      "data-[state=active]:border-brand-blue-500",
      className
    )}
    {...props}
  />
));
TabsTriggerUnderline.displayName = "TabsTriggerUnderline";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsListUnderline,
  TabsTriggerUnderline,
};
