"use client"

import { startTransition, useActionState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitLead, type LeadState } from "@/app/actions/leads"

const inputClass =
  "h-12 rounded-xl border-line bg-white px-4 text-base md:text-base"

const initial: LeadState = { status: "idle" }

/** Free check score sign-up, with booking links for people who'd rather talk. */
export function FreeCheckForm({
  bookingHref,
  whatsappHref,
}: {
  bookingHref: string
  whatsappHref: string
}) {
  const [state, action, pending] = useActionState(submitLead, initial)

  const alternatives = (
    <p className="text-center text-[14.5px] text-caption">
      Prefer to talk?{" "}
      <Link
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-ink underline underline-offset-4"
      >
        Book a call
      </Link>{" "}
      or{" "}
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-ink underline underline-offset-4"
      >
        message us on WhatsApp
      </Link>
      .
    </p>
  )

  if (state.status === "ok") {
    return (
      <div
        role="status"
        className="flex w-full flex-col gap-4 rounded-[22px] bg-white p-7 sm:p-9"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-clarity">
          <Check aria-hidden strokeWidth={3} className="size-5 text-ink" />
        </span>
        <h3 className="font-heading text-2xl font-bold text-ink">
          Thanks, we&apos;ve got it
        </h3>
        <p className="text-base leading-relaxed text-slate">
          We&apos;ll check your firm and get back to you with your score.
        </p>
        {alternatives}
      </div>
    )
  }

  return (
    <form
      action={action}
      onSubmit={(e) => {
        // Submitting by hand stops React clearing the fields on an error.
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        startTransition(() => action(data))
      }}
      className="flex w-full flex-col gap-4 rounded-[22px] bg-white p-7 sm:p-9"
    >
      <h3 className="font-heading text-2xl font-bold text-ink">
        Get a free check score for your firm
      </h3>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-name">Your name</Label>
        <Input
          id="lead-name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-email">Work email</Label>
        <Input
          id="lead-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-website">Firm website</Label>
        <Input
          id="lead-website"
          name="website"
          required
          maxLength={300}
          autoComplete="url"
          placeholder="yourfirm.com"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-competitors">
          Your competitors{" "}
          <span className="font-normal text-caption">(optional)</span>
        </Label>
        <Input
          id="lead-competitors"
          name="competitors"
          maxLength={500}
          placeholder="Who do you lose work to?"
          className={inputClass}
        />
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          Company URL
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p
          role="alert"
          className="text-[14.5px] font-semibold text-destructive"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        variant="leap"
        size="pill-lg"
        className="mt-1 w-full whitespace-normal"
      >
        {pending ? "Sending..." : "Get my free score"}
        {!pending && <ArrowRight aria-hidden />}
      </Button>

      <p className="text-center text-[13.5px] leading-relaxed text-caption">
        We&apos;ll only use this to run your check and reply to you. See our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>
      {alternatives}
    </form>
  )
}
