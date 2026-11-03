import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { requireAdmin } from "@/lib/auth"
import { listPosts } from "@/lib/posts"

export const metadata: Metadata = { title: "Blog posts" }

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
  timeZone: "America/Toronto",
})

export default async function PostsPage() {
  await requireAdmin()
  const posts = await listPosts()

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold text-ink">Blog posts</h1>
        <Link
          href="/admin/posts/new"
          className={buttonVariants({ variant: "leap", size: "pill" })}
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 text-base text-slate">No posts yet.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/posts/${post.id}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-line bg-white px-6 py-4 transition-colors hover:border-clarity"
              >
                <span className="font-heading text-lg font-bold text-ink">
                  {post.title}
                </span>
                <span className="flex items-center gap-3 text-sm text-caption">
                  {dateFormat.format(post.updated_at)}
                  <Badge
                    className={
                      post.status === "published"
                        ? "rounded-full bg-clarity text-ink"
                        : "rounded-full bg-muted text-caption"
                    }
                  >
                    {post.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
