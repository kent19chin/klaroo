import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/site/motion"
import { cn } from "@/lib/utils"

type CtaLink = { label: string; href: string; external?: boolean }

/** Clarity Blue closing band with heading, body, one or two buttons and a "radar" pulse. */
export function CtaBand({
  id,
  title,
  body,
  primary,
  secondary,
}: {
  id: string
  title: string
  body: string
  primary: CtaLink
  secondary?: CtaLink
}) {
  const linkProps = (l: CtaLink) =>
    l.external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <section
      id={id}
      className="relative isolate scroll-mt-20 overflow-hidden bg-clarity"
    >
      {/* Radar rings: "someone has to go and check" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[8%] -z-10 size-[520px] -translate-y-1/2 max-lg:right-[-30%]"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute inset-0 animate-radar rounded-full border-2 border-ink/15"
            style={{ animationDelay: `${i * 1.1}s` }}
          />
        ))}
        <span className="absolute inset-[45%] rounded-full bg-ink/10" />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:px-20 lg:py-[84px]">
        <Reveal className="flex max-w-[740px] flex-col gap-4">
          <h2 className="font-heading text-[32px] leading-[1.12] font-bold tracking-[-1.2px] text-balance text-ink md:text-[44px]">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed text-ink md:text-[19px]">
            {body}
          </p>
        </Reveal>
        <Reveal
          delay={0.15}
          className="flex flex-col gap-3 sm:flex-row lg:flex-col"
        >
          <Link
            href={primary.href}
            {...linkProps(primary)}
            className={cn(
              buttonVariants({ variant: "ink", size: "pill-lg" }),
              "px-10 hover:scale-[1.03]"
            )}
          >
            {primary.label}
            <ArrowRight
              aria-hidden
              className="transition-transform group-hover/button:translate-x-1"
            />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              {...linkProps(secondary)}
              className={cn(
                buttonVariants({ variant: "ink-outline", size: "pill-lg" }),
                "px-10"
              )}
            >
              {secondary.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
