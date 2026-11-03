import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { ArrowRight } from "lucide-react"

import { Eyebrow, FadeUp, WordsIn } from "@/components/site/section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { listPublishedPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language notes on how AI tools choose which businesses to name, and what you can do about it.",
  alternates: { canonical: "/blog" },
}

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "long",
  timeZone: "America/Toronto",
})

export default async function BlogPage() {
  await connection()
  const posts = await listPublishedPosts()

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="mx-auto max-w-[900px] px-5 pt-12 pb-20 md:px-10 md:pt-16 lg:pt-[80px]">
          <FadeUp>
            <Eyebrow>Blog</Eyebrow>
          </FadeUp>
          <WordsIn
            text="How AI decides who to name"
            delay={0.05}
            className="mt-4 font-heading text-[38px] leading-[1.1] font-bold tracking-[-1.4px] text-balance text-ink md:text-[52px]"
          />

          {posts.length === 0 ? (
            <p className="mt-8 text-[17px] text-slate">
              Our first posts are on the way.
            </p>
          ) : (
            <ul className="mt-10 flex flex-col gap-5">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-[18px] border border-line bg-white p-7 transition-colors hover:border-clarity"
                  >
                    {post.published_at && (
                      <p className="text-sm font-semibold text-caption">
                        {dateFormat.format(post.published_at)}
                      </p>
                    )}
                    <h2 className="mt-2 font-heading text-2xl font-bold text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-slate">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-ink">
                      Read more
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter variant="compact" />
    </>
  )
}
