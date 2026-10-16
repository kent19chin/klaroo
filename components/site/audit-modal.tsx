"use client"

import { createContext, useContext, useId, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { auditMarkets, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export type PackageChoice = "A" | "B"

type AuditModalContext = { open: (pkg?: PackageChoice) => void }

const Ctx = createContext<AuditModalContext>({ open: () => {} })

export const useAuditModal = () => useContext(Ctx)

type Status = "idle" | "sending" | "done" | "error"

const fieldClass =
  "h-12 rounded-xl border-line-strong bg-night/60 px-4 text-[15px] text-paper placeholder:text-fog/70 md:text-[15px] dark:bg-night/60"

/** Provides `useAuditModal().open()` to the whole app and renders the modal. */
export function AuditModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [pkg, setPkg] = useState<PackageChoice | undefined>()
  const [status, setStatus] = useState<Status>("idle")
  const id = useId()

  function open(choice?: PackageChoice) {
    setPkg(choice)
    if (status !== "sending") setStatus("idle")
    setIsOpen(true)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus("sending")
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(form),
          package: pkg ? `Package ${pkg}` : "Free audit",
        }),
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-[20px] border border-line-strong bg-ink p-6 ring-0 sm:max-w-[480px] sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-clarity/20 blur-3xl"
          />
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center py-6 text-center"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 16,
                    delay: 0.1,
                  }}
                  className="flex size-16 items-center justify-center rounded-full bg-clarity/15"
                >
                  <CheckCircle2 aria-hidden className="size-9 text-clarity" />
                </motion.span>
                <DialogTitle className="mt-5 text-2xl font-extrabold text-paper">
                  Thanks, we&apos;ve got it.
                </DialogTitle>
                <DialogDescription className="mt-2 text-base text-mist">
                  We&apos;ll be in touch within 24 hours.
                </DialogDescription>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <span className="inline-flex rounded-full border border-clarity/30 bg-clarity/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.15em] text-blue-tint uppercase">
                  {pkg ? `Selected: Package ${pkg}` : "Free 15-min audit"}
                </span>
                <DialogTitle className="mt-4 text-2xl leading-tight font-extrabold text-paper">
                  Get your AI visibility report
                </DialogTitle>
                <DialogDescription className="mt-2 text-[15px] leading-relaxed text-mist">
                  Tell us about your business. We&apos;ll run your key questions
                  through AI and send you the results.
                </DialogDescription>

                <div className="mt-6 flex flex-col gap-4">
                  <Field id={`${id}-company`} label="Company / brand name">
                    <Input
                      id={`${id}-company`}
                      name="company"
                      required
                      autoComplete="organization"
                      className={fieldClass}
                    />
                  </Field>
                  <Field id={`${id}-website`} label="Website URL">
                    <Input
                      id={`${id}-website`}
                      name="website"
                      required
                      inputMode="url"
                      autoComplete="url"
                      placeholder="yourcompany.com"
                      className={fieldClass}
                    />
                  </Field>
                  <Field id={`${id}-email`} label="Business email">
                    <Input
                      id={`${id}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    id={`${id}-competitor`}
                    label="Main competitor"
                    optional
                  >
                    <Input
                      id={`${id}-competitor`}
                      name="competitor"
                      className={fieldClass}
                    />
                  </Field>
                  <Field id={`${id}-market`} label="Country / market">
                    <NativeSelect
                      id={`${id}-market`}
                      name="market"
                      required
                      defaultValue=""
                      className="w-full [&_select]:h-12 [&_select]:rounded-xl [&_select]:border-line-strong [&_select]:bg-night/60 [&_select]:pl-4 [&_select]:text-[15px] [&_select]:text-paper"
                    >
                      <NativeSelectOption value="" disabled>
                        Select a market
                      </NativeSelectOption>
                      {auditMarkets.map((m) => (
                        <NativeSelectOption key={m} value={m}>
                          {m}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </Field>
                  {/* Honeypot for bots */}
                  <input
                    type="text"
                    name="nickname"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="hidden"
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-paper"
                  >
                    Something went wrong sending your request. Please try again,
                    or email us at{" "}
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-semibold underline"
                    >
                      {site.contact.email}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cn(
                    buttonVariants({ variant: "leap", size: "cta-lg" }),
                    "mt-6 w-full rounded-xl"
                  )}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 aria-hidden className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Request My Audit
                      <ArrowRight
                        aria-hidden
                        className="transition-transform group-hover/button:translate-x-1"
                      />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center font-mono text-[11px] tracking-[0.1em] text-fog uppercase">
                  No obligation · Confidential
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  )
}

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold text-paper">
        {label}
        {optional && <span className="font-normal text-fog">(optional)</span>}
      </Label>
      {children}
    </div>
  )
}

/** Any button that opens the free-audit modal. */
export function AuditButton({
  pkg,
  className,
  children,
}: {
  pkg?: PackageChoice
  className?: string
  children: React.ReactNode
}) {
  const { open } = useAuditModal()
  return (
    <button type="button" onClick={() => open(pkg)} className={className}>
      {children}
    </button>
  )
}
