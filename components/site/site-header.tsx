"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { useAuditModal } from "@/components/site/audit-modal"
import { Logo } from "@/components/site/logo"
import { navLinks } from "@/lib/site"
import { cn } from "@/lib/utils"

const sectionIds = navLinks.map((l) => l.href.split("#")[1])

export function SiteHeader() {
  const pathname = usePathname()
  const { open: openAudit } = useAuditModal()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12))

  // Highlight the nav link for the section currently on screen (home only).
  useEffect(() => {
    if (pathname !== "/") return
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const id of sectionIds) {
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
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])

  const isActive = (href: string) =>
    pathname === "/" && active === href.split("#")[1]

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300",
        scrolled ? "border-line bg-night/80" : "border-transparent bg-night/40"
      )}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-clarity"
        style={{ scaleX: progress }}
      />
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center justify-between px-5 transition-[padding] duration-300 md:px-8",
          scrolled ? "py-3" : "py-4 lg:py-5"
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                isActive(link.href)
                  ? "text-paper"
                  : "text-mist hover:text-paper"
              )}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openAudit()}
            className={cn(
              buttonVariants({ variant: "leap", size: "cta" }),
              "hover:scale-[1.03]"
            )}
          >
            Get Free AI Audit
            <ArrowRight
              aria-hidden
              className="transition-transform group-hover/button:translate-x-1"
            />
          </button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-xl text-paper hover:bg-white/5 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-night/95 px-5 md:px-8 lg:hidden"
          >
            <div className="pt-2 pb-6">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-line py-4 text-lg font-semibold text-paper"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  openAudit()
                }}
                className={cn(
                  buttonVariants({ variant: "leap", size: "cta-lg" }),
                  "mt-6 w-full"
                )}
              >
                Get Free AI Audit
                <ArrowRight aria-hidden />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
