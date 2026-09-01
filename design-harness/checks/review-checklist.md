# Visual review checklist

The scripts catch wrong *values*. This catches wrong *judgment* — the things that
make a page look off-brand even when every token is technically correct.

Walk this before calling a page done. It takes about two minutes.

---

## 1. Section rhythm

- [ ] **No two adjacent sections share a background.** The rhythm is warm canvas →
      white → warm canvas. This is the single most recognisable Minds move.
- [ ] **No hairline rules between sections.** Background change and whitespace do that
      job. A `<hr>` or top border between sections is wrong.
- [ ] Sections breathe — generous vertical padding between distinct ideas.

## 2. Orange discipline

- [ ] **Exactly one orange action per section.** If there are two, one is wrong.
- [ ] Orange is not a background for any large surface.
- [ ] Orange is not the colour of any heading.
- [ ] Every large or headline-adjacent orange element is something you can actually click.
      Exceptions: an eyebrow label on the indigo section canvas; a micro accent — a small
      status badge, a pagination dot, an icon-button hover fill; a checked checkbox, radio,
      or toggle; and a numbered-step circle on the indigo canvas or (sparingly) on white.
      All stay small or are a selection/marker state, not a substitute for the one orange
      CTA rule above.
- [ ] **Numbered-step circles are the same color throughout one list**, chosen for contrast:
      blue on warm canvas, blue by default on white, orange on the indigo canvas.
- [ ] **A CTA button uses `secondary` (blue), not `primary` (orange), if it's inside a card**
      or the page background is a warm brown/orange photo. Otherwise, a CTA sitting directly
      on the section canvas defaults to orange.
- [ ] **The active/selected state in tabs, dropdowns, and filter toggles is blue, not
      orange.** Active tab label + underline, the selected dropdown item, the selected icon
      in a segmented filter — all blue. Orange stays for a binary checked control (checkbox,
      radio, on/off switch) and for actions, not for "which option is currently chosen."

## 3. Type

- [ ] Headlines are extrabold (800). Body is regular (400). Nothing drifts to 500/600
      except eyebrows, buttons, and small labels.
- [ ] **No all-caps headlines.** Eyebrows are uppercase; headlines never are.
- [ ] At most one phrase per headline is highlighted, and it is indigo — except on the
      indigo section canvas, where it may be orange instead (blue-on-blue disappears there).
- [ ] Body copy is muted (`neutral-600`), not full black.
- [ ] Prose is constrained to a comfortable measure — paragraphs never run the full
      width of a wide screen.

## 4. Shape and depth

- [ ] Every button is a pill. No square or slightly-rounded buttons anywhere.
- [ ] Shadows appear only where something genuinely floats — a hover lift, a sticky
      bar. Not to separate a card from the page.
- [ ] Cards on the warm canvas are white; cards on white are warm canvas.

## 5. Copy

- [ ] The brand is written **"Minds"** — never "Animoca Minds".
- [ ] Headlines promise a concrete outcome, not an abstract capability.
- [ ] No feature lists where a plain sentence would do.
- [ ] Read it aloud. If it sounds like software marketing rather than a person
      explaining something useful, rewrite it. See `spec/voice-and-copy.md`.

## 6. Mobile — check at 390px

- [ ] Nothing overflows horizontally.
- [ ] **No button label is on two lines, and none runs off the screen edge.** Buttons
      carry `whitespace-nowrap`, so a label that is too long overflows rather than
      wrapping — check the right edge, not just the button.
- [ ] **Any side-by-side button pair has stacked into a vertical column.** That row is
      what breaks first at 390px. If a stacked button *still* overflows, the label is
      too long — propose shorter copy rather than shrinking the padding or type.
- [ ] Split sections stack, with the image below the text.
- [ ] Every form field renders at 16px or larger. Below that, iOS Safari zooms on
      focus and the page jumps.
- [ ] Tap targets are comfortably large.

## 7. Last look

- [ ] Compare against `style-guide/index.html`. Does your page look like it belongs in
      the same family?
- [ ] If something feels off but you can't name it, it is usually **spacing** or
      **too much orange**. Check those first.
