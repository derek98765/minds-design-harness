import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds pagination. Rounded-square page buttons (radius-sm, not a pill or a
 * circle) — the active page fills brand-blue-500; inactive pages stay plain
 * text. See DESIGN.md §4 Pills, Chips & Badges for why a small solid-blue
 * page marker doesn't need to be orange: it's a selected-state indicator,
 * not a call to action.
 *
 * Collapses to first + last + current±1 with an ellipsis once there are
 * more than 7 pages; renders every page inline otherwise.
 *
 * `size` — `sm` (default) is the original, unchanged. `lg` steps everything
 * up together (box, type, icon, gap), the same reasoning as the button and
 * underline-tab sizes: a bigger control needs more of everything, not just
 * a bigger font. Use `lg` for a page's primary list, `sm` inside a dense
 * table or card.
 */
const SIZE = {
  sm: { box: "size-24", text: "text-body-small", icon: 16, gap: "gap-4" },
  lg: { box: "size-36", text: "text-body-default", icon: 18, gap: "gap-8" },
};

function getPageNumbers(page, pageCount) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);
}

function Pagination({ page, pageCount, onPageChange, size = "sm", className }) {
  const pages = getPageNumbers(page, pageCount);
  const s = SIZE[size];

  return (
    <nav className={cn("flex items-center", s.gap, className)} aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-sm text-neutral-600",
          s.box,
          page <= 1 ? "cursor-default opacity-40" : "cursor-pointer hover:bg-beige-100"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft size={s.icon} />
      </button>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {showEllipsis && (
              <span className={cn("flex items-center justify-center font-semibold text-neutral-600", s.box, s.text)}>
                …
              </span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "flex shrink-0 cursor-pointer items-center justify-center rounded-sm",
                s.box,
                s.text,
                p === page
                  ? "bg-brand-blue-500 font-bold text-white"
                  : "font-semibold text-neutral-600 hover:bg-beige-100"
              )}
            >
              {p}
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-sm text-neutral-600",
          s.box,
          page >= pageCount ? "cursor-default opacity-40" : "cursor-pointer hover:bg-beige-100"
        )}
        aria-label="Next page"
      >
        <ChevronRight size={s.icon} />
      </button>
    </nav>
  );
}

export { Pagination };
