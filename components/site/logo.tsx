import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

// TODO: swap the typed wordmark for the wordmark artwork once it's exported
// (v2 brief: don't retype "klarooo" in the new font).
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/#top"
      aria-label="klarooo home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <Image
        src="/klarooo-logo-white.png"
        alt=""
        width={36}
        height={35}
        className="size-8 object-contain transition-transform duration-300 group-hover:-rotate-6"
        priority
      />
      <span className="text-[22px] font-extrabold tracking-[-0.03em] text-paper">
        klarooo
      </span>
    </Link>
  )
}
