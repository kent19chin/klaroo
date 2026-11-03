import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { requireAdmin } from "@/lib/auth"
import { getPost } from "@/lib/posts"
import { PostEditor } from "../post-editor"

export const metadata: Metadata = { title: "Edit post" }

export default async function EditPostPage({
  params,
}: PageProps<"/admin/posts/[id]">) {
  await requireAdmin()
  const post = await getPost((await params).id)
  if (!post) notFound()

  return (
    <PostEditor
      post={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        contentHtml: post.content_html,
        seoTitle: post.seo_title,
        seoDescription: post.seo_description,
        status: post.status,
      }}
    />
  )
}
