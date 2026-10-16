import { Check } from "lucide-react"

import { Reveal } from "@/components/site/motion"
import { FadeUp, Glow, Kicker, WordsIn } from "@/components/site/section"
import { LegalToc } from "@/components/site/legal-toc"
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
  "text-base leading-[1.75] text-mist [&_a]:font-semibold [&_a]:text-clarity [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-paper [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-paper [&_li]:mt-2 [&_li]:pl-1 [&_li::marker]:text-clarity [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-bold [&_strong]:text-paper [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"

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
      <main className="flex-1 overflow-x-clip">
        <section className="relative isolate border-b border-line">
          <Glow className="top-[-30%] left-[-10%] size-[560px]" />
          <div className="mx-auto max-w-[1240px] px-5 pt-14 pb-12 md:px-8 lg:pt-20 lg:pb-16">
            <FadeUp>
              <Kicker>Legal</Kicker>
            </FadeUp>
            <WordsIn
              lines={[title]}
              delay={0.05}
              className="mt-4 max-w-[900px] text-[40px] leading-[1.1] font-extrabold tracking-[-0.02em] text-paper md:text-[56px]"
            />
            <FadeUp delay={0.3}>
              <p className="mt-4 font-mono text-xs text-fog">
                Last updated {site.legal.lastUpdated}
              </p>
              <div className="mt-5 max-w-[760px] text-base leading-relaxed text-mist md:text-lg">
                {intro}
              </div>
            </FadeUp>

            <FadeUp delay={0.45}>
              <div className="mt-9 max-w-[900px] rounded-[20px] border border-clarity/30 bg-ink p-7 shadow-[0_0_60px_-25px_rgba(0,167,225,0.6)] md:p-9">
                <Kicker className="text-leap">The short version</Kicker>
                <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-x-8">
                  {summary.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        strokeWidth={3}
                        className="mt-1 size-4 shrink-0 text-clarity"
                      />
                      <span className="text-[15px] leading-relaxed text-mist">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-fog">
                  This summary is here to help. The full text below is what
                  applies.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 md:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-20">
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
                  className="border-b border-line py-9 first:pt-0 last:border-0"
                >
                  <div id={s.id} className="scroll-mt-28">
                    <h2 className="flex items-baseline gap-3 text-2xl font-extrabold tracking-[-0.01em] text-paper md:text-[28px]">
                      <span className="font-mono text-base font-semibold text-clarity tabular-nums">
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
      <SiteFooter />
    </>
  )
}
