import "server-only"

import { timingSafeEqual } from "node:crypto"

/** Shared secret for machine publishing (AEO CLI, CI). Not an admin session. */
export function publishTokenConfigured() {
  return Boolean(process.env.BLOG_PUBLISH_TOKEN)
}

export function hasPublishToken(request: Request) {
  const expected = process.env.BLOG_PUBLISH_TOKEN
  if (!expected) return false
  const header = request.headers.get("authorization") ?? ""
  const match = /^Bearer (.+)$/.exec(header)
  if (!match) return false
  const got = Buffer.from(match[1])
  const want = Buffer.from(expected)
  if (got.length !== want.length) return false
  return timingSafeEqual(got, want)
}
