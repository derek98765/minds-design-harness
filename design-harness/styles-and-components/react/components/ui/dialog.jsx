import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useTranslation } from "@/shims/i18n";
import useKeyboardOffset from "@/hooks/useKeyboardOffset";
import useMediaQuery from "@/hooks/useMediaQuery";

function Dialog({ ...props }) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/40 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  );
}

const DIALOG_WIDTHS = {
  xs: "max-w-[520px]",
  sm: "max-w-[640px]",
  md: "max-w-[760px]",
  lg: "max-w-[960px]",
  xl: "max-w-[1120px]",
};

function DialogContent({
  className,
  overlayClassName,
  children,
  showCloseButton = true,
  size = "md",
  style,
  ...props
}) {
  const { t } = useTranslation("common");
  const keyboardOffset = useKeyboardOffset();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const mobileKeyboardStyle =
    isMobile && keyboardOffset > 0
      ? {
          bottom: `${keyboardOffset}px`,
          maxHeight: `calc(100dvh - ${keyboardOffset}px)`,
        }
      : {};

  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // Mobile: bottom sheet — full width, stuck to bottom, no bottom rounding
          "fixed bottom-0 left-0 right-0 z-50 w-full max-h-[90dvh] md:max-h-[calc(100dvh-2rem)] overflow-hidden flex flex-col gap-24 rounded-t-[12px] rounded-b-none border border-neutral-200 bg-semantic-modal-bg px-[20px] md:px-[24px] pt-[24px] pb-[max(32px,env(safe-area-inset-bottom))] outline-none shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] transition-opacity duration-100 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4",
          // Tablet & desktop: centered modal with standard rounding
          "md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[calc(100%-24px)] md:max-w-[760px] md:rounded-[12px]",
          "font-primary",
          className
        )}
        style={{ ...mobileKeyboardStyle, ...style }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-[15px] right-[20px] md:top-[15px] md:right-[25px] inline-flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
            aria-label={t("Close")}
          >
            <XIcon size={24} />
            <span className="sr-only">{t("Close")}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("shrink-0 flex flex-col gap-8", className)}
      {...props}
    />
  );
}

/**
 * Scrollable body region. Wrap the main content of a modal in this so only
 * the body scrolls while the DialogHeader + close button stay pinned.
 * DialogContent is `overflow-hidden` by default — any content that can
 * exceed the viewport must be inside a <DialogBody>.
 */
function DialogBody({ className, ...props }) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex-1 min-h-0 overflow-y-auto", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, showCloseButton = false, children, ...props }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">{t("Close")}</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("m-0 font-bold text-neutral-900 text-center leading-[35px] text-h3", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "m-0 font-normal text-neutral-600 text-center leading-[1.55] text-body-md",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
