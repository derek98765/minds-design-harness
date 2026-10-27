/* ==========================================================================
   Profile — local UI kit (REDESIGN SANDBOX)
   --------------------------------------------------------------------------
   Prototype primitives, deliberately NOT in src/components/ui/. They exist so
   the redesign can move faster than the shared library; anything that survives
   review gets promoted afterwards.

   House rules encoded here, straight from the reference report:
     · one FILLED button per view — everything else is soft/ghost/icon
     · icon buttons for repeated secondary actions, never repeated text buttons
     · dividers over cards — Card is used only where it carries real content
   ========================================================================== */

import { useTranslation } from "@/shims/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import emptyArt from "@/assets/empty-result.webp";
import { mindAvatar, fullBodyFor } from "@/shims/mind-avatar";
import masterMindArt from "@/assets/master-mind.webp";

/* ── Surface ─────────────────────────────────────────────────────────────── */

export function Card({ className, children, pad = true, ...rest }) {
  return (
    <div
      className={cn(
        // Frosted glass surface: translucent fill + backdrop blur + the cool
        // drop shadow, with --line-card as a light hairline hinting at the
        // edge. (History: flat with a --line border, then solid white +
        // card-elev-v2; now glass, extending the rail's treatment to
        // content per the owner.)
        "border border-[var(--line-cool)] rounded-[var(--r-lg)]",
        // .glass-card-v2 = fill + blur + lit top edge + drop shadow.
        "glass-card-v2",
        pad && "p-20",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Divider({ className }) {
  return <div className={cn("h-px bg-[var(--line-cool)]", className)} />;
}

/* ── Headings ────────────────────────────────────────────────────────────── */

export function SectionHead({ title, count, action, sub, className }) {
  return (
    <div className={cn("flex items-end justify-between gap-16 mb-12", className)}>
      <div className="min-w-0">
        <div className="flex items-center gap-8">
          <h2 className="text-h6 text-[var(--text-title-warm)] m-0">{title}</h2>
          {count != null && (
            <span className="text-body-xs leading-[1.45] font-medium t-num text-[var(--text-muted-warm)] tabular-nums">{count}</span>
          )}
        </div>
        {sub && <p className="text-body-sm leading-normal font-normal text-[var(--text-muted-warm)] m-0 mt-2">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/**
 * `action`      — sits far right of the header row, vertically centred against
 *                 the whole text column (title + sub).
 * `titleAction` — also far right, but aligned to the TITLE's line rather than
 *                 the block's centre. Use when the affordance belongs to the
 *                 heading itself and would otherwise drift down beside a
 *                 two-line description.
 */
/**
 * `size` — "lg" (default, t-h1 / 32px) or "md" (24px).
 *
 * "md" exists because Connections dropped its page title and promoted its
 * SECTION headings to 24px, and My Minds was asked to match those.
 *
 * EVERY TAB THAT STILL RENDERS A PAGE TITLE NOW PASSES size="md" — My Minds,
 * My Circle and Redeem — so 24px is the page-title size across Profile.
 * (Connections, Linked Accounts and Referral have no PageTitle at all: their
 * own 24px section headings carry the page.) The "lg" default is kept only
 * because changing it would silently resize any future caller that omits the
 * prop; prefer size="md" for a new page unless there is a reason not to.
 *
 * 24px is now the named tier `text-h4` in tokens-v2.css (it was written out
 * literally at nine sites because the t- scale jumped 19px to 32px with no
 * step between). Both tiers step down on tablet and mobile via that file.
 */
/** `subTruncate` — pass false when `sub` carries something you can CLICK.
 *  The default one-line truncation from md up is fine for prose, but it will
 *  happily clip a trailing button straight off the page: My Minds' "Add a New
 *  Mind" link disappeared entirely between ~768 and ~1300px, where the
 *  description is wider than the column but the viewport is past md. Anything
 *  interactive in `sub` must be allowed to wrap instead. */
export function PageTitle({ children, sub, action, titleAction, size = "lg", subTruncate = true }) {
  // items-end: the action (e.g. a search field) sits on the sub line's
  // baseline rather than centred against the whole title+sub block.
  //
  // STACKS BELOW md. `action` is typically a ~220px search field; beside a
  // heading on a 390px screen it left both squeezed into roughly half a
  // column each. Below md the action drops onto its own full-width row under
  // the title, which is also why items-stretch/items-end swap: stretched, a
  // search field fills that row instead of sitting shrink-wrapped at its left.
  return (
    <div className="flex flex-col items-stretch gap-16 mb-24 md:flex-row md:items-end md:justify-between md:gap-24">
      <div className="min-w-0 flex-1">
        {/* The title row carries titleAction right beside the heading, bottom-
            aligned so the button sits on the heading's baseline rather than
            floating at its vertical centre. */}
        <div className="flex items-end gap-12 md:gap-20">
          <h1
            className={cn("text-[var(--text-title-cool)] m-0", size === "md" ? "text-h4" : "text-h2")}
          >
            {children}
          </h1>
          {titleAction && <div className="shrink-0">{titleAction}</div>}
        </div>
        {/* Profile descriptions share the light cool-grey tier used by Usage &
            Billing, so supporting copy recedes consistently across tabs. */}
        {/* TRUNCATES ON ONE LINE FROM md UP (the old 560px cap wrapped this
            page's description onto a second line, which was the reason for
            `truncate`). Below md it WRAPS instead: at phone width almost every
            description is wider than the column, so truncating there is not a
            rare fallback — it clips the sentence on every page. A second line
            costs less than losing the copy. */}
        {sub && (
          <p
            className={cn(
              "text-body leading-body font-normal text-[var(--text-label-cool)] m-0 mt-8 md:mt-12",
              subTruncate && "md:truncate"
            )}
          >
            {sub}
          </p>
        )}
      </div>
      {action && <div className="md:shrink-0">{action}</div>}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

const BTN_BASE =
  "inline-flex items-center justify-center gap-8 rounded-[var(--r-pill)] font-bold " +
  "whitespace-nowrap cursor-pointer transition-colors disabled:opacity-45 disabled:cursor-not-allowed";

const BTN_SIZE = {
  sm: "h-[32px] px-12 text-body-sm",
  md: "h-[38px] px-16 text-body-sm",
  lg: "h-[44px] px-24 text-[15px]",
};

const BTN_VARIANT = {
  /** THE filled action. Use once per view. */
  primary: "bg-[var(--orange)] text-white hover:bg-[var(--orange-hover)]",
  /** Filled brand-blue — for a second page-level action where orange is taken. */
  blue: "bg-[var(--blue)] text-white hover:bg-[var(--blue-hover)]",
  /** Default secondary. */
  soft: "bg-white text-[var(--text-title-neutral)] border border-[var(--line-strong-cool)] hover:bg-[var(--bg-hover-warm)]",
  /** Disabled status pill ("Current plan"): flat grey at full opacity, not a
   *  faded button. Pair it with the `disabled` attribute. */
  muted:
    "bg-[var(--grey-cool-100)] text-[var(--text-label-cool)] disabled:opacity-100 disabled:cursor-default",
  /** Tertiary, no chrome until hover. */
  ghost:
    "bg-transparent text-[var(--text-body-neutral)] hover:bg-[var(--bg-hover-warm)] hover:text-[var(--text-title-neutral)]",
  /** Inline text link. .text-link-v2 (tokens-v2.css) carries the colour,
   *  the flat border-b-as-underline and the lighten-on-hover — see its note
   *  there for why it isn't a plain Tailwind hover:underline. */
  link: "text-link-v2 bg-transparent !h-auto !px-0",
};

export function Btn({ variant = "soft", size = "md", className, as: As = "button", ...rest }) {
  return <As className={cn(BTN_BASE, BTN_SIZE[size], BTN_VARIANT[variant], className)} {...rest} />;
}

/** Repeated secondary actions are ALWAYS icons — never a text button down a list. */
/** `size={null}` opts out of the square inline sizing so the caller can set
 *  its own shape (e.g. a narrow vertical pill) via className. */
export function IconBtn({ label, className, size = 32, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      style={size == null ? undefined : { width: size, height: size }}
      className={cn(
        "inline-flex items-center justify-center shrink-0 rounded-[var(--r-sm)]",
        "text-[var(--text-muted-neutral)] hover:text-[var(--text-title-neutral)] hover:bg-[var(--bg-hover-warm)]",
        "transition-colors cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Status ──────────────────────────────────────────────────────────────── */

const PILL_TONE = {
  success: "bg-[var(--success-soft)] text-[var(--success)]",
  neutral: "bg-[var(--bg-subtle-warm)] text-[var(--text-muted-warm)]",
  cool: "bg-[var(--grey-cool-100)] text-[var(--text-muted-cool)]",
  blue: "bg-[var(--blue-soft)] text-[var(--blue)]",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
  error: "bg-[var(--error-soft)] text-[var(--error)]",
};

export function Pill({ tone = "neutral", dot = false, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-4 h-[22px] px-8 rounded-[var(--r-pill)]",
        // shrink-0 alongside whitespace-nowrap: a pill in a flex row must
        // hold its label's width rather than being squeezed until the text
        // spills out of its own capsule on narrow screens.
        "text-[11px] font-bold whitespace-nowrap shrink-0",
        PILL_TONE[tone],
        className
      )}
    >
      {dot && <span className="w-[6px] h-[6px] rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Dot({ on }) {
  return (
    <span
      className="w-[7px] h-[7px] rounded-full shrink-0"
      style={{ background: on ? "var(--success)" : "var(--line-strong-cool)" }}
    />
  );
}

/* ── Mind avatar ─────────────────────────────────────────────────────────────
   Solves the identification problem: two Minds named "Coach2" and "Coach3"
   get a different colour tile AND a different piece of artwork, so the card is
   separable before you read the name.

   The artwork is a MIND, not a skill icon — one of the product's own figurine
   characters. The source file is a full blister-pack product shot, so we crop
   to the character's head rather than shrinking the whole packet to 40px,
   where it would be unreadable. The head sits in the same place on all 24
   shots, so one crop works everywhere.
   ------------------------------------------------------------------------ */

export function MindAvatar({
  avatar,
  size = 40,
  className,
  bg,
  ring = false,
  shape = "rounded",
  // Opt-in only: a visible inset ring in `bg`/`avatar.bg`. Used where the
  // avatar sits as a badge on top of another image (Home's hero) and needs
  // to read as its own frame. On-card avatars fill edge-to-edge instead.
  padded = false,
}) {
  const pad = padded ? Math.max(2, Math.round(size * 0.09)) : 0;
  const outerR = shape === "circle" ? "9999px" : size >= 40 ? "var(--r-md)" : "var(--r-sm)";
  // Big avatars get a wider crop — head AND shoulders. A tight head crop is
  // right at 32-40px but reads as an abstract blob at 84px.
  const crop = (size >= 64 ? avatar.cropWide : avatar.crop) ?? avatar.crop;
  return (
    <span
      className={cn("inline-block shrink-0 overflow-hidden", className)}
      style={{
        width: size,
        height: size,
        padding: pad,
        backgroundColor: padded ? (bg ?? avatar.bg) : undefined,
        borderRadius: outerR,
        boxShadow: ring ? "0 2px 10px rgba(20,22,28,.10)" : undefined,
      }}
      role="img"
      aria-label={avatar.initials}
    >
      <span
        className="block w-full h-full"
        style={{
          backgroundImage: `url("${avatar.figurine}")`,
          backgroundSize: crop?.size ?? "225%",
          backgroundPosition: crop?.position ?? "37% 40%",
          backgroundRepeat: "no-repeat",
          borderRadius: `calc(${outerR} - ${pad}px)`,
        }}
      />
    </span>
  );
}

/* ── Mind portrait ───────────────────────────────────────────────────────────
   The card's hero image — a full-body side-view render, waist-cropped and
   dissolving into the card's own surface at the bottom edge rather than being
   hard-clipped, so the character reads as part of the card instead of a
   framed photo sitting on it. Replaces the circular MindAvatar on the grid
   card; MindAvatar (identity-first, small) still owns the row/detail-page
   contexts where a whole portrait would be too heavy.

   The WIDTH IS NEVER CROPPED: background-size is always "100% auto", so the
   figure's full width — antennae included — always fits the tile exactly,
   with no horizontal zoom to clip anything off either edge. Masking is
   height-only: the source stills are 786×988 (see mockData's side-view
   block; the clips are 560×704, the same 0.795 aspect),
   so at a given tile width the full-width figure has exactly ONE natural
   height (width × 988/786); making the tile SHORTER than that natural
   height is what crops the standing figure down to roughly the waist —
   overflow-hidden clips the excess, and the bottom gradient softens the cut
   instead of leaving a hard edge. `visibleFraction` is the only masking
   knob, expressed as how much of that natural full-figure height stays
   visible; it does not touch width at all. */

const PORTRAIT_NATIVE = { w: 786, h: 988 };

/** <source> pair for a transparent side-view clip. A `.webm` src also gets
 *  its `.mov` sibling, listed FIRST: Safari plays WebM but drops its alpha
 *  (black backdrop), while HEVC-with-alpha is Safari-only. Typed as
 *  video/quicktime so Chrome — which may decode plain HEVC but not its alpha —
 *  skips it and takes the WebM. */
export function ClipSources({ src }) {
  if (!/\.webm$/i.test(src ?? "")) return <source src={src} />;
  return (
    <>
      <source src={src.replace(/\.webm$/i, ".mov")} type='video/quicktime; codecs="hvc1"' />
      <source src={src} type="video/webm" />
    </>
  );
}

export function MindPortrait({
  src,
  /** Still shown before/instead of a video `src`. Ignored for image sources. */
  poster,
  width = 150,
  // Fraction of the full (uncropped, width-fit) height that stays visible —
  // ~0.6 lands around the waist. Only ever shortens the tile; never affects
  // width, which always shows the figure's full breadth.
  visibleFraction = 0.62,
  height = Math.round(width * (PORTRAIT_NATIVE.h / PORTRAIT_NATIVE.w) * visibleFraction),
  className,
  /** Flush to a container's top corner (e.g. a card) — matches ITS radius
   *  there instead of rounding its own, so the corners read as one continuous
   *  edge rather than two nested roundings.
   *  Pass "left" (default) or "right" to pick which corner it hugs. */
  flush = false,
  /** Dormant state: freeze to the still and drain it, so an offline Mind
   *  reads as inactive at a glance rather than idling in full colour. */
  muted: isMuted = false,
  /** Shift the media UP by this fraction of the tile's height, as a decimal
   *  (0.15 = 15%). Lets the figure sit higher in its tile — and, because it
   *  also drops the tile's `overflow-hidden`, spill past the tile's top edge
   *  rather than being cropped there. Off (0) by default. */
  shiftY = 0,
  /** Height of the bottom foot-fade, as a fraction of the tile (0.5 = half).
   *  Lower it when the tile shows the whole figure: at 0.5 the gradient
   *  starts around the knees and dissolves the feet, which is wrong when
   *  the feet are the point. */
  fadeFraction = 0.5,
  /** The Mind's archetype is not known yet (see useArchetype.js), so which
   *  character to draw is not known either. Paints a skeleton tile of the
   *  SAME size and corners instead of the Master Mind default — the size
   *  matters because card→hero handoffs measure this box, and the default
   *  would be a lie that visibly swaps to the real figure a beat later. */
  loading = false,
  /** The source is a transparent full-body still (not a 786×988 side-view
   *  with a white backdrop): fit it whole inside the tile, feet to the bottom,
   *  and skip the multiply knockout it has no use for. */
  contain = false,
}) {
  // A muted portrait always falls back to the still, even when `src` is a clip.
  const stillSrc = isMuted ? (poster ?? src) : src;
  const isVideo = !isMuted && /\.(mp4|webm|mov)$/i.test(src ?? "");
  if (loading) {
    return (
      // The OUTER box keeps the tile's exact size so layout and the handoff
      // measurement do not move when the real portrait lands. The shimmer is
      // an INSET, fully-rounded block inside it: a flush edge-to-edge tile
      // read as a grey slab glued to the card's corner, so it is stepped in
      // from the left and bottom (where the card's own edge and the tray sit)
      // and lightly from the top and right, and rounded on all four corners.
      <span
        aria-hidden="true"
        className={cn("relative inline-block shrink-0", className)}
        style={{ width, height }}
      >
        <span className="skel-v2 absolute left-12 right-4 top-4 bottom-12 rounded-[var(--r-md)]" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "relative inline-block shrink-0",
        // overflow-hidden is what CROPS the media to the tile. `shiftY` exists
        // to let the figure spill past the top edge, so it must not clip.
        !shiftY && "overflow-hidden",
        // `flush` accepts true/"left" (top-left) or "right" (top-right), so a
        // card can bleed the portrait into either upper corner.
        !flush && "rounded-[var(--r-md)]",
        flush && (flush === "right" ? "rounded-tr-[var(--r-lg)]" : "rounded-tl-[var(--r-lg)]"),
        className
      )}
      style={{ width, height }}
    >
      {isVideo ? (
        // Decorative loop — muted+playsInline so mobile browsers autoplay it
        // inline rather than demanding a tap or going fullscreen. The poster
        // is the matching still, so the tile paints on first frame and stays
        // correct if the clip is blocked (data saver, reduced motion, error).
        //
        // `multiply` knocks out the source's OPAQUE WHITE backdrop: h264 has no
        // alpha channel, so without it the tile paints a hard white rectangle
        // over whatever sits behind (e.g. the card's hover glow). White
        // multiplies away to nothing; the figure's darker pixels survive.
        //
        // A `contain` clip is TRANSPARENT (see mockData's side-view note): it
        // sits exactly like a contain still — fitted whole, feet down — and
        // skips the multiply, which would only darken it over a tinted stage.
        <video
          // Keyed on the clip so switching Minds remounts the element — a
          // <video> does not reload when only its <source> children change.
          key={src}
          // pointer-events-none is LOAD-BEARING, not tidiness. `shiftY` drops
          // the tile's overflow-hidden (see above), so this element genuinely
          // overhangs its tile — and being decorative, it must never intercept
          // a click meant for whatever it overhangs. It swallowed the Mind
          // detail hero's "My Minds" back link, which sits in the row above.
          className={cn(
            "absolute inset-0 block pointer-events-none",
            contain
              ? "w-full h-full object-contain object-bottom"
              : "w-full h-auto mix-blend-multiply"
          )}
          // `top`, NOT `transform`: a transform creates a stacking context,
          // which would isolate the multiply below from the card's hover glow
          // and bring back the white backdrop this blend exists to remove.
          // A contain clip keeps h-full, so `top` alone moves the whole box up
          // by the same amount the still branch's top/bottom pair does.
          style={shiftY ? { top: `-${shiftY * 100}%` } : undefined}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <ClipSources src={src} />
        </video>
      ) : (
        <span
          // Same reason as the video branch above: with `shiftY` this overhangs
          // the tile, and decorative media must not eat clicks.
          className={cn(
            "absolute inset-0 block pointer-events-none",
            !contain && "mix-blend-multiply"
          )}
          style={{
            backgroundImage: `url("${stillSrc}")`,
            backgroundSize: contain ? "contain" : "100% auto",
            backgroundPosition: contain ? "50% 100%" : "0% 0%",
            backgroundRepeat: "no-repeat",
            // Same offset as the video branch — see the note there on why this
            // is `top` and not a transform.
            // A `contain` still is anchored to the box's bottom, so moving only
            // `top` would just stretch the box — shift `bottom` up with it.
            ...(shiftY
              ? { top: `-${shiftY * 100}%`, ...(contain ? { bottom: `${shiftY * 100}%` } : null) }
              : null),
            // Drain on the MEDIA, not the wrapper — opacity/filter on an
            // ancestor would create a stacking context and re-isolate the
            // multiply above, bringing the white backdrop back.
            ...(isMuted ? { opacity: 0.5, filter: "saturate(0.5)" } : null),
          }}
        />
      )}

      {/* Foot fade — a card-coloured gradient over the bottom band, on NORMAL
          blend. Two dead ends, both verified in a browser rather than reasoned
          about: a `mask` (on the tile OR an intermediate wrapper) creates a
          stacking context that isolates the media's multiply from the hover
          glow, and a white gradient on `multiply` is a no-op — multiplying by
          white changes nothing, so no fade renders at all.

          It does paint over the glow, but only across the bottom band where
          the gradient is near-opaque — and the figure has already dissolved
          there, so nothing is cut off. The glow stays visible everywhere the
          figure actually is.

          MUST OVERSHOOT THE TILE. `shiftY` drops the tile's overflow-hidden, so
          the media is taller than the tile and its tail spills BELOW the bottom
          edge. A fade pinned to `bottom-0` stopped exactly where that spill
          began and left a hard dark edge under the figure's feet. `-bottom-24`
          runs the fade past the tile so it swallows the whole spill, and the
          ramp reaches full --surface at 85% — before the element ends — so the
          last stretch is flat opaque rather than still mid-fade at the cut.

          `fadeFraction` scales only the band ABOVE the tile's bottom edge; the
          24px overshoot is structural and stays whatever the fraction is. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-24 pointer-events-none"
        style={{
          height: `calc(${fadeFraction * 100}% + 24px)`,
          /* --bg-portrait-foot, NOT --bg-card. This gradient dissolves the
             figure into whatever surface it stands on, and the Mind detail
             HERO rebinds that token to `transparent` so the fade becomes a
             no-op over its blue gradient stage (see .hero-stage-v2). Pointing
             this at --bg-card instead re-broke exactly that: the fade painted
             solid white over the stage and the portrait grew a white frame. */
          background:
            "linear-gradient(to bottom, transparent, var(--bg-portrait-foot) 85%, var(--bg-portrait-foot))",
        }}
      />

      {/* Sleeping Zzz — offline only. The drained portrait already says
          "inactive"; this says WHY, and says it kindly: the Mind is asleep,
          not broken.

          PAINTED LAST, so it sits above the media and the foot fade by
          document order alone — no z-index, which would create a stacking
          context and re-isolate the media's mix-blend-multiply (the white
          backdrop bug this file keeps warning about).

          NOT inside the multiply chain: it is a sibling of the media, so the
          blend never touches it and the blue stays blue. That matters — a
          multiplied Zzz over a greyscale figure would come out grey too, which
          is exactly the invisibility this is meant to avoid.

          Sized/placed relative to the TILE (percentages + em), so it scales
          with `width` and lands in the same spot on a 120px card portrait and
          a 150px hero one. */}
      {isMuted && (
        <span
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          // A DIAGONAL OFF THE HEAD'S UPPER-RIGHT. The trail rises up AND to
          // the right rather than stacking vertically: a vertical column in the
          // strip beside the figure started level with its ARM, because the
          // head only occupies the middle band of the tile and a column tall
          // enough to hold three glyphs had to begin below it. Angled, the
          // lowest glyph starts at the head's top-right corner and each step
          // moves out as it moves up, so the trail leaves the head immediately
          // and never crosses it.
          //
          // Three constraints pull against each other here and this is where
          // they land:
          //   · The trail must start at the head, or it reads as glyphs parked
          //     on a card rather than as this Mind snoring.
          //   · It must not cross the head. The figure is busy and mid-toned,
          //     and a glyph over it loses its edge whatever the halo does —
          //     that is the version that "can barely be seen".
          //   · It must finish inside the card. The tile is flush to the
          //     card's top-left, so there are only ~16px of card above it.
          // The head fills the tile's middle, which leaves one usable strip:
          // ~28px between the head's right silhouette and the tile's right
          // edge. So the box is a narrow, nearly vertical column there, and
          // the drift in zzz-float-v2 is small enough to stay inside the card
          // and short enough not to reach the name beside it. Widen this and
          // the glyphs go back over the head; move it up and they leave the
          // card. Re-check both before changing either.
          //
          // fontSize here is the BASE the glyphs' `em` sizes resolve against,
          // and it is derived from the tile width — without it they would
          // inherit the card's 13-16px body text and stay the same size on a
          // 120px card portrait and a 150px hero one, which is the whole
          // reason they are em and not px.
          style={{
            top: "7%",
            // 6%, not flush: on the CARD the tile's right edge sits 5px from
            // the name column, and the drift below reaches past it. Measured at
            // 2% the trail's rightmost point landed exactly on the name's left
            // edge.
            right: "6%",
            // WIDER AND SHORTER THAN IT LOOKS LIKE IT SHOULD BE. The glyph
            // steps are 30% of the width against 34% of the height, so the
            // box's own proportions set the trail's ANGLE — a tall narrow box
            // sends it almost straight up, which reads as a column rather than
            // as a drift. This ratio puts the rise close to the run.
            width: "28%",
            height: "32%",
            fontSize: Math.round(width * 0.19),
            // SIZE CHANGES HOW HEAVY A COLOUR READS. Everything about these
            // glyphs scales with the tile — position, size, drift — so the card
            // (120px) and the hero (300px) are geometrically identical, but the
            // hero's glyphs are 2.5x the area at the same fill, and the same
            // --tray-ink-4 came out looking like a darker grey there. Mass, not
            // colour. The large size is thinned to compensate, so both surfaces
            // read at the same weight. Threshold rather than a curve because
            // there are exactly two call sites.
            opacity: width >= 200 ? 0.72 : 1,
          }}
        >
          {/* Small → large, bottom → top: the reading order of a cartoon
              snore. Each glyph gets its own resting position AND its own
              delay, a third of the cycle apart.

              THE STEPS MUST CLEAR THE GLYPH BELOW. Offsets are percentages of
              this box while the glyphs are sized in em, so the two scales are
              independent — at the previous spacing (28% apart over a 42% box)
              a glyph was taller than the step above it and the three ran into
              each other. The box is taller now and the steps are ~32%, which
              leaves real air between them at every portrait width. */}
          <span
            className="zzz-v2 absolute"
            style={{ right: "60%", bottom: "0%", fontSize: "0.45em", animationDelay: "0s" }}
          >
            z
          </span>
          <span
            className="zzz-v2 absolute"
            style={{ right: "30%", bottom: "34%", fontSize: "0.65em", animationDelay: "1s" }}
          >
            z
          </span>
          <span
            className="zzz-v2 absolute"
            style={{ right: "0%", bottom: "68%", fontSize: "0.9em", animationDelay: "2s" }}
          >
            Z
          </span>
        </span>
      )}
    </span>
  );
}

/* ── Service / app logo tile ─────────────────────────────────────────────── */

export function LogoTile({ src, name, size = 32, className }) {
  const initial = (name || "?").trim()[0]?.toUpperCase() ?? "?";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 overflow-hidden bg-white",
        "border border-[var(--line-cool)]",
        className
      )}
      style={{ width: size, height: size, borderRadius: "var(--r-sm)" }}
    >
      {src ? (
        <img src={src} alt="" className="w-full h-full object-contain p-4" loading="lazy" />
      ) : (
        <span className="text-body-xs font-extrabold text-[var(--text-muted-neutral)]">
          {initial}
        </span>
      )}
    </span>
  );
}

/* ── Stat tile ───────────────────────────────────────────────────────────── */

export function Stat({ label, value, sub, tone }) {
  return (
    <div className="min-w-0">
      <div
        className="t-num text-[22px] font-extrabold leading-none"
        style={{ color: tone === "blue" ? "var(--blue)" : "var(--text-title-warm)" }}
      >
        {value}
      </div>
      <div className="text-body-xs leading-[1.45] font-medium text-[var(--text-muted-warm)] mt-4 truncate">{label}</div>
      {sub && <div className="text-body-xs leading-[1.45] font-medium text-[var(--text-muted-warm)] opacity-70">{sub}</div>}
    </div>
  );
}

/* ── Pagination ──────────────────────────────────────────────────────────────
   Windowed, with prev/next arrows and ellipses. Rendering every page number is
   fine at 4 pages and unusable at 14 — which is exactly what the Redeem picker
   hit once it listed every Mind.
   ------------------------------------------------------------------------ */

function pageWindow(current, total, span = 1) {
  const out = new Set([1, total]);
  for (let i = current - span; i <= current + span; i++) {
    if (i > 1 && i < total) out.add(i);
  }
  const pages = [...out].sort((a, b) => a - b);
  const withGaps = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) withGaps.push("…");
    withGaps.push(p);
  });
  return withGaps;
}

export function Pagination({ page, totalPages, onChange, className }) {
  const { t } = useTranslation("profile");
  /* NARROWER WINDOW ON A PHONE. At span=1 the widest row is 2 arrows (64px) +
     7 items (252px) + 8 gaps (64px) = ~380px, which does not fit a 390px
     screen once the page gutter is taken off — the row overflowed. span=0
     drops to current +/- 0 (so: first, ellipsis, current, ellipsis, last),
     about 250px, with the arrows still doing the stepping.

     Narrowing the window rather than wrapping the row: a pagination control
     that breaks onto two lines reads as broken layout, and the arrows already
     make every page reachable at any window size.

     `pointer: coarse` is NOT the right signal here, unlike the touch targets —
     this is about available horizontal room, which is genuinely a width
     question. */
  const narrow = useMediaQuery("(max-width: 767px)");
  if (totalPages <= 1) return null;
  const items = pageWindow(page, totalPages, narrow ? 0 : 1);

  // CIRCLES — fixed 36px square box, so the radius reads as a circle rather
  // than a stadium. No min-w/px pair: a wider box on "10" than on "1" would
  // make the row uneven.
  const btn =
    "inline-flex items-center justify-center w-[36px] h-[36px] shrink-0 rounded-full " +
    "touch-target-v2 " +
    "text-body-sm font-bold cursor-pointer " +
    "border transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  // The arrows carry NO container — no fill, no border, no shadow. They are
  // navigation around the numbers, not peers of them, and boxing them made the
  // row read as five equal chips.
  const arrow =
    "inline-flex items-center justify-center w-[32px] h-[36px] shrink-0 bg-transparent border-0 p-0 " +
    "touch-target-v2 " +
    "text-[var(--text-muted-cool)] hover:text-[var(--blue-lit)] cursor-pointer transition-colors " +
    "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[var(--text-muted-cool)]";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-8", className)}>
      <button
        type="button"
        aria-label={t("Previous page")}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={arrow}
      >
        <ChevronLeft size={17} strokeWidth={2.4} />
      </button>

      {items.map((it, i) =>
        it === "…" ? (
          <span
            key={`gap-${i}`}
            className="min-w-[24px] text-center text-body-sm text-[var(--text-muted-cool)] select-none"
          >
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            aria-current={it === page ? "page" : undefined}
            onClick={() => onChange(it)}
            className={cn(
              btn,
              it === page
                ? "text-white border-0"
                : // Inactive circles hover like the Mind card's "..." button:
                  // the fill stays WHITE and the border + label pick up the
                  // cool blue instead. A grey fill (the old --surface-2) read
                  // as the control dimming rather than lighting up.
                  "bg-white text-[var(--text-body-neutral)] border-[var(--line-cool)] shadow-[0_1px_3px_rgba(96,118,200,0.12)] hover:bg-white hover:text-[var(--blue)] hover:border-[var(--line-hover-cool)]"
            )}
            // The current page carries the card's Chat-button construction: a
            // top-lit gradient, an inset white rim along the top edge and an
            // inset darker outline, over a tinted drop. Flat --blue read as a
            // dead chip beside those buttons; this makes the two agree.
            style={
              it === page
                ? {
                    background: "var(--gradient-blue)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 0 0 1px rgba(38,58,150,0.35), 0 3px 10px rgba(48,73,173,0.32)",
                  }
                : undefined
            }
          >
            {it}
          </button>
        )
      )}

      <button
        type="button"
        aria-label={t("Next page")}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={arrow}
      >
        <ChevronRight size={17} strokeWidth={2.4} />
      </button>
    </nav>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────────── */

/** Existing product artwork — the searching Mind, already used for empty results. */
export const EMPTY_ART = emptyArt;

export function Empty({ title, body, action, icon, art }) {
  return (
    <div className="flex flex-col items-center text-center py-48 px-24">
      {art ? (
        <img src={art} alt="" className="w-[120px] h-[120px] object-contain mb-8" />
      ) : icon ? (
        <div className="mb-12 w-[44px] h-[44px] rounded-[var(--r-md)] bg-[var(--grey-cool-100)] flex items-center justify-center text-[var(--text-muted-cool)]">
          {icon}
        </div>
      ) : null}
      <p className="text-title text-[var(--text-title-cool)] m-0">{title}</p>
      {body && <p className="text-body-sm leading-normal font-normal text-[var(--text-label-cool)] m-0 mt-4 max-w-[380px]">{body}</p>}
      {action && <div className="mt-16">{action}</div>}
    </div>
  );
}

/* ── Mock marker ─────────────────────────────────────────────────────────────
   Renders nothing by default. Flip ?mock=1 in the URL to outline every mocked
   value on the page, so a reviewer can see exactly what is not real yet.
   ------------------------------------------------------------------------ */

/* ── Full-body head avatar ───────────────────────────────────────────────────
   Circle avatar painted from the Mind's FULL-BODY render
   (/images/mindsTemplate/full-body, 880×960, transparent), zoomed to the
   mascot's HEAD. Shared by MindVideoAvatar and MindStillAvatar below, which
   used to crop the older side-view clips/stills.

   THE CROP. Measured across all 20 renders: the head sphere is ~420px across
   and centred at ~x 445, y 335 of the 880×960 source (hats/headphones/chef
   toque rise a little above that). A 620px window on that point frames the
   whole head plus a sliver of collar. Same ringed disc as the cards' avatars.
   The art is transparent, so no mix-blend-multiply is needed. */
const FB_W = 880;
const FB_H = 960;
const FB_WINDOW = 620;
const FB_CX = 445;
// Window centre sits ~35px BELOW the head centre (335) on purpose: it nudges
// the art up in the circle so the head isn't low with empty space above.
const FB_CY = 370;

function FullBodyHeadAvatar({ src, size, name }) {
  const RING = 1;
  const INNER = size - RING * 2;
  const imgW = (INNER * FB_W) / FB_WINDOW;
  return (
    <span
      className="relative inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        padding: RING,
        background: "linear-gradient(135deg, #d5e0f5 0%, #b9c6e8 55%, #9daed9 100%)",
        boxShadow: "0 1px 3px rgba(96,118,200,0.10)",
      }}
      role="img"
      aria-label={name}
    >
      <span className="relative block w-full h-full overflow-hidden rounded-full bg-white">
        <img
          className="absolute block pointer-events-none max-w-none"
          style={{
            width: imgW,
            height: "auto",
            left: INNER / 2 - (imgW * FB_CX) / FB_W,
            top: INNER / 2 - ((imgW * FB_H) / FB_W) * (FB_CY / FB_H),
          }}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

/* The Master Mind's head — the "+ New Master Mind" avatar in the composer. */
export function MasterMindAvatar({ size = 48 }) {
  return (
    <FullBodyHeadAvatar
      src={masterMindArt}
      size={size}
      name="Master Mind"
    />
  );
}

/* ── Video avatar ────────────────────────────────────────────────────────────
   Shared by Referral's reward-destination row and Home's activity rows.
   THE SAME CLIP THE MIND CARDS PLAY (mind._sideView, with _sideViewPoster as
   its still), cropped to the figure's HEAD and masked to this row's circle.

   WHY NOT JUST USE MindPortrait. That component renders the identical media,
   but it is built for the cards' tall full-figure tile: its height is derived
   from the source's 786×988 aspect via visibleFraction, and its foot-fade and
   shiftY props exist to frame a standing figure with feet. Dropping it into a
   48px circle would either squash the figure or show a full standing robot at
   thumbnail scale, where the head — the only part that identifies anything —
   is about 15px tall. So this reuses the ASSETS, not the component.

   THE CROP. Measured off the real per-character stills (786×988; the clips
   are 560×704, same 0.795 aspect): the head sphere is ~42-45% of the source
   width and its centre sits at ~52% across and ~36% down, averaged over the
   set. The 36% matters — on the earlier 786×849 placeholders the head centred
   at 47%, and reusing that number on this taller canvas frames the chest.
   Scaling the video to 178% of the tile's width puts the head at ~78% of the
   tile — filling the circle the way the figurine crop does — and the negative
   offsets below re-centre that enlarged frame on the head.

   mix-blend-multiply for the same reason MindPortrait uses it: these clips are
   h264 with no alpha, so they carry an opaque WHITE backdrop that would
   otherwise paint a hard square over the row's translucent glass. White
   multiplies away to nothing and the figure's darker pixels survive. That is
   also why the tile keeps a white circle UNDER the video — multiply needs
   something light to knock the backdrop out against, and the row's glass fill
   alone would tint the figure.
   ------------------------------------------------------------------------ */

export function MindVideoAvatar({ mind, size = 48 }) {
  const fullBody = mind?._fullBody ?? fullBodyFor(mind);
  if (fullBody) return <FullBodyHeadAvatar src={fullBody} size={size} name={mind?.name} />;

  const src = mind?._sideView;
  const poster = mind?._sideViewPoster;

  // 1px, DOWN FROM 2. At 2px in a saturated blue the rim stopped being a rim
  // and became a coloured band around the figure — closer to the status-ring
  // vocabulary used elsewhere in profile v2 than to the subtle edge that was
  // asked for. A hairline at low-contrast blue is the actual ask; see the
  // gradient's own note below for the matching colour change.
  const RING = 1;
  // The media circle inside the ring. Every crop number below is measured
  // against THIS, not `size`.
  const INNER = size - RING * 2;

  // No clip on this Mind (one that predates the mock decoration, or a primary
  // resolved from the endpoint alone) — fall back to the figurine avatar
  // rather than rendering an empty circle. _avatar is derived from the mindId
  // in that second case (see primaryMind's useMemo), so it is always present;
  // the ?? keeps this safe if a caller ever passes a bare mind object.
  if (!src) {
    return (
      <MindAvatar
        avatar={mind?._avatar ?? mindAvatar(mind?.mindId ?? "", mind?.name ?? "")}
        size={size}
        shape="circle"
      />
    );
  }

  return (
    /* THE RING IS THE OUTER SPAN, THE MEDIA SITS IN AN INNER ONE. A gradient
       cannot be a `border-color`, so the rim is painted as the outer element's
       BACKGROUND and the inner circle is inset by RING px — the standard
       gradient-border construction, and the same nested-circle logic the rail's
       glass panels use.

       IT CANNOT BE A BOX-SHADOW HERE. The video runs on mix-blend-multiply
       (see the block note above), and a shadow on the same element paints
       INSIDE that blend group — a blue ring would multiply against the figure
       instead of ringing it. Painting the rim as a separate ancestor's
       background keeps it clear of the blend entirely.

       A PALE TINT, NOT THE BRAND RAMP. The first pass ran the page's own
       blue ramp here (#8fb2f0 → #637ac5 → #324890) at 2px, which read as a
       hard saturated band drawn around the figure rather than an edge on it.
       These three stops are the same hue family at roughly a quarter the
       saturation, so the rim only separates the white disc from the row's
       pale glass — visible when looked at, invisible when not, which is what
       "subtle" means here. Still top-left to bottom-right, so it reads as lit
       from the same direction as every other glass edge on this page.

       The drop underneath is softened to match (0.22 → 0.10 alpha): at the
       old strength the shadow was doing more separating than the rim, which
       left the disc looking outlined twice. */
    <span
      className="relative inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        padding: RING,
        background: "linear-gradient(135deg, #d5e0f5 0%, #b9c6e8 55%, #9daed9 100%)",
        boxShadow: "0 1px 3px rgba(96,118,200,0.10)",
      }}
      role="img"
      aria-label={mind.name}
    >
      {/* bg-white is LOAD-BEARING, not decoration: mix-blend-multiply needs a
          light surface to knock the clip's opaque white backdrop out against.
          Over the row's glass alone the figure would come out tinted. */}
      <span className="relative block w-full h-full overflow-hidden rounded-full bg-white">
        <video
          className="absolute block mix-blend-multiply pointer-events-none max-w-none"
          style={{
            // 151%, down 15% from the 178% the first pass used — the owner
            // asked for more of the figure and less head. This drops the head
            // from ~78% of the disc to ~66%, bringing the shoulders and arms
            // into frame. Scaled against INNER (the circle inside the ring),
            // not `size`, or the ring's 2px would crop the figure back.
            width: INNER * 1.513,
            height: "auto",
            // Re-centre the enlarged frame on the head: its centre sits at
            // 52%/36% of the SOURCE, so pull left/up by that fraction of the
            // scaled frame, then push back by half the circle to centre it.
            left: INNER / 2 - INNER * 1.513 * 0.518,
            top: INNER / 2 - INNER * 1.513 * (988 / 786) * 0.363,
          }}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <ClipSources src={src} />
        </video>
      </span>
    </span>
  );
}

/* ── Still avatar ────────────────────────────────────────────────────────────
   The SAME character, the SAME crop and the SAME ringed disc as
   MindVideoAvatar above, but painted from `_sideViewPoster` (the still .webp)
   instead of `_sideView` (the .mp4).

   WHY A SECOND COMPONENT RATHER THAN A PROP. The two differ only in the
   element they render, but the video path carries autoPlay/loop/muted and a
   metadata preload per Mind. Redeem's picker draws six of these at once and
   they are chooser rows, not the page's subject — six looping clips there is
   motion competing with the one thing the user is meant to do. Everything
   else (the 151% scale, the 52%/36% head-centre offsets, the 1px gradient
   rim, mix-blend-multiply over a white disc) is deliberately identical, so a
   Mind reads as the same figure here as it does on Home and the cards. See
   the block note on MindVideoAvatar for why each of those numbers is what it
   is.
   ------------------------------------------------------------------------ */

export function MindStillAvatar({ mind, size = 48 }) {
  const fullBody = mind?._fullBody ?? fullBodyFor(mind);
  if (fullBody) return <FullBodyHeadAvatar src={fullBody} size={size} name={mind?.name} />;

  const src = mind?._sideViewPoster;
  const RING = 1;
  const INNER = size - RING * 2;

  if (!src) {
    return (
      <MindAvatar
        avatar={mind?._avatar ?? mindAvatar(mind?.mindId ?? "", mind?.name ?? "")}
        size={size}
        shape="circle"
      />
    );
  }

  return (
    <span
      className="relative inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        padding: RING,
        background: "linear-gradient(135deg, #d5e0f5 0%, #b9c6e8 55%, #9daed9 100%)",
        boxShadow: "0 1px 3px rgba(96,118,200,0.10)",
      }}
      role="img"
      aria-label={mind?.name}
    >
      {/* bg-white is LOAD-BEARING — see MindVideoAvatar: the stills carry the
          same opaque white backdrop the clips do, and mix-blend-multiply needs
          something light to knock it out against. */}
      <span className="relative block w-full h-full overflow-hidden rounded-full bg-white">
        <img
          className="absolute block mix-blend-multiply pointer-events-none max-w-none"
          style={{
            width: INNER * 1.513,
            height: "auto",
            left: INNER / 2 - INNER * 1.513 * 0.518,
            top: INNER / 2 - INNER * 1.513 * (988 / 786) * 0.363,
          }}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

export function Mock({ children, className }) {
  const on =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("mock") === "1";
  // NOTE: always renders the same wrapper, on or off. An earlier version
  // returned `children` bare when off, which silently dropped `className` and
  // broke layout in the default (non-mock) view — and made mock mode shift the
  // page. Only the outline is conditional.
  return (
    <span
      className={cn("relative inline-block", className)}
      style={
        on
          ? { outline: "1px dashed rgba(253,141,29,.75)", outlineOffset: 1, borderRadius: 3 }
          : undefined
      }
      title={on ? "Mocked — no API field for this yet" : undefined}
    >
      {children}
    </span>
  );
}
