import { revalidatePath } from "next/cache"

import { hasPublishToken, publishTokenConfigured } from "@/lib/publish-auth"
import { cleanPostHtml, getPostBySlug, savePost, slugify } from "@/lib/posts"
import { site } from "@/lib/site"

export const runtime = "nodejs"

type Body = {
  title?: string
  slug?: string
  excerpt?: string
  content_html?: string
  seo_title?: string
  seo_description?: string
  status?: string
}

export async function POST(request: Request) {
  if (!publishTokenConfigured()) {
    return Response.json(
      { error: "Publishing API is not configured." },
      { status: 503 }
    )
  }
  if (!hasPublishToken(request)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 })
  }
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "Database is not connected." }, { status: 503 })
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return Response.json({ error: "Send a JSON body." }, { status: 400 })
  }

  const title = String(body.title ?? "").trim().slice(0, 200)
  const slug = slugify(String(body.slug ?? "") || title)
  const excerpt = String(body.excerpt ?? "").trim().slice(0, 400)
  const contentHtml = cleanPostHtml(String(body.content_html ?? ""))
  const status = body.status === "draft" ? "draft" : "published"
  const hasBody = contentHtml.replace(/<(?!img)[^>]*>/g, "").trim().length > 0

  if (!title) return Response.json({ error: "Add a title first." }, { status: 400 })
  if (!slug) {
    return Response.json(
      { error: "The web address needs at least one letter or number." },
      { status: 400 }
    )
  }
  if (status === "published" && (!excerpt || !hasBody)) {
    return Response.json(
      { error: "Add a summary and some content before publishing." },
      { status: 400 }
    )
  }

  const existing = await getPostBySlug(slug)
  try {
    const post = await savePost(existing?.id ?? null, {
      slug,
      title,
      excerpt,
      contentHtml,
      seoTitle: String(body.seo_title ?? "").trim().slice(0, 200),
      seoDescription: String(body.seo_description ?? "").trim().slice(0, 400),
      status,
    })
    if (!post) {
      return Response.json({ error: "Could not save." }, { status: 500 })
    }
    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    return Response.json({
      id: post.id,
      slug: post.slug,
      status: post.status,
      url: `${site.url}/blog/${post.slug}`,
      updated: Boolean(existing),
    })
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return Response.json(
        { error: "Another post already uses that web address." },
        { status: 409 }
      )
    }
    console.error("Could not publish post", error)
    return Response.json({ error: "Could not save. Please try again." }, { status: 500 })
  }
}
