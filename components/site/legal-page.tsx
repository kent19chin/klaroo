import { Check } from "lucide-react"

import { HeroBackdrop } from "@/components/site/hero-backdrop"
import { LegalToc } from "@/components/site/legal-toc"
import { Reveal } from "@/components/site/motion"
import { Eyebrow, FadeUp, WordsIn } from "@/components/site/section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { site } from "@/lib/site"

export type LegalSection = {
  id: string
  title: string
  content: React.ReactNode
}

// Long-form text styles for legal copy (no typography plugin needed).
const prose =
  "text-base leading-[1.75] text-slate [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-kicker [&_h3]:mt-7 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_li]:mt-2 [&_li]:pl-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li::marker]:text-clarity"

export function LegalPage({
  title,
  intro,
  summary,
  sections,
}: {
  title: string
  intro: React.ReactNode
  summary: string[]
  sections: LegalSection[]
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-paper">
          <HeroBackdrop />
          <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-10 md:px-10 md:pt-16 lg:px-20 lg:pt-[72px] lg:pb-14">
            <FadeUp>
              <Eyebrow>Legal</Eyebrow>
            </FadeUp>
            <WordsIn
              text={title}
              delay={0.05}
              className="mt-4 max-w-[900px] font-heading text-[38px] leading-[1.1] font-bold tracking-[-1.4px] text-ink md:text-[52px]"
            />
            <FadeUp delay={0.3}>
              <p className="mt-4 text-sm font-semibold text-caption">
                Last updated {site.legal.lastUpdated}
              </p>
              <div className="mt-5 max-w-[760px] text-[17px] leading-relaxed text-slate md:text-lg">
                {intro}
              </div>
            </FadeUp>

            <FadeUp delay={0.45}>
              <div className="mt-9 max-w-[900px] rounded-[20px] bg-ink p-7 md:p-9">
                <p className="text-[13px] font-extrabold tracking-[1.4px] text-leap uppercase">
                  The short version
                </p>
                <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-x-8">
                  {summary.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        strokeWidth={3}
                        className="mt-1 size-4 shrink-0 text-clarity"
                      />
                      <span className="text-[15px] leading-relaxed text-haze">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-mist">
                  This summary is here to help. The full text below is what
                  applies.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:px-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-20 lg:py-20">
            <aside>
              <LegalToc
                items={sections.map(({ id, title }) => ({ id, title }))}
              />
            </aside>

            <div className="max-w-[780px]">
              {sections.map((s, i) => (
                <Reveal
                  as="section"
                  key={s.id}
                  y={16}
                  className="scroll-mt-28 border-b border-line py-9 first:pt-0 last:border-0"
                >
                  <div id={s.id} className="scroll-mt-28">
                    <h2 className="flex items-baseline gap-3 font-heading text-2xl font-bold tracking-[-0.5px] text-ink md:text-[28px]">
                      <span className="font-heading text-lg text-clarity tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </h2>
                    <div className={prose}>{s.content}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="compact" />
    </>
  )
}
