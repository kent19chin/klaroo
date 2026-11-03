import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { Logo } from "@/components/site/logo"
import { getAdmin } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Sign in" }

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  if (await getAdmin()) redirect("/admin")
  const { expired } = await searchParams

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="flex w-full max-w-[420px] flex-col gap-6 rounded-[22px] border border-line bg-white p-8">
        <Logo />
        <h1 className="font-heading text-2xl font-bold text-ink">
          Sign in to admin
        </h1>
        {expired && (
          <p role="alert" className="text-sm font-semibold text-destructive">
            That link has expired or was already used. Ask for a new one below.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  )
}
