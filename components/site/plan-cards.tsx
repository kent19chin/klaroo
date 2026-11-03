"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { EngineIcons } from "@/components/site/engine-icons"
import { HoverCard } from "@/components/site/hover-card"
import { plans, type PlanItem } from "@/lib/site"
import { cn } from "@/lib/utils"

type PlanKey = keyof typeof plans

const order: PlanKey[] = ["focus", "comprehensive"]

const options: { label: string; plan: PlanKey }[] = [
  { label: "My team can make the fixes, I just need the report", plan: "focus" },
  { label: "I want you to make the fixes too", plan: "comprehensive" },
]

/**
 * The two plan cards plus a "which sounds more like you?" picker that
 * highlights the matching plan.
 */
export function PlanChooser() {
  const [picked, setPicked] = useState<PlanKey | null>(null)

  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="flex items-center gap-2 text-sm font-bold text-caption">
          <Sparkles aria-hidden className="size-4 text-kicker" />
          Which sounds more like you?
        </span>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Help me choose"
        >
          {options.map((o) => {
            const active = picked === o.plan
            return (
              <button
                key={o.plan}
                type="button"
                aria-pressed={active}
                onClick={() => setPicked(active ? null : o.plan)}
                className={cn(
                  "relative rounded-full border-2 px-4 py-2 text-left text-sm font-semibold transition-colors",
                  active
                    ? "border-ink text-white"
                    : "border-line bg-white text-ink hover:border-ink/40"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="plan-chooser"
                    className="absolute -inset-[2px] rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{o.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
        {order.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full"
          >
            <motion.div
              className="h-full"
              animate={{
                opacity: picked && picked !== key ? 0.5 : 1,
                scale: picked === key ? 1.015 : picked ? 0.985 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <PlanCard planKey={key} picked={picked === key} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PlanCard({ planKey, picked }: { planKey: PlanKey; picked: boolean }) {
  const plan = plans[planKey]
  const featured = planKey === "comprehensive"
  const items: readonly PlanItem[] = plan.includes

  return (
    <HoverCard
      className={cn(
        "flex h-full flex-col gap-[22px] rounded-[22px] p-7 text-base ring-offset-4 ring-offset-paper transition-shadow duration-300 sm:p-10",
        featured
          ? "border-[3px] border-clarity bg-[#f2f9fd]"
          : "border border-line bg-white",
        picked && "ring-4 ring-leap"
      )}
    >
      <AnimatePresence>
        {picked && (
          <motion.span
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            className="absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-b-xl bg-leap px-4 py-1.5 text-xs font-extrabold tracking-[0.6px] text-ink uppercase"
          >
            Our pick for you
          </motion.span>
        )}
      </AnimatePresence>

      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
        <div>
          <h3 className="font-heading text-[26px] leading-tight font-bold text-ink md:text-[28px]">
            {plan.name}
          </h3>
          <p className="mt-2 text-base leading-[1.55] text-caption">
            {plan.subhead}
          </p>
        </div>
        <Badge
          className={cn(
            "h-auto rounded-full px-[15px] py-2 text-[12.5px] font-extrabold tracking-[0.6px] uppercase",
            featured ? "bg-clarity text-ink" : "bg-muted text-caption"
          )}
        >
          {plan.badge}
        </Badge>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="flex items-baseline gap-2">
          <span className="font-heading text-[40px] leading-none font-bold text-ink md:text-[46px]">
            {plan.price}
          </span>
          <span className="text-[17px] text-caption">{plan.period}</span>
        </p>
        <EngineIcons engines={plan.engines} />
      </div>

      <Separator className="bg-[#dbe5ea]" />

      <motion.ul
        className="flex flex-col gap-3.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
        }}
      >
        {items.map((item) => (
          <motion.li
            key={item.text}
            className="flex items-start gap-3"
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0 },
            }}
          >
            <motion.span
              className="mt-[3px] shrink-0"
              variants={{
                hidden: { scale: 0 },
                show: {
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 18 },
                },
              }}
            >
              {item.excluded ? (
                <Minus aria-hidden strokeWidth={3} className="size-5 text-fog" />
              ) : (
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className="size-5 text-clarity"
                />
              )}
            </motion.span>
            <span
              className={cn(
                "text-base leading-[1.55]",
                item.excluded ? "text-fog" : "text-slate"
              )}
            >
              {item.excluded && <span className="sr-only">Not included: </span>}
              {item.text}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="grow" />

      <Link
        href="#talk"
        className={cn(
          buttonVariants({
            variant: featured ? "leap" : "ink",
            size: "pill-lg",
          }),
          "w-full px-5 text-center whitespace-normal hover:scale-[1.02] sm:px-8"
        )}
      >
        {plan.cta}
        <ArrowRight
          aria-hidden
          className="transition-transform group-hover/button:translate-x-1"
        />
      </Link>
      <p className="text-center text-[14.5px] leading-[1.55] text-caption">
        {plan.fit}
      </p>
    </HoverCard>
  )
}
