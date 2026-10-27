import { Link } from "@/shims/router";
import { Modal } from "@/components/ui/modal";
import { Btn } from "@/components/v2/kit";
import { useBuyColor } from "@/shims/billing";
import { cn } from "@/lib/utils";

const LOOKS = {
  primary: ["primary", "btn-lit-orange-v2"], // the one orange action in a section
  "primary-blue": ["blue", "btn-lit-blue-v2"],
  secondary: ["soft", "btn-outline-blue-v2"],
  link: ["link", ""],
  // A bare grey text button: no fill or padding, even on hover; the ink darkens and an underline appears.
  text: [
    "ghost",
    "!px-0 text-[var(--text-body-cool)] underline-offset-4 hover:bg-transparent hover:text-[var(--text-title-cool)] hover:underline",
  ],
  muted: ["muted", ""], // the disabled "Current plan" pill
};

/** Upgrade and purchase buttons: orange or blue gradient, per the dev picker's "Buy button" setting. */
export function useBuyLook() {
  return useBuyColor() === "blue" ? "primary-blue" : "primary";
}

/** Profile kit's pill button, as a <button> or a router <Link> when `to` is set. */
export function Action({ look = "secondary", to, className, ...rest }) {
  const buy = useBuyLook();
  const [variant, extra] = LOOKS[look === "buy" ? buy : look];
  return (
    <Btn
      variant={variant}
      as={to ? Link : "button"}
      {...(to ? { to } : { type: "button" })}
      className={cn(extra, className)}
      {...rest}
    />
  );
}

/** Shared dialog: the standard Modal, with the billing screens' `wide` flag mapped to its sizes. */
export function BillingDialog({ wide, ...props }) {
  return <Modal size={wide ? "lg" : "sm"} {...props} />;
}
