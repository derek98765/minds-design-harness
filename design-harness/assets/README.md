# Assets

The full Minds image library — 77 files. Folders are organised so the structure
narrows the choice for you.

> **Before you ship any of these:** they are full-resolution source files, several
> over 5MB. Compress and resize first. A slow page loses the reader before the design
> matters.

---

## Logo — `logo/`

| File | Use |
|---|---|
| `minds-blue.svg` | **Default.** Warm canvas, white, any light surface. |
| `minds-white.svg` | Indigo canvas, photography, any dark surface. |
| `minds-blue.png` · `minds-white.png` | Only where SVG isn't supported. |

Prefer SVG. Minimum 120px wide — below that use the icon mark alone.
Rules and the eight don'ts: [../spec/brand-logo.md](../spec/brand-logo.md).

---

## Abby the mascot — `mascot/`

**`poses/`** — 21 renders of Abby in different gestures. Match the gesture to what
the copy says, and use one Abby per section. Good starting points:

| File | Gesture | Good for |
|---|---|---|
| `abby-09.png` | Arms crossed, front-facing | The default hero pose |
| `abby-16.png` | Waving | Welcome screens, confirmations |
| `abby-05.png` | Pointing | Beside a headline, pointing into it |
| `abby-02.png` | Open-handed, mid-explanation | Alongside a feature |
| `abby-19.png` | Arms raised | Success and completion states |
| `abby-04.png` | Leaning, mid-motion | Where the layout needs energy |

**`turnaround/`** — the model sheet. `abby-ref-02-4views.png` is the one you attach
as a character reference when generating new Abby imagery. Not for placement on a page.

Rules: [../spec/brand-mascot.md](../spec/brand-mascot.md).

---

## Hand stickers — `stickers/`

A separate accent system from Abby. Small, punctuating one point. One or two per page.
Don't mix a sticker into a scene that already has a full Abby.

**`solo/`** — 8 bare gestures, reusable anywhere:

| File | Gesture |
|---|---|
| `hand-solo-01.png` | Open palm — neutral, welcoming. The safe default. |
| `hand-solo-03.png` | OK sign — confirmation, "you're set" |
| `hand-solo-08.png` | Pointing — at a headline or a single stat |
| `hand-solo-02.png` · `04` · `05` · `06` · `07` | Other gestures — waving, grasping, fist |

**`props/`** — 6 compositions holding an object. More specific, so they only fit
where the meaning matches:

| File | Shows |
|---|---|
| `hand-prop-04.png` | Thumbs-up with stars — testimonials, ratings |
| `hand-prop-06.png` | Handshake over a checklist — sign-ups, agreements |
| `hand-prop-01.png` | Wallet with cash — payment, value |
| `hand-prop-02.png` | Coins — pricing, savings |
| `hand-prop-03.png` | Holding a card — checkout, payment |
| `hand-prop-05.png` | Phone with a checklist — mobile task flows |

---

## Mind icons — `icons/`

30 dual-tone app icons, one per named Mind/agent persona (indigo base, orange picking
out one detail — the same dual-tone rule as [../spec/brand-iconography.md](../spec/brand-iconography.md)). Use
one when a page references a specific Mind by name — a card in a Minds directory, a
"Meet [Mind name]" section, a launched-Mind confirmation.

| File | Mind |
|---|---|
| `finance_buddy.webp` | Finance Buddy — piggy bank |
| `meal_planner.webp` | Meal Planner — bowl of food |
| `travel_planner.webp` | Travel Planner |
| `minds_page.webp` · `minds_video.webp` · `minds_hosting_and_soil.webp` | Minds platform features (page, video, hosting) |
| `email_task_wizard.webp` · `email_unsubscribe_wizard.webp` | Email Minds |
| `plant_care.webp` · `pet_health_tracker.webp` · `womens_health_tracker.webp` · `nutrition_tracker.webp` | Everyday-life trackers |
| `retirement_simulator.webp` · `superior_trade.webp` · `hk_price_hunter.webp` · `event_deal_flow_scout.webp` | Money and deals |
| `schoolwork_companion.webp` · `hobby_guide.webp` · `my_bestie.webp` · `fortune_seer.webp` | Companionship and learning |
| `sales_negotiation.webp` · `scrum_master.webp` · `qa_tester.webp` · `linkedin_recruiter_research.webp` · `professional_slide_pdf.webp` · `agentic_genealogy_research.webp` | Work and builder Minds |
| `etsy_shop_strategist.webp` · `trend_hunter.webp` · `humanizer.webp` · `follow_up.webp` · `passive_autonomous_soul.webp` | Other named Minds |

**Defaults** — use when a Mind doesn't have its own icon yet, or the context is generic
rather than one specific Mind:

| File | Use |
|---|---|
| `app-icon-default.svg` | A generic Mind/app placeholder — geometric four-square mark. |
| `skill-icon-default.svg` | A generic skill/capability placeholder — leaf/plant mark. |

Never invent a new icon for a named Mind that already has one here — reuse the file.
For a Mind that isn't in this list, use a default rather than drawing a new one; see
[../spec/brand-iconography.md](../spec/brand-iconography.md) before drawing anything from scratch.

---

## One-Click Mind toy figurines — `toy-figurines/`

18 produced blister-pack renders — Abby dressed and posed for a specific one-click
Mind, packaged as a collector toy with themed accessory icons down the side. This is
the art direction for **launching or featuring a one-click Mind**: a launch page hero,
a card in a Minds directory or pricing grid, a "meet this Mind" section.

| File | Mind |
|---|---|
| `mind_general_assistant.png` | General Assistant |
| `mind_chief_of_staff.png` | Chief of Staff |
| `mind_bizz.png` | Business/exec assistant — suit, phone, briefcase |
| `mind_GTM.png` | Go-to-market / growth marketing |
| `mind_sales.png` | Sales |
| `mind_recruiter.png` | Recruiter |
| `mind_scrum_master.png` | Scrum Master |
| `mind_product_builder.png` | Product Builder |
| `mind_content.png` | Content creation |
| `mind_research.png` | Research |
| `mind_decision.png` | Decision support / advisor |
| `mind_email_manager.png` | Email Manager |
| `mind_follow_up.png` | Follow-Up |
| `mind_personal_chef.png` | Personal Chef |
| `mind_fitness_coach.png` | Fitness Coach |
| `mind_learning_coach.png` | Learning Coach |
| `mind_football.png` | Football commentator/analyst |
| `mind_superior_trader.png` | Trading |
| `mind_game_designer.png` | Game Designer |

These are full produced compositions (packaging, banner, accessory-item pockets, seal)
— never assembled in CSS, never edited or recolored. If the Mind you need isn't in
this list, use the `generate-one-click-mind-images` skill rather than faking one; see
the "One-Click Mind blister packs" section of [../spec/brand-mascot.md](../spec/brand-mascot.md) for the anatomy
and rules.

---

## Photography — `photos/`

Three sets. Pick the one matching your page's reader.

### `product/` — Abby in product context (9)

Abby with the product itself rather than with people. **This is usually the right set
for a one-click Mind launch page or a feature announcement.**

| File | Shows |
|---|---|
| `build-your-own-mind.png` | Accessory-pack concept — building a custom Mind |
| `mind-created.png` | Abby surrounded by tools and skills — a Mind just made |
| `network.png` | Connected-apps diagram — Telegram, Spotify, Gmail and more |
| `abby-digital-hands.png` | Abby with a floating UI panel |
| `abby-empty-result.png` | Abby shrugging — empty states |
| `abby-kv.png` · `abby-machine.png` | Many Abbys in a production line — scale, automation |
| `animoca-minds03.png` · `animoca-minds04.png` | Branded packaging concepts |

### `everyday-user/` — real people, consumer audience (17)

The primary audience: busy parents, small business owners. Warm interiors, natural
daylight, someone mid-task with Abby in the scene.

| File | Scene |
|---|---|
| `hero-everyday-mobile.png` | Home desk, warm orange wall — a strong hero |
| `abby-kitchen.png` | Cooking, two Abbys helping |
| `abby-laundry.png` | Laundry — everyday chores |
| `abby-facial.png` | Spa treatment — self-care |
| `abby-kids.png` · `family.png` | Children and family settings |
| `etsy.png` | Small-business seller at a craft wall |
| `telegram.png` | Phone in hand — messaging channel |
| `laptop-hands.png` | Laptop close-up, Abby hands on the keyboard |
| `circles.png` | Person surrounded by many Abbys |
| `chat-placeholder-3.png` | Kitchen, phone in hand |
| `venture-mind.png` | Headphones at a desk |
| `animoca-minds01.png` · `05` · `09` · `10` · `11` | Café, studio, office and meeting scenes |

### `builder/` — developers and founders (6)

The secondary audience. Workshops, code, multi-monitor setups.

| File | Scene |
|---|---|
| `hero-builders.png` | Dark studio, screen glow — a strong hero for this audience |
| `intern.png` · `horse.png` | Multi-monitor development work |
| `magic-project-guru.png` | Laptop on a sofa, two Abbys |
| `animoca-minds08.png` · `animoca-minds12.png` | Desk work with floating UI |

Direction and the locked AI-generation prompts:
[../spec/brand-imagery.md](../spec/brand-imagery.md).
