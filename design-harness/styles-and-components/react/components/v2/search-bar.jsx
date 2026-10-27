import { useRef } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "@/shims/i18n";

const SIZE_STYLES = {
  sm: {
    iconSize: 15,
    iconPos: "left-12",
    clearPos: "right-8",
    input: "h-[36px] pl-36 pr-24 text-[16px] md:text-body-sm",
  },
  lg: {
    iconSize: 18,
    iconPos: "left-16",
    clearPos: "right-16",
    input: "h-[48px] pl-48 pr-40 text-[16px]",
  },
};

/**
 * Reusable search input with clear button. Matches the connector modal search style.
 *
 * `v2` swaps in the profile's search field (My Minds / Connections, see
 * MindsTab.jsx): a solid neutral fill that turns white on focus, a hairline
 * border and an inset --blue-lit ring, at a fixed 40px. It ignores `size`.
 *
 * @param {{
 *   value: string,
 *   onChange: (v: string) => void,
 *   placeholder?: string,
 *   className?: string,
 *   size?: "sm" | "lg",
 *   v2?: boolean,
 * }} props
 */
export default function SearchBar({ value, onChange, placeholder, className = "", size = "sm", v2 = false }) {
  const { t } = useTranslation("common");
  const inputRef = useRef(null);
  const s = SIZE_STYLES[size];

  const iconSize = v2 ? 18 : s.iconSize;
  const iconClass = v2
    ? "left-12 text-[var(--text-label-neutral)]"
    : `${s.iconPos} text-semantic-text-muted`;
  const inputClass = v2
    ? // 16px on mobile keeps iOS from auto-zooming on focus.
      "h-[40px] pl-40 pr-[32px] rounded-[var(--r-pill)] bg-[var(--bg-field-neutral)] focus:bg-[var(--bg-card)] border border-[var(--line-neutral)] text-[16px] md:text-[14px] text-[var(--text-title-neutral)] placeholder:text-[var(--text-label-neutral)] outline-none focus-visible:!shadow-none focus:ring-1 focus:ring-[var(--blue-lit)] focus:ring-inset"
    : // 16px on mobile keeps iOS from auto-zooming on focus; sm drops to 13px (body-small) from md+ matches the design.
      `rounded-full border border-neutral-200 bg-base-white text-semantic-text placeholder:text-semantic-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue-02 focus:border-transparent ${s.input}`;
  const clearClass = v2
    ? "right-[6px] w-[24px] h-[24px] inline-flex items-center justify-center text-[var(--text-muted-neutral)] hover:text-[var(--text-title-neutral)] bg-transparent border-0 p-0"
    : `${s.clearPos} text-semantic-text-muted hover:text-semantic-text`;

  return (
    <div className={`relative min-w-0 ${className}`}>
      {/* z-10 keeps the icon above the input if it ever gains a stacking
          context (e.g. backdrop-filter), which would paint over it. */}
      <Search
        size={iconSize}
        strokeWidth={v2 ? 2.4 : 2}
        className={`absolute z-10 top-1/2 -translate-y-1/2 pointer-events-none ${iconClass}`}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? t("Search…")}
        className={`w-full ${inputClass}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(""); inputRef.current?.focus(); }}
          aria-label={t("Clear search")}
          className={`absolute z-10 top-1/2 -translate-y-1/2 cursor-pointer ${clearClass}`}
        >
          <X size={14} strokeWidth={v2 ? 2.6 : 2.5} />
        </button>
      )}
    </div>
  );
}
