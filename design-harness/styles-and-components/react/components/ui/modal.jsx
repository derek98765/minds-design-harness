import { useCallback, useEffect, useRef, useState } from "react"
import { XIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

/*
 * Modal and SplitModal — the standard dialogs.
 *
 *   Modal        one column: centred title and description, a scrolling body,
 *                a centred action row. For confirmations, short forms, pickers.
 *   SplitModal   two columns: a list or picker on the left, the chosen item's
 *                detail on the right, an action bar under the detail. For
 *                choose-then-configure flows (the Launch a Mind modal is one).
 *
 * Both are a bottom sheet on phones and a centred card from md up, and both
 * scroll only their body, never the title, close button or actions.
 *
 * LONG CONTENT: a scrolling body gets the cool scrollbar and a soft fade over
 * its bottom edge while more is hidden below. The fade goes once you reach
 * the end, so people can tell there is more without a scroll cue.
 *
 * ModalPreview / SplitModalPreview draw the same card inline, without the
 * overlay or portal, so the style guide can show them on the page.
 */

const MODAL_WIDTHS = {
  sm: "md:!max-w-[520px]",
  lg: "md:!max-w-[1040px]",
}

const FRAME =
  "v2 relative flex w-full flex-col overflow-hidden rounded-[var(--r-xl)] border border-[var(--line-cool)] bg-[var(--bg-modal)] shadow-[var(--elev-lg)]"

/* True while the scroller has content below the fold. A ResizeObserver on the
   content catches growth as well as the dialog itself resizing. */
function useMoreBelow(open, deps) {
  const scrollRef = useRef(null)
  const contentRef = useRef(null)
  const [moreBelow, setMoreBelow] = useState(false)

  const check = useCallback(() => {
    const el = scrollRef.current
    if (el) setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 1)
  }, [])

  // The body mounts after the dialog opens, so re-check once it is there.
  const setScrollEl = useCallback(
    el => {
      scrollRef.current = el
      if (el) requestAnimationFrame(check)
    },
    [check]
  )

  useEffect(() => {
    const el = scrollRef.current
    if (!open || !el) return
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    if (contentRef.current) ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [open, deps, check])

  return { setScrollEl, contentRef, onScroll: check, moreBelow }
}

/* A scroller with the bottom fade. */
function FadeScroll({ open = true, className, scrollClassName, fadeClassName, children }) {
  const { setScrollEl, contentRef, onScroll, moreBelow } = useMoreBelow(open, children)
  return (
    <div className={cn("relative flex min-h-0 flex-1 flex-col", className)}>
      <div
        ref={setScrollEl}
        onScroll={onScroll}
        data-slot="modal-body"
        className={cn("scroll-cool-v2 min-h-0 flex-1 overflow-y-auto", scrollClassName)}>
        <div ref={contentRef}>{children}</div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-[var(--bg-modal)] to-transparent transition-opacity duration-150",
          fadeClassName,
          moreBelow ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}

/* ── One column ───────────────────────────────────────────────────────────── */

function ModalLayout({ open, title, description, descriptionClassName, footer, children }) {
  return (
    <>
      <DialogHeader className="gap-16">
        <DialogTitle>{title}</DialogTitle>
        {description && (
          <DialogDescription
            className={cn(
              "m-0 text-center text-[var(--text-label-cool)]",
              descriptionClassName ?? "text-body-sm leading-normal font-normal"
            )}>
            {description}
          </DialogDescription>
        )}
      </DialogHeader>
      {/* The scroller clips whatever overflows it, so it is padded out and pulled back with
          negative margins: drop shadows (the pack cards') get room to spill past the content. */}
      {children && (
        <FadeScroll
          open={open}
          scrollClassName="-my-16 py-16 max-md:-mx-20 max-md:px-20 md:-mx-24 md:px-24"
          fadeClassName="-bottom-16">
          {children}
        </FadeScroll>
      )}
      {footer && (
        <div data-slot="modal-footer" className="flex flex-wrap items-center justify-center gap-x-24 gap-y-12">
          {footer}
        </div>
      )}
    </>
  )
}

/**
 *   title / description   a centred heading and a lighter note under it
 *   children              the body (scrolls)
 *   footer                the action row, centred — usually one primary Action
 *   size                  "sm" 520px (default) or "lg" 1040px
 */
function Modal({ open, onOpenChange, size = "sm", className, ...layout }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...(!layout.description && { "aria-describedby": undefined })}
        className={cn("v2 !bg-[var(--bg-modal)] !gap-36 !pb-40 !pt-36", MODAL_WIDTHS[size], className)}>
        <ModalLayout open={open} {...layout} />
      </DialogContent>
    </Dialog>
  )
}

/* ── Two columns ──────────────────────────────────────────────────────────── */

function SplitLayout({ open, title, description, aside, footer, children }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col md:flex-row">
      <div className="flex min-h-0 flex-col gap-16 px-20 pt-24 md:w-[40%] md:shrink-0 md:border-r md:border-[var(--line-cool)] md:px-24 md:pt-36">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-left">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-left text-body-sm leading-normal font-normal text-[var(--text-label-cool)]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <FadeScroll open={open} scrollClassName="-mx-8 px-8 pb-24" fadeClassName="h-48">
          {aside}
        </FadeScroll>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <FadeScroll open={open} scrollClassName="px-20 pt-24 pb-24 md:px-24 md:pt-36" fadeClassName="h-48">
          {children}
        </FadeScroll>
        {footer && (
          <div
            data-slot="modal-footer"
            className="flex shrink-0 flex-wrap items-center justify-end gap-12 border-t border-[var(--line-cool)] px-20 py-16 md:px-24">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 *   title / description   the heading, left-aligned over the left column
 *   aside                 the left column's body: a list or picker (scrolls)
 *   children              the right column's body: the detail (scrolls)
 *   footer                the action bar under the right column
 */
function SplitModal({ open, onOpenChange, className, ...layout }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...(!layout.description && { "aria-describedby": undefined })}
        className={cn(
          "v2 !bg-[var(--bg-modal)] !gap-0 !p-0 md:!max-w-[1040px] md:!h-[min(90dvh,720px)] max-md:overflow-y-auto",
          className
        )}>
        <SplitLayout open={open} {...layout} />
      </DialogContent>
    </Dialog>
  )
}

/* ── Inline previews (style guide) ────────────────────────────────────────── */

function CloseMark() {
  return <XIcon size={24} className="absolute right-[25px] top-[15px] text-neutral-600" aria-hidden="true" />
}

/* The title and description are Radix parts, which need a Dialog root above
   them for their context; an open root with no content draws nothing itself. */
function ModalPreview({ size = "sm", className, ...layout }) {
  return (
    <Dialog open>
      <div
        className={cn(
          FRAME,
          "gap-36 px-24 pb-40 pt-36",
          size === "lg" ? "max-w-[1040px]" : "max-w-[520px]",
          className
        )}>
        <CloseMark />
        <ModalLayout {...layout} />
      </div>
    </Dialog>
  )
}

function SplitModalPreview({ className, ...layout }) {
  return (
    <Dialog open>
      <div className={cn(FRAME, "h-[480px] max-w-[1040px]", className)}>
        <CloseMark />
        <SplitLayout {...layout} />
      </div>
    </Dialog>
  )
}

export { Modal, SplitModal, ModalPreview, SplitModalPreview }
