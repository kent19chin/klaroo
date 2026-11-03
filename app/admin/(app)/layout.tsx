import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { logout } from "@/app/admin/actions"
import { requireAdmin } from "@/lib/auth"

const links = [
  { label: "Overview", href: "/admin" },
  { label: "Emails", href: "/admin/leads" },
  { label: "Blog posts", href: "/admin/posts" },
] as const

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const email = await requireAdmin()

  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 md:px-10">
          <Logo />
          <nav aria-label="Admin" className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] font-semibold text-ink hover:text-kicker"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <form action={logout} className="flex items-center gap-3">
            <span className="hidden text-sm text-caption sm:inline">
              {email}
            </span>
            <Button
              type="submit"
              variant="ink-outline"
              size="pill"
              className="px-4 py-1.5"
            >
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-10 md:px-10">
        {children}
      </main>
    </>
  )
}
