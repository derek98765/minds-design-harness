import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props} />
  );
}

/**
 * RadioGroupItem — two modes:
 *
 * 1. Plain radio circle (default): no title prop passed.
 *    Renders just the styled circle indicator.
 *
 * 2. Card mode: pass `title` to get a full selectable card.
 *    Props:
 *      title       {string}          — required for card mode
 *      description {string}          — optional subtitle
 *      icon        {ReactNode}       — optional icon
 *      showRadio   {boolean}         — show/hide the radio circle (default: true)
 *      showRadioMobile {boolean}     — override radio visibility on mobile
 *      align       {"left"|"center"} — layout + text alignment (default: "left")
 *      titleSize   {string}          — CSS font-size for the title (default: "14px")
 */
function RadioGroupItem({
  className,
  title,
  description,
  icon,
  showRadio = true,
  showRadioMobile,
  align = "left",
  titleSize = "14px",
  value,
  ...props
}) {
  const isCard = !!title;
  const centered = align === "center";
  // showRadioMobile defaults to true for left-aligned cards with no icon (title+description style)
  const _showRadioMobile = showRadioMobile ?? (!centered && !icon);

  if (!isCard) {
    return (
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        value={value}
        className={cn(
          "relative flex aspect-square size-[18px] shrink-0 rounded-full border-2 border-neutral-200 bg-base-white outline-none transition-[border-color,background-color] duration-150",
          "hover:border-brand-orange-01",
          "focus-visible:ring-2 focus-visible:ring-brand-orange-01 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-brand-orange-01 data-[state=checked]:bg-brand-orange-01",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex size-full items-center justify-center">
          <span className="size-[6px] rounded-full bg-base-white" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  }

  // Card mode: Radix Item IS the card — styled directly so clicks always register.
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      value={value}
      className={cn(
        "group relative flex w-full rounded-[12px] border border-neutral-200 bg-base-white cursor-pointer outline-none",
        "transition-[border-color,background-color,box-shadow] duration-150",
        "hover:border-brand-orange-01",
        "focus-visible:ring-2 focus-visible:ring-brand-orange-01 focus-visible:ring-offset-2",
        "data-[state=checked]:border-brand-orange-01 data-[state=checked]:ring-1 data-[state=checked]:ring-brand-orange-01 data-[state=checked]:bg-brand-orange-04",
        centered ? "flex-col items-center justify-center p-[16px] gap-[10px]" : "flex-row items-start p-[14px] gap-[12px]",
        className
      )}
      {...props}
    >
      {/* Radio circle — top-left corner for centered cards, inline for left-aligned */}
      {(showRadio || _showRadioMobile) && (
        centered ? (
          <span
            className={cn(
              "absolute top-[12px] left-[12px] shrink-0 flex aspect-square size-[18px] rounded-full border-2 border-neutral-200 bg-base-white transition-[border-color,background-color] duration-150",
              "group-hover:border-brand-orange-01",
              "group-data-[state=checked]:border-brand-orange-01 group-data-[state=checked]:bg-brand-orange-01",
              !showRadio && _showRadioMobile && "xl:hidden"
            )}
          >
            <RadioGroupPrimitive.Indicator className="flex size-full items-center justify-center">
              <span className="size-[6px] rounded-full bg-base-white" />
            </RadioGroupPrimitive.Indicator>
          </span>
        ) : (
          <span
            className={cn(
              "shrink-0 relative flex aspect-square size-[18px] rounded-full border-2 border-neutral-200 bg-base-white transition-[border-color,background-color] duration-150",
              "group-hover:border-brand-orange-01",
              "group-data-[state=checked]:border-brand-orange-01 group-data-[state=checked]:bg-brand-orange-01",
              "mt-[2px]",
              !showRadio && _showRadioMobile && "xl:hidden"
            )}
          >
            <RadioGroupPrimitive.Indicator className="flex size-full items-center justify-center">
              <span className="size-[6px] rounded-full bg-base-white" />
            </RadioGroupPrimitive.Indicator>
          </span>
        )
      )}

      {/* Content — centered cards use a fixed icon row so icon + title always align across cards */}
      {centered ? (
        <>
          <div className="flex items-center justify-center w-full h-[40px] text-neutral-600 transition-colors duration-150 group-data-[state=checked]:text-brand-orange-01">
            {icon}
          </div>
          <p
            className="m-0 font-bold text-neutral-900 w-full text-center"
            style={{ fontSize: titleSize, lineHeight: "1.4" }}
          >
            {title}
          </p>
          {description && (
            <p
              className="m-0 font-normal text-neutral-600 w-full text-center"
              style={{ fontSize: "12px", lineHeight: "1.55" }}
            >
              {description}
            </p>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-[6px] flex-1 min-w-0">
          {icon && (
            <span className="text-neutral-600 transition-colors duration-150 group-data-[state=checked]:text-brand-orange-01">
              {icon}
            </span>
          )}
          <p
            className={cn(
              "m-0 font-bold text-neutral-900 text-left",
              !icon && "text-[16px] xl:text-[14px]",
            )}
            style={{ lineHeight: "1.4" }}
          >
            {title}
          </p>
          {description && (
            <p
              className={cn(
                "m-0 font-normal text-neutral-600 text-left",
                !icon && "text-body-sm xl:text-body-xs",
              )}
              style={{ fontSize: "12px", lineHeight: "1.55" }}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem }
