import "server-only"

/** Sends the admin sign-in link through Resend. Dev logs the link instead. */
export async function sendLoginEmail(to: string, link: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not set")
    }
    console.log(`[admin] Sign-in link for ${to}: ${link}`)
    return
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Your klarooo admin sign-in link",
      text: `Use this link to sign in to the klarooo admin area. It works once and expires in 15 minutes.\n\n${link}\n\nIf you didn't ask for it, you can ignore this email.`,
    }),
  })
  if (!res.ok) throw new Error(`Resend returned ${res.status}`)
}
