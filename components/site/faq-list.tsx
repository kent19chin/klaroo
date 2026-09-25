"use client"

import { useId, useState } from "react"
import { motion } from "motion/react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export type Faq = { q: string; a: string }

/**
 * Accordion of question cards. Answers stay in the DOM when collapsed (only
 * their height animates), so AI crawlers and in-page search can still read them.
 */
export function FaqList({
  faqs,
  className,
  size = "default",
  defaultOpen = 0,
}: {
  faqs: readonly Faq[]
  className?: string
  size?: "default" | "sm"
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const baseId = useId()

  return (
    <div className={cn("flex grow flex-col gap-[14px]", className)}>
      {faqs.map(({ q, a }, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-${i}`
        return (
          <motion.div
            key={q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={cn(
              "self-start w-full rounded-[14px] border bg-white transition-colors duration-300",
              isOpen ? "border-clarity" : "border-line hover:border-[#b9d4e0]"
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-[14px] px-6 py-5 text-left md:px-7 md:py-[22px]"
              >
                <span
                  className={cn(
                    "font-heading font-bold text-ink",
                    size === "sm"
                      ? "text-lg md:text-[19px]"
                      : "text-lg md:text-xl"
                  )}
                >
                  {q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                    isOpen ? "bg-clarity text-ink" : "bg-muted text-ink"
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
              <p
                className={cn(
                  "px-6 pb-6 leading-[1.62] text-slate md:px-7",
                  size === "sm" ? "text-[15.5px]" : "text-base"
                )}
              >
                {a}
              </p>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
