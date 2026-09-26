// Single source for business details and prices.
// Values in [brackets] are placeholders that still need real values before launch
// (see docs/klarooo-website-content.md §5).

export const site = {
  name: "klarooo",
  tagline: "AEO / GEO Consultancy",
  description:
    "We help businesses get found, and get described correctly, when their customers ask AI for a recommendation.",
  url: "https://klarooo.com", // TODO: confirm production domain

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
    snapshot: "[RM X,XXX]",
    audit: "[RM X,XXX]",
    sustain: "[RM X,XXX]",
    grow: "[RM X,XXX]",
  },

  minimumContractMonths: "[X]",

  // Used by /terms and /privacy. Change here and both pages update.
  legal: {
    lastUpdated: "25 September 2026",
    governingLaw: "Malaysia",
    arbitrationSeat: "Kuala Lumpur",
    monthlyNoticeDays: 30, // notice to cancel a monthly plan
    invoiceDueDays: 7, // monthly invoices
    auditRefundPercent: 50, // refund if a one-time check is cancelled mid-work
  },
} as const

export const bookingHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
  "Free AI visibility check"
)}` // TODO: swap for a Calendly/booking link if you have one

export const navLinks = [
  { label: "Why it matters", href: "/#why" },
  { label: "What we do", href: "/#what" },
  { label: "Pricing", href: "/pricing" },
  { label: "Questions", href: "/#faq" },
] as const
