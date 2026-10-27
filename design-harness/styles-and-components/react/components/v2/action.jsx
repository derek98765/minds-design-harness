import { Link } from "@/shims/router";
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

/** Shared dialog: bottom sheet on mobile, centred card from md up. Same shell
    as the referral "Choose a Mind" picker: the shared dialog's own header with
    a centred title and note, the v2 canvas fill, and a padded body. */
export function BillingDialog({ wide, open, onOpenChange, title, description, descriptionClassName, footer, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...(!description && { "aria-describedby": undefined })}
        className={cn("v2 !bg-[#fbfcfe] !gap-36 !pb-40 !pt-36", wide ? "md:!max-w-[1040px]" : "md:!max-w-[520px]")}
      >
        <DialogHeader className="gap-16">
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className={cn("m-0 text-center text-[var(--text-label-cool)]", descriptionClassName ?? "text-body-sm leading-normal font-normal")}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {/* The scroller clips whatever overflows it, so it is padded out and pulled back with
            negative margins: drop shadows (the pack cards') get room to spill past the content. */}
        {children && (
          <DialogBody className="scroll-cool-v2 -my-16 py-16 max-md:-mx-20 max-md:px-20 md:-mx-24 md:px-24">
            {children}
          </DialogBody>
        )}
        {footer && <div className="flex flex-wrap items-center justify-center gap-x-24 gap-y-12">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
