import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Shared multi-line text input.
 *
 * Font size is 16px on mobile and `text-body-lg` (also 16px) from md+. The
 * 16px floor stops iOS Safari from auto-zooming the page when the field is
 * focused — any field rendered below 16px triggers that zoom. Route new
 * textareas through this component so the fix stays in one place.
 *
 * The look is the launch modal's task box: white, a cool hairline border,
 * generous 20px/16px padding, large corners, no resize handle, a blue border
 * on focus. Set a height or rows through `className`/props; pass `resize-y`
 * if a field should be user-resizable.
 */
function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-[120px] px-20 py-16 rounded-[var(--r-lg)] bg-[var(--bg-card)] text-[var(--text-title-cool)] border border-[var(--line-strong-cool)] placeholder:text-[var(--text-label-neutral)] outline-none resize-none",
        "focus:border-[var(--blue-lit)] focus-visible:!shadow-none leading-body",
        "disabled:cursor-not-allowed disabled:opacity-45",
        // 16px on mobile keeps iOS from auto-zooming on focus; the design size from md+.
        "text-[16px] md:text-body-lg",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
