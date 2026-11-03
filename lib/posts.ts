import "server-only"

import sanitizeHtml from "sanitize-html"

import { query } from "@/lib/db"

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content_html: string
  seo_title: string
  seo_description: string
  status: "draft" | "published"
  published_at: Date | null
  created_at: Date
  updated_at: Date
}

/** Only the markup the editor can produce survives, whatever gets posted. */
export function cleanPostHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "blockquote",
      "strong",
      "em",
      "u",
      "s",
      "code",
      "pre",
      "a",
      "img",
      "br",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
  })
}

export function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "")
}

export function listPosts() {
  return query<Post>("SELECT * FROM posts ORDER BY updated_at DESC")
}

export async function getPost(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null
  const [post] = await query<Post>("SELECT * FROM posts WHERE id = $1", [id])
  return post ?? null
}

/** The public blog stays up, just empty, until a database is connected. */
export async function listPublishedPosts() {
  if (!process.env.DATABASE_URL) return []
  return query<Post>(
    `SELECT * FROM posts WHERE status = 'published'
     ORDER BY published_at DESC`
  )
}

export async function getPublishedPost(slug: string) {
  if (!process.env.DATABASE_URL) return null
  const [post] = await query<Post>(
    "SELECT * FROM posts WHERE slug = $1 AND status = 'published'",
    [slug]
  )
  return post ?? null
}

export async function savePost(
  id: string | null,
  fields: {
    slug: string
    title: string
    excerpt: string
    contentHtml: string
    seoTitle: string
    seoDescription: string
    status: "draft" | "published"
  }
) {
  const values = [
    fields.slug,
    fields.title,
    fields.excerpt,
    fields.contentHtml,
    fields.seoTitle,
    fields.seoDescription,
    fields.status,
  ]
  // published_at is set on first publish and kept, so re-publishing keeps the date.
  const publishedAt = `CASE WHEN $7 = 'published' THEN now() END`
  if (id) {
    const [post] = await query<Post>(
      `UPDATE posts SET slug = $1, title = $2, excerpt = $3, content_html = $4,
         seo_title = $5, seo_description = $6, status = $7,
         published_at = COALESCE(published_at, ${publishedAt}),
         updated_at = now()
       WHERE id = $8 RETURNING *`,
      [...values, id]
    )
    return post ?? null
  }
  const [post] = await query<Post>(
    `INSERT INTO posts (slug, title, excerpt, content_html, seo_title,
       seo_description, status, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, ${publishedAt}) RETURNING *`,
    values
  )
  return post
}

export async function deletePost(id: string) {
  const [post] = await query<{ slug: string }>(
    "DELETE FROM posts WHERE id = $1 RETURNING slug",
    [id]
  )
  return post ?? null
}
