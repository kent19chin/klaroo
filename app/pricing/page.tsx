import type { Metadata } from "next"
import { Info } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { CtaBand } from "@/components/site/cta-band"
import { FaqList } from "@/components/site/faq-list"
import { HeroBackdrop } from "@/components/site/hero-backdrop"
import { Reveal } from "@/components/site/motion"
import { PlanChooser, type Plan } from "@/components/site/plan-cards"
import {
  Eyebrow,
  FadeUp,
  JsonLd,
  Section,
  WordsIn,
  faqJsonLd,
} from "@/components/site/section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { bookingHref, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pay once to find out whether AI is naming your business. Then decide if a monthly plan is worth it — no lock-in before you know.",
}

const oneTime: Plan[] = [
  {
    name: "Visibility Snapshot",
    subhead: "The honest answer to “are we showing up or not?”",
    price: site.prices.snapshot,
    period: "one-time",
    includes: [
      "How often AI names you, versus three competitors you pick",
      "Checked across ChatGPT, Gemini and Google's AI answers",
      "Every wrong or outdated fact AI is repeating about you",
      "Three to five quick wins you can action straight away",
      "A written report and a call to walk you through it",
    ],
    cta: "Start with a Snapshot",
    fit: "Best if you've never looked at this before and want to know if there's a problem.",
    tone: "white",
  },
  {
    name: "Full Audit",
    subhead: "Not just what's happening — why, and what to do about it.",
    price: site.prices.audit,
    period: "one-time",
    plus: "Everything in the Snapshot, plus:",
    includes: [
      "Where AI is getting its information about your industry",
      "The exact directories and listings you're missing from",
      "How a real buyer would read those answers about you",
      "A full 30 / 60 / 90 day plan, in order of what pays off first",
      "A presentation for your team or board, if you need one",
    ],
    cta: "Start with a Full Audit",
    fit: "Best if you already suspect you're behind and want a plan you can act on.",
    tone: "ink",
    badge: "Most chosen",
  },
]

const monthly: Plan[] = [
  {
    name: "Sustain",
    subhead: "Hold your ground and don't slip back.",
    price: site.prices.sustain,
    period: "per month",
    includes: [
      "We re-ask the same questions every month and track the change",
      "We catch new wrong facts before they spread",
      "We keep your website readable to AI as it changes",
      "A short monthly report — no jargon, no 40-page PDF",
    ],
    cta: "Talk about Sustain",
    fit: "Best if the audit found you're in reasonable shape already.",
    tone: "paper",
  },
  {
    name: "Grow",
    subhead: "Actively push to get named more often.",
    price: site.prices.grow,
    period: "per month",
    plus: "Everything in Sustain, plus:",
    includes: [
      "We write and rework the pages AI needs to be able to quote",
      "We get you onto the listings and sources that feed the answers",
      "Bigger technical fixes get done by us, not passed to your team",
      "A full re-audit every three months, included",
    ],
    cta: "Talk about Grow",
    fit: "Best if you're behind competitors and want to close the gap.",
    tone: "clarity",
    badge: "Best value",
  },
]

const moneyFaqs = [
  {
    q: "Do I have to take a monthly plan?",
    a: "No. Plenty of clients take the one-time check, action the quick wins themselves, and come back later. The check is useful on its own.",
  },
  {
    q: "Am I locked into a contract?",
    a: `Monthly plans run month to month after an initial ${site.minimumContractMonths}-month period, which exists because this work genuinely takes a few months to show up.`,
  },
  {
    q: "Can I start on Sustain and move up later?",
    a: "Yes, and you can move back down too. Most people start where the audit points them and adjust once they've seen a couple of months of data.",
  },
  {
    q: "What if I have more than one brand?",
    a: "Each brand needs its own check, since AI treats them as separate. Talk to us — we'll work something out rather than charging you full price twice.",
  },
]

const oneTimeOptions = [
  {
    label: "I just want to know if there's a problem",
    plan: "Visibility Snapshot",
  },
  { label: "I think we're behind and need a plan", plan: "Full Audit" },
]

const monthlyOptions = [
  { label: "The audit says we're in decent shape", plan: "Sustain" },
  { label: "We're behind competitors and want to close the gap", plan: "Grow" },
]

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="relative isolate overflow-hidden bg-paper">
          <HeroBackdrop />
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[18px] px-5 pt-12 pb-12 text-center md:px-10 md:pt-16 lg:px-20 lg:pt-[80px] lg:pb-[64px]">
            <FadeUp>
              <Eyebrow>Pricing</Eyebrow>
            </FadeUp>
            <WordsIn
              text="Pay to find out. Then decide if it's worth fixing."
              delay={0.05}
              className="max-w-[900px] font-heading text-[38px] leading-[1.1] font-bold tracking-[-1.4px] text-balance text-ink md:text-[52px]"
            />
            <FadeUp delay={0.45}>
              <p className="max-w-[720px] text-[17px] leading-relaxed text-slate md:text-[19px]">
                Everything starts with a one-time check, so you&apos;re never
                signing up for a monthly plan before you know whether you need
                one.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Step 1 */}
        <Section
          id="one-time"
          className="bg-paper"
          innerClassName="pt-0 md:pt-0 lg:pt-0 lg:pb-[84px]"
        >
          <StepHeading
            n={1}
            title="Find out where you stand"
            badge="One-time"
            badgeClass="bg-blue-tint text-ink"
          >
            Both options tell you how often AI names you, who it names instead,
            and what it&apos;s getting wrong. The difference is how deep we go
            into <em>why</em>.
          </StepHeading>
          <PlanChooser plans={oneTime} options={oneTimeOptions} />
        </Section>

        {/* Step 2 */}
        <Section
          id="monthly"
          className="bg-white"
          innerClassName="lg:py-[84px]"
        >
          <StepHeading
            n={2}
            title="Then improve it, month by month"
            badge="Optional"
            badgeClass="bg-orange-tint text-umber-light"
          >
            Knowing where you stand doesn&apos;t change anything on its own.
            This is the part where we do the work — and keep checking, so you
            can see whether it&apos;s landing.
          </StepHeading>
          <PlanChooser plans={monthly} options={monthlyOptions} />
        </Section>

        {/* Honest note */}
        <section className="bg-orange-tint">
          <Reveal className="group mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-12 sm:flex-row sm:gap-[26px] md:px-10 lg:px-20 lg:py-[52px]">
            <span className="flex size-[52px] shrink-0 animate-float items-center justify-center rounded-[14px] bg-leap transition-transform duration-300 group-hover:rotate-12">
              <Info
                aria-hidden
                strokeWidth={2.3}
                className="size-[26px] text-ink"
              />
            </span>
            <div className="max-w-[1060px]">
              <h2 className="font-heading text-[22px] font-bold text-ink md:text-2xl">
                One thing we&apos;d rather say upfront
              </h2>
              <p className="mt-2 text-base leading-[1.65] text-umber md:text-[17px]">
                Nobody can guarantee you a spot in an AI answer — not us, not
                anyone selling you this. What we can do is show you exactly
                where you stand today, fix the things that are genuinely
                fixable, and put the numbers in front of you every month so you
                can judge for yourself whether it&apos;s working. If it
                isn&apos;t, we&apos;d rather you stopped paying us.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Money FAQ */}
        <Section id="questions" className="bg-paper" innerClassName="lg:py-20">
          <Reveal>
            <h2 className="font-heading text-[30px] font-bold tracking-[-0.8px] text-ink md:text-4xl">
              About the money side
            </h2>
          </Reveal>
          <FaqList
            faqs={moneyFaqs}
            size="sm"
            className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-9 lg:gap-[22px]"
          />
        </Section>

        <CtaBand
          id="talk"
          title="Not sure which one you need?"
          body="Tell us about your business on a short call and we'll point you at the right starting tier — including telling you if the answer is “not yet”."
          primary={{ label: "Book a call", href: bookingHref }}
        />
      </main>
      <SiteFooter variant="compact" />

      <JsonLd data={faqJsonLd(moneyFaqs)} />
    </>
  )
}

function StepHeading({
  n,
  title,
  badge,
  badgeClass,
  children,
}: {
  n: number
  title: string
  badge: string
  badgeClass: string
  children: React.ReactNode
}) {
  return (
    <Reveal className="mb-6 lg:mb-7">
      <div className="flex items-start gap-4 md:items-center">
        <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-ink font-heading text-base font-bold text-white">
          {n}
        </span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h2 className="font-heading text-[26px] leading-tight font-bold tracking-[-0.7px] text-ink md:text-[32px]">
            {title}
          </h2>
          <Badge
            className={cn(
              "h-auto rounded-full px-3.5 py-1.5 text-[13px] font-extrabold tracking-[0.6px] uppercase",
              badgeClass
            )}
          >
            {badge}
          </Badge>
        </div>
      </div>
      <p className="mt-3 max-w-[820px] text-base leading-relaxed text-slate md:ml-[50px] md:text-[17px]">
        {children}
      </p>
    </Reveal>
  )
}
