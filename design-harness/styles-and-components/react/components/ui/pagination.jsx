import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds pagination — matches the Profile page's Pagination (kit.jsx in
 * animocaminds-frontend). The look lives in tokens.css (.page-btn-v2,
 * .page-arrow-v2, .page-gap-v2):
 *  - 36px CIRCLES, white with a cool hairline and a soft drop. A fixed square
 *    box, so "10" is no wider than "1" and the row stays even.
 *  - the current page is the lit blue solid (the Chat button's construction).
 *    It's a selected state, not a call to action, so it isn't orange.
 *  - the arrows have no container — they move around the numbers, they are
 *    not peers of them.
 *
 * Windowed: first, last, and the current page ±1, with "…" for the gaps.
 * Below 768px the window narrows to the current page alone (first … current
 * … last) — at ±1 the widest row is ~380px and overflows a 390px screen.
 * Narrowing beats wrapping: a pagination row on two lines reads as broken.
 */
function pageWindow(current, total, span) {
  const out = new Set([1, total]);
  for (let i = current - span; i <= current + span; i++) {
    if (i > 1 && i < total) out.add(i);
  }
  const pages = [...out].sort((a, b) => a - b);
  const withGaps = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) withGaps.push("…");
    withGaps.push(p);
  });
  return withGaps;
}

function useNarrow() {
  const query = "(max-width: 767px)";
  const [narrow, setNarrow] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return narrow;
}

function Pagination({ page, pageCount, onPageChange, className }) {
  const narrow = useNarrow();
  if (pageCount <= 1) return null;
  const items = pageWindow(page, pageCount, narrow ? 0 : 1);

  return (
    <nav className={cn("flex items-center gap-8", className)} aria-label="Pagination">
      <button
        type="button"
        className="page-arrow-v2"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={17} strokeWidth={2.4} />
      </button>

      {items.map((it, i) =>
        it === "…" ? (
          <span key={`gap-${i}`} className="page-gap-v2">
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            className="page-btn-v2"
            aria-current={it === page ? "page" : undefined}
            onClick={() => onPageChange(it)}
          >
            {it}
          </button>
        )
      )}

      <button
        type="button"
        className="page-arrow-v2"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={17} strokeWidth={2.4} />
      </button>
    </nav>
  );
}

export { Pagination };
