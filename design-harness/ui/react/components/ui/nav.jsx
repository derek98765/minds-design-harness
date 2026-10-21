import * as React from "react";
import { Menu, X, ArrowUpRight, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Minds site nav — the v2 header: a translucent glass bar over the page wash,
 * cool grey links, the lit orange CTA, and the account initial as a small lit
 * blue disc. Matches the real nav's structure, not its exact link content,
 * progressive collapse, or thumbnail dropdown (all page-specific, not part of
 * the reusable shell). The link row collapses to a menu button below `lg`
 * (1024px).
 *
 * There is one look. The v1 "blue" variant (a solid indigo band) is retired —
 * see DESIGN.md §2 Usage.
 *
 * `links` is `{ label, href, external?, dropdown? }[]`. `dropdown` is
 * `{ label, href }[]`, rendered as a plain list — no thumbnails, no hover
 * delay. `avatarInitial` renders the account disc; omit it to hide the slot
 * (e.g. a logged-out marketing page).
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

// The glass: a light white fill plus the nav's own blur, with a cool hairline.
const GLASS = "bg-[var(--nav-glass)] [backdrop-filter:var(--nav-liquid-filter)] [-webkit-backdrop-filter:var(--nav-liquid-filter)]";

function Nav({
  logo,
  links = NAV_LINKS_DEFAULT,
  cta = { label: "Launch a Mind", href: "#" },
  avatarInitial = "D",
  className,
}) {
  const [open, setOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);

  return (
    <nav
      data-slot="nav"
      className={cn("relative z-50 border-b border-[var(--nav-glass-line)]", GLASS, className)}
    >
      <div className="flex items-center gap-24 px-24 py-16">
        <a href="/" className="shrink-0" aria-label="Minds home">
          {logo}
        </a>

        <ul className="hidden flex-1 items-center gap-24 pl-40 lg:flex">
          {links.map((link) => (
            <li key={link.label} className="relative">
              {link.dropdown ? (
                <div onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-4 whitespace-nowrap border-0 bg-transparent p-0 text-body-default font-medium text-[var(--text-muted-cool)] transition-colors hover:text-[var(--text-title-cool)]"
                  >
                    {link.label}
                    <ChevronDown size={14} className="shrink-0" />
                  </button>
                  {moreOpen && (
                    <div className="absolute left-0 top-full z-50 pt-8">
                      <div className="flex w-200 flex-col gap-4 rounded-lg border border-[var(--line-cool)] bg-white p-4 shadow-[var(--elev-lg)]">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="whitespace-nowrap rounded-md px-12 py-8 text-body-default font-medium text-[var(--text-title-cool)] hover:bg-[var(--bg-panel-cool)]"
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
                  className="inline-flex items-center gap-4 whitespace-nowrap text-body-default font-medium text-[var(--text-muted-cool)] transition-colors hover:text-[var(--text-title-cool)]"
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
            className="inline-flex items-center gap-4 whitespace-nowrap rounded-full border border-[var(--line-cool)] bg-white px-12 py-8 text-body-default font-medium text-[var(--text-title-cool)]"
          >
            <Globe size={16} />
            EN
            <ChevronDown size={14} />
          </button>

          {cta && (
            <Button asChild size="sm" variant="primary">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}

          {avatarInitial && (
            <span className="flex size-36 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-blue)] text-body-default font-bold text-white shadow-[var(--shadow-lit-blue)]">
              {avatarInitial}
            </span>
          )}
        </div>

        <button
          type="button"
          className="ml-auto flex size-40 items-center justify-center rounded-full text-[var(--text-title-cool)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-[var(--nav-glass-line)] px-24 pb-24 pt-8 lg:hidden">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="flex flex-col">
                <span className="px-12 py-12 text-body-large font-medium text-[var(--text-title-cool)]">
                  {link.label}
                </span>
                {link.dropdown.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-24 py-8 text-body-default font-medium text-[var(--text-muted-cool)]"
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
                className="inline-flex items-center gap-4 rounded-md px-12 py-12 text-body-large font-medium text-[var(--text-title-cool)]"
              >
                {link.label}
                {link.external && <ArrowUpRight size={16} className="shrink-0" />}
              </a>
            )
          )}
          {cta && (
            <Button asChild size="md" variant="primary" className="mt-8 w-full">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}

export { Nav };
