import { auditMarkets } from "@/lib/site"

// Free-audit requests from the modal. Each valid request is forwarded as JSON
// to AUDIT_WEBHOOK_URL (e.g. a Zapier / Make / Google Apps Script webhook that
// emails you or appends to a sheet).

type AuditRequest = {
  company: string
  website: string
  email: string
  competitor: string
  market: string
  package: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function field(body: Record<string, unknown>, key: string, max = 200) {
  const v = body[key]
  return typeof v === "string" ? v.trim().slice(0, max) : ""
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 })
  }

  // Honeypot: real visitors never see or fill this field.
  if (field(body, "nickname")) return Response.json({ ok: true })

  const data: AuditRequest = {
    company: field(body, "company"),
    website: field(body, "website", 300),
    email: field(body, "email", 254),
    competitor: field(body, "competitor"),
    market: field(body, "market", 40),
    package: field(body, "package", 40),
  }

  const errors: string[] = []
  if (!data.company) errors.push("company")
  if (!data.website) errors.push("website")
  if (!EMAIL.test(data.email)) errors.push("email")
  if (!(auditMarkets as readonly string[]).includes(data.market))
    errors.push("market")
  if (errors.length) {
    return Response.json({ error: "invalid", fields: errors }, { status: 422 })
  }

  const webhook = process.env.AUDIT_WEBHOOK_URL
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[audit] AUDIT_WEBHOOK_URL not set; request:", data)
      return Response.json({ ok: true })
    }
    console.error("[audit] AUDIT_WEBHOOK_URL is not configured")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
    })
    if (!res.ok) throw new Error(`webhook responded ${res.status}`)
  } catch (err) {
    console.error("[audit] forwarding failed:", err)
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }

  return Response.json({ ok: true })
}
