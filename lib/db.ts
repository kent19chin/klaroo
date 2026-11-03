import "server-only"

import { Pool, type QueryResultRow } from "pg"

// Reuse one pool across hot reloads and warm serverless invocations.
const globalForDb = globalThis as unknown as { klaroooPool?: Pool }

function pool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set")
  globalForDb.klaroooPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  })
  return globalForDb.klaroooPool
}

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
) {
  const { rows } = await pool().query<T>(text, params)
  return rows
}
