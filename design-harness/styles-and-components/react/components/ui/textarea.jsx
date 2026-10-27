import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Shared multi-line text input.
 *
 * Font size is 16px on mobile and `text-body` (the design size) from
 * md+. The 16px floor stops iOS Safari from auto-zooming the page when the
 * field is focused — any field rendered below 16px triggers that zoom. Route
 * new textareas through this component so the fix stays in one place.
 *
 * Visual defaults match the in-app feedback/NPS textareas; override via
 * `className` as needed.
 */
function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-[96px] py-12 px-12 rounded-[10px] bg-base-white text-semantic-text border border-neutral-200 placeholder:text-neutral-400 outline-none resize-y focus:border-brand-blue-01",
        // 16px on mobile keeps iOS from auto-zooming on focus; design size from md+.
        "text-[16px] md:text-body",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
