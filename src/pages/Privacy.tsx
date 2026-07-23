import BlogLayout from '../components/BlogLayout'
import { privacyMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// NOTE: Placeholders in [[double brackets]] must be filled in before launch.
// This document is a starting template and is NOT legal advice — have a lawyer
// review it before going live, especially the international-transfers section.
//
// Before publishing:
//  - Sign a Data Processing Agreement (DPA) with Glyphex and confirm the region
//    they host/process in, then complete the "International transfers" section.
//  - The "the app collects nothing off-device" claim (§4/§6) is accurate today
//    (fully local, no crash/push/in-app-analytics SDKs). Re-check it if any SDK
//    that sends data off the device is ever added.

const COMPANY = '[[Company legal name]]'
const CONTROLLER_COUNTRY = '[[country where you/your company are based]]'
const MIN_AGE = '16'
const LAST_UPDATED = '23 July 2026'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="flex items-center gap-3 text-2xl md:text-3xl tracking-tight mb-6">
      <span className="w-3 h-3 bg-[#D1622A] shrink-0" aria-hidden="true" />
      <span>{title}</span>
    </h2>
    <div className="space-y-4 font-['Space_Mono'] text-white/70 leading-relaxed">{children}</div>
  </section>
)

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
  >
    {children}
  </a>
)

export default function Privacy() {
  useHead(privacyMeta())

  return (
    <BlogLayout>
      <article className="container mx-auto px-8 py-16 max-w-3xl">
        <p className="text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A] mb-4">LEGAL</p>
        <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] mb-6">PRIVACY POLICY</h1>
        <p className="text-sm font-['Space_Mono'] text-white/40 mb-4">Last updated: {LAST_UPDATED}</p>
        <div className="w-16 h-1 bg-[#D1622A] mb-12" />

        <p className="font-['Space_Mono'] text-white/70 leading-relaxed mb-12">
          This Privacy Policy explains how {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;Athletickle&rdquo;) handles personal data in connection with the Athletickle
          website and mobile application (together, the &ldquo;Service&rdquo;). It is provided in
          English, and the English version governs. If you have any questions, contact us via our{' '}
          <a
            href="/contact"
            className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
          >
            contact page
          </a>
          .
        </p>

        <Section title="The Short Version">
          <ul className="space-y-3">
            {[
              'The app runs entirely on your device. We run no server and never receive your training data.',
              'We don’t require an account, and we don’t sell or share your personal data.',
              'The only data collected off your device is anonymous website analytics (Glyphex.io) — cookieless, so no consent banner.',
              'Payments and subscriptions are handled by the Apple App Store and Google Play, not by us.',
            ].map((line) => (
              <li
                key={line}
                className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-px before:bg-[#D1622A]"
              >
                {line}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="1. Who We Are">
          <p>
            {COMPANY} is the data controller for the limited processing described in this policy.
            We are based in {CONTROLLER_COUNTRY}. You can reach us through our{' '}
            <a
              href="/contact"
              className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
            >
              contact page
            </a>
            .
          </p>
        </Section>

        <Section title="2. Website Analytics">
          <p>
            Our website uses <Ext href="https://glyphex.io">Glyphex</Ext>, a privacy-first,
            <strong className="text-white"> cookieless</strong> analytics service, to understand
            aggregate traffic. Because Glyphex does not use cookies or similar tracking
            technologies, we do not display a cookie-consent banner.
          </p>
          <p>Glyphex is designed to keep visitors anonymous. In particular:</p>
          <ul className="space-y-3">
            {[
              'It does not set cookies and does not build long-term profiles — visitor IDs are anonymous and reset every 24 hours.',
              'Your IP address is used only momentarily to derive an approximate location (country/city) and is then discarded — it is not stored.',
              'It does not use canvas, WebGL, or font fingerprinting.',
            ].map((line) => (
              <li
                key={line}
                className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-px before:bg-[#D1622A]"
              >
                {line}
              </li>
            ))}
          </ul>
          <p>
            The information collected is limited to aggregate statistics such as pageviews, visitor
            counts, referring sources, device and browser type, and approximate location. Our legal
            basis for this processing is our <strong className="text-white">legitimate interest</strong>{' '}
            (Article 6(1)(f) GDPR) in measuring and improving our website. Glyphex processes this
            data as our processor on our behalf; see the{' '}
            <Ext href="https://glyphex.io">Glyphex website</Ext> for details of its practices.
          </p>
        </Section>

        <Section title="3. The App">
          <p>
            The Athletickle app runs <strong className="text-white">entirely on your device</strong>.
            We operate no server for it, and we do not collect, receive, transmit, or have access to
            your training data or how you use the app. Any programs, logs, and settings you create
            stay in the app&rsquo;s local storage on your device.
          </p>
        </Section>

        <Section title="4. Subscriptions & Payments">
          <p>
            Subscriptions are purchased and managed through the{' '}
            <Ext href="https://www.apple.com/legal/privacy/">Apple App Store</Ext> or{' '}
            <Ext href="https://policies.google.com/privacy">Google Play</Ext>. Those platforms
            process your payment and account information as independent controllers under their own
            privacy policies — we never see your payment details. The app only reads a
            receipt/entitlement locally, on your device, to unlock paid features.
          </p>
        </Section>

        <Section title="5. What We Do Not Do">
          <ul className="space-y-3">
            {[
              'We do not require or offer user accounts.',
              'We do not sell, rent, or share your personal data with advertisers or data brokers.',
              'We do not run ad networks or third-party trackers.',
              'We do not collect your health or training data off your device.',
            ].map((line) => (
              <li
                key={line}
                className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-px before:bg-[#D1622A]"
              >
                {line}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="6. Third-Party Services">
          <p>The only third parties involved in the Service are:</p>
          <ul className="space-y-3">
            {[
              ['Glyphex', 'Cookieless website analytics (processor). glyphex.io'],
              ['Apple', 'App Store distribution, payments, and subscriptions.'],
              ['Google', 'Google Play distribution, payments, and subscriptions.'],
            ].map(([name, role]) => (
              <li
                key={name}
                className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-px before:bg-[#D1622A]"
              >
                <strong className="text-white">{name}</strong> — {role}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="7. International Transfers">
          <p>
            Glyphex and the app stores may process data outside your country, including outside the
            EU/EEA. Where that happens, transfers are covered by appropriate safeguards (such as the
            EU Standard Contractual Clauses) provided by those services. {/* TODO: confirm Glyphex's
            hosting region and add its specific transfer mechanism here before launch. */}
          </p>
        </Section>

        <Section title="8. Data Retention">
          <p>
            Website analytics are retained by Glyphex only in anonymous, aggregate form. Because the
            app is local-first, any data it creates lives only on your device and is removed when you
            uninstall the app or clear its data.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>
            If you are in the EU, EEA, or UK, you have rights under the GDPR / UK GDPR, including the
            rights to access, correct, erase, restrict, object to, and port your personal data. Note
            that most data the app handles stays on your device and is not held by us, so you control
            it directly through your device. For the limited analytics data, or to make a request,
            contact us via our{' '}
            <a
              href="/contact"
              className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
            >
              contact page
            </a>
            . You also have the right to lodge a complaint with the data-protection supervisory
            authority in {CONTROLLER_COUNTRY} or your country of residence.
          </p>
          <p>
            If you are a California resident, we do not sell or share your personal information as
            those terms are defined under the CCPA/CPRA.
          </p>
        </Section>

        <Section title="10. Children">
          <p>
            The Service is not directed to children under {MIN_AGE}, and we do not knowingly collect
            personal data from them.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above and, where the change is material, provide
            reasonable notice.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            Questions about this policy or your data? Reach us via our{' '}
            <a
              href="/contact"
              className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
            >
              contact page
            </a>
            .
          </p>
        </Section>
      </article>
    </BlogLayout>
  )
}
