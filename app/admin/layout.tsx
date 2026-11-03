import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — klarooo admin" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-paper">{children}</div>
  )
}
