import BlogLayout from '../components/BlogLayout'
import { termsMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// NOTE: Placeholders in [[double brackets]] must be filled in before launch.
// This document is a starting template and is NOT legal advice — have a lawyer
// review it, especially the injury/liability clauses (§§4–6), before going live.

const COMPANY = '[[Company legal name]]'
const GOVERNING_STATE = '[[U.S. state, e.g. Delaware]]'
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

export default function Terms() {
  useHead(termsMeta())

  return (
    <BlogLayout>
      <article className="container mx-auto px-8 py-16 max-w-3xl">
        <p className="text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A] mb-4">LEGAL</p>
        <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] mb-6">
          TERMS OF USE &amp; EULA
        </h1>
        <p className="text-sm font-['Space_Mono'] text-white/40 mb-4">Last updated: {LAST_UPDATED}</p>
        <div className="w-16 h-1 bg-[#D1622A] mb-12" />

        <p className="font-['Space_Mono'] text-white/70 leading-relaxed mb-12">
          These Terms of Use and End User License Agreement (the &ldquo;Terms&rdquo;) are a legal
          agreement between you and {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;Athletickle&rdquo;)
          governing your use of the Athletickle application and website (together, the
          &ldquo;App&rdquo;). This agreement is provided in English, and the English version governs.
          By downloading, accessing, or using the App, you agree to these Terms. If you do not
          agree, do not use the App.
        </p>

        <Section title="1. Acceptance & Eligibility">
          <p>
            By creating an account or otherwise using the App, you confirm that you are at least {MIN_AGE}{' '}
            years old (or the age of digital consent in your country, whichever is higher) and that
            you have the legal capacity to enter into these Terms. If you use the App on behalf of
            someone else, you represent that you are authorised to accept these Terms for them.
          </p>
        </Section>

        <Section title="2. License">
          <p>
            Subject to these Terms, we grant you a limited, personal, non-exclusive,
            non-transferable, revocable license to install and use the App on devices you own or
            control, for your own personal, non-commercial training use. You may not copy, modify,
            distribute, sell, lease, reverse-engineer, or attempt to extract the source code of the
            App except to the extent this restriction is prohibited by applicable law.
          </p>
        </Section>

        <Section title="3. Not Medical Advice — Health Disclaimer">
          <p>
            The App provides general fitness and training programming for informational and
            educational purposes only. It is <strong className="text-white">not medical advice</strong>{' '}
            and is not a substitute for consultation with a qualified physician, physiotherapist, or
            other healthcare professional.
          </p>
          <p>
            Consult a physician before beginning any exercise program, particularly if you are
            pregnant, have a pre-existing medical condition or injury, or have any concern about your
            fitness to train. <strong className="text-white">Stop exercising immediately and seek
            medical help</strong> if you experience pain, dizziness, shortness of breath, chest
            discomfort, or any other warning sign. You are solely responsible for judging whether any
            exercise, load, or progression suggested by the App is appropriate and safe for you.
          </p>
        </Section>

        <Section title="4. Assumption of Risk">
          <p>
            You understand that physical training — including strength training and lifestyle sports
            such as parkour, climbing, snowboarding, and surfing — is inherently dangerous and
            carries a risk of serious injury, permanent disability, or death. You{' '}
            <strong className="text-white">voluntarily and knowingly assume all such risks</strong>,
            whether foreseeable or not, that arise from your training and from your use of the App,
            including risks arising from your own physical condition and from the environment,
            equipment, or surfaces on which you train.
          </p>
        </Section>

        <Section title="5. Release & Limitation of Liability">
          <p>
            The App is provided <strong className="text-white">&ldquo;as is&rdquo; and &ldquo;as
            available&rdquo;</strong>, without warranties of any kind, whether express or implied,
            including any implied warranties of merchantability, fitness for a particular purpose,
            or non-infringement, to the fullest extent permitted by law.
          </p>
          <p>
            You are responsible for how you interpret and follow the App&rsquo;s programs and
            instructions. To the fullest extent permitted by applicable law, you release us from,
            and agree that we are not liable for, any injury, loss, or damage arising out of or in
            connection with your use of the App or your participation in any activity based on it.
          </p>
          <p>
            To the fullest extent permitted by applicable law, we will not be liable for any
            indirect, incidental, special, consequential, or punitive damages, and our total
            aggregate liability arising out of or relating to the App will not exceed the greater of
            the amount you paid us for the App in the twelve months before the claim, or EUR 50.
          </p>
        </Section>

        <Section title="6. Your Statutory Rights (Consumers)">
          <p>
            Nothing in these Terms excludes or limits our liability where it would be unlawful to do
            so. This includes any liability for death or personal injury caused by our negligence,
            for fraud or fraudulent misrepresentation, or any other liability that cannot be excluded
            or limited under the law that applies to you.
          </p>
          <p>
            If you are a consumer, you keep all mandatory rights granted to you by the
            consumer-protection laws of your country of residence, and the limitations in §5 apply
            only to the extent those laws permit.
          </p>
        </Section>

        <Section title="7. Acceptable Use">
          <p>
            You agree not to use the App unlawfully, to interfere with its operation or security, to
            access it through automated means without our permission, or to use it in any way that
            infringes the rights of others.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            The App, including its software, algorithms, content, and trade marks, is owned by us or
            our licensors and is protected by intellectual property laws. Except for the license in
            §2, these Terms grant you no rights in the App.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>
            We may suspend or terminate your access to the App if you breach these Terms. You may
            stop using the App at any time. Sections that by their nature should survive termination
            (including §§3–6, 8, and 10) will continue to apply.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms are governed by the laws of the State of {GOVERNING_STATE}, United States,
            without regard to its conflict-of-laws rules, and subject to §6. If you are a consumer
            resident in the EU, EEA, or UK, you also benefit from the mandatory provisions of the law
            of your country of residence, and nothing in this section deprives you of the protection
            of those provisions.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above and, where the change is material, provide
            reasonable notice. Continued use of the App after changes take effect means you accept
            the updated Terms.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            Questions about these Terms? Reach us via our{' '}
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
