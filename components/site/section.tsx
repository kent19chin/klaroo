import { cn } from "@/lib/utils"

/** Full-bleed coloured band with the site's 1440px content column inside. */
export function Section({
  className,
  innerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { innerClassName?: string }) {
  return (
    <section className={cn("scroll-mt-20", className)} {...props}>
      <div
        className={cn(
          "mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[92px]",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p
      className={cn(
        "text-[13px] font-extrabold tracking-[1.4px] text-kicker uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}

/** Eyebrow + H2 + optional subhead, the opening of most sections. */
export function SectionIntro({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex max-w-[760px] flex-col gap-4", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-heading text-[32px] leading-[1.14] font-bold tracking-[-1px] text-balance text-ink md:text-[42px]">
        {title}
      </h2>
      {children && (
        <p className="text-[17px] leading-relaxed text-slate md:text-lg">
          {children}
        </p>
      )}
    </div>
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

/** Headline whose words rise in one by one on load (CSS only). */
export function WordsIn({
  text,
  className,
  as: Component = "h1",
  delay = 0,
}: {
  text: string
  className?: string
  as?: "h1" | "h2"
  delay?: number
}) {
  const words = text.split(" ")
  return (
    <Component className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span
              className="inline-block animate-word-up"
              style={{ animationDelay: `${delay + i * 0.06}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Component>
  )
}
