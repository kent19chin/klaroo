"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/** Wraps a list with a vertical rail on the left that fills as you scroll through it. */
export function ScrollRail({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute top-2 bottom-2 -left-9 hidden w-[3px] rounded-full bg-line xl:block"
      >
        <motion.div
          className="h-full w-full origin-top rounded-full bg-clarity"
          style={{ scaleY }}
        />
      </div>
      {children}
    </div>
  )
}
