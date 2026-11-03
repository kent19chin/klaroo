"use client"

import { startTransition, useActionState, useRef, useState } from "react"
import Link from "next/link"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import Image from "@tiptap/extension-image"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { removePost, savePostAction, type PostState } from "@/app/admin/actions"
import { cn } from "@/lib/utils"

type EditablePost = {
  id: string
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  seoTitle: string
  seoDescription: string
  status: "draft" | "published"
}

const fieldClass = "rounded-xl bg-white px-4 text-base md:text-base"
const initial: PostState = {}

export function PostEditor({ post }: { post?: EditablePost }) {
  const [state, action, pending] = useActionState(savePostAction, initial)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false },
      }),
      Image,
    ],
    content: post?.contentHtml ?? "",
    editorProps: {
      attributes: {
        "aria-label": "Post content",
        class: "post-body min-h-[360px] px-5 py-4 outline-none",
      },
    },
  })

  const active = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e?.isActive("heading", { level: 2 }) ?? false,
      h3: e?.isActive("heading", { level: 3 }) ?? false,
      bold: e?.isActive("bold") ?? false,
      italic: e?.isActive("italic") ?? false,
      bullet: e?.isActive("bulletList") ?? false,
      ordered: e?.isActive("orderedList") ?? false,
      quote: e?.isActive("blockquote") ?? false,
      link: e?.isActive("link") ?? false,
    }),
  })

  function setLink() {
    if (!editor) return
    const url = window.prompt(
      "Link address (leave empty to remove the link)",
      editor.getAttributes("link").href ?? "https://"
    )
    if (url === null) return
    const chain = editor.chain().focus().extendMarkRange("link")
    if (url.trim() === "" || url.trim() === "https://") chain.unsetLink().run()
    else chain.setLink({ href: url.trim() }).run()
  }

  async function uploadImage(file: File) {
    if (!editor) return
    setUploadError(null)
    setUploading(true)
    try {
      const body = new FormData()
      body.set("file", file)
      const res = await fetch("/admin/upload", { method: "POST", body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const alt =
        window.prompt(
          "Describe this image for search engines and screen readers"
        ) ?? ""
      editor.chain().focus().setImage({ src: data.url, alt }).run()
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const tools = [
    {
      label: "Heading",
      icon: Heading2,
      on: active?.h2,
      run: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Subheading",
      icon: Heading3,
      on: active?.h3,
      run: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Bold",
      icon: Bold,
      on: active?.bold,
      run: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: Italic,
      on: active?.italic,
      run: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      label: "Bullet list",
      icon: List,
      on: active?.bullet,
      run: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      on: active?.ordered,
      run: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Quote",
      icon: Quote,
      on: active?.quote,
      run: () => editor?.chain().focus().toggleBlockquote().run(),
    },
    { label: "Link", icon: Link2, on: active?.link, run: setLink },
    {
      label: "Undo",
      icon: Undo2,
      on: false,
      run: () => editor?.chain().focus().undo().run(),
    },
    {
      label: "Redo",
      icon: Redo2,
      on: false,
      run: () => editor?.chain().focus().redo().run(),
    },
  ]

  return (
    <>
      <form
        action={action}
        onSubmit={(e) => {
          // Submitting by hand stops React clearing the fields when saving fails.
          e.preventDefault()
          const data = new FormData(
            e.currentTarget,
            (e.nativeEvent as SubmitEvent).submitter
          )
          data.set("content", editor?.getHTML() ?? "")
          startTransition(() => action(data))
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-heading text-3xl font-bold text-ink">
            {post ? "Edit post" : "New post"}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            {post?.status === "published" && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="text-[15px] font-semibold text-ink underline underline-offset-4"
              >
                View live post
              </Link>
            )}
            <Button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending}
              variant="ink-outline"
              size="pill"
            >
              {post?.status === "published" ? "Unpublish" : "Save draft"}
            </Button>
            <Button
              type="submit"
              name="intent"
              value="publish"
              disabled={pending}
              variant="leap"
              size="pill"
            >
              {post?.status === "published" ? "Update post" : "Publish"}
            </Button>
          </div>
        </div>

        <div aria-live="polite">
          {state.error && (
            <p
              role="alert"
              className="text-[15px] font-semibold text-destructive"
            >
              {state.error}
            </p>
          )}
          {state.savedAt && !state.error && (
            <p className="text-[15px] font-semibold text-kicker">Saved.</p>
          )}
        </div>

        {post && <input type="hidden" name="id" value={post.id} />}

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            maxLength={200}
            defaultValue={post?.title}
            className={cn(fieldClass, "h-12")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="excerpt">Summary</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            maxLength={400}
            defaultValue={post?.excerpt}
            className={fieldClass}
          />
          <p className="text-sm text-caption">
            Shown on the blog page and used in search results.
          </p>
        </div>

        <div className="rounded-xl border border-input bg-white">
          <div
            role="toolbar"
            aria-label="Formatting"
            className="flex flex-wrap gap-1 border-b border-line p-2"
          >
            {tools.map((t) => (
              <button
                key={t.label}
                type="button"
                title={t.label}
                aria-label={t.label}
                aria-pressed={t.on}
                onClick={t.run}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-muted",
                  t.on && "bg-blue-tint"
                )}
              >
                <t.icon aria-hidden className="size-[18px]" />
              </button>
            ))}
            <button
              type="button"
              title={uploading ? "Uploading image" : "Add image"}
              aria-label={uploading ? "Uploading image" : "Add image"}
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-muted",
                uploading && "bg-blue-tint"
              )}
            >
              <ImagePlus aria-hidden className="size-[18px]" />
            </button>
            <input
              ref={fileRef}
              type="file"
              hidden
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadImage(file)
              }}
            />
          </div>
          <EditorContent editor={editor} />
        </div>
        {uploadError && (
          <p
            role="alert"
            className="text-[15px] font-semibold text-destructive"
          >
            {uploadError}
          </p>
        )}

        <fieldset className="flex flex-col gap-5 rounded-[18px] border border-line bg-white p-6">
          <legend className="px-2 text-sm font-bold text-caption">
            Search settings (optional)
          </legend>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Web address</Label>
            <Input
              id="slug"
              name="slug"
              maxLength={80}
              defaultValue={post?.slug}
              placeholder="Made from the title if left empty"
              className={cn(fieldClass, "h-12")}
            />
            <p className="text-sm text-caption">
              klarooo.com/blog/your-address. Changing it after publishing breaks
              links to the old address.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="seoTitle">Search title</Label>
            <Input
              id="seoTitle"
              name="seoTitle"
              maxLength={200}
              defaultValue={post?.seoTitle}
              placeholder="Uses the post title if left empty"
              className={cn(fieldClass, "h-12")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="seoDescription">Search description</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              rows={2}
              maxLength={400}
              defaultValue={post?.seoDescription}
              placeholder="Uses the summary if left empty"
              className={fieldClass}
            />
          </div>
        </fieldset>
      </form>
      {post && (
        <form
          action={removePost}
          onSubmit={(e) => {
            if (!window.confirm("Delete this post permanently?"))
              e.preventDefault()
          }}
          className="mt-6"
        >
          <input type="hidden" name="id" value={post.id} />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-destructive"
          >
            Delete post
          </Button>
        </form>
      )}
    </>
  )
}
