import "server-only"

import { createHash, randomBytes } from "node:crypto"
import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { query } from "@/lib/db"
import { sendLoginEmail } from "@/lib/email"
import { site } from "@/lib/site"

// The only addresses that can receive a sign-in link or hold a session.
const ADMIN_EMAILS = ["ryan@klarooo.com", "kent@klarooo.com"]

const COOKIE = "klarooo_admin"
const SESSION_DAYS = 14
const LOGIN_MINUTES = 15
const MAX_LINKS_PER_WINDOW = 5

const hash = (token: string) => createHash("sha256").update(token).digest("hex")

function isAdminEmail(email: string) {
  return ADMIN_EMAILS.includes(email)
}

/** Emails a one-time link, but only to allowed addresses and within the rate limit. */
export async function requestLoginLink(rawEmail: string) {
  const email = rawEmail.trim().toLowerCase()
  if (!isAdminEmail(email)) return

  await query(
    "DELETE FROM admin_login_tokens WHERE expires_at < now() - interval '1 day'"
  )
  const [{ count }] = await query<{ count: string }>(
    `SELECT count(*) FROM admin_login_tokens
     WHERE email = $1 AND created_at > now() - make_interval(mins => $2)`,
    [email, LOGIN_MINUTES]
  )
  if (Number(count) >= MAX_LINKS_PER_WINDOW) return

  const token = randomBytes(32).toString("base64url")
  await query(
    `INSERT INTO admin_login_tokens (token_hash, email, expires_at)
     VALUES ($1, $2, now() + make_interval(mins => $3))`,
    [hash(token), email, LOGIN_MINUTES]
  )

  const base = process.env.APP_URL ?? site.url
  await sendLoginEmail(
    email,
    `${base}/admin/login/confirm?token=${encodeURIComponent(token)}`
  )
}

/** Uses up a login token and starts a session. Returns false if the link is no good. */
export async function signInWithToken(token: string) {
  const [row] = await query<{ email: string }>(
    `UPDATE admin_login_tokens SET used_at = now()
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()
     RETURNING email`,
    [hash(token)]
  )
  if (!row || !isAdminEmail(row.email)) return false

  await query("DELETE FROM admin_sessions WHERE expires_at < now()")
  const session = randomBytes(32).toString("base64url")
  await query(
    `INSERT INTO admin_sessions (token_hash, email, expires_at)
     VALUES ($1, $2, now() + make_interval(days => $3))`,
    [hash(session), row.email, SESSION_DAYS]
  )
  ;(await cookies()).set(COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
  return true
}

export async function signOut() {
  const store = await cookies()
  const session = store.get(COOKIE)?.value
  if (session) {
    await query("DELETE FROM admin_sessions WHERE token_hash = $1", [
      hash(session),
    ])
  }
  store.delete({ name: COOKIE, path: "/admin" })
}

export const getAdmin = cache(async () => {
  const session = (await cookies()).get(COOKIE)?.value
  if (!session) return null
  const [row] = await query<{ email: string }>(
    "SELECT email FROM admin_sessions WHERE token_hash = $1 AND expires_at > now()",
    [hash(session)]
  )
  // Re-checks the list, so removing someone locks them out on the next deploy.
  return row && isAdminEmail(row.email) ? row.email : null
})

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  const email = await getAdmin()
  if (!email) redirect("/admin/login")
  return email
}
