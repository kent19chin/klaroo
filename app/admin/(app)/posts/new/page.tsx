import type { Metadata } from "next"

import { requireAdmin } from "@/lib/auth"
import { PostEditor } from "../post-editor"

export const metadata: Metadata = { title: "New post" }

export default async function NewPostPage() {
  await requireAdmin()
  return <PostEditor />
}
