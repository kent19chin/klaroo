import Script from "next/script"

import { site } from "@/lib/site"

/** Google Tag Manager. Tags (including GA) are configured in the GTM container. */
export function Analytics() {
  const id = site.gtmId
  return (
    <>
      <Script id="gtm-datalayer" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
      </Script>
      <Script
        id="gtm"
        src={`https://www.googletagmanager.com/gtm.js?id=${id}`}
        strategy="afterInteractive"
      />
    </>
  )
}

export function AnalyticsNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}