import type { Metadata } from "next"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { removeLead } from "@/app/admin/actions"
import { requireAdmin } from "@/lib/auth"
import { listLeads } from "@/lib/leads"

export const metadata: Metadata = { title: "Emails" }

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
  timeZone: "America/Toronto",
})

export default async function LeadsPage() {
  await requireAdmin()
  const leads = await listLeads()

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold text-ink">
          Emails ({leads.length})
        </h1>
        {leads.length > 0 && (
          // A plain link: this is a file download, not a page.
          <a
            href="/admin/leads/export"
            className={buttonVariants({ variant: "ink", size: "pill" })}
          >
            Download CSV
          </a>
        )}
      </div>

      {leads.length === 0 ? (
        <p className="mt-6 text-base text-slate">
          No one has filled in the free check form yet.
        </p>
      ) : (
        <div className="mt-6 rounded-[18px] border border-line bg-white p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Competitors</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${lead.email}`} className="underline">
                      {lead.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline"
                    >
                      {lead.website.replace(/^https?:\/\/(www\.)?|\/$/g, "")}
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[260px] whitespace-normal">
                    {lead.competitors ?? "—"}
                  </TableCell>
                  <TableCell>{dateFormat.format(lead.updated_at)}</TableCell>
                  <TableCell>
                    <form action={removeLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
