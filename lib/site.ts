// Single source for business details and prices.
// Values in [brackets] are placeholders that still need real values before launch
// (see docs/klarooo-website-content.md §5).

export const site = {
  name: "klarooo",
  tagline: "AEO / GEO Consultancy",
  description:
    "Klarooo is a Toronto AEO / GEO consultancy. We help Canadian businesses get found, and get described correctly, when their customers ask ChatGPT, Gemini or Google's AI for a recommendation.",
  url: "https://klarooo.com",
  gtmId: "GTM-WMV9P96Z",

  location: {
    city: "Toronto",
    region: "Ontario",
    regionCode: "ON",
    country: "Canada",
    countryCode: "CA",
    label: "Toronto, Canada",
  },

  contact: {
    emailLabel: "Contact us",
    email: "kent@klarooo.com",
    phoneLabel: "[+60 XX-XXX XXXX]",
    phoneHref: "tel:+60000000000", // TODO: real number
    whatsappHref: "https://wa.me/60000000000", // TODO: real WhatsApp number
    linkedinLabel: "[LinkedIn]",
    linkedinHref: "#", // TODO: real LinkedIn URL
  },

  // Used by /terms and /privacy. Change here and both pages update.
  legal: {
    lastUpdated: "4 November 2026",
    governingLaw: "Ontario, Canada",
    arbitrationSeat: "Toronto, Ontario",
    monthlyNoticeDays: 30, // notice to cancel a monthly plan
    invoiceDueDays: 7, // monthly invoices
  },
} as const

export const facts = [
  {
    label: "Who we are",
    text: "Klarooo is an AEO / GEO consultancy based in Toronto, Canada.",
  },
  {
    label: "What we do",
    text: "We measure whether a business is named in ChatGPT, Gemini, Claude and Google AI answers, then work to improve that visibility and correct what those answers get wrong.",
  },
  {
    label: "Who it's for",
    text: "Canadian business owners and marketers who want to be named when a customer asks AI who to hire.",
  },
] as const

export type Engine = "claude" | "chatgpt" | "gemini" | "google"

export type PlanItem = { text: string; excluded?: boolean }

/** The two monthly plans. Pricing, home, footer and terms all read from here. */
export const plans = {
  focus: {
    name: "AI Engine Focus Plan",
    badge: "Essential",
    subhead: "Detailed report on AI share of voice",
    price: "$849",
    period: "/ month",
    engines: ["claude", "chatgpt", "gemini"],
    includes: [
      { text: "Competition Research" },
      { text: "Citation mapping in ChatGPT, Gemini & Claude" },
      { text: "25 Prompts, Repeated 3 Times Across 3 Engines" },
      { text: "Monthly performance report" },
      { text: "Recommendations" },
      { text: "Implementation and Fixing", excluded: true },
    ],
    cta: "Start with AI Engine Focus",
    fit: "Best if your own team will action the recommendations.",
  },
  comprehensive: {
    name: "Comprehensive AI Improvement",
    badge: "Recommended",
    subhead: "Optimisation across Google and leading AI models.",
    price: "$1599",
    period: "/ month",
    engines: ["claude", "chatgpt", "gemini", "google"],
    includes: [
      { text: "Google AI Overview tracking" },
      { text: "Citation mapping in ChatGPT, Gemini & Claude" },
      { text: "Correction of wrong or made-up facts" },
      { text: "Top 5 priority pages restructured" },
      { text: "Monthly performance report" },
      { text: "50 Prompts, Repeated 3 Times Across 3 Engines" },
    ],
    cta: "Start with Comprehensive",
    fit: "Best if you want us to make the fixes for you.",
  },
} as const satisfies Record<
  string,
  {
    name: string
    badge: string
    subhead: string
    price: string
    period: string
    engines: readonly Engine[]
    includes: readonly PlanItem[]
    cta: string
    fit: string
  }
>

export const bookingHref =
  "https://calendly.com/kentchin/klarooo-discovery-call"

export const navLinks = [
  { label: "Why it matters", href: "/#why" },
  { label: "What we do", href: "/#what" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Questions", href: "/#faq" },
] as const

/** Organization / ProfessionalService JSON-LD for every page. */
export function organizationJsonLd() {
  const sameAs =
    site.contact.linkedinHref.startsWith("http") &&
    !site.contact.linkedinHref.includes("wa.me/60000000000")
      ? [site.contact.linkedinHref]
      : undefined

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Klarooo",
    alternateName: ["klarooo", "Klarooo"],
    description: site.description,
    url: site.url,
    logo: `${site.url}/klarooo-logo.png`,
    image: `${site.url}/klarooo-logo.png`,
    email: site.contact.email,
    areaServed: [
      {
        "@type": "Country",
        name: site.location.country,
      },
      {
        "@type": "City",
        name: site.location.city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: site.location.region,
        },
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.regionCode,
      addressCountry: site.location.countryCode,
    },
    knowsAbout: [
      "Answer engine optimization",
      "Generative engine optimization",
      "AI search visibility",
      "ChatGPT",
      "Claude",
      "Google Gemini",
      "Google AI Overviews",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.contact.email,
      contactType: "sales",
      areaServed: site.location.countryCode,
      availableLanguage: ["English"],
    },
    ...(sameAs ? { sameAs } : {}),
  }
}
