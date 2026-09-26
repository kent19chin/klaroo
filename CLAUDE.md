@AGENTS.md

# Klaroo

## Stack

- **Next.js App Router** (Next 16, React 19) — routes live in `app/`. No `src/` directory.
- **Tailwind CSS v4** — configured in CSS (`app/globals.css`), not a `tailwind.config` file.
- **shadcn/ui** — style `base-nova` (built on Base UI), base color `neutral`, CSS variables for theming, `lucide-react` icons. Config in `components.json`.
- Import alias: `@/*` maps to the project root. Class-name helper: `cn()` from `@/lib/utils`.
- Animation: `motion` (import from `motion/react`, not `framer-motion`).

## The site

klarooo is an AEO / GEO consultancy site: `/` (Home), `/pricing`, `/privacy` and `/terms`. The source brief is `docs/klarooo-website-content.md` (copy is final; `[bracketed]` values are placeholders).

- **Copy rule:** describe the customer's situation, not the technical service ("does your name come up?", not "schema markup" / "SEO optimization"). Headings name the problem; body explains the mechanism.
- **Business details, prices, placeholders and legal settings** (refund %, notice period, governing law, last-updated date) live in `lib/site.ts` — change them there, never inline in pages. Legal pages use `LegalPage` from `components/site/legal-page.tsx`; update `legal.lastUpdated` whenever their text changes.
- **Brand tokens** are Tailwind colours defined in `app/globals.css` (`ink`, `paper`, `clarity`, `leap`, `blue-tint`, `orange-tint`, `slate`, `caption`, `kicker`, …). Use them instead of hex values. Fonts: `font-heading` (Space Grotesk) for headings, default `font-sans` (Manrope).
- **Look:** flat colour fields, no gradients or drop shadows, 1px `border-line` on light cards, pill (rounded-full) buttons and badges, 14–22px card radius.
- **Buttons:** `Button` / `buttonVariants` have brand variants `leap` (orange, ink text), `ink`, `ink-outline` and sizes `pill` / `pill-lg`. For links use `<Link className={buttonVariants({ variant: "leap", size: "pill-lg" })}>`.
- **Site sections** (header, footer, CTA band, FAQ accordion, plan chooser, section helpers, hero AI-answer demo) live in `components/site/`. FAQ answers stay in the DOM when collapsed and emit FAQPage JSON-LD via `faqJsonLd()` — keep that for any new Q&A content.
- **Motion:**
  - Below the fold, use `Reveal` / `Stagger` / `StaggerItem` from `components/site/motion.tsx`.
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

**Magic UI**
- `text-reveal.tsx` — `TextReveal` (scroll-driven text reveal)
- `marquee.tsx` — `Marquee` (infinite scrolling row/column)
- `animated-shiny-text.tsx` — `AnimatedShinyText` (shimmer text)
- `typing-animation.tsx` — `TypingAnimation` (typewriter text)

**Aceternity UI**
- `card-spotlight.tsx` — `CardSpotlight` (dark card with mouse-follow spotlight; give children `relative z-20`)
- `canvas-reveal-effect.tsx` — `CanvasRevealEffect` (three.js dot-matrix effect; used by `CardSpotlight`, heavy — client-only)

Keep this list up to date when components are added or removed.
