"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { navLinks } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12))

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-clarity"
        style={{ scaleX: progress }}
      />
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[padding] duration-300 md:px-10 lg:px-20",
          scrolled ? "py-3 lg:py-3.5" : "py-4 lg:py-[22px]"
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === pathname
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group/nav relative py-1 text-[15px] font-semibold transition-colors hover:text-kicker",
                  active ? "font-bold text-kicker" : "text-ink"
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-leap transition-transform duration-300 ease-out",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover/nav:scale-x-100"
                  )}
                />
              </Link>
            )
          })}
          <Link
            href="/#start"
            className={cn(
              buttonVariants({ variant: "leap", size: "pill" }),
              "hover:scale-[1.04]"
            )}
          >
            Get a free check
            <ArrowRight
              aria-hidden
              className="transition-transform group-hover/button:translate-x-1"
            />
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper px-5 md:px-10 lg:hidden"
          >
            <div className="pt-2 pb-6">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={link.href === pathname ? "page" : undefined}
                      className={cn(
                        "block border-b border-line py-4 text-lg font-semibold",
                        link.href === pathname ? "text-kicker" : "text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/#start"
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "leap", size: "pill-lg" }),
                  "mt-6 w-full"
                )}
              >
                Get a free check
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
