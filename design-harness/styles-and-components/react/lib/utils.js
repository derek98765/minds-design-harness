import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom tailwind-merge instance that knows about our `tokens.css` values.
 *
 * The default twMerge can't tell `text-body` (font-size token) apart
 * from `text-brand-blue-01` (color token) — both look like `text-*` utilities,
 * so it treats them as conflicting and keeps the last one. That strips the
 * variant's text color whenever a className passes a font-size utility.
 *
 * Registering each custom token under the correct class group (`font-size` vs
 * `text-color`, `bg-color`, `border-color`) lets twMerge keep both, so Derek's
 * variant defaults (text color + hover color) survive without manual `!text-*`
 * overrides at every call site.
 */

// The type scale in tokens.css. Every tier must be listed: an unlisted
// text-* is read as a colour and merged away against the element's colour.
const FONT_SIZES = [
  "display", "h1", "h2", "h3", "h4", "h5", "h6", "title",
  "body-xl", "body-lg", "body", "body-sm", "body-xs", "label",
];

const COLORS = [
  "brand-orange-01", "brand-orange-02", "brand-orange-03",
  "brand-blue-01", "brand-blue-02", "brand-blue-03",
  "neutral-50", "neutral-200", "neutral-400", "neutral-600", "neutral-900",
  "base-white", "base-black", "base-canvas-dark", "base-off-white",
  "semantic-primary", "semantic-accent",
  "semantic-text", "semantic-text-muted",
  "semantic-bg-light", "semantic-bg-dark",
  "semantic-success", "semantic-error", "semantic-warning",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: FONT_SIZES }],
      "text-color": [{ text: COLORS }],
      "bg-color": [{ bg: COLORS }],
      "border-color": [{ border: COLORS }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
