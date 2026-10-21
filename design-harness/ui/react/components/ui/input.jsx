import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds text inputs — match the Profile pages in animocaminds-frontend. The
 * look lives in tokens.css; pick by the field's JOB:
 *
 * `Input` — the page's primary input, the one thing a step asks for (Redeem's
 * code, the Launch modal's Mind name). A raised white pill to type into: a
 * --line-strong-cool hairline, an inset --blue-lit ring on focus, bold typed
 * text (.field-v2). `size="lg"` is the Launch modal's taller field. Pass
 * `action` for an inline control at the right end, e.g. a "Suggest" button
 * (give it className="field-action-v2").
 *
 * `SearchInput` — a filter over content beside it, so a recessed grey well
 * that turns white on focus (.search-v2). Shows a clear button once there's
 * text. Same on every page.
 *
 * Both render at 16px on phones so iOS Safari doesn't zoom on focus.
 */
const Input = React.forwardRef(({ className, size = "md", action, type = "text", ...props }, ref) => {
  const fieldClass = cn("field-v2", size === "lg" && "field-v2-lg");
  if (!action) {
    return <input ref={ref} type={type} className={cn(fieldClass, className)} {...props} />;
  }
  return (
    <div className={cn(fieldClass, className)}>
      <input ref={ref} type={type} {...props} />
      {action}
    </div>
  );
});
Input.displayName = "Input";

const SearchInput = React.forwardRef(
  ({ className, value, onChange, onClear, placeholder = "Search…", ...props }, ref) => (
    <div className={cn("search-v2", className)}>
      <Search size={16} strokeWidth={2.2} aria-hidden="true" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={props["aria-label"] ?? placeholder}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="search-clear-v2"
        >
          <X size={14} strokeWidth={2.6} />
        </button>
      )}
    </div>
  )
);
SearchInput.displayName = "SearchInput";

export { Input, SearchInput };
