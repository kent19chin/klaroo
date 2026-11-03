import "server-only"

import { query } from "@/lib/db"

export type Lead = {
  id: string
  name: string
  email: string
  website: string
  competitors: string | null
  created_at: Date
  updated_at: Date
}

/** Someone submitting again updates their row instead of adding a duplicate. */
export async function saveLead(lead: {
  name: string
  email: string
  website: string
  competitors: string | null
}) {
  await query(
    `INSERT INTO leads (name, email, website, competitors)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO UPDATE SET
       name = EXCLUDED.name,
       website = EXCLUDED.website,
       competitors = EXCLUDED.competitors,
       updated_at = now()`,
    [lead.name, lead.email, lead.website, lead.competitors]
  )
}

export function listLeads() {
  return query<Lead>("SELECT * FROM leads ORDER BY updated_at DESC")
}

export async function deleteLead(id: string) {
  await query("DELETE FROM leads WHERE id = $1", [id])
}
