/* ==========================================================================
   Glass menu primitives — shared dropdown trigger, panel and row
   --------------------------------------------------------------------------
   LIFTED OUT OF Profile/components/MindPicker.jsx, verbatim, when the hero
   composer needed the same dropdown. They live HERE — app-level, under neither
   sandbox — because both consumers would otherwise be reaching across:
   Profile importing from components/HeroComposerV2, or HomeV2 importing from
   pages/Profile (which HomeV2/index.jsx already calls out as the one place
   this sandbox reaches into the other, and does not want more of).

   THE PORTAL IS WHY HALF OF THIS IS INLINE-STYLED WITH LITERAL HEX. Radix
   portals DropdownMenuContent to <body>, which is OUTSIDE `.v2` — every
   page-scoped class and every var(--…) token is out of scope there. A custom
   property that fails to resolve does not error and does not fall back: the
   property is simply dropped, so `background: var(--glass-pill)` renders as
   no background at all and the row silently loses its selected state.

   So: the TRIGGER renders in the page and uses tokens normally; everything
   inside the panel is written literally. Those literals live in the sibling
   glassMenuStyles.js (a separate file only so this one exports components and
   nothing else), each naming the token it mirrors. Follow that split for
   anything added here.
   ========================================================================== */

import { forwardRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  GLASS_MENU_ACTIVE_BG,
  GLASS_MENU_ACTIVE_INK,
  GLASS_MENU_INK,
  GLASS_MENU_SELECTED_BG,
  GLASS_MENU_SUBLABEL_INK,
} from "./glassMenuStyles";

/** The glass toolbar control that opens a menu — the same treatment as My
 *  Minds' sort trigger (MindsTab.jsx), not a flat white pill.
 *
 *  Forwards its ref so Radix's `asChild` can attach `data-state` straight to
 *  this button rather than to a wrapping element — that is what lets the
 *  `data-[state=open]:` classes below actually fire.
 *
 *  @param leading  node rendered before the label — an avatar or an icon.
 *                  Distinct from `dot`, which is only ever a status colour.
 *  @param size     "md" (default, the 40px filter row) or "sm" (32px, for the
 *                  composer's control row, which has to fit inside a docked
 *                  one-line panel).
 */
export const GlassTrigger = forwardRef(function GlassTrigger(
  { children, dot, leading, size = "md", className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center gap-[6px] rounded-[var(--r-pill)] glass-ctl-v2",
        size === "sm" ? "h-[32px] px-12 max-w-full" : "h-[40px] px-16",
        "border border-[var(--line-neutral)] text-body-sm font-bold text-[var(--text-body-neutral)] cursor-pointer",
        "hover:text-[var(--blue-lit)] data-[state=open]:text-[var(--blue-lit)] data-[state=open]:border-[var(--blue-lit)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--line-hover-cool)] transition-colors",
        className
      )}
      {...rest}
    >
      {dot && <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: dot }} />}
      {leading && <span className="shrink-0 inline-flex items-center">{leading}</span>}
      {/* min-w-0 + truncate so a long Mind name shortens instead of stretching
          the trigger past its container — the composer's row has a send button
          to the right of this that must not be pushed off the edge. */}
      <span className="min-w-0 truncate">{children}</span>
      <ChevronDown size={14} strokeWidth={2.4} className="shrink-0 text-[var(--text-muted-cool)]" />
    </button>
  );
});

/**
 * One row in a glass menu.
 *
 * IS the DropdownMenuItem, not a child of one — that is what carries Radix's
 * roving focus, type-ahead and close-on-select. Wrapping a plain div in an
 * item instead would keep the look and quietly lose all three.
 *
 * @param leading   node before the label — an avatar or icon.
 * @param sublabel  a dimmer second line under the label.
 * @param large     a hero row: bigger label and sublabel, and the sublabel
 *                  wraps to as many lines as it needs instead of truncating.
 */
export function GlassMenuRow({ label, dot, leading, sublabel, large = false, selected, onSelect }) {
  const [active, setActive] = useState(false);
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        borderRadius: 11,
        fontSize: large ? 15 : 13,
        cursor: "pointer",
        outline: "none",
        color: selected || active ? GLASS_MENU_ACTIVE_INK : GLASS_MENU_INK,
        background: selected
          ? GLASS_MENU_SELECTED_BG
          : active
            ? GLASS_MENU_ACTIVE_BG
            : "transparent",
        transition: "background-color 140ms ease, color 140ms ease",
      }}
    >
      {dot && (
        <span style={{ width: 7, height: 7, borderRadius: 999, background: dot, flexShrink: 0 }} />
      )}
      {leading && <span style={{ flexShrink: 0, display: "inline-flex" }}>{leading}</span>}
      {/* minWidth:0 lets the label truncate rather than widen the panel. */}
      <span style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            display: "block",
            fontWeight: selected || active ? 700 : 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              display: "block",
              marginTop: 1,
              fontSize: large ? 13 : 11,
              fontWeight: 500,
              color: GLASS_MENU_SUBLABEL_INK,
              ...(large
                ? { whiteSpace: "normal" }
                : { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }),
            }}
          >
            {sublabel}
          </span>
        )}
      </span>
      {selected && (
        <span
          style={{
            marginLeft: "auto",
            flexShrink: 0,
            display: "inline-flex",
            width: 16,
            height: 16,
            color: GLASS_MENU_ACTIVE_INK,
          }}
          className="[&>svg]:!w-[16px] [&>svg]:!h-[16px] [&>svg]:!stroke-[#425cb3]"
        >
          <Check size={16} strokeWidth={3} />
        </span>
      )}
    </DropdownMenuItem>
  );
}
