import { cn } from "@/lib/utils"

/** Full-width section with the site's content column inside. */
export function Section({
  className,
  innerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { innerClassName?: string }) {
  return (
    <section className={cn("relative scroll-mt-20", className)} {...props}>
      <div
        className={cn(
          "mx-auto max-w-[1240px] px-5 py-20 md:px-8 lg:py-28",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}

/** Mono uppercase section label. */
export function Kicker({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-semibold tracking-[0.15em] text-clarity uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}

/** Kicker + H2 + optional sub, the opening of most sections. */
export function SectionIntro({
  kicker,
  title,
  children,
  className,
  align = "left",
}: {
  kicker?: string
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={cn(
        "flex max-w-[760px] flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-paper md:text-[48px]">
        {title}
      </h2>
      {children && (
        <p className="text-base leading-[1.6] text-mist md:text-lg">
          {children}
        </p>
      )}
    </div>
  )
}

/** Soft Clarity Blue radial glow (decorative). */
export function Glow({
  className,
  color = "clarity",
}: {
  className?: string
  color?: "clarity" | "leap"
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-3xl",
        color === "clarity" ? "bg-clarity/15" : "bg-leap/10",
        className
      )}
    />
  )
}

/** Renders schema.org structured data. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

/**
 * Load-time entrance for above-the-fold content. Pure CSS so it starts on
 * first paint instead of waiting for JavaScript.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div
      className={cn("animate-fade-up", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

/**
 * Headline whose words rise in one by one on load (CSS only). Pass several
 * `lines` to break the heading; `accentLine` gets `accentClassName`.
 */
export function WordsIn({
  lines,
  className,
  as: Component = "h1",
  delay = 0,
  accentLine,
  accentClassName = "text-clarity",
}: {
  lines: string[]
  className?: string
  as?: "h1" | "h2"
  delay?: number
  accentLine?: number
  accentClassName?: string
}) {
  let index = 0
  return (
    <Component className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden
          className={cn("block", li === accentLine && accentClassName)}
        >
          {line.split(" ").map((word, wi, arr) => {
            const i = index++
            return (
              <span key={wi}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <span
                    className="inline-block animate-word-up"
                    style={{ animationDelay: `${delay + i * 0.06}s` }}
                  >
                    {word}
                  </span>
                </span>
                {wi < arr.length - 1 && " "}
              </span>
            )
          })}
        </span>
      ))}
    </Component>
  )
}
