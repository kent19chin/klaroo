import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/site/logo"
import { site } from "@/lib/site"

const linkClass = "text-[15px] text-mist transition-colors hover:text-white"

const columns = [
  {
    title: "Services",
    links: [
      { label: "Visibility Snapshot", href: "/pricing#one-time" },
      { label: "Full Audit", href: "/pricing#one-time" },
      { label: "Monthly plans", href: "/pricing#monthly" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why it matters", href: "/#why" },
      { label: "What we do", href: "/#what" },
      { label: "Questions", href: "/#faq" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: site.contact.emailLabel, href: `mailto:${site.contact.email}` },
      { label: site.contact.phoneLabel, href: site.contact.phoneHref },
      { label: site.contact.linkedinLabel, href: site.contact.linkedinHref },
    ],
  },
]

export function SiteFooter({
  variant = "full",
}: {
  variant?: "full" | "compact"
}) {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-9 px-5 pt-14 pb-11 md:px-10 lg:gap-12 lg:px-20 lg:pt-16">
        {variant === "full" ? (
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-20">
            <div className="flex max-w-[400px] flex-col gap-4">
              <Logo tone="white" />
              <p className="text-[15.5px] leading-[1.62] text-mist">
                {site.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-[72px]">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <p className="text-[13px] font-extrabold tracking-[1.2px] text-white uppercase">
                    {col.title}
                  </p>
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <Logo tone="white" />
            <nav
              aria-label="Footer"
              className="flex flex-wrap gap-x-10 gap-y-3"
            >
              <Link href="/" className={linkClass}>
                Home
              </Link>
              <Link href="/pricing" className={linkClass}>
                Pricing
              </Link>
              <Link href="/pricing#questions" className={linkClass}>
                Questions
              </Link>
              <Link href={`mailto:${site.contact.email}`} className={linkClass}>
                {site.contact.emailLabel}
              </Link>
            </nav>
          </div>
        )}

        <div>
          <Separator className="bg-line-dark" />
          <div className="flex flex-col justify-between gap-4 pt-6 text-sm text-fog sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} {site.name}. {site.tagline}.
            </span>
            {variant === "full" && (
              // TODO: Privacy / Terms pages don't exist yet
              <div className="flex gap-7">
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
