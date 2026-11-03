import type { Metadata } from "next"
import { Info } from "lucide-react"

import { CtaBand } from "@/components/site/cta-band"
import { FaqList } from "@/components/site/faq-list"
import { HeroBackdrop } from "@/components/site/hero-backdrop"
import { Reveal } from "@/components/site/motion"
import { PlanChooser } from "@/components/site/plan-cards"
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
import { bookingHref, plans } from "@/lib/site"

export const metadata: Metadata = {
  title: "Pricing",
  description: `Two monthly plans: a report on whether AI is naming your business for ${plans.focus.price} a month, or the report plus the fixes for ${plans.comprehensive.price} a month.`,
}

const moneyFaqs = [
  {
    q: "What's the difference between the two plans?",
    a: `Who does the fixing. The ${plans.focus.name} gives you the monthly report and recommendations, and your team acts on them. ${plans.comprehensive.name} adds Google AI Overview tracking, and we make the changes ourselves.`,
  },
  {
    q: "Am I locked into a contract?",
    a: "No, we don't enforce a contract. We generally recommend 3 months, because that's how long it takes to see real changes and improvements.",
  },
  {
    q: "Can I start with the report and move up later?",
    a: "Yes, and you can move back down too. Most people start where the free check points them and adjust once they've seen a couple of months of data.",
  },
  {
    q: "What if I have more than one brand?",
    a: "Each brand needs its own tracking, since AI treats them as separate. Talk to us — we'll work something out rather than charging you full price twice.",
  },
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
              text="Get the report. Or get the report and the fixes."
              delay={0.05}
              className="max-w-[900px] font-heading text-[38px] leading-[1.1] font-bold tracking-[-1.4px] text-balance text-ink md:text-[52px]"
            />
            <FadeUp delay={0.45}>
              <p className="max-w-[720px] text-[17px] leading-relaxed text-slate md:text-[19px]">
                Both plans show you, every month, what AI says about you. The
                difference is whether your team makes the changes or we do.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Plans */}
        <Section
          id="plans"
          className="bg-paper"
          innerClassName="pt-0 md:pt-0 lg:pt-0 lg:pb-[84px]"
        >
          <PlanChooser />
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
            equalHeight
            className="mt-8 grid gap-5 lg:mt-9 lg:grid-cols-2 lg:gap-[22px]"
          />
        </Section>

        <CtaBand
          id="talk"
          title="Not sure which one you need?"
          body="Tell us about your business on a short call and we'll point you at the right plan — including telling you if the answer is “not yet”."
          primary={{ label: "Book a call", href: bookingHref, external: true }}
        />
      </main>
      <SiteFooter variant="compact" />

      <JsonLd data={faqJsonLd(moneyFaqs)} />
    </>
  )
}
