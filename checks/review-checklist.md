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
- [ ] Every orange element is something you can actually click.

## 3. Type

- [ ] Headlines are extrabold (800). Body is regular (400). Nothing drifts to 500/600
      except eyebrows, buttons, and small labels.
- [ ] **No all-caps headlines.** Eyebrows are uppercase; headlines never are.
- [ ] At most one phrase per headline is highlighted, and it is indigo — never orange.
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
- [ ] No text wraps awkwardly *inside* a button.
- [ ] Split sections stack, with the image below the text.
- [ ] Every form field renders at 16px or larger. Below that, iOS Safari zooms on
      focus and the page jumps.
- [ ] Tap targets are comfortably large.

## 7. Last look

- [ ] Compare against `style-guide/index.html`. Does your page look like it belongs in
      the same family?
- [ ] If something feels off but you can't name it, it is usually **spacing** or
      **too much orange**. Check those first.
