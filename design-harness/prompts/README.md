# Prompts

You don't need these. Opening Claude Code in this folder and describing your page in
plain words works — the rules load automatically.

These are here for when you want a running start.

---

## How to prompt well

**Say what the page is for and who reads it.** Everything else follows.

> Build a registration page for our Minds launch event on March 3rd in Hong Kong.
> Audience is everyday users, not developers.

**Give it the real content if you have it.** Real copy produces a better layout than
placeholder text, because the design responds to the length of actual headlines.

**Don't specify colours, fonts, or spacing.** That's the harness's job, and naming
them usually makes the result worse.

**Do say what sections you want** if you have a structure in mind:

> Hero, three benefits, an FAQ, and a signup form at the bottom.

**Ask for a change in plain terms.** "The hero feels cramped", "too much going on",
"make the headline the loudest thing" — these work better than CSS instructions.

---

## Three starting points

### Event registration page

> Build a registration page for [event name] on [date] at [location].
> Hero with the event name and date, a short section on what attendees get,
> the schedule, and a signup form. Audience is [everyday users / builders].

Needs a form, so use the React lane.

### One-click Mind launch page

> Build a landing page for a new one-click Mind called [name] that [does what].
> Lead with the outcome, not the technology. Show three things it handles,
> how to get started, and an FAQ.

Static — use the HTML lane. See `spec/brand-mascot.md` if you want Abby on it.

### New feature or sub-product

> Build a landing page announcing [feature]. Explain what changes for the user,
> show it in use, and end with a single call to action.

---

## Asking for a review

Once a page exists:

> Check this page against the review checklist.

Claude walks `checks/review-checklist.md` and reports what's off — one orange action
per section, alternating backgrounds, mobile at 390px, and the rest.

---

## If the result isn't right

Say what feels wrong, not how to fix it:

| Instead of | Say |
|---|---|
| "Change the padding to 96px" | "The sections feel cramped" |
| "Make the h1 smaller" | "The headline is overpowering the page" |
| "Use #394f95 here" | "This section needs more contrast" |
| "Add a border between sections" | "I can't tell where one section ends" — *(the answer is background change, not a border)* |

The harness knows the system. Describe the problem and let it apply the right fix.
