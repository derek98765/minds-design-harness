import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

/**
 * Checkbox paired with a clickable label — the shared pattern for consent /
 * acknowledgement rows (e.g. terms & privacy, Telegram link gate).
 *
 * Wraps the base <Checkbox> in a <label> so the whole row is clickable, and
 * applies the standard 18px brand-orange styling in ONE place so every usage
 * stays consistent.
 *
 * @param {object} props
 * @param {string} [props.id] - id forwarded to the Checkbox (for a11y / testing).
 * @param {boolean} props.checked - Controlled checked state.
 * @param {(checked: boolean) => void} props.onCheckedChange - Change handler.
 * @param {boolean} [props.disabled] - Disables the checkbox and dims the row.
 * @param {string} [props.className] - Extra classes for the <label> wrapper.
 * @param {string} [props.checkboxClassName] - Extra classes for the Checkbox.
 * @param {string} [props.labelClassName] - Extra classes for the label text span.
 * @param {React.ReactNode} props.children - Label content rendered beside the box.
 */
export function CheckboxField({
  id,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  checkboxClassName,
  labelClassName,
  children,
  ...props
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-12 cursor-pointer select-none group",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "mt-[2px] shrink-0 size-[18px] rounded-[4px] border-neutral-300 cursor-pointer hover:border-brand-orange-01",
          checkboxClassName
        )}
        {...props}
      />
      <span className={cn("text-body text-neutral-900 leading-body", labelClassName)}>
        {children}
      </span>
    </label>
  );
}
