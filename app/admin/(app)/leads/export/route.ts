import { getAdmin } from "@/lib/auth"
import { listLeads } from "@/lib/leads"

// A leading = + - @ would run as a formula when the file opens in a spreadsheet.
function cell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replace(/"/g, '""')}"`
}

export async function GET() {
  if (!(await getAdmin())) return new Response("Not found", { status: 404 })

  const leads = await listLeads()
  const rows = [
    ["Name", "Email", "Website", "Competitors", "Date"],
    ...leads.map((l) => [
      l.name,
      l.email,
      l.website,
      l.competitors ?? "",
      l.updated_at.toISOString(),
    ]),
  ]
  return new Response(rows.map((r) => r.map(cell).join(",")).join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="klarooo-emails.csv"',
      "Cache-Control": "no-store",
    },
  })
}
