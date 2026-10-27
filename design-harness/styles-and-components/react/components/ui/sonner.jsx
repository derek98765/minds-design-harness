"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import useMediaQuery from "@/hooks/useMediaQuery"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()
  // On phones, surface toasts at the top within the browser safe area
  // (notch/status bar); keep the desktop bottom-center placement.
  const isMobile = useMediaQuery("(max-width: 767px)")

  return (
    <Sonner
      theme={theme}
      position={isMobile ? "top-center" : "bottom-center"}
      mobileOffset={{ top: "calc(env(safe-area-inset-top) + 12px)", left: "16px", right: "16px", bottom: "16px" }}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          // Pale blue bg + brand blue text + brand blue border for the
          // neutral/default toast. Hardcoded #e8ecf6 — pale tint of
          // --color-brand-blue-01 (#394f95), no matching token in tokens.css.
          "--normal-bg": "#e8ecf6",
          "--normal-text": "var(--color-brand-blue-01)",
          "--normal-border": "var(--color-brand-blue-03)",
          "--border-radius": "10px"
        }
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !border",
          // Hardcoded pale tints — no matching tokens for soft success/error
          // backgrounds in tokens.css.
          // Pale green #e1f4e8 + green text/border (--color-semantic-success #31a963).
          success:
            "!bg-[#e1f4e8] !text-semantic-success !border !border-[#8ed4aa]",
          // Pale red #fbe0e0 + red text + light red border. Hardcoded #f0a0a0.
          error:
            "!bg-[#fbe0e0] !text-semantic-error !border !border-[#f0a0a0]",
          closeButton:
            "!bg-brand-orange-01 !text-base-white !border-brand-orange-01 hover:!bg-brand-orange-02",
        },
      }}
      {...props} />
  );
}

export { Toaster }
