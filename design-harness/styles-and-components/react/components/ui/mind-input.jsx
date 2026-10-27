import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function MindInput({ className, style, inputClassName, size = "default", as = "input", rows = 3, leftSlot, rightSlot, muted, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const paddingClass = size === "sm"
    ? "px-[20px] py-[14px]"
    : "px-24 py-16";

  return (
    <div
      className={cn(
        "flex items-center rounded-[8px] border transition-colors duration-200",
        muted ? "bg-neutral-100 cursor-not-allowed" : "bg-base-white",
        paddingClass,
        className
      )}
      style={{ borderColor: muted ? "var(--color-neutral-200)" : focused ? "var(--color-neutral-900)" : "var(--color-neutral-200)", ...style }}
    >
      {leftSlot && <span className="shrink-0 mr-[10px] flex items-center">{leftSlot}</span>}
      {as === "textarea" ? (
        <textarea
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            // 16px on mobile keeps iOS from auto-zooming on focus; 14px from md+ matches the design.
            "flex-1 min-w-0 bg-transparent border-none outline-none resize-none placeholder:text-neutral-400 w-full text-[16px] md:text-[14px]",
            inputClassName
          )}
          style={{
            lineHeight: "23px",
            color: "var(--color-neutral-900)",
            fontFamily: "var(--font-family-primary)",
          }}
          {...inputProps}
        />
      ) : (
        <Input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // 16px on mobile keeps iOS from auto-zooming on focus; 14px from md+ matches the design.
          className={cn(size === "sm" && "text-[16px] md:text-[14px]", inputClassName)}
          style={size === "sm" ? { lineHeight: "1.55", color: "var(--color-neutral-900)", fontFamily: "var(--font-family-primary)" } : undefined}
          {...inputProps}
        />
      )}
      {rightSlot && <span className="shrink-0 ml-[10px] flex items-center">{rightSlot}</span>}
    </div>
  );
}

export { MindInput };
