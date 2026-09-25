"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HoverCard } from "@/components/site/hover-card"
import { cn } from "@/lib/utils"

export type Tone = "white" | "paper" | "ink" | "clarity"

export type Plan = {
  name: string
  subhead: string
  price: string
  period: string
  includes: string[]
  plus?: string
  cta: string
  fit: string
  tone: Tone
  badge?: string
}

export type ChooserOption = { label: string; plan: string }

// Per-tone colours, mirroring the pricing layout reference.
const tones: Record<
  Tone,
  {
    card: string
    title: string
    sub: string
    price: string
    rule: string
    check: string
    text: string
    plus: string
    button: "ink" | "leap"
    badge: string
    glow: string
  }
> = {
  white: {
    card: "border border-line bg-white",
    title: "text-ink",
    sub: "text-caption",
    price: "text-ink",
    rule: "bg-[#e6ecef]",
    check: "text-clarity",
    text: "text-slate",
    plus: "text-ink",
    button: "ink",
    badge: "",
    glow: "rgba(0, 167, 225, 0.12)",
  },
  paper: {
    card: "bg-paper",
    title: "text-ink",
    sub: "text-caption",
    price: "text-ink",
    rule: "bg-[#e0e6e9]",
    check: "text-clarity",
    text: "text-slate",
    plus: "text-ink",
    button: "ink",
    badge: "",
    glow: "rgba(0, 167, 225, 0.12)",
  },
  ink: {
    card: "bg-ink",
    title: "text-white",
    sub: "text-mist",
    price: "text-leap",
    rule: "bg-line-dark",
    check: "text-leap",
    text: "text-haze",
    plus: "text-white",
    button: "leap",
    badge: "bg-leap text-ink",
    glow: "rgba(241, 119, 32, 0.18)",
  },
  clarity: {
    card: "bg-clarity",
    title: "text-ink",
    sub: "text-ink",
    price: "text-ink",
    rule: "bg-[#4cc0ea]",
    check: "text-ink",
    text: "text-ink",
    plus: "text-ink",
    button: "ink",
    badge: "bg-ink text-white",
    glow: "rgba(255, 255, 255, 0.35)",
  },
}

/**
 * Two plan cards plus a "which sounds more like you?" picker that highlights
 * the matching plan.
 */
export function PlanChooser({
  plans,
  options,
}: {
  plans: Plan[]
  options: ChooserOption[]
}) {
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:ml-[50px]">
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
                    layoutId={`chooser-${plans[0].name}`}
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

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
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
                opacity: picked && picked !== plan.name ? 0.5 : 1,
                scale: picked === plan.name ? 1.015 : picked ? 0.985 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <PlanCard plan={plan} recommended={picked === plan.name} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PlanCard({ plan, recommended }: { plan: Plan; recommended: boolean }) {
  const t = tones[plan.tone]
  const items = plan.plus ? [plan.plus, ...plan.includes] : plan.includes

  return (
    <HoverCard
      glow={t.glow}
      className={cn(
        "flex h-full flex-col gap-[22px] rounded-[22px] p-7 text-base ring-offset-4 ring-offset-paper transition-shadow duration-300 sm:p-10",
        t.card,
        recommended && "ring-4 ring-leap"
      )}
    >
      <AnimatePresence>
        {recommended && (
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
          <h3
            className={cn(
              "font-heading text-[26px] font-bold md:text-[28px]",
              t.title
            )}
          >
            {plan.name}
          </h3>
          <p className={cn("mt-1.5 text-base leading-[1.55]", t.sub)}>
            {plan.subhead}
          </p>
        </div>
        {plan.badge && (
          <Badge
            className={cn(
              "h-auto rounded-full px-[15px] py-2 text-[12.5px] font-extrabold tracking-[0.6px] uppercase",
              t.badge
            )}
          >
            {plan.badge}
          </Badge>
        )}
      </div>

      <p className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-heading text-[34px] font-bold md:text-[40px]",
            t.price
          )}
        >
          {plan.price}
        </span>
        <span className={cn("text-[15px]", t.sub)}>{plan.period}</span>
      </p>

      <Separator className={t.rule} />

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
        {items.map((item, i) => {
          const isPlus = plan.plus && i === 0
          return (
            <motion.li
              key={item}
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
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className={cn("size-5", t.check)}
                />
              </motion.span>
              <span
                className={cn(
                  "text-base leading-[1.55]",
                  isPlus ? cn("font-bold", t.plus) : t.text
                )}
              >
                {item}
              </span>
            </motion.li>
          )
        })}
      </motion.ul>

      <div className="grow" />

      <Link
        href="#talk"
        className={cn(
          buttonVariants({ variant: t.button, size: "pill-lg" }),
          "w-full hover:scale-[1.02]"
        )}
      >
        {plan.cta}
        <ArrowRight
          aria-hidden
          className="transition-transform group-hover/button:translate-x-1"
        />
      </Link>
      <p className={cn("text-center text-[14.5px] leading-[1.55]", t.sub)}>
        {plan.fit}
      </p>
    </HoverCard>
  )
}
