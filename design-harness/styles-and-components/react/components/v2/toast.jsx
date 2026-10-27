/* ==========================================================================
   Profile — toast
   --------------------------------------------------------------------------
   A drop-in replacement for sonner's `toast`, used by the v2 pages (Profile,
   the Home hero) so they carry the glass skin without touching the app's
   default toast anywhere else. Same call shape as sonner's (toast(msg),
   toast.error(msg), …), including `action: { label, onClick }`.

   RENDERED AS A CUSTOM BODY, NOT A SKINNED DEFAULT — and that is the whole
   design of this file. The previous version passed `className` and fought
   sonner's markup from CSS, which lost twice over:

     · THE CLOSE BUTTON. sonner renders it FIRST in the DOM, absolutely
       positioned at `left: 0` with `translate(-35%,-35%)` — i.e. punched
       through the toast's top-LEFT corner. The app's shared Toaster
       (components/ui/sonner.jsx) then paints it with
       `!bg-brand-orange-01 !text-base-white`, which is the orange square the
       owner flagged. Those are Tailwind `!important` utilities on the element
       itself, so a stylesheet rule cannot outrank them.
     · THE LAYOUT. Skinning sonner's row means inheriting its DOM order
       (close, icon, content), so "close on the right" had to be recovered
       with margin-left:auto on an absolutely positioned element.

   toast.custom() hands us the element instead, so the markup is ours: order,
   spacing, icon and close button are all written here and no !important is
   needed anywhere. `unstyled: true` stops sonner applying its own padding,
   background and border underneath.
   ========================================================================== */

import { toast as sonnerToast } from "sonner";
import { ToastV2 } from "./toastV2Body";

function make(variant) {
  const key = variant || "default";
  return (message, options = {}) => {
    // className is pulled OUT of `rest` deliberately: `rest` is spread last,
    // so a caller-supplied className would otherwise replace ours wholesale and
    // take the !border-0 with it. It is merged below instead.
    const { description, action, className, ...rest } = options;
    return sonnerToast.custom(
      id => (
        <ToastV2
          id={id}
          title={message}
          description={description}
          action={action}
          variant={key}
        />
      ),
      {
        // Sonner's own padding/background/border would otherwise paint
        // underneath our panel and show as a second edge around it.
        unstyled: true,
        // KILLS THE BLACK RECTANGLE. The shared Toaster (components/ui/
        // sonner.jsx) sets `toastOptions.classNames.toast = "cn-toast !border"`
        // for the whole app, and that lands on sonner's wrapper — the element
        // OUTSIDE our panel — even under `unstyled`. `!border` is a Tailwind
        // utility that sets border-width:1px with no colour, so it falls back
        // to currentColor, i.e. the near-black title ink: a hard square box
        // around our rounded glass panel. `!border-0` is the same weight and
        // later in the class list, so it wins without touching the shared
        // Toaster (which the rest of the app still depends on).
        className: `toast-host-v2 !border-0 ${className ?? ""}`.trim(),
        // A spinner has no natural end; everything else clears itself.
        ...(key === "loading" ? { duration: Infinity } : null),
        ...rest,
      }
    );
  };
}

export const toast = Object.assign(make(), {
  success: make("success"),
  error: make("error"),
  info: make("info"),
  warning: make("warning"),
  loading: make("loading"),
  // Pass-through for anything else callers reach for.
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
  custom: sonnerToast.custom,
});
