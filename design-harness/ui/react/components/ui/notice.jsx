import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minds inline notice — the Profile pages' callout ("This Mind is offline",
 * .notice-v2 in tokens.css). A soft tinted wash with a matching hairline, a
 * small gradient badge, a bold title, a quieter line, and an optional inline
 * action.
 *
 * `tone`: "warning" (default, the orange family) or "info" (blue).
 * Use it for a state the reader should know about on this screen; a result
 * of something they just did belongs in a toast instead.
 */
function Notice({ tone = "warning", title, children, action, onAction, className }) {
  return (
    <div role="status" className={cn("notice-v2", tone === "info" && "info", className)}>
      <span className="notice-mark-v2" aria-hidden="true">{tone === "info" ? "i" : "!"}</span>
      <p className="m-0">
        {title && <b>{title} </b>}
        {children}
        {action && (
          <>
            {" "}
            <button type="button" className="notice-action-v2" onClick={onAction}>
              {action}
            </button>
            .
          </>
        )}
      </p>
    </div>
  );
}

export { Notice };
