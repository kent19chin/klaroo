// Single source for business details, prices and legal settings.
// Values in [brackets] are placeholders that still need real values before launch
// (see docs/klarooo-website-content-v2.md §5).

export const site = {
  name: "klarooo",
  tagline: "AEO / GEO Consultancy",
  description:
    "klarooo helps businesses rank first on AI search. We fix how ChatGPT, Gemini, Claude and Google AI read your business, and show you the result every month.",
  url: "https://klarooo.com", // TODO: confirm production domain
  serving: "Serving clients in Canada and Malaysia.",

  contact: {
    emailLabel: "[hello@klarooo.com]",
    email: "hello@klarooo.com", // TODO: confirm
    phoneLabel: "[Phone / WhatsApp]",
    phoneHref: "https://wa.me/60000000000", // TODO: real WhatsApp number
    linkedinLabel: "[LinkedIn]",
    linkedinHref: "#", // TODO: real LinkedIn URL
  },

  // Monthly packages, billed in CAD.
  packages: {
    currency: "CAD",
    a: {
      name: "Google AI Focus",
      price: "CA$499", // TODO: confirm
      credits: "USD 25",
    },
    b: {
      name: "Omni-Model AI",
      price: "CA$999", // TODO: confirm
      credits: "USD 100",
    },
    personaPrice: "CA$[Price]",
  },

  minimumTermMonths: 3,

  // Used by /terms and /privacy. Change here and both pages update.
  legal: {
    lastUpdated: "15 October 2026",
    governingLaw: "Malaysia",
    arbitrationSeat: "Kuala Lumpur",
    invoiceDueDays: 7,
  },
} as const

export const navLinks = [
  { label: "Why AI Search", href: "/#why-ai" },
  { label: "Who We Are", href: "/#who-we-are" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Packages", href: "/#packages" },
  { label: "FAQ", href: "/#faq" },
] as const

export const auditMarkets = [
  "Canada",
  "Malaysia",
  "Singapore",
  "United States",
  "Other",
] as const
