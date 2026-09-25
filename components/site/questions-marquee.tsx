import { MessageCircle } from "lucide-react"

import { Marquee } from "@/components/ui/marquee"
import { Reveal } from "@/components/site/motion"

// Examples of the questions people type into AI assistants before they buy.
const rowOne = [
  "Best dental clinic in Petaling Jaya?",
  "Which accounting firm is good for SMEs in KL?",
  "Reliable aircon servicing near Subang Jaya?",
  "Top interior designers in Johor Bahru?",
  "Who does corporate catering in Penang?",
  "Best physiotherapy clinic in Bangsar?",
]

const rowTwo = [
  "Which law firm handles property deals in Cyberjaya?",
  "Good wedding photographers in Melaka?",
  "Most trusted car workshop in Shah Alam?",
  "Recommend a digital agency in Kuala Lumpur",
  "Affordable preschool near Cheras?",
  "Best roofing contractor in Klang Valley?",
]

function Bubble({ text, tone }: { text: string; tone: "light" | "blue" }) {
  return (
    <span
      className={
        tone === "light"
          ? "flex items-center gap-2.5 rounded-full border border-line-dark bg-ink-card px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-white"
          : "flex items-center gap-2.5 rounded-full bg-clarity px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-ink"
      }
    >
      <MessageCircle
        aria-hidden
        className="size-4 shrink-0 opacity-70"
        strokeWidth={2.4}
      />
      {text}
    </span>
  )
}

/** Dark band of drifting example AI questions. */
export function QuestionsMarquee() {
  return (
    <section
      aria-label="Questions customers ask AI"
      className="overflow-hidden bg-ink py-14 lg:py-16"
    >
      <Reveal className="mx-auto mb-8 max-w-[1440px] px-5 md:px-10 lg:px-20">
        <p className="text-[13px] font-extrabold tracking-[1.4px] text-leap uppercase">
          Right now, somewhere
        </p>
        <p className="mt-2 max-w-3xl font-heading text-2xl leading-tight font-bold text-white md:text-[32px]">
          Your next customer is asking AI a question like one of these.
        </p>
      </Reveal>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover className="[--duration:55s] [--gap:0.875rem]">
          {rowOne.map((q) => (
            <Bubble key={q} text={q} tone="light" />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:60s] [--gap:0.875rem]"
        >
          {rowTwo.map((q, i) => (
            <Bubble key={q} text={q} tone={i % 3 === 1 ? "blue" : "light"} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
