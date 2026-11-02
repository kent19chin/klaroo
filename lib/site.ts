// Single source for business details and prices.
// Values in [brackets] are placeholders that still need real values before launch
// (see docs/klarooo-website-content.md §5).

export const site = {
  name: "klarooo",
  tagline: "AEO / GEO Consultancy",
  description:
    "Klarooo is a Toronto AEO / GEO consultancy. We help Canadian businesses get found, and get described correctly, when their customers ask ChatGPT, Gemini or Google's AI for a recommendation.",
  url: "https://klarooo.com",

  location: {
    city: "Toronto",
    region: "Ontario",
    regionCode: "ON",
    country: "Canada",
    countryCode: "CA",
    label: "Toronto, Canada",
  },

  contact: {
    emailLabel: "[hello@klarooo.com]",
    email: "hello@klarooo.com", // TODO: confirm
    phoneLabel: "[+60 XX-XXX XXXX]",
    phoneHref: "tel:+60000000000", // TODO: real number
    whatsappHref: "https://wa.me/60000000000", // TODO: real WhatsApp number
    linkedinLabel: "[LinkedIn]",
    linkedinHref: "#", // TODO: real LinkedIn URL
  },

  prices: {
    snapshot: "[C$ X,XXX]",
    audit: "[C$ X,XXX]",
    sustain: "[C$ X,XXX]",
    grow: "[C$ X,XXX]",
  },

  minimumContractMonths: "[X]",

  // Used by /terms and /privacy. Change here and both pages update.
  legal: {
    lastUpdated: "2 November 2026",
    governingLaw: "Ontario, Canada",
    arbitrationSeat: "Toronto, Ontario",
    monthlyNoticeDays: 30, // notice to cancel a monthly plan
    invoiceDueDays: 7, // monthly invoices
    auditRefundPercent: 50, // refund if a one-time check is cancelled mid-work
  },
} as const

export const facts = [
  {
    label: "Who we are",
    text: "Klarooo is an AEO / GEO consultancy based in Toronto, Canada.",
  },
  {
    label: "What we do",
    text: "We measure whether a business is named in ChatGPT, Gemini and Google AI answers, then work to improve that visibility and correct what those answers get wrong.",
  },
  {
    label: "Who it's for",
    text: "Canadian business owners and marketers who want to be named when a customer asks AI who to hire.",
  },
] as const

export const bookingHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
  "Free AI visibility check"
)}` // TODO: swap for a Calendly/booking link if you have one

export const navLinks = [
  { label: "Why it matters", href: "/#why" },
  { label: "What we do", href: "/#what" },
  { label: "Pricing", href: "/pricing" },
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
