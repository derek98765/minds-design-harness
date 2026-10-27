/* ==========================================================================
   Glass menu — the inline styles that have to be literal
   --------------------------------------------------------------------------
   SEPARATE FILE ONLY so GlassMenu.jsx exports components and nothing else
   (react-refresh/only-export-components). Nothing here is meant to be used
   without it — see that file's header for the whole picture.

   WHY THESE ARE HEX AND NOT TOKENS: everything here renders inside Radix's
   portal to <body>, which is OUTSIDE `.v2`. A var(--…) that is out of scope
   does not error and does not fall back — the declaration is dropped, so a
   backgrounded row silently renders with no background at all. Each value
   names the token it mirrors so the two can be kept in step by hand.

   WORTH KNOWING, because it looks like an inconsistency next to MindsTab's
   own portalled SortRow (which uses var(--blue-lit) and works): tokens-v2.css
   defines MOST of its palette on :root, which DOES reach the portal — it is
   specifically the `--glass-*` family that is scoped under `.v2` and does not.
   So a token here is a coin flip depending on which block it happens to live
   in, and a later re-theme moving one between blocks would break it silently.
   Literals throughout, rather than auditing the scope of each name.
   ========================================================================== */

/** The panel. Spread onto DropdownMenuContent's `style`. */
export const GLASS_POPOVER_STYLE = {
  borderRadius: 18,
  padding: 6,
  background: "rgba(255,255,255,0.97)", // = --glass-outer
  border: "1px solid rgba(176,188,214,0.62)",
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  boxShadow:
    "0 24px 64px rgba(96,118,200,0.16), 0 8px 24px rgba(96,118,200,0.10), 0 2px 6px rgba(96,118,200,0.06)",
};

/** A hairline between groups of rows. */
export const GLASS_MENU_SEPARATOR_STYLE = {
  height: 1,
  margin: "6px 4px",
  background: "rgba(176,188,214,0.5)", // = --line-neutral
};

/** The blue a selected or hovered row's ink resolves to. = --blue-lit */
export const GLASS_MENU_ACTIVE_INK = "#425cb3";

/** Row ink at rest. = --text-body-neutral */
export const GLASS_MENU_INK = "#5f5a53";

/** The dimmer second line under a row's label. = --text-label-warm */
export const GLASS_MENU_SUBLABEL_INK = "#8c8880";

/** Selected and hover fills. = --glass-pill, and a lighter step of it. */
export const GLASS_MENU_SELECTED_BG = "rgba(205,218,248,0.36)";
export const GLASS_MENU_ACTIVE_BG = "rgba(205,218,248,0.22)";
