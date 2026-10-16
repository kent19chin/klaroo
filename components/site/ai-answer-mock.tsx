"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

const scenarios = [
  {
    engine: "ChatGPT",
    question: "Who are the best [your industry] companies in [your city]?",
  },
  {
    engine: "Gemini",
    question:
      "Which [your industry] company in [your city] would you recommend?",
  },
  {
    engine: "Google AI",
    question: "Top-rated [your industry] near [your city]?",
  },
]

const results = [
  {
    title: "A competitor you know",
    note: "Named first. Gets the enquiry.",
  },
  {
    title: "A competitor you've never heard of",
    note: "Smaller than you. Easier for AI to read.",
  },
  {
    title: "Is this you?",
    note: "This is the only line that matters. We find out, then we fix it.",
    highlight: true,
  },
]

type Phase = "typing" | "thinking" | "answer"

const TYPE_MS = 32
const THINK_MS = 1100
const HOLD_MS = 5200

/**
 * The hero visual: a mock AI answer that explains the business at a glance.
 * Cycles through ChatGPT / Gemini / Google AI; tabs are clickable and hovering
 * pauses the cycle. All text is in the DOM from the first render.
 */
export function AiAnswerMock({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [chars, setChars] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")
  const [paused, setPaused] = useState(false)

  const question = `“${scenarios[index].question}”`
  const showAll = reduceMotion === true
  const typed = showAll ? question : question.slice(0, chars)
  const answered = showAll || phase === "answer"

  useEffect(() => {
    if (showAll) return
    let t: ReturnType<typeof setTimeout> | undefined
    if (phase === "typing") {
      t =
        chars < question.length
          ? setTimeout(
              () => setChars((c) => c + 1),
              chars === 0 ? 600 : TYPE_MS
            )
          : setTimeout(() => setPhase("thinking"), 250)
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("answer"), THINK_MS)
    } else if (!paused) {
      t = setTimeout(() => select((index + 1) % scenarios.length), HOLD_MS)
    }
    return () => clearTimeout(t)
  }, [phase, chars, paused, index, question.length, showAll])

  function select(i: number) {
    setIndex(i)
    setChars(0)
    setPhase("typing")
  }

  return (
    <figure
      className={cn(
        "relative flex flex-col gap-5 rounded-[22px] border border-line bg-white p-5 sm:p-[30px]",
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span className="flex size-[30px] items-center justify-center rounded-lg bg-ink">
            <Sparkles
              aria-hidden
              className="size-4 text-paper"
              strokeWidth={2.2}
            />
          </span>
          <span className="text-sm font-bold text-caption">
            A customer asks an AI assistant
          </span>
        </span>

        <span
          role="tablist"
          aria-label="AI assistant"
          className="flex gap-1 rounded-full bg-muted p-1"
        >
          {scenarios.map((s, i) => (
            <button
              key={s.engine}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => select(i)}
              className={cn(
                "relative rounded-full px-3 py-1 text-xs font-bold transition-colors",
                i === index ? "text-white" : "text-caption hover:text-ink"
              )}
            >
              {i === index && (
                <motion.span
                  layoutId="engine-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{s.engine}</span>
            </button>
          ))}
        </span>
      </figcaption>

      {/* Question bubble: invisible full text reserves the height */}
      <div className="grid rounded-[14px] bg-muted px-[18px] py-4 text-base leading-snug font-semibold text-ink">
        <span className="sr-only">{question}</span>
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {question}
        </span>
        <span aria-hidden className="col-start-1 row-start-1">
          {typed}
          {!showAll && phase === "typing" && (
            <span className="ml-px inline-block h-[1.1em] w-0.5 translate-y-[3px] animate-blink-cursor bg-ink" />
          )}
        </span>
      </div>

      <div className="flex flex-col gap-[13px]">
        <div className="relative h-6">
          <motion.p
            className="absolute inset-0 text-[15px] leading-relaxed text-slate"
            animate={{
              opacity: answered ? 1 : phase === "thinking" ? 0 : 0.28,
            }}
          >
            Here are three well-regarded options:
          </motion.p>
          {!answered && phase === "thinking" && (
            <span
              className="absolute inset-y-0 left-0 flex items-center gap-1.5"
              aria-hidden
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="size-2 rounded-full bg-clarity"
                  animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: d * 0.15,
                  }}
                />
              ))}
            </span>
          )}
        </div>

        <ol className="flex flex-col gap-[13px]">
          {results.map((r, i) => (
            <motion.li
              key={r.title}
              initial={false}
              animate={
                answered
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0.28, y: 6, filter: "blur(3px)" }
              }
              transition={{
                duration: 0.5,
                delay: answered && !showAll ? 0.15 + i * 0.35 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "relative flex items-start gap-3 rounded-xl px-4 py-3.5",
                r.highlight
                  ? "border-2 border-dashed border-leap bg-orange-tint"
                  : "bg-paper"
              )}
            >
              {r.highlight && answered && !showAll && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -inset-[2px] rounded-xl border-2 border-leap"
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.06 }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: 1.2,
                    ease: "easeOut",
                  }}
                />
              )}
              <span
                className={cn(
                  "min-w-4 font-heading text-[15px] font-bold",
                  r.highlight ? "text-ink" : "text-caption"
                )}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-bold text-ink">{r.title}</p>
                <p
                  className={cn(
                    "mt-[3px] text-sm",
                    r.highlight ? "text-umber-light" : "text-caption"
                  )}
                >
                  {r.note}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </figure>
  )
}
