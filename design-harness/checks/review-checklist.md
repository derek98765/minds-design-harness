# Visual review checklist

The scripts catch wrong *values*. This catches wrong *judgment* — the things that
make a page look off-brand even when every token is technically correct.

Walk this before calling a page done. It takes about two minutes.

---

## 1. Ground and glass

- [ ] **The page sits on the cool wash** (`#f6f7fa` → `#fbfcfe`), not on warm beige
      and not on alternating beige and white bands.
- [ ] A marketing page with glass adds the blue and orange blooms. Glass over a
      flat colour reads as a grey box.
- [ ] Cards are `.glass-card` (or a nested glass shell), with the lit top edge
      and the blue-grey drop. No beige card on a white section.
- [ ] Text on glass is cool grey. Warm grey on a cool panel reads brown.

## 2. Orange and blue

- [ ] **One lit-orange action per view.** That is the thing the screen is asking
      for. It uses the gradient and its shadow together.
- [ ] Other filled actions are lit blue. The button beside a primary is the
      white secondary, with a cool hairline and a blue label.
- [ ] Orange is not a background for any large surface, and not a heading colour.
- [ ] A headline highlight is `--blue-lit`, one phrase.
- [ ] **Selected state is `--blue-lit`**, not orange: tabs, dropdowns, segments,
      the active rail pill.
- [ ] A switch that means "running" is green. A choice among options is blue.

## 3. Type

- [ ] Headlines are extrabold (800). Body is regular (400). Nothing drifts to 500/600
      except eyebrows, buttons, and small labels.
- [ ] **No all-caps headlines.** Eyebrows are uppercase; headlines never are.
- [ ] At most one phrase per headline is highlighted, and it is `--blue-lit`.
- [ ] Body copy is muted cool or warm grey (`--text-body-cool` on glass), not full black.
- [ ] Prose is constrained to a comfortable measure — paragraphs never run the full
      width of a wide screen.

## 4. Shape and depth

- [ ] Every button is a pill. No square or slightly-rounded buttons anywhere.
- [ ] A filled button is a lit solid: top-lit gradient plus the inset rim and
      tinted drop. A flat orange or flat navy fill is the retired look.
- [ ] Card shadows are the blue-grey `--elev-card` pair, not a neutral grey drop.

## 5. Copy

- [ ] The brand is written **"Minds"** — never "Animoca Minds".
- [ ] Headlines promise a concrete outcome, not an abstract capability.
- [ ] No feature lists where a plain sentence would do.
- [ ] Read it aloud. If it sounds like software marketing rather than a person
      explaining something useful, rewrite it. See `spec/voice-and-copy.md`.

## 6. Imagery

- [ ] **No placeholder boxes, and no generated stand-in characters.** A Mind
      on the page is a file from `assets/master-mind/` or `assets/one-click/`.
- [ ] The figure is the current 3D cast. Not the flat Abby, not a hand sticker,
      not a photo of a person with a character composited in.
- [ ] Collector cards are used whole. Names on text-free figurines are HTML.
      Do not bake a new headline into a scene.
- [ ] Image radius matches the scale — `--radius-md` for small tiles, `--radius-xl` for
      large feature surfaces — and it isn't full-bleed edge to edge on desktop.

## 7. Mobile — check at 390px

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

## 8. Last look

- [ ] Compare against `style-guide/index.html`. Does your page look like it belongs in
      the same family?
- [ ] If something feels off but you can't name it, it is usually **spacing** or
      **too much orange**. Check those first.
