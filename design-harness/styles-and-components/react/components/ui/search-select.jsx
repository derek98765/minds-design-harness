import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A dropdown with a search box, for choosing one option from a long list
 * (countries, timezones, currencies).
 *
 *   options           [{ value, label, icon? }] — `icon` is any node (an emoji, an <img>)
 *   value / onChange  the selected option's value; onChange gets the new value
 *   placeholder       trigger text while nothing is chosen
 *   searchPlaceholder / emptyLabel   the search field's hint and the no-match line
 *   openDirection     "down" (default) or "up" — open upward when the control sits
 *                     above a sticky footer that would clip the panel
 *   maxHeight         list height in px before it scrolls (default 220)
 *
 * Search matches the start of the label. Labels default to English; pass
 * translated strings from the caller.
 */
function SearchSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyLabel = "No results",
  maxHeight = 220,
  openDirection = "down",
  className,
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return options
    return options.filter(o => o.label.toLowerCase().startsWith(q))
  }, [options, search])

  const selected = useMemo(() => options.find(o => o.value === value), [options, value])

  const close = useCallback(() => {
    setOpen(false)
    setSearch("")
  }, [])

  const toggle = () => {
    if (open) return close()
    setSearch("")
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!open) return
    const onOutside = e => {
      if (!wrapperRef.current?.contains(e.target)) close()
    }
    const onEscape = e => {
      if (e.code === "Escape") close()
    }
    document.addEventListener("click", onOutside, true)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("click", onOutside, true)
      document.removeEventListener("keydown", onEscape)
    }
  }, [open, close])

  return (
    <div ref={wrapperRef} data-slot="search-select" className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-8 rounded-[var(--r-md)] border bg-[var(--bg-card)] px-16 py-12 cursor-pointer",
          "text-body-md leading-body transition-[border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-lit)]",
          open ? "border-[var(--text-title-cool)]" : "border-[var(--line-strong-cool)]",
          selected ? "font-semibold text-[var(--text-title-cool)]" : "font-medium text-[var(--text-muted-cool)]"
        )}>
        {selected ? (
          <span className="flex items-center gap-12">
            {selected.icon && <span className="text-[20px] leading-none">{selected.icon}</span>}
            <span>{selected.label}</span>
          </span>
        ) : (
          <span>{placeholder}</span>
        )}
        <ChevronDown size={16} className="shrink-0 text-[var(--text-muted-cool)]" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute inset-x-0 z-[200] flex flex-col overflow-hidden rounded-[var(--r-md)] border border-[var(--line-cool)] bg-[var(--bg-card)] shadow-[var(--elev-card-hover)]",
            openDirection === "up" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
          )}>
          <div className="border-b border-[var(--line-cool)] p-8">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              // 16px on mobile keeps iOS from zooming on focus.
              className="w-full rounded-[var(--r-sm)] border border-[var(--line-cool)] bg-[var(--bg-field-cool)] px-12 py-8 text-[16px] md:text-body-sm leading-body text-[var(--text-title-cool)] outline-none"
            />
          </div>
          <ul role="listbox" className="m-0 list-none overflow-y-auto p-0 scroll-cool-v2" style={{ maxHeight }}>
            {filtered.length === 0 && (
              <li className="px-16 py-12 text-body-sm leading-body text-[var(--text-muted-cool)]">{emptyLabel}</li>
            )}
            {filtered.map(opt => {
              const isSelected = value === opt.value
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value)
                    close()
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-12 px-16 py-12 text-body-md leading-body text-[var(--text-title-cool)]",
                    isSelected
                      ? "bg-[var(--blue-soft)] font-bold"
                      : "font-medium hover:bg-[var(--bg-panel-cool)]"
                  )}>
                  {opt.icon && <span className="text-[20px] leading-none">{opt.icon}</span>}
                  <span>{opt.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export { SearchSelect }
