import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage, type LegalSection } from "@/components/site/legal-page"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How klarooo collects, uses and protects personal data for clients and visitors in Malaysia, Singapore, Canada and the United States.",
}

const email = site.contact.email
const mail = <a href={`mailto:${email}`}>{email}</a>

const summary = [
  "We collect only what we need to talk to you, do the work and get paid.",
  "We never sell your personal data or use it for targeted advertising.",
  "Marketing emails only go to people who've agreed, and every one has an unsubscribe link.",
  "You can ask to see, correct or delete your data at any time, free of charge.",
  "Our checks involve asking AI tools about your business, not about private individuals.",
  "We follow the privacy laws of Malaysia, Singapore, Canada and the US.",
]

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          {site.name} (<strong>&ldquo;we&rdquo;</strong>,{" "}
          <strong>&ldquo;us&rdquo;</strong>) is an AEO / GEO consultancy based
          in Malaysia. We help businesses get found, and described correctly,
          when their customers ask AI tools for recommendations.
        </p>
        <p>
          We are responsible for the personal data described in this policy. Our{" "}
          <strong>Privacy Officer</strong> is the person in charge of protecting
          it and handling your requests. You can reach them at {mail}.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Who this policy covers",
    content: (
      <>
        <p>This policy applies to personal data about:</p>
        <ul>
          <li>people who visit our website;</li>
          <li>people who contact us, book a call or ask for a free check;</li>
          <li>our clients and the people we work with at client businesses;</li>
          <li>people who subscribe to our emails; and</li>
          <li>suppliers and partners we work with.</li>
        </ul>
        <p>
          Our services are for businesses. Most of what we handle is business
          information, such as your company name, website and listings. This
          policy covers the smaller amount of personal information that comes
          with it, like names, work emails and phone numbers.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    content: (
      <>
        <h3>What you give us</h3>
        <ul>
          <li>
            <strong>Contact details</strong>: your name, job title, business
            name, work email, phone or WhatsApp number.
          </li>
          <li>
            <strong>Conversations</strong>: what you tell us by email, WhatsApp,
            phone or on calls, and details you enter when booking a call.
          </li>
          <li>
            <strong>Business information</strong>: your website, services,
            prices, locations, competitors and the questions your customers ask.
          </li>
          <li>
            <strong>Account access</strong>: login details or access you give us
            to websites, listings or tools we&apos;ve agreed to work on.
          </li>
          <li>
            <strong>Billing details</strong>: billing name, address and tax
            details. Card payments are handled by our payment provider; we
            don&apos;t see or store full card numbers.
          </li>
        </ul>

        <h3>What we collect automatically</h3>
        <p>
          When you visit our website, our analytics tool collects information
          such as the pages you view, how you arrived, your browser and device
          type, and your approximate location (country or city, based on your IP
          address). See <a href="#cookies">Cookies and analytics</a>.
        </p>

        <h3>What we get from other sources</h3>
        <p>
          To do our work, we look at public information about your business, for
          example directory and review listings, industry lists, your website
          and what AI tools say about you. This can include names of staff or
          reviewers that appear in those public listings. We only use it to
          assess and improve how your business is described.
        </p>
        <p>
          We don&apos;t ask for, and please don&apos;t send us, sensitive
          personal data such as health, financial account, religious or
          government ID information.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it",
    content: (
      <>
        <p>We use personal data to:</p>
        <ul>
          <li>reply to your enquiries and arrange calls;</li>
          <li>
            prepare proposals and deliver the services you&apos;ve asked for;
          </li>
          <li>send invoices, take payments and keep business records;</li>
          <li>
            send you updates and insights by email, if you&apos;ve agreed to
            receive them;
          </li>
          <li>understand how our website is used, so we can improve it;</li>
          <li>keep our systems and your accounts secure; and</li>
          <li>meet our legal, tax and accounting obligations.</li>
        </ul>
        <p>
          We rely on your consent, on the need to carry out an agreement with
          you or your business, on our legitimate business interests (for
          example improving our website), or on legal obligations, depending on
          the purpose and the law that applies to you. Where we rely on consent,
          you can withdraw it at any time.
        </p>
        <p>
          We don&apos;t make decisions about you based solely on automated
          processing that have legal or similarly significant effects on you.
        </p>
      </>
    ),
  },
  {
    id: "ai-tools",
    title: "How AI tools are used in our work",
    content: (
      <>
        <p>
          Our service involves asking AI assistants (such as ChatGPT, Gemini and
          Google&apos;s AI answers) the kinds of questions your customers ask.
          These questions are about <strong>businesses</strong>, such as your
          company and your competitors. They are not about private individuals.
        </p>
        <p>
          We don&apos;t enter your personal contact details, login details or
          confidential business information into public AI tools. Where we use
          AI tools to help analyse results or draft content, we use settings
          that stop our inputs from being used to train those tools wherever
          that option is available.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    content: (
      <>
        <p>
          Our website uses a small number of cookies and similar technologies:
        </p>
        <ul>
          <li>
            <strong>Essential</strong>: needed for the site to work and stay
            secure.
          </li>
          <li>
            <strong>Analytics</strong>: tell us which pages are visited and how
            people find us, in combined form. We don&apos;t use them to build
            advertising profiles.
          </li>
        </ul>
        <p>
          Where the law requires your consent for analytics cookies, we&apos;ll
          ask before setting them. You can block or delete cookies in your
          browser settings; the site will still work. We also honour{" "}
          <strong>Global Privacy Control</strong> signals sent by your browser.
        </p>
        <p>
          If you book a call through our booking tool, that tool may set its own
          cookies, covered by its own privacy policy.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing emails",
    content: (
      <>
        <p>
          We only send marketing emails, such as newsletters and insights, to
          people who have clearly agreed to receive them, or where the law
          otherwise allows it.
        </p>
        <ul>
          <li>
            Every marketing email identifies us and includes our contact
            details.
          </li>
          <li>
            Every marketing email has an unsubscribe link. We act on unsubscribe
            requests promptly, and within 10 business days at most.
          </li>
          <li>
            We don&apos;t send marketing messages to phone numbers without your
            consent.
          </li>
        </ul>
        <p>
          Unsubscribing from marketing doesn&apos;t stop emails we need to send
          about work you&apos;ve bought from us, such as reports and invoices.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>
          <strong>We never sell your personal data</strong>, and we don&apos;t
          share it for cross-context behavioural (targeted) advertising.
        </p>
        <p>We share personal data only with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> who help us run our business,
            such as website hosting, website analytics, call booking, email and
            newsletter services, file storage, payments and accounting. They may
            only use it to provide their service to us.
          </li>
          <li>
            <strong>Contractors</strong> who help deliver client work, under
            confidentiality obligations.
          </li>
          <li>
            <strong>Professional advisers</strong> such as lawyers and
            accountants.
          </li>
          <li>
            <strong>Authorities</strong>, when the law requires it or to protect
            our rights, your safety or others&apos; safety.
          </li>
          <li>
            <strong>A buyer or successor</strong>, if our business is sold or
            restructured, who must keep protecting your data in line with this
            policy.
          </li>
        </ul>
        <p>
          A list of the specific service providers we use is available on
          request.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    content: (
      <>
        <p>
          We&apos;re based in Malaysia, and some of our service providers store
          data in other countries, including Singapore, the United States and
          countries in the European Union. That means your data may be processed
          outside the country where you live.
        </p>
        <p>
          When we transfer personal data abroad, we take reasonable steps to
          make sure it keeps a level of protection comparable to the one it has
          in your country, for example by choosing reputable providers and using
          contracts that require them to protect it. Data held abroad may be
          accessible to authorities there under local law.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <>
        <p>We keep personal data only for as long as we need it:</p>
        <ul>
          <li>
            <strong>Enquiries that don&apos;t become work</strong>: up to 2
            years after our last contact.
          </li>
          <li>
            <strong>Client records, contracts and invoices</strong>: 7 years
            after the engagement ends, to meet tax and accounting rules.
          </li>
          <li>
            <strong>Account access you give us</strong>: removed when the
            engagement ends.
          </li>
          <li>
            <strong>Email subscribers</strong>: until you unsubscribe, after
            which we keep only what&apos;s needed to make sure we don&apos;t
            email you again.
          </li>
          <li>
            <strong>Website analytics</strong>: up to 26 months.
          </li>
        </ul>
        <p>
          After that, we delete it or make it anonymous so it no longer
          identifies you.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Keeping it safe",
    content: (
      <>
        <p>
          We protect personal data with sensible safeguards, including access
          limited to people who need it, strong passwords and two-factor
          authentication, encrypted connections, and reputable providers with
          their own security measures.
        </p>
        <p>
          No system is perfectly secure. If a data breach is likely to harm you,
          we&apos;ll tell you and the relevant authorities as required by law.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>
          Depending on where you live, you have some or all of these rights. We
          extend them to everyone where we reasonably can:
        </p>
        <ul>
          <li>to know what personal data we hold about you and get a copy;</li>
          <li>to correct data that&apos;s wrong or out of date;</li>
          <li>to ask us to delete it;</li>
          <li>
            to receive it in a portable format, or have it sent to another
            organisation;
          </li>
          <li>to withdraw consent you&apos;ve given;</li>
          <li>to opt out of marketing at any time; and</li>
          <li>to complain to a data protection authority.</li>
        </ul>
        <p>
          To make a request, email {mail}. We may need to confirm your identity
          first. We don&apos;t charge for requests, and we&apos;ll reply within
          21 days for Malaysian requests and within 30 days otherwise. If we
          need longer, we&apos;ll tell you why. If we can&apos;t do what you
          ask, for example because the law requires us to keep certain records,
          we&apos;ll explain the reason.
        </p>
        <p>
          Withdrawing consent or asking us to delete data may mean we can no
          longer provide some services. We&apos;ll tell you if that&apos;s the
          case.
        </p>
      </>
    ),
  },
  {
    id: "where-you-are",
    title: "Where you are",
    content: (
      <>
        <p>
          We serve clients mainly in Malaysia, Singapore, Canada and the United
          States, and we follow the privacy laws that apply to you in each of
          them. The rights and commitments in this policy apply to everyone,
          wherever you are, and we won&apos;t treat you differently for using
          them.
        </p>
        <p>
          If you&apos;re not happy with how we&apos;ve handled your personal
          data, please talk to us first. You also have the right to complain to
          the data protection authority where you live.
        </p>
        <p>A Bahasa Malaysia version of this policy is available on request.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Our website and services are for businesses and aren&apos;t directed at
        anyone under 18. We don&apos;t knowingly collect personal data from
        children. If you think we have, contact us and we&apos;ll delete it.
      </p>
    ),
  },
  {
    id: "other-sites",
    title: "Other websites",
    content: (
      <p>
        Our website links to other sites and tools, such as our booking tool,
        WhatsApp and LinkedIn. Their own privacy policies apply when you use
        them.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy as our services or the law change. The date at
        the top shows when it was last updated. If we make significant changes,
        we&apos;ll tell clients and subscribers by email before they take
        effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>
          For any privacy question or request, email our Privacy Officer at{" "}
          {mail}.
        </p>
        <p>
          You can also read our <Link href="/terms">Terms and Conditions</Link>.
        </p>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          What personal data we collect, why, and the choices you have, wherever
          you are.
        </p>
      }
      summary={summary}
      sections={sections}
    />
  )
}
