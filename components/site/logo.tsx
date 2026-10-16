import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function Logo({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "white"
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label="klarooo home"
      className={cn("flex items-center gap-3", className)}
    >
      <Image
        src={tone === "white" ? "/klarooo-logo-white.png" : "/klarooo-logo.png"}
        alt=""
        width={38}
        height={37}
        className="size-9 object-contain"
        priority={tone === "ink"}
      />
      <span
        className={cn(
          "font-heading text-[26px] font-bold tracking-[-0.5px]",
          tone === "white" ? "text-white" : "text-ink"
        )}
      >
        klarooo
      </span>
    </Link>
  )
}
