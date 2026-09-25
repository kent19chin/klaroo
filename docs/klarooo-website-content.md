# klarooo Website — Content & Design Handoff

This is everything from the two-page design (Home + Pricing) extracted as plain content, so it can be rebuilt as a real coded site (e.g. in Claude Code) rather than edited on the design canvas. Copy is final as approved; anything in `[brackets]` is a placeholder that still needs a real value before launch.

---

## 0. What's in this folder

- `klarooo-website-content.md` — this file: all copy, structure, and brand tokens.
- `klarooo-logo.png` / `klarooo-logo-white.png` — the real logo mark, transparent background, at 4x resolution.
- `layout-reference/home-layout-reference.html` and `pricing-layout-reference.html` — the actual coded layout from the design tool, for exact spacing, colors, and structure. These aren't plug-and-play: each file is wrapped in an `<x-dc>` tag and loads a `./support.js` that won't exist outside the design tool, and a `<script type="text/x-dc" data-dc-script>` block at the bottom can be ignored. Strip those three things out and everything else — the inline styles, the flex/grid layout, the section structure — is plain HTML/CSS and translates directly into a real build (React components, Tailwind classes, whatever the target stack is).

---

## 1. Brand basics

**Name:** klarooo
**Tagline used in nav/footer:** AEO / GEO Consultancy
**Logo files:** `klarooo-logo.png` (ink mark, for light backgrounds) and `klarooo-logo-white.png` (white mark, for dark backgrounds) — both included in this export, transparent background, safe to use directly as `<img>` assets.

### Color tokens

| Name | Hex | Use |
|---|---|---|
| Clarity Blue | `#00A7E1` | Primary accent, links-on-dark, icon strokes |
| Leap Orange | `#F17720` | Primary CTA buttons, highlight badges |
| Klarooo Ink | `#0A2A43` | Primary text, dark section backgrounds, nav |
| Paper | `#F7F5F0` | Main light background |
| Blue Tint | `#BEEAF8` | Light accent fills, badges |
| Orange Tint | `#FBD9B8` | Warm accent fills, callout boxes |
| White | `#FFFFFF` | Cards on light backgrounds |

A few extra shades used in the built design (not in the original brand sheet, derived from it — feel free to adjust):
- `#2C4A61` — secondary/muted body text on light backgrounds
- `#52697D` — tertiary/caption text
- `#C25A0D` — deepened orange, used for small kicker labels only (full-strength Leap Orange fails contrast at small text sizes on Paper)
- `#143A55` — dark tint of Ink, used for cards-on-dark
- `#A9C2D3` / `#7E9AAF` — muted text on the Ink background (footer)
- `#23415A` — hairline dividers on dark backgrounds
- `#4A3218` / `#6B4114` — dark text used on top of Orange Tint fills, for contrast

### Typography

- **Headings / wordmark:** Space Grotesk, weight 700
- **Body / UI text:** Manrope, weights 400–800
- Both are Google Fonts: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Manrope:wght@400;500;600;700;800&display=swap`

### Design notes carried over from the mockup
- Buttons use Leap Orange fill with **Ink text**, not white text — reads better and avoids the same contrast issue as the small orange labels.
- Radius is generous throughout: 999px (full pill) on all buttons/badges, 14–22px on cards.
- No gradients, no drop shadows — flat color fields with a 1px `#DCE5EA` border doing the separation work on light cards.

---

## 2. Sitemap

- `/` — Home
- `/pricing` — Pricing
- A third artboard (mobile-optimized Home) was designed for reference/QA but should not become a separate route — it's the responsive behavior of `/` at a narrow viewport, not a distinct page.

---

## 3. HOME PAGE

### Nav
- Logo (links to Home)
- Why it matters → `#why`
- What we do → `#what`
- Pricing → `/pricing`
- Questions → `#faq`
- Button: **Get a free check** → `#start`

### Hero
- Eyebrow badge: `AEO / GEO CONSULTANCY`
- H1: **When your customer asks AI, does your name come up?**
- Body: People now ask ChatGPT, Gemini and Google's AI for recommendations before they visit a single website. We find out what those answers say about your business — then make sure you're in them, and that what they say is right.
- Primary button: **Get your free visibility check** → `#start`
- Secondary button (outline): **See how it works** → `#what`
- Fine print under buttons: Free, no commitment. We walk you through what we find on a short call.

**Hero visual — "mock AI answer" card** (this is the single most important content block on the page; it explains the business without any jargon):
- Label: A customer asks an AI assistant
- Question bubble: "Who are the best [your industry] companies in [your city]?"
- Intro line: Here are three well-regarded options:
- Result 1: **A competitor you know** — Named first. Gets the enquiry.
- Result 2: **A competitor you've never heard of** — Smaller than you. Easier for AI to read.
- Result 3 (highlighted, dashed border): **Is this you?** — This is the only line that matters. We find out, then we fix it.

### Shift band (3-column strip, Blue Tint background)
1. **Search used to give ten links** — Your customer browsed and decided for themselves.
2. **Now AI gives one answer** — A short list of names, chosen for them. You're on it or you're not.
3. **Nobody tells you which** — There's no dashboard for this. Someone has to go and check.

### Section: Why This Matters (`id="why"`)
- Eyebrow: WHY THIS MATTERS
- H2: **Three ways you lose customers you never even see**
- Subhead: These aren't lost leads you can go back and chase. They're conversations that happened without you in them.

Three cards:
1. **You're simply not mentioned** — When someone asks for the best option in your category, AI names a handful of businesses. If you're not one of them, you were never in the running — and you'll never know it happened.
2. **You're mentioned, but it's wrong** — AI can quote prices you changed years ago, miss services you offer today, or mix you up with a company that shares your name. Your customer believes it. You never get to correct it.
3. **Your competitor becomes the default** — The name AI keeps repeating becomes the safe choice in your customer's head. The longer that goes on, the harder and more expensive it gets to change.

### Section: What We Do (`id="what"`)
- Eyebrow: WHAT WE DO
- H2: **We check what AI says about you. Then we change it.**
- Subhead: No jargon, no black box. Here is exactly what happens, in the order it happens.

Four numbered rows (01–04; row 04 is styled dark/Ink to close the sequence):
1. **We find out where you stand** *(The honest starting point.)* — We ask AI the same questions your customers actually ask — across ChatGPT, Gemini and Google's AI answers. We ask each one several times, because the answers change. Then we show you how often you get named, how often your competitors do, and exactly which questions you're missing from.
2. **We fix what AI gets wrong** *(Usually the fastest win.)* — We take every claim AI makes about your business and check it against what's actually true. Wrong price, missing service, confused with another company — we find it, trace where the bad information is coming from, and correct it at the source.
3. **We get you into the sources AI trusts** *(Where answers really come from.)* — AI doesn't invent its answers. It reads directories, review sites, industry lists and public databases. We map the ones that actually count in your industry, show you which ones you're missing from, and get you properly listed on them.
4. **We do the technical work ourselves** *(This is the part most agencies hand back to you.)* — Making a website readable to AI is a build job, not a writing job. We came from building websites before we did this, so the fixes get made — not written up in a report and passed to your developer with a wish of good luck.

### Section: How It Goes (4-step timeline)
- Eyebrow: HOW IT GOES
- H2: **From first call to results in about a month**

| When | Title | Body |
|---|---|---|
| WEEK 0 | We get to know you | One call to agree who your real competitors are and what your customers ask before they buy. |
| WEEKS 1–2 | We do the checking | We run those questions across the AI tools and cross-check every answer against your real business. |
| WEEK 3 | We show you everything | A plain-English walkthrough of what we found, what it's costing you, and what to fix first. |
| WEEK 4 ONWARDS | We get to work | We make the fixes and keep checking every month, so you can see the answers change. |

### Section: Pricing preview
- Eyebrow: PRICING
- H2: **Start with a check. Continue only if it's worth it.**
- Subhead: You pay once to find out where you stand. The monthly plan is how you improve it — and it's your call whether to start one.
- Link: See full pricing → → `/pricing`

Two summary cards:
- **Step one — pay once:** "Find out where you stand" — A one-time check that tells you how visible you are today, what AI is getting wrong about you, and what to fix first. Two depths, depending on how much detail you want. → mini price tiles: Visibility Snapshot `[RM X,XXX]` / Full Audit `[RM X,XXX]`
- **Step two — monthly, optional:** "Actually improve it" (dark card) — Knowing isn't fixing. The monthly plan is where we make the changes, keep watching the answers, and show you the difference month by month. → mini price tiles: Sustain `[RM X,XXX]/mo` / Grow `[RM X,XXX]/mo` (Grow tile highlighted orange)

### Section: FAQ (`id="faq"`)
- Eyebrow: QUESTIONS
- H2: **The things people ask us first**
- Subhead: Something not covered here? Ask us on the call — we'd rather answer it properly than have you guess.

1. **Is this just SEO with a new name?** — No, but they're related. SEO is about where you sit on a page of links. This is about whether you get named at all when an AI gives someone a single answer. Some of the work overlaps. A lot of it doesn't.
2. **Do I need to stop my current SEO work?** — Not at all. If you already have someone doing SEO, keep them. We work alongside that, and we're happy to talk to whoever handles your website so nothing gets done twice.
3. **How long before I see a difference?** — Wrong facts can often be corrected within weeks. Getting named more often takes longer — usually a few months — because it depends on sources outside your website updating too. We'll tell you which bucket your situation falls into before you commit to anything.
4. **Can you actually promise I'll get mentioned?** — No, and be careful of anyone who does. We don't control these AI systems. What we can promise is that you'll see exactly where you stand, we'll fix what's fixable, and you'll be able to watch the numbers move — or not — every month.
5. **What if the check says I'm doing fine?** — Then we'll tell you that, and you won't need a monthly plan. We'd rather you came back in six months than pay us for work you don't need.

### CTA band (`id="start"`, Clarity Blue background)
- H2: **Find out what AI says about you**
- Body: It takes one short call to get started, and you'll know more about your AI visibility than most of your competitors know about theirs.
- Buttons: **Book your free check** (filled dark) / **Or message us on WhatsApp** (outline)

### Footer
- Logo + one-line description: We help businesses get found, and get described correctly, when their customers ask AI for a recommendation.
- Column "Services": Visibility Snapshot, Full Audit, Monthly plans — all → `/pricing`
- Column "Company": Why it matters (`#why`), What we do (`#what`), Questions (`#faq`)
- Column "Get in touch": `[hello@klarooo.com]`, `[+60 XX-XXX XXXX]`, `[LinkedIn]`
- Bottom bar: © 2026 klarooo. AEO / GEO Consultancy. — Privacy / Terms (both unlinked placeholders)

---

## 4. PRICING PAGE

### Nav
Same as Home, with "Pricing" shown as the active item.

### Header
- Eyebrow: PRICING
- H1: **Pay to find out. Then decide if it's worth fixing.**
- Subhead: Everything starts with a one-time check, so you're never signing up for a monthly plan before you know whether you need one.

### Step 1 — Setup tiers (one-time)
Section label: numbered badge "1" + **Find out where you stand** + badge "ONE-TIME"
Intro: Both options tell you how often AI names you, who it names instead, and what it's getting wrong. The difference is how deep we go into *why*.

**Card: Visibility Snapshot**
- Subhead: The honest answer to "are we showing up or not?"
- Price: `[RM X,XXX]` one-time
- Includes:
  - How often AI names you, versus three competitors you pick
  - Checked across ChatGPT, Gemini and Google's AI answers
  - Every wrong or outdated fact AI is repeating about you
  - Three to five quick wins you can action straight away
  - A written report and a call to walk you through it
- Button: **Start with a Snapshot**
- Fit note: Best if you've never looked at this before and want to know if there's a problem.

**Card: Full Audit** (highlighted, dark, badge "MOST CHOSEN")
- Subhead: Not just what's happening — why, and what to do about it.
- Price: `[RM X,XXX]` one-time
- Includes:
  - Everything in the Snapshot, plus:
  - Where AI is getting its information about your industry
  - The exact directories and listings you're missing from
  - How a real buyer would read those answers about you
  - A full 30 / 60 / 90 day plan, in order of what pays off first
  - A presentation for your team or board, if you need one
- Button: **Start with a Full Audit**
- Fit note: Best if you already suspect you're behind and want a plan you can act on.

### Step 2 — Retainer tiers (monthly, optional)
Section label: numbered badge "2" + **Then improve it, month by month** + badge "OPTIONAL"
Intro: Knowing where you stand doesn't change anything on its own. This is the part where we do the work — and keep checking, so you can see whether it's landing.

**Card: Sustain**
- Subhead: Hold your ground and don't slip back.
- Price: `[RM X,XXX]` per month
- Includes:
  - We re-ask the same questions every month and track the change
  - We catch new wrong facts before they spread
  - We keep your website readable to AI as it changes
  - A short monthly report — no jargon, no 40-page PDF
- Button: **Talk about Sustain**
- Fit note: Best if the audit found you're in reasonable shape already.

**Card: Grow** (highlighted, Clarity Blue, badge "BEST VALUE")
- Subhead: Actively push to get named more often.
- Price: `[RM X,XXX]` per month
- Includes:
  - Everything in Sustain, plus:
  - We write and rework the pages AI needs to be able to quote
  - We get you onto the listings and sources that feed the answers
  - Bigger technical fixes get done by us, not passed to your team
  - A full re-audit every three months, included
- Button: **Talk about Grow**
- Fit note: Best if you're behind competitors and want to close the gap.

### Honest-limits callout (Orange Tint band)
Heading: **One thing we'd rather say upfront**
Body: Nobody can guarantee you a spot in an AI answer — not us, not anyone selling you this. What we can do is show you exactly where you stand today, fix the things that are genuinely fixable, and put the numbers in front of you every month so you can judge for yourself whether it's working. If it isn't, we'd rather you stopped paying us.

### Money FAQ (`id="questions"`)
H2: **About the money side**

1. **Do I have to take a monthly plan?** — No. Plenty of clients take the one-time check, action the quick wins themselves, and come back later. The check is useful on its own.
2. **Am I locked into a contract?** — Monthly plans run month to month after an initial `[X]`-month period, which exists because this work genuinely takes a few months to show up.
3. **Can I start on Sustain and move up later?** — Yes, and you can move back down too. Most people start where the audit points them and adjust once they've seen a couple of months of data.
4. **What if I have more than one brand?** — Each brand needs its own check, since AI treats them as separate. Talk to us — we'll work something out rather than charging you full price twice.

### CTA band
H2: **Not sure which one you need?**
Body: Tell us about your business on a short call and we'll point you at the right starting tier — including telling you if the answer is "not yet".
Button: **Book a call**

### Footer
Same as Home, condensed to one row (logo + Home / Pricing / Questions / email links + copyright bar).

---

## 5. Placeholders still to fill before launch

- `[RM X,XXX]` — appears 4 times: Snapshot price, Full Audit price, Sustain price, Grow price
- `[X]`-month initial contract period (Pricing page, money FAQ)
- `[hello@klarooo.com]`
- `[+60 XX-XXX XXXX]`
- `[LinkedIn]` — needs a real URL
- Privacy / Terms pages don't exist yet — links currently point at anchors as stand-ins

## 6. Copy principle to preserve if extending this site

Every section was deliberately written to describe the customer's situation, not the technical service:
- ✅ "Does your name come up?" / "get found" / "get described correctly"
- 🚫 "improve your ranking" / "SEO optimization" / "schema markup"

If adding new pages (About, Services detail, Case Studies), keep new copy to this same rule, and keep the "why it matters before what it is" structure each section follows: name the customer's problem in the heading, then explain the mechanism in the body.
