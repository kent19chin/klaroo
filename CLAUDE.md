@AGENTS.md

# Klaroo

## Stack

- **Next.js App Router** (Next 16, React 19) — routes live in `app/`. No `src/` directory.
- **Tailwind CSS v4** — configured in CSS (`app/globals.css`), not a `tailwind.config` file.
- **shadcn/ui** — style `base-nova` (built on Base UI), base color `neutral`, CSS variables for theming, `lucide-react` icons. Config in `components.json`.
- Import alias: `@/*` maps to the project root. Class-name helper: `cn()` from `@/lib/utils`.
- Animation: `motion` (import from `motion/react`, not `framer-motion`).

## The site

klarooo is an AEO / GEO consultancy. v2 is a **single dark landing page** (`/`) with anchor sections, plus `/privacy` and `/terms`. `/pricing` (v1) permanently redirects to `/#packages` (see `next.config.ts`). The source brief is `docs/klarooo-website-content-v2.md` (copy and claims are final; `[bracketed]` values are placeholders). `docs/klarooo-website-content.md` is the superseded v1 brief.

- **Copy rules (v2 brief §4):** lead with the outcome ("rank first", "be the answer"); be direct; promise the work, not the position (the FAQ and small print say no one can guarantee #1); no vendor names in client copy; **no numbers we can't source**; no buzzwords that don't describe real work.
- **Business details, package prices, credits, contact placeholders and legal settings** live in `lib/site.ts` — change them there, never inline in pages. Legal pages use `LegalPage` from `components/site/legal-page.tsx`; update `legal.lastUpdated` whenever their text changes, and keep the Terms in step with the packages.
- **Brand tokens** (dark theme) are Tailwind colours in `app/globals.css`: `night` (page bg), `ink` (cards), `ink-2` (raised), `line` / `line-strong` (borders), `paper` (headings), `mist` (body), `fog` (captions), `clarity` (links, ticks, glows), `leap` (primary buttons, "Recommended", #1 highlight), `blue-tint`, `orange-tint`. Use them instead of hex values.
- **Fonts:** Plus Jakarta Sans for everything (`font-sans`), JetBrains Mono (`font-mono`) for kickers, badges, stats, step numbers and small print.
- **Look:** dark, soft Clarity Blue glows (`Glow` in `section.tsx`) at 12–18% — no rainbow gradients; glass panels sparingly; 12px radius buttons/inputs, 16–20px cards, full pills for badges. Primary buttons are Leap Orange with ink text.
- **Buttons:** `buttonVariants` brand variants `leap`, `ghost-light`, `ink`; sizes `cta` / `cta-lg`.
- **Free-audit modal:** `AuditModalProvider` (in the root layout) + `AuditButton` / `useAuditModal().open(pkg?)` from `components/site/audit-modal.tsx`. Submissions POST to `app/api/audit/route.ts`, which validates and forwards JSON to the `AUDIT_WEBHOOK_URL` env var (Zapier / Make / Google Apps Script, etc.). Without it, dev logs the request and production returns 503 so the modal shows the email fallback.
- **Site sections** (header with scroll-spy nav, footer, hero "Ask AI" simulator, FAQ accordion, section helpers) live in `components/site/`. FAQ answers stay in the DOM when collapsed and emit FAQPage JSON-LD via `faqJsonLd()` — keep that for any new Q&A content.
- **Motion:**
  - Below the fold, use `Reveal` / `Stagger` / `StaggerItem` / `CountUp` from `components/site/motion.tsx`.
  - Above the fold, use the CSS-only `FadeUp` / `WordsIn` from `components/site/section.tsx`, so the hero shows on first paint without waiting for JavaScript.
  - Use `HoverCard` for cards that lift and show a spotlight on hover.
  - Don't slide elements in sideways: mobile Chrome widens the page to fit them.
  - `MotionProvider` in the layout honours the OS reduce-motion setting.

## UI components

All reusable UI pieces live in `components/ui/`. **Prefer the existing components over writing new ones from scratch.** Compose or extend them (via `className` / `cn()`, or variants like `buttonVariants`) before building something new.

If a needed component doesn't exist, add it from a registry rather than hand-writing it, and run the command from this directory:

```bash
npx shadcn@latest add <name>                                   # shadcn/ui
npx shadcn@latest add "https://magicui.design/r/<name>.json"   # Magic UI
npx shadcn@latest add "https://ui.aceternity.com/registry/<name>.json"   # Aceternity UI
```

### Installed components

**shadcn/ui**
- `button.tsx` — `Button`, `buttonVariants`
- `card.tsx` — `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- `navigation-menu.tsx` — `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuPositioner`, `navigationMenuTriggerStyle`
- `separator.tsx` — `Separator`
- `badge.tsx` — `Badge`, `badgeVariants`
- `avatar.tsx` — `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`, `AvatarGroupCount`, `AvatarBadge`
- `dialog.tsx` — `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogHeader`, `DialogFooter`, `DialogClose`, `DialogTrigger`
- `input.tsx` — `Input`
- `label.tsx` — `Label`
- `native-select.tsx` — `NativeSelect`, `NativeSelectOption`, `NativeSelectOptGroup`

**Magic UI**
- `text-reveal.tsx` — `TextReveal` (scroll-driven text reveal)
- `marquee.tsx` — `Marquee` (infinite scrolling row/column)
- `animated-shiny-text.tsx` — `AnimatedShinyText` (shimmer text)
- `typing-animation.tsx` — `TypingAnimation` (typewriter text)

**Aceternity UI**
- `card-spotlight.tsx` — `CardSpotlight` (dark card with mouse-follow spotlight; give children `relative z-20`)
- `canvas-reveal-effect.tsx` — `CanvasRevealEffect` (three.js dot-matrix effect; used by `CardSpotlight`, heavy — client-only)

Keep this list up to date when components are added or removed.
