import * as React from "react";
import { Menu, X, ArrowUpRight, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Minds site nav, matching the real product nav's structure and two color
 * variants — not its exact link content, progressive-collapse, or thumbnail
 * dropdown (all page-specific, not part of the reusable shell). The whole
 * link row collapses straight to the hamburger below `lg` (1024px).
 *
 * `variant`:
 *  - "light" (default) — warm beige canvas, dark text, indigo CTA. Matches
 *    the real site's default marketing nav (`bg-semantic-bg-light`).
 *  - "blue" — indigo canvas, white text, orange CTA. Matches the real
 *    site's logged-in/app nav (`bg-brand-blue-01`).
 *
 * `links` is `{ label, href, external?, dropdown? }[]`. `dropdown` is
 * `{ label, href }[]`, rendered as a plain list — no thumbnails, no hover
 * delay. `avatarInitial` renders the account avatar circle; omit it to hide
 * the slot entirely (e.g. a logged-out marketing page).
 */
const NAV_LINKS_DEFAULT = [
  { label: "Item 1", href: "#" },
  { label: "Item 2", href: "#" },
  { label: "Item 3", href: "#" },
  { label: "Item 4", href: "#" },
  { label: "Item 5", href: "#" },
  {
    label: "More",
    dropdown: [
      { label: "Item 6", href: "#" },
      { label: "Item 7", href: "#" },
      { label: "Item 8", href: "#" },
    ],
  },
];

function Nav({
  logo,
  links = NAV_LINKS_DEFAULT,
  cta = { label: "Launch a Mind", href: "#" },
  avatarInitial = "D",
  variant = "light",
  className,
}) {
  const [open, setOpen] = React.useState(false);
  const [campaignOpen, setCampaignOpen] = React.useState(false);
  const isBlue = variant === "blue";

  return (
    <nav
      data-slot="nav"
      className={cn(
        "relative z-50",
        isBlue ? "bg-brand-blue-500" : "bg-beige-100",
        className
      )}
    >
      <div className="flex items-center gap-24 px-24 py-16">
        <a href="/" className="shrink-0" aria-label="Minds home">
          {logo}
        </a>

        <ul className="hidden flex-1 items-center gap-24 pl-40 lg:flex">
          {links.map((link) => (
            <li key={link.label} className="relative">
              {link.dropdown ? (
                <div
                  onMouseEnter={() => setCampaignOpen(true)}
                  onMouseLeave={() => setCampaignOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-4 whitespace-nowrap border-0 bg-transparent p-0 text-body-default font-medium transition-colors",
                      isBlue
                        ? "text-white/70 hover:text-white"
                        : "text-neutral-600 hover:text-neutral-900"
                    )}
                  >
                    {link.label}
                    <ChevronDown size={14} className="shrink-0" />
                  </button>
                  {campaignOpen && (
                    <div className="absolute left-0 top-full z-50 pt-8">
                      <div className="flex w-200 flex-col gap-4 rounded-lg bg-white p-4 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.16)]">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="whitespace-nowrap rounded-md px-12 py-8 text-body-default font-medium text-neutral-900 hover:bg-beige-100"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "inline-flex items-center gap-4 whitespace-nowrap text-body-default font-medium transition-colors",
                    isBlue
                      ? "text-white/70 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {link.label}
                  {link.external && <ArrowUpRight size={14} className="shrink-0" />}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-12 lg:flex">
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-4 whitespace-nowrap rounded-full border px-12 py-8 text-body-default font-medium",
              isBlue
                ? "border-white/20 text-white"
                : "border-neutral-200 bg-white text-neutral-900"
            )}
          >
            <Globe size={16} />
            English
            <ChevronDown size={14} />
          </button>

          {cta && (
            <Button
              asChild
              size="sm"
              variant={isBlue ? "primary" : "secondary"}
            >
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}

          {avatarInitial && (
            <span
              className={cn(
                "flex size-36 shrink-0 items-center justify-center rounded-full text-body-default font-bold",
                isBlue ? "bg-white/20 text-white" : "bg-brand-blue-200 text-brand-blue-700"
              )}
            >
              {avatarInitial}
            </span>
          )}
        </div>

        <button
          type="button"
          className={cn(
            "flex size-40 items-center justify-center rounded-full lg:hidden",
            isBlue ? "text-white" : "text-neutral-900"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "flex flex-col gap-4 px-24 pb-24 lg:hidden",
            isBlue ? "bg-brand-blue-500" : "bg-beige-100"
          )}
        >
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="flex flex-col">
                <span
                  className={cn(
                    "px-12 py-12 text-body-large font-medium",
                    isBlue ? "text-white" : "text-neutral-900"
                  )}
                >
                  {link.label}
                </span>
                {link.dropdown.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-md px-24 py-8 text-body-default font-medium",
                      isBlue ? "text-white/70" : "text-neutral-600"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "inline-flex items-center gap-4 rounded-md px-12 py-12 text-body-large font-medium",
                  isBlue ? "text-white" : "text-neutral-900"
                )}
              >
                {link.label}
                {link.external && <ArrowUpRight size={16} className="shrink-0" />}
              </a>
            )
          )}
          {cta && (
            <Button
              asChild
              size="md"
              variant={isBlue ? "primary" : "secondary"}
              className="mt-8 w-full"
            >
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}

export { Nav };
