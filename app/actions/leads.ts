"use server"

import { saveLead } from "@/lib/leads"
import { site } from "@/lib/site"

export type LeadState = { status: "idle" | "ok" | "error"; message?: string }

const text = (form: FormData, name: string, max: number) =>
  String(form.get(name) ?? "")
    .trim()
    .slice(0, max)

function normaliseWebsite(input: string) {
  try {
    const url = new URL(
      /^https?:\/\//i.test(input) ? input : `https://${input}`
    )
    return url.hostname.includes(".") ? url.toString() : null
  } catch {
    return null
  }
}

export async function submitLead(
  _prev: LeadState,
  form: FormData
): Promise<LeadState> {
  // Honeypot: people never see this field, bots fill it in.
  if (form.get("company_url")) return { status: "ok" }

  const name = text(form, "name", 120)
  const email = text(form, "email", 254).toLowerCase()
  const website = normaliseWebsite(text(form, "website", 300))
  const competitors = text(form, "competitors", 500)

  if (!name) return { status: "error", message: "Please add your name." }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please check your email address." }
  }
  if (!website) {
    return { status: "error", message: "Please check your website address." }
  }

  try {
    await saveLead({ name, email, website, competitors: competitors || null })
    return { status: "ok" }
  } catch (error) {
    console.error("Could not save lead", error)
    return {
      status: "error",
      message: `Something went wrong on our side. Please email us at ${site.contact.email}.`,
    }
  }
}
