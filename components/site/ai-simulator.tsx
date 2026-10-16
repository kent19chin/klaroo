"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BadgeCheck, Link2, MessageSquareText } from "lucide-react"

import { cn } from "@/lib/utils"

const engines = ["ChatGPT", "Gemini", "Claude", "Google AI"] as const

// Invented example brands, one per city (v2 brief §3.2).
const questions = [
  { q: "Who's the best dentist in Toronto?", brand: "Northview Dental" },
  { q: "Top corporate tax advisory firm in Singapore", brand: "Apex Advisory" },
  {
    q: "Best interior designer for commercial spaces in Kuala Lumpur",
    brand: "Vanguard Studio",
  },
] as const

const ROTATE_MS = 4500

/**
 * Hero "Ask AI" simulator. Engines and questions are clickable; until the
 * visitor interacts it rotates through them on its own.
 */
export function AiSimulator() {
  const [engine, setEngine] = useState(0)
  const [question, setQuestion] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (!auto || hover) return
    const t = setTimeout(() => {
      // Walk through every question, then move to the next engine.
      if (question < questions.length - 1) setQuestion(question + 1)
      else {
        setQuestion(0)
        setEngine((engine + 1) % engines.length)
      }
    }, ROTATE_MS)
    return () => clearTimeout(t)
  }, [auto, hover, engine, question])

  const current = questions[question]
  const key = `${engine}-${question}`

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[40px] bg-clarity/15 blur-3xl"
      />
      <figure className="overflow-hidden rounded-[20px] border border-line-strong bg-ink/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Window bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          <span className="font-mono text-xs text-fog">ai-answer-preview</span>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6">
          {/* Engine pills */}
          <div
            role="tablist"
            aria-label="AI engine"
            className="flex flex-wrap gap-1 rounded-xl bg-night/60 p-1"
          >
            {engines.map((e, i) => (
              <button
                key={e}
                type="button"
                role="tab"
                aria-selected={i === engine}
                onClick={() => {
                  setAuto(false)
                  setEngine(i)
                }}
                className={cn(
                  "relative flex-1 rounded-lg px-3 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:text-[13px]",
                  i === engine ? "text-ink" : "text-mist hover:text-paper"
                )}
              >
                {i === engine && (
                  <motion.span
                    layoutId="sim-engine"
                    className="absolute inset-0 rounded-lg bg-paper"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{e}</span>
              </button>
            ))}
          </div>

          {/* Questions */}
          <div>
            <p className="mb-2.5 font-mono text-[11px] font-semibold tracking-[0.15em] text-fog uppercase">
              Sample buyer questions
            </p>
            <div className="flex flex-col gap-1.5">
              {questions.map((item, i) => (
                <button
                  key={item.q}
                  type="button"
                  aria-pressed={i === question}
                  onClick={() => {
                    setAuto(false)
                    setQuestion(i)
                  }}
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors",
                    i === question
                      ? "border-clarity/50 bg-clarity/10 text-paper"
                      : "border-line text-mist hover:border-line-strong hover:text-paper"
                  )}
                >
                  <MessageSquareText
                    aria-hidden
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      i === question ? "text-clarity" : "text-fog"
                    )}
                  />
                  &ldquo;{item.q}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Answer */}
          <div className="rounded-2xl border border-line bg-night/50 p-4 sm:p-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <p className="font-mono text-[11px] tracking-[0.1em] text-fog uppercase">
                  {engines[engine]} answer
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Based on reviews, structured business data and trusted
                  sources, the top recommendation is:
                </p>

                <div className="relative mt-4 rounded-xl border-2 border-leap bg-leap/[0.06] p-4">
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[2px] rounded-xl border-2 border-leap"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.04 }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.4,
                    }}
                  />
                  <span className="inline-flex rounded-full bg-leap px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-ink">
                    #1 RECOMMENDED
                  </span>
                  <p className="mt-2.5 text-xl font-extrabold text-paper">
                    {current.brand}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Named first because its services, pricing and reviews are
                    clear and consistent across the sources AI trusts.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-mist">
                      <Link2 aria-hidden className="size-3 text-clarity" />
                      Cited: company website
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-mist">
                      <BadgeCheck aria-hidden className="size-3 text-clarity" />
                      Facts match: verified
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </figure>
      <p className="mt-3 text-center text-xs text-fog">Illustrative example.</p>
    </div>
  )
}
