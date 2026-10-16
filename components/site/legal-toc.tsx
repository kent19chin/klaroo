"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type TocItem = { id: string; title: string }

/** Table of contents that highlights the section currently being read. */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    // Active = the last section whose heading has scrolled past the top third.
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let current = items[0]?.id
      for (const { id } of items) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items])

  const list = (
    <ol className="flex flex-col gap-0.5">
      {items.map((item, i) => {
        const isActive = item.id === active
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "relative flex gap-3 rounded-lg py-1.5 pr-2 pl-4 text-sm leading-snug transition-colors",
                isActive ? "font-bold text-paper" : "text-fog hover:text-paper"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="legal-toc-marker"
                  className="absolute top-1 bottom-1 left-0 w-[3px] rounded-full bg-leap"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="w-5 shrink-0 font-mono text-xs leading-5 tabular-nums opacity-70">
                {i + 1}.
              </span>
              {item.title}
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <>
      {/* Mobile / tablet: collapsible */}
      <details className="group rounded-2xl border border-line bg-ink lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold text-paper">
          On this page
          <ChevronDown
            aria-hidden
            className="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="px-3 pb-4">{list}</div>
      </details>

      {/* Desktop: sticky */}
      <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
        <p className="mb-3 pl-4 font-mono text-xs font-semibold tracking-[0.15em] text-clarity uppercase">
          On this page
        </p>
        {list}
      </nav>
    </>
  )
}
