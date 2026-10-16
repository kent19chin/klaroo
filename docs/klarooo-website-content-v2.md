# klarooo Website — Content & Design Brief (v2)

A one-page landing site for klarooo, an AEO / GEO consultancy. This brief combines three sources:

- **Copy and claims:** the finalised pitch deck. Founders, packages and prices all come from there.
- **Tone and structure:** the Gemini landing page. It's direct, says "rank first", and uses a dark theme with a live AI-answer demo in the hero.
- **Brand:** the klarooo kangaroo mark and colours, with a new type system (section 1).

Anything in `[brackets]` still needs a real value before launch.

---

## 1. Design system

### Typography (replaces Space Grotesk + Manrope)

| Role | Font | Weights | Use |
|---|---|---|---|
| Headings + body | **Plus Jakarta Sans** | 400, 500, 600, 700, 800 | Everything except labels and numbers |
| Labels + numbers | **JetBrains Mono** | 400, 500, 600 | Section kickers, badges, stats, step numbers, prices' small print |

Google Fonts link:
`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap`

Type scale (desktop / mobile):

| Element | Size | Weight | Notes |
|---|---|---|---|
| H1 | 64px / 40px | 800 | line-height 1.1, letter-spacing -0.02em |
| H2 | 48px / 32px | 800 | line-height 1.15 |
| H3 | 22px / 20px | 700 | card titles |
| Body | 18px / 16px | 400 | line-height 1.6 |
| Small | 14px | 400–500 | card body, captions |
| Kicker | 12px | 600, mono | uppercase, letter-spacing 0.15em |
| Stat | 28–48px | 700, mono | |

The wordmark stays as the logo artwork. Don't retype "klarooo" in the new font; use the logo files.

### Colour (keeps klarooo's brand; dark theme by default)

The Gemini page uses a generic indigo/purple/cyan gradient that isn't klarooo's. Same layout and mood, but in our colours:

| Token | Hex | Use |
|---|---|---|
| Night | `#06131F` | Page background |
| Ink | `#0A2A43` | Cards, panels |
| Ink 2 | `#143A55` | Raised cards, hover, input backgrounds |
| Line | `rgba(247,245,240,0.08)` | Borders and dividers |
| Paper | `#F7F5F0` | Headings and primary text |
| Mist | `#A9C2D3` | Body text on dark |
| Fog | `#7E9AAF` | Captions, small print |
| Clarity Blue | `#00A7E1` | Links, icons, ticks, focus rings, glows |
| Leap Orange | `#F17720` | Primary buttons, "Recommended", the #1 answer highlight |
| Blue Tint | `#BEEAF8` | Small badges on dark (as text or a 10% fill) |
| Orange Tint | `#FBD9B8` | Warm callouts |

Rules:
- Primary buttons are Leap Orange with **Ink text** (`#0A2A43`), not white. It reads better and stays on-brand.
- Glows are soft radial gradients of Clarity Blue at 12–18% opacity behind the hero and packages. No rainbow gradients.
- Use glass panels sparingly: `rgba(10,42,67,0.7)`, 16px backdrop blur, 1px Line border.
- Use the real kangaroo mark (`klarooo-logo-white.png` on dark), not a generic brain icon.
- Radius: 12px buttons and inputs, 16–20px cards, full pills for badges.

---

## 2. Page structure

One page with anchor links:

1. Header / nav
2. Hero: "Rank first on any AI search", with the live AI-answer demo
3. The shift (`#why-ai`)
4. Why AI picks one brand over another (`#framework`)
5. Who we are (`#who-we-are`)
6. How it works (`#how-it-works`)
7. Packages (`#packages`)
8. Why klarooo
9. FAQ (`#faq`)
10. Final CTA (`#audit`)
11. Footer
12. Free-audit modal

---

## 3. Copy, section by section

### 3.1 Header

- Logo: kangaroo mark + "klarooo" wordmark, linking to the top
- Nav: Why AI Search · Who We Are · How It Works · Packages · FAQ
- Button: **Get Free AI Audit →** (opens the modal)
- Mobile: hamburger menu with the same links, and the button full-width at the bottom

### 3.2 Hero

- Badge (mono): `AEO / GEO CONSULTANCY`
- **H1:** Rank first on **any AI search** (the second line in Clarity Blue)
- Sub: When your customers ask ChatGPT, Gemini, Claude or Google AI for a recommendation, does your brand come up first, or does a competitor win the deal before anyone visits your website?
- Primary button: **Get Your Free AI Audit**
- Secondary button: **See How It Works** → `#how-it-works`

Stat bar (three items, mono numbers):

| Number | Label |
|---|---|
| 4 | AI engines tracked |
| 3× | Runs per question, because AI answers vary |
| 3 months | Minimum term, not 12 |

**Hero demo: "Ask AI" simulator** (right column, interactive)

- Window bar label (mono): `ai-answer-preview`
- Engine pills: ChatGPT · Gemini · Claude · Google AI
- Label: Sample buyer questions
  - "Who's the best dentist in Toronto?"
  - "Top corporate tax advisory firm in Singapore"
  - "Best interior designer for commercial spaces in Kuala Lumpur"
- Answer panel: "Based on reviews, structured business data and trusted sources, the top recommendation is:"
- Highlighted result card (orange border):
  - Badge: `#1 RECOMMENDED`
  - Brand: changes with the question. Use invented example names that match each city, e.g. "Northview Dental" (Toronto), "Apex Advisory" (Singapore), "Vanguard Studio" (Kuala Lumpur).
  - Line: "Named first because its services, pricing and reviews are clear and consistent across the sources AI trusts."
  - Footer chips: `Cited: company website` · `Facts match: verified`
- Small caption under the card (Fog): **Illustrative example.**

Notes for the build:
- Switching engines or questions just swaps the text. No fake latency counters or "99.4% confidence" scores; they read as made-up data.
- The caption matters. The demo shows what winning looks like, not a real result.

### 3.3 The shift (`#why-ai`)

- Kicker: `THE SHIFT`
- **H2:** 10 links vs. 1 AI answer
- Sub: Buyers no longer compare ten websites. They ask AI and act on the shortlist it gives them.

Two side-by-side panels:

**The old way: search results**
- ✕ Ten blue links on a Google results page
- ✕ Prospects click between sites to compare prices and features
- ✕ Nearly 60% of Google searches now end without a click¹

**The new reality: AI answers** (highlighted panel)
- ✓ **One direct answer:** AI names two or three brands and cites its sources
- ✓ Buyers act on that shortlist without browsing further
- ✓ **"If you're not in that answer, you don't exist to that customer."**

¹ SparkToro, 2024 Zero-Click Search Study. Check for a newer figure before launch.

Strip below the panels (Blue Tint text on Ink):
**Strategic imperative:** if an AI engine can't clearly read your business data, your business becomes invisible to the people asking.

### 3.4 Why AI picks one brand over another (`#framework`)

- Kicker: `WHERE ANSWERS COME FROM`
- **H2:** How AI decides who to recommend

A four-step funnel graphic (wide at the top, narrow at the bottom), each step with a one-liner:
1. **Sources:** your site, directories, reviews, forums and lists
2. **AI reads:** it cross-checks which sources agree, and which it trusts
3. **Shortlist:** clear, structured, well-sourced facts make the cut
4. **Answer:** two or three names, and for your customer that's the whole market

Then the **klarooo Clarity Framework**, four cards:

| Pillar | Question | One-liner |
|---|---|---|
| **Readable** | Can AI read your site? | Your pages must be open and readable to AI tools. |
| **Accurate** | Are your facts right? | Prices, services and details must be clear and true. |
| **Cited** | Do trusted sources name you? | AI trusts directories, reviews and lists over your own site. |
| **Quotable** | Is there something to quote? | Clear answers AI can lift straight into a reply. |

Closing line: **We fix all four, and show you the result every month.**

### 3.5 Who we are (`#who-we-are`)

- Kicker: `WHO WE ARE`
- **H2:** Strategy and execution, under one roof
- Sub: We build the foundation that makes AI trust and recommend your business, and we do the work ourselves.

Callout (glass panel, lightbulb icon):
**Unlike traditional agencies** that hand you a PDF and a to-do list, we make the technical fixes ourselves.

Founder cards (add headshots when ready):

**Kent Chin**, Co-founder · Growth & Design
- Digital marketing, with $1M+ generated `[confirm wording: revenue for clients, or ad spend managed?]`
- Website and product design
- Customer research and AI implementation

**Ryan Tham**, Co-founder · Strategy & AI
- Former management consultant at Oliver Wyman
- Experience building AI startups
- Leads diagnostics, analysis and client strategy

Three pillars below the founders:

| Title | Copy |
|---|---|
| **Builders, not report writers** | We fix how AI reads your business at the source: schema, entity data and page structure. |
| **Done-for-you implementation** | No tickets for your dev team. We write the structured data, rebuild key pages and correct wrong listings directly. |
| **Multi-model tracking** | Your buyer questions are re-tested every month across Google AI Overviews, ChatGPT, Gemini and Claude, so you can see what moved. |

Optional logo strip ("Brands our founders have worked with"): Honda · Ascott · IWH Suites. Only include it once logo permission is confirmed, and keep the wording "our founders have worked with", not "klarooo clients".

### 3.6 How it works (`#how-it-works`)

- Kicker: `METHODOLOGY`
- **H2:** Your first 90 days of execution
- Sub: How we move your brand into the answer, month by month.

Four steps (mono numbers, coloured top border on each card):

| # | When | Title | Copy |
|---|---|---|---|
| 01 | Month 1 | **Audit & entity baseline** | We test your buyer questions across AI engines, map where you're named, missing or misquoted, and fix crawler access. |
| 02 | Month 2 | **Content optimisation** | We rebuild your top commercial pages into direct-answer formats and deploy structured data. |
| 03 | Month 3 | **Citation & authority** | We build trusted mentions and third-party signals so AI can confidently cite you. |
| 04 | Every month | **Re-test & report** | The same questions, re-asked monthly, so you see exactly what changed as AI models update. |

**What an audit covers** (stat row under the steps, mono numbers):

| Number | Label |
|---|---|
| 25 | buyer questions across 8 types of buying intent |
| Up to 4 | AI engines, depending on your package |
| 3× | runs per question, because AI answers vary |
| 1 | full crawl of your site to fact-check every claim |

**What we build inside your retainer** (three numbered rows):
1. **Entity graph construction:** Organization, Product and Expert schema, so AI understands exactly what you offer.
2. **Answer-ready formatting:** key pages rebuilt with direct Q&A blocks, comparison tables and machine-readable data.
3. **AI prompt auditing:** buyer questions tracked across AI engines to correct errors and expand citations.

### 3.7 Packages (`#packages`)

- Kicker: `PACKAGES`
- **H2:** Choose your AI search package
- Sub: Two plans, no hidden fees. A 3-month minimum, then month to month.
- All prices in Canadian dollars. No currency toggle.

**Package A: Google AI Focus** · badge `ESSENTIAL`
- Targeted optimisation for Google AI Overviews.
- **CA$499 / month** `[confirm]`
- ✓ Google AI Overview tracking
- ✓ On-page entity schema (JSON-LD)
- ✓ Top 5 priority pages restructured
- ✓ Monthly performance report
- ✓ USD 25 tracking credits included
- — ChatGPT, Gemini & Claude tracking (greyed out, struck through)
- Button: **Start with Package A**

**Package B: Omni-Model AI** · badge `RECOMMENDED` (highlighted card, orange badge, blue glow)
- Optimisation across Google and the leading AI models.
- **CA$999 / month** `[confirm]`
- ✓ Google AI Overview tracking
- ✓ Citation mapping in ChatGPT, Gemini & Claude
- ✓ Correction of wrong or made-up facts
- ✓ PR signals for AI crawlers
- ✓ Monthly performance report
- ✓ USD 100 tracking credits included
- Button: **Start with Package B** (orange)

**Add-on: Persona Predictions** (slim card under both packages)
- How your key customer types are likely to react to what AI says about you, to sharpen your marketing.
- CA$`[Price]` / month · available on either package

Small print under the cards (Fog):
Prices in CAD, plus applicable taxes. 3-month minimum, then month to month. Credits cover the AI queries we run to test and track your buyer questions each month. `[What happens if credits run out: top up at cost, or pause tracking?]`

### 3.8 Why klarooo

- Kicker: `WHY KLAROOO`
- **H2:** How we work differently

| | Typical agency | klarooo |
|---|---|---|
| Commitment | Often a 12-month contract | A 3-month minimum |
| Promises | Ranking targets | Clear deliverables, honest results |
| Technical work | Handed to your developer | Built by our team |
| Coverage | Google rankings | Google, ChatGPT, Gemini and Claude |
| Proof | Periodic reports | Same questions, re-tested monthly |

### 3.9 Higher-intent leads (optional band between "Why klarooo" and the FAQ)

- Big stat (mono): **`[4.2x]`** with the label **Higher conversion intent** `[Add the source before publishing. If you can't cite one, replace the number with "Ready to buy".]`
- Copy: People asking AI have already moved past discovery. They're looking for a specific product or service to choose.
- Three ticks:
  - **Protects your market share:** keeps the traffic you'd otherwise lose to AI Overviews
  - **Builds authority:** earns direct citations on high-intent buyer questions
  - **Future-proofs your brand:** continuous optimisation as AI models change

### 3.10 FAQ (`#faq`, accordion)

1. **Is AEO / GEO just SEO with a new name?**
   No. SEO is about ranking in a list of ten links. AEO and GEO are about getting AI to name and cite your business as the answer. That means structured data, accurate facts and trusted sources, not just keywords and backlinks.

2. **Can you guarantee I'll rank #1 on ChatGPT?**
   Be careful of anyone who does. AI answers change from one question to the next, and nobody controls them. What we guarantee is the work: fixing the data, pages and sources AI relies on, and showing you every month exactly where you stand.

3. **Should I stop my current SEO work?**
   Not necessarily. AEO builds on a healthy website. If your budget goes to low-intent blog posts, moving some of it to structured data and AEO usually pays back faster.

4. **How soon will I see results?**
   Wrong facts can often be corrected within weeks. Getting named more often usually takes a few months, because it depends on outside sources updating too. That's why the minimum term is three months.

5. **What are the tracking credits?**
   Each month we run your buyer questions through the AI engines on your plan. Credits cover the cost of those queries. Package A includes USD 25, and Package B includes USD 100.

6. **What happens after 3 months?**
   Your plan continues month to month. You can switch packages or stop at any time after the minimum term.

### 3.11 Final CTA (`#audit`)

- **H2:** Find out what AI says about you today.
- Copy: Get a free 15-minute AI search audit. We'll test your key industry questions live and show you where your brand stands on ChatGPT, Gemini and Google AI.
- Button (orange): **Request Your Free Audit →**
- Small print (mono): No obligation · 2 minutes to submit · Confidential

### 3.12 Footer

- Logo · "© 2026 klarooo. AEO / GEO Consultancy."
- Links: Privacy Policy · Terms of Service · `[hello@klarooo.com]` · `[Phone / WhatsApp]` · `[LinkedIn]`
- Line under the logo: Serving clients in Canada and Malaysia.

### 3.13 Free-audit modal

- Badge (mono): `FREE 15-MIN AUDIT`, or `SELECTED: PACKAGE A / B` when opened from a package button
- **H3:** Get your AI visibility report
- Copy: Tell us about your business. We'll run your key questions through AI and send you the results.
- Fields:
  - Company / brand name
  - Website URL
  - Business email
  - Main competitor (optional)
  - Country / market (dropdown: Canada, Malaysia, Singapore, United States, Other)
- Button: **Request My Audit**
- After submitting, show an inline success message in the modal instead of a browser alert: "Thanks, we've got it. We'll be in touch within 24 hours." `[Connect the form to email, a CRM or a Google Sheet]`

---

## 4. Copy rules

1. **Lead with the outcome.** "Rank first", "be the answer", "get named". Never "improve your SEO".
2. **Be direct.** Short sentences, one idea each, no hedging in headlines.
3. **Promise the work, not the position.** Headlines can say "rank first"; the FAQ and small print say plainly that no one can guarantee #1. Both are true together.
4. **No vendor names in client copy.** Say "AI tracking" or "tracking credits", not SerpAPI. Naming the tool invites "why don't I just buy that?"
5. **No numbers we can't source.** Every stat is either our own (25 questions, 3× runs) or cited (SparkToro). Remove anything else before launch.
6. **No buzzwords that don't describe real work.** Leave out "vector database alignment", "RAG indexing" and "knowledge graph confidence score" from the Gemini draft. Clients can't verify them, and technical buyers will spot them as filler.

---

## 5. Placeholders to fill before launch

- `[4.2x]` source, or replace it
- `[confirm wording]` for Kent's "$1M+ generated"
- CAD package prices `[confirm]`: CA$499 and CA$999 carried over from the deck's $499 / $999, which were USD in earlier versions
- Persona Predictions CA$`[Price]`
- What happens when tracking credits run out
- `[hello@klarooo.com]`, `[Phone / WhatsApp]`, `[LinkedIn]`
- Founder headshots
- Logo permission for Honda, Ascott and IWH Suites (optional strip)
- Form destination (email / CRM / sheet)
- Privacy Policy and Terms pages
