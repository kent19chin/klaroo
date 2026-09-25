import Link from "next/link"
import {
  ArrowRight,
  Check,
  EyeOff,
  Search,
  SunMedium,
  TriangleAlert,
  UserCheck,
  type LucideIcon,
} from "lucide-react"

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { buttonVariants } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { TextReveal } from "@/components/ui/text-reveal"
import { AiAnswerMock } from "@/components/site/ai-answer-mock"
import { CtaBand } from "@/components/site/cta-band"
import { FaqList } from "@/components/site/faq-list"
import { HeroBackdrop } from "@/components/site/hero-backdrop"
import { HoverCard } from "@/components/site/hover-card"
import {
  DrawLine,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/site/motion"
import { QuestionsMarquee } from "@/components/site/questions-marquee"
import { ScrollRail } from "@/components/site/scroll-rail"
import {
  Eyebrow,
  FadeUp,
  JsonLd,
  Section,
  SectionIntro,
  WordsIn,
  faqJsonLd,
} from "@/components/site/section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { bookingHref, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const shifts: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Search,
    title: "Search used to give ten links",
    body: "Your customer browsed and decided for themselves.",
  },
  {
    icon: SunMedium,
    title: "Now AI gives one answer",
    body: "A short list of names, chosen for them. You're on it or you're not.",
  },
  {
    icon: Check,
    title: "Nobody tells you which",
    body: "There's no dashboard for this. Someone has to go and check.",
  },
]

const problems: {
  icon: LucideIcon
  tint: string
  title: string
  body: string
}[] = [
  {
    icon: EyeOff,
    tint: "bg-blue-tint",
    title: "You're simply not mentioned",
    body: "When someone asks for the best option in your category, AI names a handful of businesses. If you're not one of them, you were never in the running — and you'll never know it happened.",
  },
  {
    icon: TriangleAlert,
    tint: "bg-orange-tint",
    title: "You're mentioned, but it's wrong",
    body: "AI can quote prices you changed years ago, miss services you offer today, or mix you up with a company that shares your name. Your customer believes it. You never get to correct it.",
  },
  {
    icon: UserCheck,
    tint: "bg-blue-tint",
    title: "Your competitor becomes the default",
    body: "The name AI keeps repeating becomes the safe choice in your customer's head. The longer that goes on, the harder and more expensive it gets to change.",
  },
]

const steps = [
  {
    title: "We find out where you stand",
    note: "The honest starting point.",
    body: "We ask AI the same questions your customers actually ask — across ChatGPT, Gemini and Google's AI answers. We ask each one several times, because the answers change. Then we show you how often you get named, how often your competitors do, and exactly which questions you're missing from.",
  },
  {
    title: "We fix what AI gets wrong",
    note: "Usually the fastest win.",
    body: "We take every claim AI makes about your business and check it against what's actually true. Wrong price, missing service, confused with another company — we find it, trace where the bad information is coming from, and correct it at the source.",
  },
  {
    title: "We get you into the sources AI trusts",
    note: "Where answers really come from.",
    body: "AI doesn't invent its answers. It reads directories, review sites, industry lists and public databases. We map the ones that actually count in your industry, show you which ones you're missing from, and get you properly listed on them.",
  },
  {
    title: "We do the technical work ourselves",
    note: "This is the part most agencies hand back to you.",
    body: "Making a website readable to AI is a build job, not a writing job. We came from building websites before we did this, so the fixes get made — not written up in a report and passed to your developer with a wish of good luck.",
  },
]

const timeline = [
  {
    when: "Week 0",
    title: "We get to know you",
    body: "One call to agree who your real competitors are and what your customers ask before they buy.",
  },
  {
    when: "Weeks 1–2",
    title: "We do the checking",
    body: "We run those questions across the AI tools and cross-check every answer against your real business.",
  },
  {
    when: "Week 3",
    title: "We show you everything",
    body: "A plain-English walkthrough of what we found, what it's costing you, and what to fix first.",
  },
  {
    when: "Week 4 onwards",
    title: "We get to work",
    body: "We make the fixes and keep checking every month, so you can see the answers change.",
  },
]

const faqs = [
  {
    q: "Is this just SEO with a new name?",
    a: "No, but they're related. SEO is about where you sit on a page of links. This is about whether you get named at all when an AI gives someone a single answer. Some of the work overlaps. A lot of it doesn't.",
  },
  {
    q: "Do I need to stop my current SEO work?",
    a: "Not at all. If you already have someone doing SEO, keep them. We work alongside that, and we're happy to talk to whoever handles your website so nothing gets done twice.",
  },
  {
    q: "How long before I see a difference?",
    a: "Wrong facts can often be corrected within weeks. Getting named more often takes longer — usually a few months — because it depends on sources outside your website updating too. We'll tell you which bucket your situation falls into before you commit to anything.",
  },
  {
    q: "Can you actually promise I'll get mentioned?",
    a: "No, and be careful of anyone who does. We don't control these AI systems. What we can promise is that you'll see exactly where you stand, we'll fix what's fixable, and you'll be able to watch the numbers move — or not — every month.",
  },
  {
    q: "What if the check says I'm doing fine?",
    a: "Then we'll tell you that, and you won't need a monthly plan. We'd rather you came back in six months than pay us for work you don't need.",
  },
] as const

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/klarooo-logo.png`,
  areaServed: "MY",
  knowsAbout: [
    "Answer engine optimization",
    "Generative engine optimization",
    "AI search visibility",
  ],
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-paper">
          <HeroBackdrop />
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pt-10 pb-16 md:px-10 md:pt-14 md:pb-20 lg:grid-cols-[616fr_600fr] lg:gap-16 lg:px-20 lg:pt-[76px] lg:pb-[100px]">
            <div className="flex flex-col gap-6 lg:gap-[26px]">
              <FadeUp>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-clarity/30 bg-blue-tint px-4 py-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-clarity opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-clarity" />
                  </span>
                  <AnimatedShinyText
                    shimmerWidth={120}
                    className="mx-0 max-w-none text-[13px] font-bold tracking-[0.4px] text-ink/80 via-white"
                  >
                    AEO / GEO CONSULTANCY
                  </AnimatedShinyText>
                </span>
              </FadeUp>
              <WordsIn
                text="When your customer asks AI, does your name come up?"
                delay={0.1}
                className="font-heading text-[40px] leading-[1.06] font-bold tracking-[-1.6px] text-ink sm:text-5xl lg:text-[60px]"
              />
              <FadeUp delay={0.45}>
                <p className="text-[17px] leading-[1.62] text-slate md:text-[19px]">
                  People now ask ChatGPT, Gemini and Google&apos;s AI for
                  recommendations before they visit a single website. We find
                  out what those answers say about your business — then make
                  sure you&apos;re in them, and that what they say is right.
                </p>
              </FadeUp>
              <FadeUp
                delay={0.6}
                className="mt-1.5 flex flex-col gap-3.5 sm:flex-row sm:items-center"
              >
                <Link
                  href="#start"
                  className={cn(
                    buttonVariants({ variant: "leap", size: "pill-lg" }),
                    "hover:scale-[1.03]"
                  )}
                >
                  Get your free visibility check
                  <ArrowRight
                    aria-hidden
                    className="transition-transform group-hover/button:translate-x-1"
                  />
                </Link>
                <Link
                  href="#what"
                  className={buttonVariants({
                    variant: "ink-outline",
                    size: "pill-lg",
                  })}
                >
                  See how it works
                </Link>
              </FadeUp>
              <FadeUp delay={0.7}>
                <p className="text-[15px] text-caption">
                  Free, no commitment. We walk you through what we find on a
                  short call.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.35} className="relative">
              <AiAnswerMock />
              <div
                aria-hidden
                className="absolute -bottom-5 -left-3 hidden animate-float shadow-[0_10px_30px_-10px_rgba(10,42,67,0.5)] rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white sm:block lg:-left-10"
              >
                You&apos;re on it or you&apos;re not.
              </div>
            </FadeUp>
          </div>
        </section>

        <QuestionsMarquee />

        {/* Shift band */}
        <section aria-label="How search has changed" className="bg-blue-tint">
          <Stagger
            as="ul"
            className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 md:grid-cols-3 md:px-10 lg:gap-11 lg:px-20 lg:py-[50px]"
          >
            {shifts.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem
                as="li"
                key={title}
                className="group flex items-start gap-3.5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/70 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">
                  <Icon
                    aria-hidden
                    strokeWidth={2.2}
                    className={cn(
                      "size-[22px] text-ink",
                      i === 1 && "animate-[spin_14s_linear_infinite]"
                    )}
                  />
                </span>
                <div>
                  <p className="text-[17px] font-extrabold text-ink">{title}</p>
                  <p className="mt-1 text-[15px] leading-[1.55] text-slate">
                    {body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Why it matters */}
        <section id="why" className="scroll-mt-20 bg-paper">
          <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-20 lg:px-20 lg:pt-[92px]">
            <Reveal>
              <SectionIntro
                eyebrow="Why this matters"
                title="Three ways you lose customers you never even see"
              />
            </Reveal>
          </div>

          <TextReveal className="h-[170vh] font-heading text-ink [&>div]:top-[12vh] [&>div]:h-[62vh] [&>div]:max-w-[1100px] [&>div]:px-0 [&_span.flex]:leading-[1.15] [&_span.flex]:tracking-[-0.5px]">
            These aren&apos;t lost leads you can go back and chase. They&apos;re
            conversations that happened without you in them.
          </TextReveal>

          <div className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10 md:pb-20 lg:px-20 lg:pb-[92px]">
            <Stagger className="grid gap-5 md:grid-cols-3 lg:gap-[26px]">
              {problems.map(({ icon: Icon, tint, title, body }) => (
                <StaggerItem key={title} className="h-full">
                  <HoverCard
                    as="article"
                    className="flex h-full flex-col gap-3.5 rounded-[18px] border border-line bg-white p-7 transition-colors hover:border-clarity/50 lg:p-8"
                  >
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover/hover:-rotate-6 group-hover/hover:scale-110",
                        tint
                      )}
                    >
                      <Icon
                        aria-hidden
                        strokeWidth={2.2}
                        className="size-6 text-ink"
                      />
                    </span>
                    <h3 className="font-heading text-[23px] leading-[1.24] font-bold text-ink">
                      {title}
                    </h3>
                    <p className="text-base leading-[1.62] text-slate">
                      {body}
                    </p>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* What we do */}
        <Section id="what" className="bg-white">
          <Reveal>
            <SectionIntro
              eyebrow="What we do"
              title="We check what AI says about you. Then we change it."
            >
              No jargon, no black box. Here is exactly what happens, in the
              order it happens.
            </SectionIntro>
          </Reveal>
          <ScrollRail className="mt-10 lg:mt-[46px]">
            <ol className="flex flex-col gap-[22px]">
              {steps.map((step, i) => {
                const last = i === steps.length - 1
                const inner = (
                  <div className="relative z-10 flex flex-col gap-4 md:flex-row md:gap-8">
                    <span
                      className={cn(
                        "min-w-16 font-heading text-[40px] leading-none font-bold transition-transform duration-300 group-hover/hover:-translate-y-1 lg:text-[46px]",
                        last ? "text-leap" : "text-clarity"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex grow flex-col gap-3 lg:flex-row lg:gap-10">
                      <div className="lg:w-[340px] lg:shrink-0">
                        <h3
                          className={cn(
                            "font-heading text-[23px] leading-[1.2] font-bold lg:text-[26px]",
                            last ? "text-white" : "text-ink"
                          )}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-2 text-[15px] leading-[1.55]",
                            last ? "text-blue-tint" : "text-caption"
                          )}
                        >
                          {step.note}
                        </p>
                      </div>
                      <p
                        className={cn(
                          "grow text-base leading-[1.66] lg:text-[16.5px]",
                          last ? "text-haze" : "text-slate"
                        )}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                )
                return (
                  <Reveal as="li" key={step.title} delay={0.05}>
                    {last ? (
                      <CardSpotlight
                        color="#143a55"
                        radius={420}
                        dotColors={[
                          [0, 167, 225],
                          [241, 119, 32],
                        ]}
                        className="rounded-[18px] border-0 bg-ink p-7 lg:px-[38px] lg:py-[34px]"
                      >
                        {inner}
                      </CardSpotlight>
                    ) : (
                      <HoverCard
                        glow="rgba(0, 167, 225, 0.12)"
                        className="rounded-[18px] bg-paper p-7 lg:px-[38px] lg:py-[34px]"
                      >
                        {inner}
                      </HoverCard>
                    )}
                  </Reveal>
                )
              })}
            </ol>
          </ScrollRail>
        </Section>

        {/* How it goes */}
        <Section className="bg-paper" innerClassName="lg:py-[88px]">
          <Reveal>
            <SectionIntro
              eyebrow="How it goes"
              title="From first call to results in about a month"
              className="max-w-[720px]"
            />
          </Reveal>

          {/* Timeline track (desktop) */}
          <div className="relative mt-12 mb-6 hidden lg:block" aria-hidden>
            <DrawLine className="absolute top-1/2 right-[12.5%] left-[12.5%] h-0.5 -translate-y-1/2 bg-clarity" />
            <Stagger className="relative grid grid-cols-4">
              {timeline.map((t, i) => (
                <StaggerItem key={t.when} className="flex justify-center">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border-2 font-heading text-sm font-bold",
                      i === timeline.length - 1
                        ? "border-leap bg-leap text-ink"
                        : "border-clarity bg-paper text-ink"
                    )}
                  >
                    {i + 1}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Stagger
            as="ol"
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-6"
          >
            {timeline.map((t) => (
              <StaggerItem as="li" key={t.when} className="h-full">
                <HoverCard className="flex h-full flex-col gap-2.5 rounded-2xl border border-line bg-white p-7">
                  <Eyebrow className="tracking-[1px]">{t.when}</Eyebrow>
                  <h3 className="font-heading text-[21px] font-bold text-ink">
                    {t.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate">
                    {t.body}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* Pricing preview */}
        <Section className="bg-white" innerClassName="lg:py-[90px]">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Pricing"
              title="Start with a check. Continue only if it's worth it."
              className="max-w-[720px]"
            >
              You pay once to find out where you stand. The monthly plan is how
              you improve it — and it&apos;s your call whether to start one.
            </SectionIntro>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-1.5 pb-1.5 text-base font-bold whitespace-nowrap text-ink underline underline-offset-4 hover:text-kicker"
            >
              See full pricing
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:mt-11 lg:grid-cols-2 lg:gap-[26px]">
            <Reveal>
              <HoverCard className="flex h-full flex-col gap-4 rounded-[20px] bg-paper p-7 lg:p-9">
                <Eyebrow className="tracking-[1.2px]">
                  Step one — pay once
                </Eyebrow>
                <h3 className="font-heading text-[26px] font-bold text-ink lg:text-[28px]">
                  Find out where you stand
                </h3>
                <p className="text-base leading-[1.62] text-slate">
                  A one-time check that tells you how visible you are today,
                  what AI is getting wrong about you, and what to fix first. Two
                  depths, depending on how much detail you want.
                </p>
                <div className="mt-auto grid gap-3 pt-1 sm:grid-cols-2">
                  <PriceTile
                    name="Visibility Snapshot"
                    price={site.prices.snapshot}
                  />
                  <PriceTile name="Full Audit" price={site.prices.audit} />
                </div>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.1}>
              <HoverCard
                glow="rgba(241, 119, 32, 0.16)"
                className="flex h-full flex-col gap-4 rounded-[20px] bg-ink p-7 lg:p-9"
              >
                <Eyebrow className="tracking-[1.2px] text-leap">
                  Step two — monthly, optional
                </Eyebrow>
                <h3 className="font-heading text-[26px] font-bold text-white lg:text-[28px]">
                  Actually improve it
                </h3>
                <p className="text-base leading-[1.62] text-haze">
                  Knowing isn&apos;t fixing. The monthly plan is where we make
                  the changes, keep watching the answers, and show you the
                  difference month by month.
                </p>
                <div className="mt-auto grid gap-3 pt-1 sm:grid-cols-2">
                  <PriceTile
                    name="Sustain"
                    price={site.prices.sustain}
                    monthly
                    tone="dark"
                  />
                  <PriceTile
                    name="Grow"
                    price={site.prices.grow}
                    monthly
                    tone="leap"
                  />
                </div>
              </HoverCard>
            </Reveal>
          </div>
        </Section>

        {/* FAQ */}
        <Section
          id="faq"
          className="bg-paper"
          innerClassName="flex flex-col gap-10 lg:flex-row lg:gap-[72px] lg:py-[88px]"
        >
          <Reveal className="flex flex-col gap-4 lg:sticky lg:top-28 lg:w-[380px] lg:shrink-0 lg:self-start">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-heading text-[32px] leading-[1.14] font-bold tracking-[-1px] text-balance text-ink md:text-[40px]">
              The things people ask us first
            </h2>
            <p className="text-[17px] leading-relaxed text-slate">
              Something not covered here? Ask us on the call — we&apos;d rather
              answer it properly than have you guess.
            </p>
          </Reveal>
          <FaqList faqs={faqs} />
        </Section>

        <CtaBand
          id="start"
          title="Find out what AI says about you"
          body="It takes one short call to get started, and you'll know more about your AI visibility than most of your competitors know about theirs."
          primary={{ label: "Book your free check", href: bookingHref }}
          secondary={{
            label: "Or message us on WhatsApp",
            href: site.contact.whatsappHref,
            external: true,
          }}
        />
      </main>
      <SiteFooter />

      <JsonLd data={organizationJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  )
}

function PriceTile({
  name,
  price,
  monthly,
  tone = "light",
}: {
  name: string
  price: string
  monthly?: boolean
  tone?: "light" | "dark" | "leap"
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1",
        tone === "light" && "border border-line bg-white",
        tone === "dark" && "border border-slate bg-ink-card",
        tone === "leap" && "bg-leap"
      )}
    >
      <p
        className={cn(
          "text-[15px] font-bold",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {name}
      </p>
      <p
        className={cn(
          "mt-1.5 font-heading text-[22px] font-bold",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {price}
        {monthly && (
          <span
            className={cn(
              "text-sm font-medium",
              tone === "dark" ? "text-blue-tint" : "text-umber-light"
            )}
          >
            /mo
          </span>
        )}
      </p>
    </div>
  )
}
