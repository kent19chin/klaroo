import {
  ArrowRight,
  BadgeCheck,
  Check,
  Hammer,
  Lightbulb,
  Link2,
  MessageSquareQuote,
  Minus,
  Radar,
  ScanEye,
  Sparkles,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { AiSimulator } from "@/components/site/ai-simulator"
import { AuditButton } from "@/components/site/audit-modal"
import { FaqList } from "@/components/site/faq-list"
import { HoverCard } from "@/components/site/hover-card"
import {
  CountUp,
  DrawLine,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/site/motion"
import {
  FadeUp,
  Glow,
  JsonLd,
  Kicker,
  Section,
  SectionIntro,
  WordsIn,
  faqJsonLd,
} from "@/components/site/section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const { packages } = site

/* ───────────────────────── Content ───────────────────────── */

const heroStats = [
  { value: "4", label: "AI engines tracked" },
  { value: "3×", label: "Runs per question, because AI answers vary" },
  { value: "3 months", label: "Minimum term, not 12" },
]

const funnel = [
  {
    title: "Sources",
    body: "Your site, directories, reviews, forums and lists",
  },
  {
    title: "AI reads",
    body: "It cross-checks which sources agree, and which it trusts",
  },
  {
    title: "Shortlist",
    body: "Clear, structured, well-sourced facts make the cut",
  },
  {
    title: "Answer",
    body: "Two or three names, and for your customer that's the whole market",
  },
]

const pillars: {
  icon: LucideIcon
  title: string
  question: string
  body: string
}[] = [
  {
    icon: ScanEye,
    title: "Readable",
    question: "Can AI read your site?",
    body: "Your pages must be open and readable to AI tools.",
  },
  {
    icon: BadgeCheck,
    title: "Accurate",
    question: "Are your facts right?",
    body: "Prices, services and details must be clear and true.",
  },
  {
    icon: Link2,
    title: "Cited",
    question: "Do trusted sources name you?",
    body: "AI trusts directories, reviews and lists over your own site.",
  },
  {
    icon: MessageSquareQuote,
    title: "Quotable",
    question: "Is there something to quote?",
    body: "Clear answers AI can lift straight into a reply.",
  },
]

const founders = [
  {
    name: "Kent Chin",
    initials: "KC",
    role: "Co-founder · Growth & Design",
    points: [
      "Digital marketing, with $1M+ generated", // TODO: confirm wording (revenue for clients, or ad spend managed?)
      "Website and product design",
      "Customer research and AI implementation",
    ],
  },
  {
    name: "Ryan Tham",
    initials: "RT",
    role: "Co-founder · Strategy & AI",
    points: [
      "Former management consultant at Oliver Wyman",
      "Experience building AI startups",
      "Leads diagnostics, analysis and client strategy",
    ],
  },
]

const workPillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Hammer,
    title: "Builders, not report writers",
    body: "We fix how AI reads your business at the source: schema, entity data and page structure.",
  },
  {
    icon: Wrench,
    title: "Done-for-you implementation",
    body: "No tickets for your dev team. We write the structured data, rebuild key pages and correct wrong listings directly.",
  },
  {
    icon: Radar,
    title: "Multi-model tracking",
    body: "Your buyer questions are re-tested every month across Google AI Overviews, ChatGPT, Gemini and Claude, so you can see what moved.",
  },
]

const steps = [
  {
    n: "01",
    when: "Month 1",
    title: "Audit & entity baseline",
    body: "We test your buyer questions across AI engines, map where you're named, missing or misquoted, and fix crawler access.",
  },
  {
    n: "02",
    when: "Month 2",
    title: "Content optimisation",
    body: "We rebuild your top commercial pages into direct-answer formats and deploy structured data.",
  },
  {
    n: "03",
    when: "Month 3",
    title: "Citation & authority",
    body: "We build trusted mentions and third-party signals so AI can confidently cite you.",
  },
  {
    n: "04",
    when: "Every month",
    title: "Re-test & report",
    body: "The same questions, re-asked monthly, so you see exactly what changed as AI models update.",
  },
]

const auditStats: {
  count?: number
  value?: string
  suffix?: string
  label: string
}[] = [
  { count: 25, label: "buyer questions across 8 types of buying intent" },
  { value: "Up to 4", label: "AI engines, depending on your package" },
  {
    count: 3,
    suffix: "×",
    label: "runs per question, because AI answers vary",
  },
  { count: 1, label: "full crawl of your site to fact-check every claim" },
]

const builds = [
  {
    title: "Entity graph construction",
    body: "Organization, Product and Expert schema, so AI understands exactly what you offer.",
  },
  {
    title: "Answer-ready formatting",
    body: "Key pages rebuilt with direct Q&A blocks, comparison tables and machine-readable data.",
  },
  {
    title: "AI prompt auditing",
    body: "Buyer questions tracked across AI engines to correct errors and expand citations.",
  },
]

const comparison = [
  {
    label: "Commitment",
    agency: "Often a 12-month contract",
    us: "A 3-month minimum",
  },
  {
    label: "Promises",
    agency: "Ranking targets",
    us: "Clear deliverables, honest results",
  },
  {
    label: "Technical work",
    agency: "Handed to your developer",
    us: "Built by our team",
  },
  {
    label: "Coverage",
    agency: "Google rankings",
    us: "Google, ChatGPT, Gemini and Claude",
  },
  {
    label: "Proof",
    agency: "Periodic reports",
    us: "Same questions, re-tested monthly",
  },
]

const faqs = [
  {
    q: "Is AEO / GEO just SEO with a new name?",
    a: "No. SEO is about ranking in a list of ten links. AEO and GEO are about getting AI to name and cite your business as the answer. That means structured data, accurate facts and trusted sources, not just keywords and backlinks.",
  },
  {
    q: "Can you guarantee I'll rank #1 on ChatGPT?",
    a: "Be careful of anyone who does. AI answers change from one question to the next, and nobody controls them. What we guarantee is the work: fixing the data, pages and sources AI relies on, and showing you every month exactly where you stand.",
  },
  {
    q: "Should I stop my current SEO work?",
    a: "Not necessarily. AEO builds on a healthy website. If your budget goes to low-intent blog posts, moving some of it to structured data and AEO usually pays back faster.",
  },
  {
    q: "How soon will I see results?",
    a: "Wrong facts can often be corrected within weeks. Getting named more often usually takes a few months, because it depends on outside sources updating too. That's why the minimum term is three months.",
  },
  {
    q: "What are the tracking credits?",
    a: `Each month we run your buyer questions through the AI engines on your plan. Credits cover the cost of those queries. Package A includes ${packages.a.credits}, and Package B includes ${packages.b.credits}.`,
  },
  {
    q: "What happens after 3 months?",
    a: "Your plan continues month to month. You can switch packages or stop at any time after the minimum term.",
  },
]

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/klarooo-logo.png`,
  areaServed: ["CA", "MY"],
  founder: founders.map((f) => ({ "@type": "Person", name: f.name })),
  knowsAbout: [
    "Answer engine optimization",
    "Generative engine optimization",
    "AI search visibility",
  ],
}

/* ───────────────────────── Page ───────────────────────── */

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1 overflow-x-clip">
        {/* ── Hero ── */}
        <section className="relative isolate">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(247_245_240/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(247_245_240/0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]"
          />
          <Glow className="top-[-10%] left-[-10%] size-[620px]" />
          <Glow className="top-[20%] right-[-15%] size-[520px]" />

          <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 pt-12 pb-20 md:px-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-28">
            <div className="flex flex-col gap-7">
              <FadeUp>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-clarity/30 bg-clarity/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-[0.15em] text-blue-tint uppercase">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-clarity opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-clarity" />
                  </span>
                  AEO / GEO Consultancy
                </span>
              </FadeUp>
              <WordsIn
                lines={["Rank first on", "any AI search"]}
                accentLine={1}
                delay={0.05}
                className="text-[40px] leading-[1.1] font-extrabold tracking-[-0.02em] text-paper sm:text-[52px] lg:text-[64px]"
              />
              <FadeUp delay={0.35}>
                <p className="max-w-[560px] text-base leading-[1.6] text-mist md:text-lg">
                  When your customers ask ChatGPT, Gemini, Claude or Google AI
                  for a recommendation, does your brand come up first, or does a
                  competitor win the deal before anyone visits your website?
                </p>
              </FadeUp>
              <FadeUp delay={0.5} className="flex flex-col gap-3 sm:flex-row">
                <AuditButton
                  className={cn(
                    buttonVariants({ variant: "leap", size: "cta-lg" }),
                    "hover:scale-[1.02]"
                  )}
                >
                  Get Your Free AI Audit
                  <ArrowRight
                    aria-hidden
                    className="transition-transform group-hover/button:translate-x-1"
                  />
                </AuditButton>
                <a
                  href="#how-it-works"
                  className={buttonVariants({
                    variant: "ghost-light",
                    size: "cta-lg",
                  })}
                >
                  See How It Works
                </a>
              </FadeUp>

              <FadeUp delay={0.65}>
                <dl className="mt-2 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-ink/40 backdrop-blur">
                  {heroStats.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col gap-1.5 px-4 py-4 sm:px-5"
                    >
                      <dt className="order-2 text-xs leading-snug text-fog sm:text-[13px]">
                        {s.label}
                      </dt>
                      <dd className="order-1 font-mono text-xl font-bold text-paper sm:text-[28px]">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeUp>
            </div>

            <FadeUp delay={0.3}>
              <AiSimulator />
            </FadeUp>
          </div>
        </section>

        {/* ── The shift ── */}
        <Section id="why-ai" className="border-t border-line">
          <Reveal>
            <SectionIntro kicker="The shift" title="10 links vs. 1 AI answer">
              Buyers no longer compare ten websites. They ask AI and act on the
              shortlist it gives them.
            </SectionIntro>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[20px] border border-line bg-ink/30 p-7 md:p-9">
                <p className="font-mono text-xs font-semibold tracking-[0.15em] text-fog uppercase">
                  The old way
                </p>
                <h3 className="mt-2 text-[22px] font-bold text-mist">
                  Search results
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {[
                    "Ten blue links on a Google results page",
                    "Prospects click between sites to compare prices and features",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-fog md:text-base"
                    >
                      <X
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-fog"
                        strokeWidth={3}
                      />
                      {t}
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-fog md:text-base">
                    <X
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-fog"
                      strokeWidth={3}
                    />
                    <span>
                      Nearly 60% of Google searches now end without a click
                      <sup>
                        <a href="#source-1" className="ml-0.5 text-clarity">
                          1
                        </a>
                      </sup>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <HoverCard
                glow="rgba(0, 167, 225, 0.18)"
                className="h-full rounded-[20px] border border-clarity/40 bg-ink p-7 shadow-[0_0_60px_-20px_rgba(0,167,225,0.5)] md:p-9"
              >
                <p className="font-mono text-xs font-semibold tracking-[0.15em] text-clarity uppercase">
                  The new reality
                </p>
                <h3 className="mt-2 text-[22px] font-bold text-paper">
                  AI answers
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-mist md:text-base">
                    <Check
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-clarity"
                      strokeWidth={3}
                    />
                    <span>
                      <strong className="text-paper">One direct answer:</strong>{" "}
                      AI names two or three brands and cites its sources
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-mist md:text-base">
                    <Check
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-clarity"
                      strokeWidth={3}
                    />
                    Buyers act on that shortlist without browsing further
                  </li>
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed md:text-base">
                    <Check
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-clarity"
                      strokeWidth={3}
                    />
                    <strong className="text-paper">
                      &ldquo;If you&apos;re not in that answer, you don&apos;t
                      exist to that customer.&rdquo;
                    </strong>
                  </li>
                </ul>
              </HoverCard>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-5 rounded-2xl border border-line bg-ink px-6 py-5 text-[15px] leading-relaxed text-blue-tint md:text-base">
              <strong className="font-bold">Strategic imperative:</strong> if an
              AI engine can&apos;t clearly read your business data, your
              business becomes invisible to the people asking.
            </p>
          </Reveal>

          {/* TODO: check for a newer zero-click figure before launch */}
          <p id="source-1" className="mt-4 text-xs text-fog">
            <sup>1</sup> SparkToro, 2024 Zero-Click Search Study.
          </p>
        </Section>

        {/* ── Framework ── */}
        <Section id="framework" className="border-t border-line bg-ink/20">
          <Reveal>
            <SectionIntro
              kicker="Where answers come from"
              title="How AI decides who to recommend"
            />
          </Reveal>

          {/* Funnel: wide at the top, narrow at the bottom */}
          <Stagger className="mt-12 flex flex-col items-center gap-2.5">
            {funnel.map((f, i) => {
              const last = i === funnel.length - 1
              return (
                <StaggerItem
                  key={f.title}
                  className={cn(
                    "w-full",
                    ["md:w-full", "md:w-[86%]", "md:w-[72%]", "md:w-[58%]"][i]
                  )}
                >
                  <div
                    className={cn(
                      "flex flex-col gap-1 rounded-2xl border px-6 py-5 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left",
                      last
                        ? "border-leap bg-leap/10 shadow-[0_0_50px_-15px_rgba(241,119,32,0.6)]"
                        : "border-clarity/25",
                      [
                        "bg-clarity/[0.04]",
                        "bg-clarity/[0.08]",
                        "bg-clarity/[0.13]",
                        "",
                      ][i]
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-sm font-semibold",
                        last ? "text-leap" : "text-clarity"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-bold text-paper sm:w-32 sm:shrink-0">
                      {f.title}
                    </span>
                    <span className="text-sm leading-relaxed text-mist md:text-[15px]">
                      {f.body}
                    </span>
                  </div>
                </StaggerItem>
              )
            })}
          </Stagger>

          <div className="mt-20">
            <Reveal className="flex flex-col gap-3">
              <Kicker>Our framework</Kicker>
              <h3 className="max-w-xl text-2xl leading-snug font-extrabold text-paper md:text-[32px]">
                The klarooo Clarity Framework
              </h3>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map(({ icon: Icon, title, question, body }) => (
                <StaggerItem key={title} className="h-full">
                  <HoverCard className="flex h-full flex-col gap-3 rounded-[20px] border border-line bg-ink/60 p-6 transition-colors hover:border-clarity/40">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-clarity/10 text-clarity transition-transform duration-300 group-hover/hover:scale-110 group-hover/hover:-rotate-6">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h4 className="mt-1 text-xl font-bold text-paper">
                      {title}
                    </h4>
                    <p className="font-mono text-xs text-blue-tint">
                      {question}
                    </p>
                    <p className="text-sm leading-relaxed text-mist">{body}</p>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="mt-8 text-lg font-bold text-paper md:text-xl">
                We fix all four, and show you the result every month.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ── Who we are ── */}
        <Section id="who-we-are" className="border-t border-line">
          <Glow className="top-1/3 right-[-10%] size-[480px]" />
          <Reveal>
            <SectionIntro
              kicker="Who we are"
              title="Strategy and execution, under one roof"
            >
              We build the foundation that makes AI trust and recommend your
              business, and we do the work ourselves.
            </SectionIntro>
          </Reveal>

          <Reveal>
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-line bg-ink/70 p-6 backdrop-blur-xl md:p-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-leap/15">
                <Lightbulb aria-hidden className="size-5 text-leap" />
              </span>
              <p className="text-base leading-relaxed text-mist md:text-lg">
                <strong className="text-paper">
                  Unlike traditional agencies
                </strong>{" "}
                that hand you a PDF and a to-do list, we make the technical
                fixes ourselves.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-6 grid gap-5 md:grid-cols-2">
            {founders.map((f) => (
              <StaggerItem key={f.name} className="h-full">
                <HoverCard className="flex h-full flex-col gap-5 rounded-[20px] border border-line bg-ink p-7 md:p-8">
                  <div className="flex items-center gap-4">
                    {/* TODO: add founder headshots (AvatarImage) when ready */}
                    <Avatar className="size-14 ring-2 ring-clarity/40">
                      <AvatarFallback className="bg-ink-2 text-base font-bold text-paper">
                        {f.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-[22px] font-bold text-paper">
                        {f.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-clarity">
                        {f.role}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {f.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-mist"
                      >
                        <Check
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-clarity"
                          strokeWidth={3}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="mt-5 grid gap-5 md:grid-cols-3">
            {workPillars.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="h-full">
                <HoverCard className="flex h-full flex-col gap-3 rounded-[20px] border border-line bg-ink/50 p-6">
                  <Icon
                    aria-hidden
                    className="size-6 text-clarity transition-transform duration-300 group-hover/hover:scale-110"
                  />
                  <h3 className="text-lg font-bold text-paper">{title}</h3>
                  <p className="text-sm leading-relaxed text-mist">{body}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── How it works ── */}
        <Section id="how-it-works" className="border-t border-line bg-ink/20">
          <Reveal>
            <SectionIntro
              kicker="Methodology"
              title="Your first 90 days of execution"
            >
              How we move your brand into the answer, month by month.
            </SectionIntro>
          </Reveal>

          <div className="relative mt-12">
            <DrawLine className="absolute top-0 right-0 left-0 hidden h-px bg-linear-to-r from-clarity via-clarity to-leap lg:block" />
            <Stagger
              as="ol"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {steps.map((s, i) => {
                const last = i === steps.length - 1
                return (
                  <StaggerItem as="li" key={s.n} className="h-full">
                    <HoverCard
                      glow={last ? "rgba(241, 119, 32, 0.14)" : undefined}
                      className={cn(
                        "flex h-full flex-col gap-3 rounded-[20px] border border-line border-t-[3px] bg-ink p-6",
                        last ? "border-t-leap" : "border-t-clarity"
                      )}
                    >
                      <div className="flex items-baseline justify-between">
                        <span
                          className={cn(
                            "font-mono text-3xl font-semibold",
                            last ? "text-leap" : "text-clarity"
                          )}
                        >
                          {s.n}
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.12em] text-fog uppercase">
                          {s.when}
                        </span>
                      </div>
                      <h3 className="mt-1 text-xl font-bold text-paper">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-mist">
                        {s.body}
                      </p>
                    </HoverCard>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>

          <Reveal className="mt-16">
            <Kicker>What an audit covers</Kicker>
          </Reveal>
          <Stagger className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line lg:grid-cols-4">
            {auditStats.map((s) => (
              <StaggerItem
                key={s.label}
                className="flex flex-col gap-2 bg-night p-6"
              >
                <span className="font-mono text-[36px] leading-none font-bold text-paper md:text-[44px]">
                  {s.count !== undefined ? (
                    <CountUp to={s.count} suffix={s.suffix} />
                  ) : (
                    s.value
                  )}
                </span>
                <span className="text-sm leading-snug text-mist">
                  {s.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16">
            <Kicker>What we build inside your retainer</Kicker>
          </Reveal>
          <Stagger
            as="ol"
            className="mt-5 flex flex-col divide-y divide-line rounded-[20px] border border-line bg-ink/50"
          >
            {builds.map((b, i) => (
              <StaggerItem
                as="li"
                key={b.title}
                className="group flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:gap-6 md:px-8"
              >
                <span className="font-mono text-sm font-semibold text-clarity">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold text-paper sm:w-64 sm:shrink-0">
                  {b.title}
                </span>
                <span className="text-[15px] leading-relaxed text-mist">
                  {b.body}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── Packages ── */}
        <Section id="packages" className="border-t border-line">
          <Glow className="top-[30%] left-1/2 size-[700px] -translate-x-1/2" />
          <Reveal>
            <SectionIntro
              kicker="Packages"
              title="Choose your AI search package"
              align="center"
            >
              Two plans, no hidden fees. A 3-month minimum, then month to month.
            </SectionIntro>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-[980px] gap-6 lg:grid-cols-2">
            <Reveal>
              <HoverCard className="flex h-full flex-col rounded-[20px] border border-line bg-ink p-7 md:p-9">
                <PackageHeader
                  badge="Essential"
                  badgeClass="border border-blue-tint/30 bg-blue-tint/10 text-blue-tint"
                  name={`Package A: ${packages.a.name}`}
                  blurb="Targeted optimisation for Google AI Overviews."
                  price={packages.a.price}
                />
                <ul className="mt-7 flex flex-col gap-3.5">
                  {[
                    "Google AI Overview tracking",
                    "On-page entity schema (JSON-LD)",
                    "Top 5 priority pages restructured",
                    "Monthly performance report",
                    `${packages.a.credits} tracking credits included`,
                  ].map((t) => (
                    <PackageItem key={t}>{t}</PackageItem>
                  ))}
                  <li className="flex items-start gap-3 text-[15px] text-fog/60">
                    <Minus
                      aria-hidden
                      className="mt-1 size-4 shrink-0"
                      strokeWidth={3}
                    />
                    <span className="line-through">
                      ChatGPT, Gemini &amp; Claude tracking
                    </span>
                  </li>
                </ul>
                <div className="grow" />
                <AuditButton
                  pkg="A"
                  className={cn(
                    buttonVariants({ variant: "ghost-light", size: "cta-lg" }),
                    "mt-9 w-full"
                  )}
                >
                  Start with Package A
                </AuditButton>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative h-full">
                <div
                  aria-hidden
                  className="absolute -inset-4 -z-10 rounded-[32px] bg-clarity/20 blur-3xl"
                />
                <HoverCard
                  glow="rgba(241, 119, 32, 0.12)"
                  className="flex h-full flex-col rounded-[20px] border border-clarity/50 bg-ink p-7 shadow-[0_0_80px_-25px_rgba(0,167,225,0.7)] md:p-9"
                >
                  <PackageHeader
                    badge="Recommended"
                    badgeClass="bg-leap text-ink"
                    name={`Package B: ${packages.b.name}`}
                    blurb="Optimisation across Google and the leading AI models."
                    price={packages.b.price}
                  />
                  <ul className="mt-7 flex flex-col gap-3.5">
                    {[
                      "Google AI Overview tracking",
                      "Citation mapping in ChatGPT, Gemini & Claude",
                      "Correction of wrong or made-up facts",
                      "PR signals for AI crawlers",
                      "Monthly performance report",
                      `${packages.b.credits} tracking credits included`,
                    ].map((t) => (
                      <PackageItem key={t}>{t}</PackageItem>
                    ))}
                  </ul>
                  <div className="grow" />
                  <AuditButton
                    pkg="B"
                    className={cn(
                      buttonVariants({ variant: "leap", size: "cta-lg" }),
                      "mt-9 w-full hover:scale-[1.02]"
                    )}
                  >
                    Start with Package B
                    <ArrowRight
                      aria-hidden
                      className="transition-transform group-hover/button:translate-x-1"
                    />
                  </AuditButton>
                </HoverCard>
              </div>
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-6 max-w-[980px]">
            <div className="flex flex-col gap-4 rounded-[20px] border border-dashed border-line-strong bg-ink/40 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-tint/10">
                  <Sparkles aria-hidden className="size-5 text-orange-tint" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.15em] text-orange-tint uppercase">
                    Add-on
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-paper">
                    Persona Predictions
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    How your key customer types are likely to react to what AI
                    says about you, to sharpen your marketing.
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="font-mono text-lg font-bold text-paper">
                  {packages.personaPrice}
                  <span className="text-sm font-normal text-fog"> / month</span>
                </p>
                <p className="text-xs text-fog">Available on either package</p>
              </div>
            </div>
          </Reveal>

          {/* TODO: say what happens when tracking credits run out */}
          <p className="mx-auto mt-6 max-w-[980px] text-center text-xs leading-relaxed text-fog">
            Prices in CAD, plus applicable taxes. 3-month minimum, then month to
            month. Credits cover the AI queries we run to test and track your
            buyer questions each month.
          </p>
        </Section>

        {/* ── Why klarooo ── */}
        <Section className="border-t border-line bg-ink/20">
          <Reveal>
            <SectionIntro
              kicker="Why klarooo"
              title="How we work differently"
            />
          </Reveal>

          {/* Desktop table */}
          <Reveal className="mt-12 hidden overflow-hidden rounded-[20px] border border-line md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[22%] px-7 py-5">
                    <span className="sr-only">Aspect</span>
                  </th>
                  <th
                    scope="col"
                    className="px-7 py-5 font-mono text-xs font-semibold tracking-[0.15em] text-fog uppercase"
                  >
                    Typical agency
                  </th>
                  <th
                    scope="col"
                    className="bg-clarity/[0.07] px-7 py-5 text-base font-extrabold text-paper"
                  >
                    klarooo
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.label}
                    className="group border-b border-line last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-7 py-5 text-sm font-bold text-paper"
                    >
                      {row.label}
                    </th>
                    <td className="px-7 py-5 text-[15px] text-fog">
                      <span className="flex items-center gap-2.5">
                        <X
                          aria-hidden
                          className="size-4 shrink-0 text-fog/60"
                          strokeWidth={3}
                        />
                        {row.agency}
                      </span>
                    </td>
                    <td className="bg-clarity/[0.07] px-7 py-5 text-[15px] font-semibold text-paper transition-colors group-hover:bg-clarity/[0.12]">
                      <span className="flex items-center gap-2.5">
                        <Check
                          aria-hidden
                          className="size-4 shrink-0 text-clarity"
                          strokeWidth={3}
                        />
                        {row.us}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Mobile cards */}
          <Stagger className="mt-10 flex flex-col gap-3 md:hidden">
            {comparison.map((row) => (
              <StaggerItem
                key={row.label}
                className="rounded-2xl border border-line bg-ink p-5"
              >
                <p className="font-mono text-[11px] tracking-[0.15em] text-fog uppercase">
                  {row.label}
                </p>
                <p className="mt-3 flex items-start gap-2.5 text-sm text-fog">
                  <X
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0"
                    strokeWidth={3}
                  />
                  {row.agency}
                </p>
                <p className="mt-2 flex items-start gap-2.5 text-[15px] font-semibold text-paper">
                  <Check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-clarity"
                    strokeWidth={3}
                  />
                  {row.us}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── Higher-intent leads ── */}
        <section className="relative isolate overflow-hidden border-t border-line bg-ink">
          <Glow
            color="leap"
            className="top-1/2 left-[10%] size-[420px] -translate-y-1/2"
          />
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
            <Reveal>
              {/* v2 brief: "[4.2x]" has no source yet, so the fallback label is used */}
              <p className="font-mono text-[44px] leading-none font-bold text-leap md:text-[56px]">
                Ready to buy
              </p>
              <p className="mt-3 text-lg font-bold text-paper">
                Higher conversion intent
              </p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-mist">
                People asking AI have already moved past discovery. They&apos;re
                looking for a specific product or service to choose.
              </p>
            </Reveal>
            <Stagger as="ul" className="flex flex-col gap-3">
              {[
                [
                  "Protects your market share",
                  "keeps the traffic you'd otherwise lose to AI Overviews",
                ],
                [
                  "Builds authority",
                  "earns direct citations on high-intent buyer questions",
                ],
                [
                  "Future-proofs your brand",
                  "continuous optimisation as AI models change",
                ],
              ].map(([t, b]) => (
                <StaggerItem
                  as="li"
                  key={t}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-night/50 p-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-clarity/15">
                    <Check
                      aria-hidden
                      className="size-4 text-clarity"
                      strokeWidth={3}
                    />
                  </span>
                  <p className="text-[15px] leading-relaxed text-mist md:text-base">
                    <strong className="text-paper">{t}:</strong> {b}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── FAQ ── */}
        <Section
          id="faq"
          className="border-t border-line"
          innerClassName="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro kicker="FAQ" title="Frequently asked questions" />
          </Reveal>
          <FaqList faqs={faqs} />
        </Section>

        {/* ── Final CTA ── */}
        <section
          id="audit"
          className="relative isolate scroll-mt-20 overflow-hidden border-t border-line"
        >
          <Glow className="top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 bg-clarity/20" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [background-image:radial-gradient(rgb(247_245_240/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
          />
          <div className="mx-auto flex max-w-[820px] flex-col items-center px-5 py-24 text-center md:px-8 lg:py-32">
            <Reveal>
              <h2 className="text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-paper md:text-[48px]">
                Find out what AI says about you today.
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-base leading-[1.6] text-mist md:text-lg">
                Get a free 15-minute AI search audit. We&apos;ll test your key
                industry questions live and show you where your brand stands on
                ChatGPT, Gemini and Google AI.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-9">
              <AuditButton
                className={cn(
                  buttonVariants({ variant: "leap", size: "cta-lg" }),
                  "px-9 hover:scale-[1.03]"
                )}
              >
                Request Your Free Audit
                <ArrowRight
                  aria-hidden
                  className="transition-transform group-hover/button:translate-x-1"
                />
              </AuditButton>
              <p className="mt-5 font-mono text-xs tracking-[0.08em] text-fog">
                No obligation · 2 minutes to submit · Confidential
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />

      <JsonLd data={organizationJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  )
}

/* ───────────────────────── Bits ───────────────────────── */

function PackageHeader({
  badge,
  badgeClass,
  name,
  blurb,
  price,
}: {
  badge: string
  badgeClass: string
  name: string
  blurb: string
  price: string
}) {
  return (
    <>
      <span
        className={cn(
          "self-start rounded-full px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.15em] uppercase",
          badgeClass
        )}
      >
        {badge}
      </span>
      <h3 className="mt-5 text-[22px] font-bold text-paper">{name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-mist">{blurb}</p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="text-[44px] leading-none font-extrabold tracking-[-0.02em] text-paper">
          {price}
        </span>
        <span className="font-mono text-sm text-fog">/ month</span>
      </p>
    </>
  )
}

function PackageItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-relaxed text-mist">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-clarity/15">
        <Check aria-hidden className="size-3 text-clarity" strokeWidth={3.5} />
      </span>
      {children}
    </li>
  )
}
