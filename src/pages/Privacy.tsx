import { COMPANY, COMPANY_COUNTRY, LEGAL_UPDATED } from '../data/company'
import BlogLayout from '../components/BlogLayout'
import { privacyMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// NOTE: This document is a starting template and is NOT legal advice — have a lawyer
// review it before going live, especially the international-transfers section.
//
// Before publishing:
//  - Sign a Data Processing Agreement (DPA) with Glyphex and confirm the region
//    they host/process in, then complete the "International transfers" section.
//  - The "the app collects nothing off-device" claim (§3/§6) is accurate today
//    (fully local, no crash/push/in-app-analytics SDKs). Re-check it if any SDK
//    that sends data off the device is ever added. The exercise-video download
//    (§4, bunny.net, played in-app since 2 Nov 2026) is the one request the app
//    makes besides the stores' purchase checks.
//  - Accept bunny.net's DPA (dashboard → Account → Data Processing Agreement):
//    §4 calls Bunny our processor.

const CONTROLLER_COUNTRY = COMPANY_COUNTRY
const MIN_AGE = '16'
const LAST_UPDATED = LEGAL_UPDATED

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
              'Apart from delivering the exercise videos you play, the only data collected off your device is anonymous website analytics (Glyphex.io) — cookieless, so no consent banner.',
              'Exercise demo clips play inside the app. A clip streams from bunny.net, our EU-based video host, only when you tap play, so Bunny sees your IP address only then.',
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
          <p>
            Apart from the app store&rsquo;s own purchase checks (section 5), the only thing the app
            sends over the internet is a request for an exercise video when you tap play on it
            (section 4). That request carries your IP address and which clip you asked for, and
            nothing about you, your programs or your logs.
          </p>
        </Section>

        <Section title="4. Exercise Videos (bunny.net)">
          <p>
            Exercise demonstrations are hosted by bunny.net (BunnyWay d.o.o., Slovenia) and play
            inside the app. Nothing is preloaded: a clip downloads only when you tap play on an
            exercise. To deliver it, Bunny receives your IP address and the address of the clip.
            Bunny handles this on our behalf, as our processor under a data processing agreement. It
            sets no cookies when it delivers a clip, and it anonymises the IP addresses in its
            delivery logs, so the logs show which clips were played but not who played them. Our
            legal basis is providing the feature you asked for (Article 6(1)(b) GDPR).
          </p>
          <p>
            The exercise pages on athletickle.com play the same clips from bunny.net in your
            browser, on the same terms.
          </p>
          <p>
            If a clip will not load in the app, the app offers to open it on Bunny&rsquo;s player
            page in your browser instead. That page counts the play in Bunny&rsquo;s viewing
            statistics for our videos, which show us totals such as views, watch time and country,
            not who watched. Its player may remember settings such as mute or subtitle language in
            your browser&rsquo;s local storage.
          </p>
        </Section>

        <Section title="5. Subscriptions & Payments">
          <p>
            Subscriptions are purchased and managed through the{' '}
            <Ext href="https://www.apple.com/legal/privacy/">Apple App Store</Ext> or{' '}
            <Ext href="https://policies.google.com/privacy">Google Play</Ext>. Those platforms
            process your payment and account information as independent controllers under their own
            privacy policies — we never see your payment details. The app only reads a
            receipt/entitlement locally, on your device, to unlock paid features.
          </p>
        </Section>

        <Section title="6. What We Do Not Do">
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

        <Section title="7. Third-Party Services">
          <p>The only third parties involved in the Service are:</p>
          <ul className="space-y-3">
            {[
              ['Glyphex', 'Cookieless website analytics (processor). glyphex.io'],
              [
                'bunny.net',
                'Hosting and delivery of the exercise demonstration videos, streamed into the app when you tap play and shown on our website’s exercise pages (processor). bunny.net',
              ],
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

        <Section title="8. International Transfers">
          <p>
            Glyphex and the app stores may process data outside your country, including outside the
            EU/EEA. Where that happens, transfers are covered by appropriate safeguards (such as the
            EU Standard Contractual Clauses) provided by those services. {/* TODO: confirm Glyphex's
            hosting region and add its specific transfer mechanism here before launch. */}
          </p>
          <p>
            bunny.net is based in the EU and processes its delivery logs there. A clip is served from
            the Bunny server nearest you, which may be outside the EU, normally only when you are.
            That server keeps the log in memory for under a minute before passing it on to Bunny in
            the EU.
          </p>
        </Section>

        <Section title="9. Data Retention">
          <p>
            Website analytics are retained by Glyphex only in anonymous, aggregate form. bunny.net
            keeps short-lived delivery logs for the videos, with IP addresses anonymised. Because the
            app is local-first, any data it creates lives only on your device and is removed when you
            uninstall the app or clear its data.
          </p>
        </Section>

        <Section title="10. Your Rights">
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

        <Section title="11. Children">
          <p>
            The Service is not directed to children under {MIN_AGE}, and we do not knowingly collect
            personal data from them.
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            We may update this policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above and, where the change is material, provide
            reasonable notice.
          </p>
        </Section>

        <Section title="13. Contact">
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
