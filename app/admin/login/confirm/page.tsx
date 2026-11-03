import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { confirmLogin } from "@/app/admin/actions"

export const metadata: Metadata = { title: "Confirm sign-in" }

// Signing in takes a button press, so email scanners that open links
// can't use up the one-time token.
export default async function ConfirmPage({
  searchParams,
}: PageProps<"/admin/login/confirm">) {
  const { token } = await searchParams
  if (typeof token !== "string") redirect("/admin/login")

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <form
        action={confirmLogin}
        className="flex w-full max-w-[420px] flex-col gap-6 rounded-[22px] border border-line bg-white p-8"
      >
        <Logo />
        <h1 className="font-heading text-2xl font-bold text-ink">
          Finish signing in
        </h1>
        <input type="hidden" name="token" value={token} />
        <Button type="submit" variant="ink" size="pill">
          Sign in
        </Button>
      </form>
    </main>
  )
}
