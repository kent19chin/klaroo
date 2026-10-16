import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { site } from "@/lib/site"

const linkClass = "text-sm text-mist transition-colors hover:text-paper"

export function SiteFooter() {
  const { contact } = site
  return (
    <footer className="border-t border-line bg-night">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-5 py-14 md:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-fog">{site.serving}</p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8"
        >
          <Link href="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={linkClass}>
            Terms of Service
          </Link>
          <a href={`mailto:${contact.email}`} className={linkClass}>
            {contact.emailLabel}
          </a>
          <a
            href={contact.phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {contact.phoneLabel}
          </a>
          <a href={contact.linkedinHref} className={linkClass}>
            {contact.linkedinLabel}
          </a>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1240px] px-5 py-6 font-mono text-xs text-fog md:px-8">
          © {new Date().getFullYear()} {site.name}. {site.tagline}.
        </p>
      </div>
    </footer>
  )
}
