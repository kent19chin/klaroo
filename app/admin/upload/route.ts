import { randomUUID } from "node:crypto"
import { put } from "@vercel/blob"

import { getAdmin } from "@/lib/auth"

const MAX_BYTES = 4 * 1024 * 1024 // Vercel caps request bodies at 4.5 MB.
const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
}

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return Response.json({ error: "Please sign in again." }, { status: 401 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { error: "Image uploads aren't set up yet." },
      { status: 503 }
    )
  }

  const file = (await request.formData()).get("file")
  if (!(file instanceof File) || !EXTENSIONS[file.type]) {
    return Response.json(
      { error: "Use a PNG, JPG, WebP or GIF image." },
      { status: 400 }
    )
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "Images need to be under 4 MB." },
      { status: 400 }
    )
  }

  const blob = await put(
    `blog/${randomUUID()}.${EXTENSIONS[file.type]}`,
    file,
    { access: "public", contentType: file.type }
  )
  return Response.json({ url: blob.url })
}
