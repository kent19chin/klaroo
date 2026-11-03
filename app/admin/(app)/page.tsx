import Link from "next/link"

import { requireAdmin } from "@/lib/auth"
import { listLeads } from "@/lib/leads"
import { listPosts } from "@/lib/posts"

export default async function AdminHome() {
  await requireAdmin()
  const [leads, posts] = await Promise.all([listLeads(), listPosts()])
  const published = posts.filter((p) => p.status === "published").length

  const cards = [
    {
      href: "/admin/leads",
      title: "Emails",
      stat: leads.length,
      note: "from the free check form",
    },
    {
      href: "/admin/posts",
      title: "Blog posts",
      stat: posts.length,
      note: `${published} published, ${posts.length - published} drafts`,
    },
  ]

  return (
    <>
      <h1 className="font-heading text-3xl font-bold text-ink">Overview</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-[18px] border border-line bg-white p-7 transition-colors hover:border-clarity"
          >
            <p className="text-sm font-bold text-caption">{c.title}</p>
            <p className="mt-2 font-heading text-[40px] leading-none font-bold text-ink">
              {c.stat}
            </p>
            <p className="mt-2 text-[15px] text-slate">{c.note}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
