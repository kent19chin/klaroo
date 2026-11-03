import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { ArrowLeft } from "lucide-react"

import { JsonLd } from "@/components/site/section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { getPublishedPost } from "@/lib/posts"
import { site } from "@/lib/site"

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "long",
  timeZone: "America/Toronto",
})

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug)
  if (!post) return {}
  const description = post.seo_description || post.excerpt
  return {
    title: post.seo_title || post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seo_title || post.title,
      description,
      publishedTime: post.published_at?.toISOString(),
      modifiedTime: post.updated_at.toISOString(),
    },
  }
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  await connection()
  const post = await getPublishedPost((await params).slug)
  if (!post) notFound()

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <article className="mx-auto max-w-[760px] px-5 pt-10 pb-20 md:px-10 md:pt-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-caption hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All posts
          </Link>
          <h1 className="mt-6 font-heading text-[34px] leading-[1.12] font-bold tracking-[-1px] text-balance text-ink md:text-[46px]">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="mt-4 text-sm font-semibold text-caption">
              {dateFormat.format(post.published_at)}
            </p>
          )}
          {/* Sanitised by cleanPostHtml when the post is saved. */}
          <div
            className="post-body mt-8"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <SiteFooter variant="compact" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.seo_description || post.excerpt,
          url: `${site.url}/blog/${post.slug}`,
          datePublished: post.published_at?.toISOString(),
          dateModified: post.updated_at.toISOString(),
          author: { "@type": "Organization", name: "Klarooo", url: site.url },
          publisher: {
            "@type": "Organization",
            name: "Klarooo",
            url: site.url,
          },
        }}
      />
    </>
  )
}
