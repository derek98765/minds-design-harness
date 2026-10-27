import * as React from "react";
import { Menu, X, ArrowUpRight, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minds site nav — the header the Profile pages ship (Navigation.jsx in
 * animocaminds-frontend; .nav-*-v2 in tokens.css). At rest a solid white 60px
 * bar; once the page scrolls past 12px it becomes a white floating pill inset
 * from the edges. Cool grey links, the language pill, the lit orange CTA, and
 * the account initial on the lit blue disc. Matches the real nav's structure,
 * not its exact link content or thumbnail dropdowns (page-specific). The link
 * row collapses to a menu button below `lg` (1024px).
 *
 * `links` is `{ label, href, external?, dropdown? }[]`; `dropdown` is
 * `{ label, href }[]`. `beta` adds the small BETA tag beside the logo.
 * `avatarInitial` renders the account disc; omit it on a logged-out page.
 * Position it yourself (e.g. `className="sticky top-0 z-50"`).
 */
const NAV_LINKS_DEFAULT = [
  { label: "Item 1", href: "#" },
  { label: "Item 2", href: "#" },
  { label: "Item 3", href: "#" },
  {
    label: "More",
    dropdown: [
      { label: "Item 4", href: "#" },
      { label: "Item 5", href: "#" },
    ],
  },
];

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Nav({
  logo,
  beta = false,
  links = NAV_LINKS_DEFAULT,
  cta = { label: "Create a Mind", href: "#" },
  language = "EN",
  avatarInitial = "D",
  className,
}) {
  const [open, setOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const scrolled = useScrolled();

  return (
    <nav data-slot="nav" className={cn("nav-v2", scrolled && "is-scrolled", className)}>
      <div className="nav-bar-v2">
        <a href="/" className="relative shrink-0" aria-label="Minds home">
          {logo}
          {beta && <span className="nav-beta-v2">BETA</span>}
        </a>

        <ul className="m-0 hidden flex-1 list-none items-center gap-24 pl-40 lg:flex">
          {links.map((link) => (
            <li key={link.label} className="relative">
              {link.dropdown ? (
                <div onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
                  <button type="button" className="nav-link-v2">
                    {link.label}
                    <ChevronDown size={14} className="shrink-0" />
                  </button>
                  {moreOpen && (
                    <div className="absolute left-0 top-full z-50 pt-8">
                      <div className="menu-v2 flex w-200 flex-col">
                        {link.dropdown.map((item) => (
                          <a key={item.label} href={item.href} className="menu-item-v2 no-underline">
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
                  className="nav-link-v2"
                >
                  {link.label}
                  {link.external && <ArrowUpRight size={14} className="shrink-0" />}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden shrink-0 items-center gap-12 lg:flex">
          {language && (
            <button type="button" className="nav-lang-v2">
              <Globe size={16} strokeWidth={2} />
              {language}
              <ChevronDown size={14} strokeWidth={2.5} />
            </button>
          )}
          {cta && (
            <a href={cta.href} className="nav-cta-v2 btn-lit-orange">
              {cta.label}
            </a>
          )}
          {avatarInitial && <span className="avatar-initial-v2 size-36 text-body">{avatarInitial}</span>}
        </div>

        <button
          type="button"
          className="ml-auto flex size-40 items-center justify-center rounded-full border-0 bg-transparent text-[var(--text-title-cool)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 bg-white px-24 pb-24 pt-8 lg:hidden">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="flex flex-col">
                <span className="px-12 py-12 text-body-lg font-medium text-[var(--text-title-cool)]">
                  {link.label}
                </span>
                {link.dropdown.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-24 py-8 text-body font-medium text-[var(--text-muted-cool)]"
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
                className="inline-flex items-center gap-4 rounded-md px-12 py-12 text-body-lg font-medium text-[var(--text-title-cool)]"
              >
                {link.label}
                {link.external && <ArrowUpRight size={16} className="shrink-0" />}
              </a>
            )
          )}
          {cta && (
            <a href={cta.href} className="nav-cta-v2 btn-lit-orange mt-8 w-full">
              {cta.label}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

export { Nav };
