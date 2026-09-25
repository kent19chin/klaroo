"use client"

import { motion, useMotionTemplate, useMotionValue } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Light card with a soft spotlight that follows the cursor, plus a small lift
 * on hover. `glow` is any CSS colour for the spotlight.
 */
export function HoverCard({
  children,
  className,
  glow = "rgba(0, 167, 225, 0.14)",
  radius = 320,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  glow?: string
  radius?: number
  as?: "div" | "article" | "li"
}) {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, ${glow}, transparent 75%)`
  const Component = motion[as]

  return (
    <Component
      className={cn("group/hover relative isolate overflow-hidden", className)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/hover:opacity-100"
        style={{ background }}
      />
      {children}
    </Component>
  )
}
