"use client"

import { motion, useScroll, useTransform } from "motion/react"

/** Dot grid + two soft brand-tint orbs that drift and parallax on scroll. */
export function HeroBackdrop() {
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 800], [0, 120])
  const orbY = useTransform(scrollY, [0, 800], [0, -80])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 [background-image:radial-gradient(#0a2a43_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]"
      />
      <motion.div style={{ y: orbY }} className="absolute inset-0">
        <div className="absolute top-[-10%] right-[-5%] size-[520px] animate-float rounded-full bg-blue-tint opacity-70 blur-3xl" />
        <div
          className="absolute bottom-[-20%] left-[30%] size-[380px] animate-float rounded-full bg-orange-tint opacity-45 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />
      </motion.div>
    </div>
  )
}
