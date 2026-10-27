import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useTranslation } from "@/shims/i18n"

function Pagination({
  className,
  ...props
}) {
  const { t } = useTranslation("onboarding");
  return (
    <nav
      role="navigation"
      aria-label={t("pagination")}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props} />
  );
}

function PaginationContent({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props} />
  );
}

function PaginationItem({
  ...props
}) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(
        isActive &&
          "bg-brand-blue-01 border-brand-blue-01 !text-base-white hover:bg-brand-blue-02 hover:border-brand-blue-02 hover:!text-base-white",
        className
      )}>
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props} />
    </Button>
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}) {
  const { t } = useTranslation("onboarding");
  return (
    <PaginationLink
      aria-label={t("Go to previous page")}
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}>
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text === "Previous" ? t("Previous") : text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}) {
  const { t } = useTranslation("onboarding");
  return (
    <PaginationLink
      aria-label={t("Go to next page")}
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}>
      <span className="hidden sm:block">{text === "Next" ? t("Next") : text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}) {
  const { t } = useTranslation("onboarding");
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center",
        className
      )}
      {...props}>
      <span aria-hidden="true">…</span>
      <span className="sr-only">{t("More pages")}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
