"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import {
  requestLoginLink,
  requireAdmin,
  signInWithToken,
  signOut,
} from "@/lib/auth"
import { deleteLead } from "@/lib/leads"
import { cleanPostHtml, deletePost, savePost, slugify } from "@/lib/posts"

export type LoginState = { status: "idle" | "sent" | "error" }

export async function requestLink(
  _prev: LoginState,
  form: FormData
): Promise<LoginState> {
  try {
    await requestLoginLink(String(form.get("email") ?? "").slice(0, 254))
  } catch (error) {
    console.error("Could not send sign-in link", error)
    return { status: "error" }
  }
  // Same answer whether or not the address is allowed.
  return { status: "sent" }
}

export async function confirmLogin(form: FormData) {
  const ok = await signInWithToken(String(form.get("token") ?? ""))
  redirect(ok ? "/admin" : "/admin/login?expired=1")
}

export async function logout() {
  await signOut()
  redirect("/admin/login")
}

export async function removeLead(form: FormData) {
  await requireAdmin()
  await deleteLead(String(form.get("id")))
  revalidatePath("/admin/leads")
}

export type PostState = { error?: string; savedAt?: number }

export async function savePostAction(
  _prev: PostState,
  form: FormData
): Promise<PostState> {
  await requireAdmin()

  const id = String(form.get("id") ?? "") || null
  const status = form.get("intent") === "publish" ? "published" : "draft"
  const title = String(form.get("title") ?? "")
    .trim()
    .slice(0, 200)
  const slug = slugify(String(form.get("slug") ?? "") || title)
  const excerpt = String(form.get("excerpt") ?? "")
    .trim()
    .slice(0, 400)
  const contentHtml = cleanPostHtml(String(form.get("content") ?? ""))
  const hasBody = contentHtml.replace(/<(?!img)[^>]*>/g, "").trim().length > 0

  if (!title) return { error: "Add a title first." }
  if (!slug)
    return { error: "The web address needs at least one letter or number." }
  if (status === "published" && (!excerpt || !hasBody)) {
    return { error: "Add a summary and some content before publishing." }
  }

  let savedId: string | undefined
  try {
    const post = await savePost(id, {
      slug,
      title,
      excerpt,
      contentHtml,
      seoTitle: String(form.get("seoTitle") ?? "")
        .trim()
        .slice(0, 200),
      seoDescription: String(form.get("seoDescription") ?? "")
        .trim()
        .slice(0, 400),
      status,
    })
    if (!post) return { error: "This post no longer exists." }
    savedId = post.id
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return { error: "Another post already uses that web address." }
    }
    console.error("Could not save post", error)
    return { error: "Could not save. Please try again." }
  }

  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)

  if (!id) redirect(`/admin/posts/${savedId}`)
  revalidatePath(`/admin/posts/${id}`)
  return { savedAt: Date.now() }
}

export async function removePost(form: FormData) {
  await requireAdmin()
  const post = await deletePost(String(form.get("id")))
  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  if (post) revalidatePath(`/blog/${post.slug}`)
  redirect("/admin/posts")
}
