"use client"

import { useId, useState } from "react"
import { motion } from "motion/react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export type Faq = { q: string; a: string }

/**
 * Accordion of questions. Answers stay in the DOM when collapsed (only their
 * height animates), so AI crawlers and in-page search can still read them.
 */
export function FaqList({
  faqs,
  className,
  defaultOpen = 0,
}: {
  faqs: readonly Faq[]
  className?: string
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const baseId = useId()

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {faqs.map(({ q, a }, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-${i}`
        return (
          <motion.div
            key={q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={cn(
              "rounded-2xl border transition-colors duration-300",
              isOpen
                ? "border-clarity/40 bg-ink"
                : "border-line bg-ink/50 hover:border-line-strong"
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left md:px-6"
              >
                <span className="text-base font-bold text-paper md:text-lg">
                  {q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                    isOpen
                      ? "bg-clarity text-ink"
                      : "bg-white/[0.06] text-paper"
                  )}
                >
                  <Plus aria-hidden className="size-4" strokeWidth={2.6} />
                </motion.span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-6 text-[15px] leading-[1.7] text-mist md:px-6 md:text-base">
                {a}
              </p>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
