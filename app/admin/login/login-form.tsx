"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestLink, type LoginState } from "@/app/admin/actions"

const initial: LoginState = { status: "idle" }

export function LoginForm() {
  const [state, action, pending] = useActionState(requestLink, initial)

  if (state.status === "sent") {
    return (
      <p role="status" className="text-base leading-relaxed text-slate">
        If that address is on the admin list, a sign-in link is on its way. It
        expires in 15 minutes.
      </p>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-12 rounded-xl bg-white px-4 text-base md:text-base"
        />
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-sm font-semibold text-destructive">
          We couldn&apos;t send the link. Please try again.
        </p>
      )}
      <Button type="submit" disabled={pending} variant="ink" size="pill">
        {pending ? "Sending..." : "Email me a sign-in link"}
      </Button>
    </form>
  )
}
