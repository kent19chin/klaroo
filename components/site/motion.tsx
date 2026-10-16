"use client"

import { useEffect, useRef } from "react"
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

/** Respects the OS "reduce motion" setting for every motion component below it. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

/** Fades + slides its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  as?: "div" | "li" | "section" | "article"
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Component>
  )
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/** Parent that reveals each <StaggerItem> child one after another. */
export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  as?: "div" | "ul" | "ol"
  delay?: number
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  as?: "div" | "li" | "article"
}) {
  const Component = motion[as]
  return (
    <Component className={className} variants={staggerChild}>
      {children}
    </Component>
  )
}

/** Horizontal (desktop) / vertical (mobile) line that draws itself on view. */
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("block origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.4, ease }}
    />
  )
}

/** Counts up from 0 to `to` the first time it scrolls into view. */
export function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" })
  // Starts at the final value so server HTML (and crawlers) see the real number.
  const value = useMotionValue(to)
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    value.set(0)
    const controls = animate(value, to, { duration: 1.4, ease })
    return () => controls.stop()
  }, [inView, to, value])

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  )
}
