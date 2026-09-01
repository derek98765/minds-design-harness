---
name: responsive-design
description: Adapt Minds desktop-first interfaces for tablet and mobile so layout, hierarchy, interaction, imagery, and content remain intentional at smaller viewports. Use for responsive implementation, mobile layout fixes, overflow, cropping, tabs, tables, modals, sticky panels, or mobile QA.
---

# Responsive design for Minds

Adapt the interface rather than uniformly shrinking it. Preserve hierarchy, readable
content, useful touch targets, and the project's visual rhythm at every breakpoint.

## Preflight

1. Read [../../../AGENTS.md](../../../AGENTS.md) and
   [../../../design-harness/spec/DESIGN.md](../../../design-harness/spec/DESIGN.md).
2. Inspect [../../../design-harness/kit/tokens.css](../../../design-harness/kit/tokens.css),
   relevant components in `design-harness/kit/`, and the complete target component or page.
3. Confirm actual breakpoints and whether typography tokens already scale. Do not add
   local font overrides that defeat responsive tokens.
4. Reuse components and tokens. Project rules against hardcoded values and invalid
   spacing tokens still apply during responsive work.

## Layout decisions

- Progressively reduce section padding, gaps, and type hierarchy with valid tokens.
- Replace rigid widths with fluid widths and tokenized maximum widths.
- Step grids down as space falls. Stack rows when their content no longer fits, while
  preserving the intended reading and action order.
- Make awkwardly near-full-width grouped controls full-width on mobile and redistribute
  their children. Do not apply this blindly to pills or individual buttons.
- Stack a row of two or more buttons before their labels are allowed to wrap. Button
  text is always one line, so a label that no longer fits overflows rather than
  wrapping — the row has to give, never the button's padding or type size.
- Never hide important content merely to suppress overflow. Reshape it or use a control
  suited to the smaller viewport.

## Buttons, pills, and controls

- Buttons, badges, pills, chips, and tabs stay on one line with `whitespace-nowrap`.
- Follow the button-row pattern in `AGENTS.md`: paired buttons stack on mobile and may
  wrap into a row at larger breakpoints.
- If a stacked button label still overflows at 390px, stop and propose shorter wording.
  Do not choose replacement copy or shrink padding or type to force a fit.
- Keep interactive targets at least 44 by 44 CSS pixels.
- Mobile `input`, `textarea`, and `select` text renders at 16px or larger. Never disable
  user scaling to mask iOS input zoom.

## Common transformations

### Images and text overlays

- Break a mobile full-bleed image out of its padded container using valid tokens, then
  restore normal container treatment at the appropriate breakpoint.
- Use an intentional mobile crop and breakpoint-specific focal position. Verify the
  subject rather than guessing from source dimensions.
- Protect text contrast with an existing tokenized overlay or gradient and reserve
  visible space for the focal subject. Do not add hardcoded gradient colors or inline
  token-system styles.

### Tabs and tables

- A short overflowing tab set becomes a single-axis horizontal scroller with
  `overflow-x-auto overflow-y-hidden`, `shrink-0` tabs, one-line labels, and a visible
  affordance that more content exists.
- A long tab set becomes a native `select` on mobile while retaining tabs at larger
  breakpoints. Do not wrap tabs or compress their labels.
- Transform wide tables into a card per row on mobile, placing each heading next to its
  value. Do not horizontally scroll data tables.

### Modals and sticky panels

- Mobile modals are bottom sheets: bottom-aligned, full-width, top-rounded, and restored
  to centered dialogs at tablet or desktop widths.
- Cap height with dynamic viewport units. Keep header and footer fixed while only the
  body scrolls; the body needs `flex-1 min-h-0 overflow-y-auto`.
- Contain overscroll, account for the bottom safe area, animate from the bottom, and do
  not add a drag handle unless swipe-to-dismiss is implemented.
- Keep a desktop rail containing a primary action or critical context reachable on
  mobile as a sticky bottom section, or as a fixed compact bar with matching page-bottom
  clearance. Do not pin decorative rails.

## Verification

Verify the rendered page around 390px, 768px, and a representative desktop width.
Prefer true viewport resizing. If unavailable, use a temporary same-origin iframe at
the target size, then remove the entire test scaffold before finishing.

At each size inspect horizontal overflow, focus rings, nested scrolling, hierarchy,
line lengths, crops, section rhythm, labels, actions, touch targets, inputs, tabs,
tables, modals, sticky content, safe areas, keyboard focus, and floating dev controls.

Run the project checks on every changed file or directory:

```bash
node design-harness/checks/check-spacing.mjs <your-file-or-dir>
node design-harness/checks/check-hardcoded.mjs <your-file-or-dir>
node design-harness/checks/check-button-text.mjs <your-file-or-dir>
```

Then complete [../../../design-harness/checks/review-checklist.md](../../../design-harness/checks/review-checklist.md)
before reporting responsive work finished.
