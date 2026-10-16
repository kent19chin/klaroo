import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage, type LegalSection } from "@/components/site/legal-page"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the klarooo website, request a free AI audit or subscribe to a monthly AI search package.",
}

const { legal } = site
const email = site.contact.email

const summary = [
  "Our services are for businesses, not personal or household use.",
  "Nobody can guarantee a #1 spot in an AI answer. We guarantee the work.",
  `Packages are monthly, billed in CAD, with a ${site.minimumTermMonths}-month minimum.`,
  "After the minimum, you can switch packages or stop at any time.",
  "Once you've paid, the pages and content we make for you are yours.",
  `These terms are governed by the laws of ${legal.governingLaw}.`,
]

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    content: (
      <>
        <p>
          These terms are an agreement between you and {site.name} (
          <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>,{" "}
          <strong>&ldquo;our&rdquo;</strong>). They cover two things: your use
          of this website, and any services you buy from us.
        </p>
        <p>
          If you buy a service on behalf of a business, you confirm you&apos;re
          allowed to accept these terms for that business, and{" "}
          <strong>&ldquo;you&rdquo;</strong> means the business.
        </p>
        <p>
          If we send you a written proposal, quote or statement of work and it
          says something different from these terms, the proposal wins for that
          engagement. Otherwise these terms apply.
        </p>
        <p>
          You accept these terms when you use the website, confirm a proposal
          (including by email), or pay an invoice, whichever comes first.
        </p>
      </>
    ),
  },
  {
    id: "business-use",
    title: "Business customers only",
    content: (
      <>
        <p>
          Our services are designed for businesses and are sold for business
          purposes. They aren&apos;t intended for personal, family or household
          use.
        </p>
        <p>
          Some countries give customers rights that can&apos;t be removed by a
          contract. Nothing in these terms takes away any right you have under
          law that can&apos;t legally be excluded, in Malaysia, Singapore,
          Canada, the United States or anywhere else.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "What we provide",
    content: (
      <>
        <p>
          We offer the following services, described in more detail in the{" "}
          <Link href="/#packages">Packages</Link> section of our website and in
          any proposal we send you:
        </p>
        <ul>
          <li>
            <strong>Free AI audit</strong>: a no-obligation review of how AI
            assistants answer a few of your key industry questions. It&apos;s
            free, and requesting one doesn&apos;t commit you to anything.
          </li>
          <li>
            <strong>Package A: {site.packages.a.name}</strong> and{" "}
            <strong>Package B: {site.packages.b.name}</strong>: monthly AI
            search packages where we track your buyer questions, carry out the
            optimisation work included in your package, and report the results
            each month.
          </li>
          <li>
            <strong>Add-ons</strong>, such as Persona Predictions, which you can
            add to either package.
          </li>
        </ul>
        <p>
          We&apos;ll carry out the services with reasonable skill and care, in
          line with good industry practice. Timelines we give you are our best
          estimate. They depend on you giving us what we need on time (see{" "}
          <a href="#your-part">Your part</a>).
        </p>
        <p>
          We may use trusted contractors to help deliver the work. We remain
          responsible for their work as if it were our own.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantee",
    title: "What we can't promise",
    content: (
      <>
        <p>
          AI assistants such as ChatGPT, Gemini and Google&apos;s AI answers are
          run by other companies. They decide what their tools say, and they
          change how those tools work without notice. We don&apos;t control
          them, and neither does anyone else selling this kind of service.
        </p>
        <p>
          So we <strong>don&apos;t guarantee</strong> that your business will be
          mentioned, ranked in a particular position, or described in a
          particular way by any AI tool or search engine. We also don&apos;t
          guarantee any specific level of enquiries, traffic or sales.
        </p>
        <p>
          What we do commit to is showing you exactly where you stand, doing the
          work we&apos;ve agreed to do, and reporting the results honestly so
          you can judge for yourself whether it&apos;s working.
        </p>
        <p>
          Our reports describe what AI tools said at the time we checked. Those
          answers can change from one day, or one question, to the next.
        </p>
      </>
    ),
  },
  {
    id: "your-part",
    title: "Your part",
    content: (
      <>
        <p>To do the work well, we need you to:</p>
        <ul>
          <li>
            give us accurate, up-to-date information about your business, and
            tell us when something changes;
          </li>
          <li>
            give us timely access to the websites, listings and accounts we
            agree to work on, and reply to our questions and approval requests
            within a reasonable time;
          </li>
          <li>
            make sure you have the right to let us use any content, logos,
            images or accounts you give us;
          </li>
          <li>
            keep your own backups of your website and content before we make
            changes; and
          </li>
          <li>
            follow the rules of any third-party platform you ask us to work on
            (for example directories, review sites and website hosts).
          </li>
        </ul>
        <p>
          If a delay is caused by missing information, access or approvals on
          your side, our timelines move by the same amount, and the monthly fee
          still applies.
        </p>
        <p>
          When you share login details with us, we&apos;ll keep them secure and
          only use them for the agreed work. Please change or remove our access
          when the engagement ends. You stay the owner of all your accounts.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees, credits and taxes",
    content: (
      <>
        <ul>
          <li>
            Package prices are in Canadian dollars (CAD) unless your proposal
            quotes a different currency.
          </li>
          <li>
            Packages are billed monthly in advance, at the start of each monthly
            period. Invoices are due within {legal.invoiceDueDays} days.
          </li>
          <li>
            Each package includes a monthly amount of{" "}
            <strong>tracking credits</strong>, which cover the AI queries we run
            to test and track your buyer questions. Unused credits don&apos;t
            carry over to the next month. If you need more tracking than your
            credits cover, we&apos;ll check with you first, and we won&apos;t
            charge for extra usage without your approval.
          </li>
          <li>
            If a payment is late, we may pause work until it&apos;s paid.
            We&apos;ll tell you before we do.
          </li>
          <li>
            Prices don&apos;t include taxes. We&apos;ll add any taxes we&apos;re
            required to charge to your invoice. You&apos;re responsible for any
            other taxes due in your own country. If the law requires you to
            withhold tax from a payment to us, please tell us before you pay so
            we can agree how to handle it.
          </li>
          <li>You cover your own bank and currency-conversion charges.</li>
        </ul>
        <p>
          We may change our prices for future months. We&apos;ll give you at
          least 30 days&apos; notice, and you can cancel before the new price
          starts, even during the minimum term.
        </p>
      </>
    ),
  },
  {
    id: "cancellations",
    title: "Minimum term, changes and cancelling",
    content: (
      <>
        <ul>
          <li>
            Every package has a minimum term of {site.minimumTermMonths} months,
            because this work takes a few months to show results. Cancelling
            during the minimum term means the remaining months are still
            payable.
          </li>
          <li>
            After the minimum term, your package continues month to month. You
            can stop at any time by emailing us, and it ends at the end of the
            monthly period you&apos;ve already paid for. Nothing further is
            billed after that.
          </li>
          <li>
            You can switch between Package A and Package B, or add or remove
            add-ons. Changes take effect from your next monthly period.
          </li>
          <li>
            We don&apos;t refund part-used months, but we&apos;ll finish the
            work for the month you&apos;ve paid for.
          </li>
        </ul>
        <h3>If we cancel</h3>
        <p>
          If we can&apos;t continue a service we&apos;ve agreed to, we&apos;ll
          refund the part of the fee that covers the work we haven&apos;t done.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Who owns what",
    content: (
      <>
        <p>
          <strong>Your materials stay yours.</strong> You keep ownership of
          everything you give us, such as your content, logos and data. You give
          us permission to use them only to deliver the services.
        </p>
        <p>
          <strong>What we make for you becomes yours once paid.</strong> When
          you&apos;ve paid in full, you own the reports, written content and
          other deliverables we create specifically for you.
        </p>
        <p>
          <strong>Our tools and methods stay ours.</strong> We keep ownership of
          our own processes, question sets, templates, software, know-how and
          anything we had before working with you or create for general use.
          Where these are part of a deliverable, you can use them as part of
          that deliverable for your own business.
        </p>
        <p>
          We may use anonymised, combined data from our work (which doesn&apos;t
          identify you) to improve our services and describe general trends.
          We&apos;ll only name you as a client, or share a case study about you,
          with your permission.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <>
        <p>
          We&apos;ll each keep the other&apos;s non-public business information
          confidential and only use it for the work we&apos;re doing together.
          This doesn&apos;t apply to information that is already public, was
          already known, is received lawfully from someone else, or must be
          disclosed by law (in which case we&apos;ll tell each other first where
          we&apos;re allowed to).
        </p>
        <p>
          This obligation continues for three years after our work together
          ends, and indefinitely for login details and personal data.
        </p>
      </>
    ),
  },
  {
    id: "personal-data",
    title: "Personal data",
    content: (
      <>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains how we handle
          personal data about you and the people we deal with at your business.
        </p>
        <p>
          If, as part of the work, we handle personal data on your behalf (for
          example customer reviews or staff names in your listings), we&apos;ll
          only use it to deliver the services and in line with your
          instructions, keep it secure, and delete or return it when the work
          ends. If you need a separate data processing agreement, ask us and
          we&apos;ll provide one.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limits on liability",
    content: (
      <>
        <p>
          Apart from the promises in these terms, the services and this website
          are provided &ldquo;as is&rdquo;. To the extent the law allows, we
          don&apos;t give any other guarantees or warranties, whether stated or
          implied.
        </p>
        <p>To the extent the law allows:</p>
        <ul>
          <li>
            neither of us is liable to the other for loss of profit, revenue,
            business, goodwill or data, or for any indirect or consequential
            loss; and
          </li>
          <li>
            our total liability to you for everything arising from our work
            together is limited to the fees you paid us in the 12 months before
            the event that caused the claim.
          </li>
        </ul>
        <p>
          Nothing in these terms limits liability for fraud, for death or
          personal injury caused by negligence, or for anything else that
          can&apos;t be limited by law.
        </p>
        <p>
          We&apos;re not responsible for changes, outages or decisions made by
          third-party platforms, AI tools or search engines, or for problems
          caused by information or access you gave us.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Claims from others",
    content: (
      <p>
        If someone makes a claim against us because content, materials or
        instructions you gave us break the law or infringe their rights, you
        agree to cover our reasonable costs of dealing with that claim. We agree
        to do the same for you if a claim arises because work we created for you
        infringes someone else&apos;s rights.
      </p>
    ),
  },
  {
    id: "ending",
    title: "Ending the agreement",
    content: (
      <>
        <p>
          Either of us may end the agreement by written notice if the other:
        </p>
        <ul>
          <li>
            seriously breaks these terms and doesn&apos;t fix it within 14 days
            of being asked to; or
          </li>
          <li>becomes insolvent or stops trading.</li>
        </ul>
        <p>
          When the agreement ends, you pay for work done up to that date, we
          hand over any paid-for deliverables, and you remove our access to your
          accounts. The sections on ownership, confidentiality, personal data,
          liability and disputes continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "website",
    title: "Using this website",
    content: (
      <>
        <p>
          The content on this website is general information about our services.
          It isn&apos;t legal, financial or technical advice for your situation.
        </p>
        <p>When using the website, please don&apos;t:</p>
        <ul>
          <li>use it for anything unlawful or misleading;</li>
          <li>try to break, overload or gain unauthorised access to it; or</li>
          <li>
            copy large parts of our content for commercial use without our
            permission.
          </li>
        </ul>
        <p>
          The website may link to other sites. We&apos;re not responsible for
          their content or how they handle your data. We may change or take down
          the website at any time.
        </p>
      </>
    ),
  },
  {
    id: "disputes",
    title: "Governing law and disputes",
    content: (
      <>
        <p>These terms are governed by the laws of {legal.governingLaw}.</p>
        <p>
          If there&apos;s a problem, please talk to us first. Email{" "}
          <a href={`mailto:${email}`}>{email}</a> and we&apos;ll both try in
          good faith to resolve it within 30 days.
        </p>
        <p>
          If we can&apos;t, the dispute will be settled by arbitration
          administered by the Asian International Arbitration Centre (AIAC)
          under its arbitration rules. There will be one arbitrator, the seat
          will be {legal.arbitrationSeat}, and the arbitration will be in
          English. The decision can be enforced in Singapore, Canada, the United
          States and the many other countries that recognise international
          arbitration awards.
        </p>
        <p>
          Either of us can still go to court for urgent relief, such as to stop
          misuse of confidential information, or to recover unpaid invoices.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General",
    content: (
      <ul>
        <li>
          <strong>Whole agreement.</strong> These terms and any proposal we
          agree with you are the whole agreement between us for the services.
        </li>
        <li>
          <strong>Changes.</strong> We may update these terms. The version that
          applies to an engagement is the one in force when you accepted it. For
          monthly plans we&apos;ll give you 30 days&apos; notice of significant
          changes, and you can cancel before they take effect.
        </li>
        <li>
          <strong>Events outside our control.</strong> Neither of us is
          responsible for delays caused by things beyond reasonable control,
          such as outages at major platforms, natural disasters or government
          action.
        </li>
        <li>
          <strong>Transfer.</strong> Neither of us can transfer this agreement
          to someone else without the other&apos;s agreement, except as part of
          selling the business.
        </li>
        <li>
          <strong>Notices.</strong> Notices can be sent by email to the address
          each of us has given the other.
        </li>
        <li>
          <strong>Electronic agreement.</strong> Accepting these terms, a
          proposal or an invoice electronically is as binding as signing on
          paper.
        </li>
        <li>
          <strong>If part is invalid.</strong> If a court or arbitrator finds
          part of these terms invalid, the rest still applies.
        </li>
        <li>
          <strong>No waiver.</strong> If one of us doesn&apos;t enforce a right
          straight away, we can still enforce it later.
        </li>
        <li>
          <strong>Language.</strong> These terms are written in English. If we
          provide a translation, the English version applies if they differ,
          unless the law requires otherwise.
        </li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Questions about these terms? Email us at{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={
        <p>
          The rules for using this website and working with us, written as
          plainly as we can. If anything is unclear, ask us before you sign up.
        </p>
      }
      summary={summary}
      sections={sections}
    />
  )
}
