import BlogLayout from '../components/BlogLayout'
import { termsMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// NOTE: Placeholders in [[double brackets]] must be filled in before launch.
// This document is a starting template and is NOT legal advice — have a lawyer
// review it, especially the injury/liability clauses (§§3–7), the narrow
// indemnity (§11) and the subscription/withdrawal terms (§8), before going live.
//
// This page is word-for-word the same document the apps bundle at
// src/data/legal.ts (Athletickle PK and Athletickle STR). Both stores require
// the Terms to be reachable next to the purchase button, so the apps ship their
// own copy offline. If you edit one, edit the others and bump LAST_UPDATED in
// all of them.
//
// One deliberate difference: §4 here is the union of both editions' risk text,
// because this single page has to cover whichever app the reader has. The
// lifestyle-sports clause comes from PK, the heavy-load bullet from STR.

const COMPANY = '[[Company legal name]]'
const GOVERNING_LAW = 'Finland'
const MIN_AGE = '16'
const LAST_UPDATED = '8 September 2026'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="flex items-center gap-3 text-2xl md:text-3xl tracking-tight mb-6">
      <span className="w-3 h-3 bg-[#D1622A] shrink-0" aria-hidden="true" />
      <span>{title}</span>
    </h2>
    <div className="space-y-4 font-['Space_Mono'] text-white/70 leading-relaxed">{children}</div>
  </section>
)

const Bullets = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-4 pl-1">{children}</ul>
)

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3">
    <span className="text-[#D1622A] shrink-0" aria-hidden="true">
      —
    </span>
    <span>{children}</span>
  </li>
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

        <div className="font-['Space_Mono'] text-white/70 leading-relaxed mb-12 space-y-4">
          <p>
            These Terms of Use and End User License Agreement (the &ldquo;Terms&rdquo;) are a legal
            agreement between you and {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;Athletickle&rdquo;) governing your use of the Athletickle application and website
            (together, the &ldquo;App&rdquo;). This agreement is provided in English, and the English
            version governs.
          </p>
          <p>
            By downloading, accessing, or using the App, you agree to these Terms. If you do not
            agree, do not use the App.
          </p>
          <p>
            <strong className="text-white">What the App is.</strong> Athletickle is a periodization
            engine. Its product is the model that decides how training load, volume and intensity
            should change over weeks and mesocycles. To express that model it names specific
            exercises and prescribes specific doses — sets, reps, rest, and either a
            proximity-to-failure target or a percentage load.
          </p>
          <p>
            The doses are prescribed rather than merely suggested, because the doses are what carry
            the periodization: change them and you are following a different model. Which movements
            you use to meet them is a separate question, and it is substantially yours. While you are
            reviewing a newly generated program, and only before you save it, you may swap any
            individual exercise for one of the equivalents the App offers for that slot; the
            prescribed sets, reps and rest stay the same, because an equivalent movement carries the
            same dose. Once you save a program it is fixed.
          </p>
          <p>
            <strong className="text-white">The App plans; you train.</strong> It does not supervise
            you, it cannot adapt to anything you do not tell it, and whether, when and how you carry
            out any part of a program is your decision. It is built for people who already train. It
            assumes you know how to perform the movements it names, that you can judge whether a
            prescribed load is appropriate for you on a given day, and that you will substitute,
            scale or skip work when it is not. It cannot see you, your technique, your fatigue, or
            the surface you are training on. §4 sets out what that means for the risks you are
            taking on.
          </p>
        </div>

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
            control, for your own personal, non-commercial training use.
          </p>
          <p>
            You may not copy, modify, distribute, sell, lease, reverse-engineer, or attempt to
            extract the source code of the App except to the extent this restriction is prohibited by
            applicable law.
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
            fitness to train.
          </p>
          <p>
            <strong className="text-white">
              Stop exercising immediately and seek medical help
            </strong>{' '}
            if you experience pain, dizziness, shortness of breath, chest discomfort, or any other
            warning sign. You are solely responsible for judging whether any exercise, load, or
            progression suggested by the App is appropriate and safe for you.
          </p>
          <p>
            Athletickle is a fitness and performance tool. It is{' '}
            <strong className="text-white">not a medical device</strong>, and it makes no claim to
            diagnose, treat, monitor, alleviate, or prevent any disease, injury, or medical
            condition. It is not designed for, and must not be used for, rehabilitation from injury
            or the management of any medical condition.
          </p>
        </Section>

        <Section title="4. Assumption of Risk">
          <p>
            You understand that physical training — including heavy resistance training such as
            squatting, pressing, deadlifting and Olympic lifting, the ballistic jumping work the App
            also prescribes, and lifestyle sports such as parkour, climbing, snowboarding and surfing
            — is inherently dangerous and carries a risk of serious injury, permanent disability, or
            death.
          </p>
          <p>
            You <strong className="text-white">voluntarily and knowingly assume all such risks</strong>,
            whether foreseeable or not, that arise from your training and from your use of the App,
            including risks arising from your own physical condition and from the environment,
            equipment, or surfaces on which you train.
          </p>
          <p>
            Some of what the App prescribes is high-risk by design, and you should understand
            specifically what you are accepting:
          </p>
          <Bullets>
            <Bullet>
              Loads are prescribed close to your limit, and they go up. The App doses loaded work
              either by how few reps you should have left in reserve or as a percentage of your
              one-rep maximum, and it keeps adding load across a block. Heavy work taken near failure
              can fail mid-rep, and the risk rises when you are fatigued, poorly warmed up, or
              lifting without safety pins or a spotter.
            </Bullet>
            <Bullet>
              Jump and impact work is prescribed at maximum intent rather than at a held-back effort
              target. Maximal jumping and landing loads the ankles, knees, hips and spine heavily,
              and the risk rises sharply when you are fatigued, poorly warmed up, or landing on an
              unsuitable surface.
            </Bullet>
            <Bullet>
              Olympic lifts are prescribed as doses, not as technique instruction. The App
              deliberately ships no demonstration for them, because it assumes you have already been
              coached through them in person. If you have not been, turn that option off.
            </Bullet>
            <Bullet>
              The App cannot see your form, your fatigue, your sleep, an old injury, or the surface
              and equipment you are using. It works from the settings you gave it and the logs you
              enter, and it will keep prescribing progression whether or not today is a good day to
              take it.
            </Bullet>
            <Bullet>
              Before you save a program you can swap any exercise the App picked for an equivalent it
              offers, so a movement you cannot perform safely need not stay in your plan. Choosing to
              keep one, or to train around a limitation you never told the App about, is your
              decision.
            </Bullet>
            <Bullet>
              You are responsible for warming up, for building intensity gradually, for stopping a
              set when technique fails, and for scaling down or skipping any prescribed work that is
              not appropriate for you on the day.
            </Bullet>
          </Bullets>
        </Section>

        <Section title="5. Release & Limitation of Liability">
          <p>
            The App is provided <strong className="text-white">&ldquo;as is&rdquo; and &ldquo;as
            available&rdquo;</strong>, without warranties of any kind, whether express or implied,
            including any implied warranties of merchantability, fitness for a particular purpose,
            or non-infringement, to the fullest extent permitted by law.
          </p>
          <p>
            <strong className="text-white">The App plans; you train.</strong> You choose which
            exercises to keep before you save a program, and on any given day you decide whether a
            prescribed load or progression suits you and whether to scale it down, postpone it, or
            skip it. You are responsible for how you interpret and apply the App&rsquo;s
            programming. To the fullest extent permitted by applicable law, you release us from, and
            agree that we are not liable for, any injury, loss, or damage arising out of or in
            connection with your use of the App or your participation in any activity based on it.
          </p>
          <p>
            To the fullest extent permitted by applicable law, we will not be liable for any
            indirect, incidental, special, consequential, or punitive damages, and our total
            aggregate liability arising out of or relating to the App will not exceed the greater of
            the amount you paid us for the App in the twelve months before the claim, or EUR 50.
          </p>
          <p>
            <strong className="text-white">This cap does not apply to death or personal injury.</strong>{' '}
            Nothing in this section limits or excludes our liability for death or personal injury,
            for intent or gross negligence, or our liability under applicable product-liability law.
            Under Finnish product-liability law a term agreed before an injury occurs that would
            limit the injured person&rsquo;s right to compensation is void, and we do not attempt to
            impose one. The monetary cap above applies only to losses other than death or personal
            injury.
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

        <Section title="7. Reporting a Safety Issue">
          <p>
            If the App prescribes something you believe is unsafe — a load or progression that looks
            wrong, an exercise that should not appear for the inputs you gave, or a warning that is
            missing where you would expect one — please tell us. Reports go to the same address as
            everything else, through the{' '}
            <a
              href="/contact"
              className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
            >
              contact page
            </a>
            , and we review them.
          </p>
          <p>
            Reporting an issue does not limit any right you have, and nothing in this section makes
            your safety our responsibility rather than yours while you are training — §§3 and 4 still
            apply. It exists because we would rather hear about a bad prescription than not.
          </p>
        </Section>

        <Section title="8. Subscriptions, Renewal & Cancellation">
          <p>
            Athletickle has a free tier — your full first training mesocycle — and an optional paid
            subscription that unlocks the rest of your periodization roadmap. Subscriptions are sold
            and processed by the Apple App Store or Google Play, not by us. The applicable price and
            billing period are shown to you in the store before you confirm, and the charge is made
            to your store account.
          </p>
          <p>
            Subscriptions renew automatically for further periods of the same length until you
            cancel. You can cancel at any time in your store&rsquo;s subscription settings;
            cancellation takes effect at the end of the period you have already paid for, and you
            keep access until then. Both stores require cancellation at least 24 hours before a
            period ends for it not to renew. Refunds are handled by the store under its own policies
            — we cannot issue them.
          </p>
          <p>
            We may change subscription prices for future billing periods. Where we do, the store will
            notify you in advance and, where the store requires it, ask for your agreement; if you do
            not agree, your subscription simply will not renew at the new price.
          </p>
          <p>
            <strong className="text-white">Consumers in the EU, EEA, and UK:</strong> you normally
            have 14 days to withdraw from a purchase of digital content. Where you ask for access to
            start immediately and acknowledge that you lose the right of withdrawal once it does,
            that right ends at that point, as the law permits. This does not affect your other
            statutory rights under §6, nor any more generous refund policy the store applies.
          </p>
        </Section>

        <Section title="9. Acceptable Use">
          <p>
            You agree not to use the App unlawfully, to interfere with its operation or security, to
            access it through automated means without our permission, or to use it in any way that
            infringes the rights of others.
          </p>
        </Section>

        <Section title="10. Intellectual Property">
          <p>
            The App, including its software, algorithms, content, and trade marks, is owned by us or
            our licensors and is protected by intellectual property laws. Except for the license in
            §2, these Terms grant you no rights in the App.
          </p>
        </Section>

        <Section title="11. Indemnification">
          <p>
            You agree to indemnify us against any third-party claim, and any resulting loss or
            reasonable cost, that arises from your breach of these Terms or your unlawful use of the
            App.
          </p>
          <p>
            This is deliberately narrow. It does not apply to ordinary use of the App, to your own
            training, or to anything caused by us. If you are a consumer, it applies only so far as
            the consumer-protection law of your country of residence permits, and it never requires
            you to cover a claim you are not responsible for.
          </p>
        </Section>

        <Section title="12. Termination">
          <p>
            We may suspend or terminate your access to the App if you breach these Terms. You may
            stop using the App at any time. Sections that by their nature should survive termination
            (including §§3–8, 10, 11, and 13) will continue to apply.
          </p>
        </Section>

        <Section title="13. Governing Law">
          <p>
            These Terms are governed by the laws of {GOVERNING_LAW}, excluding its conflict-of-laws
            rules and the UN Convention on Contracts for the International Sale of Goods, and subject
            to §6. The courts of {GOVERNING_LAW} have jurisdiction.
          </p>
          <p>
            If you are a consumer, this choice of law does not deprive you of the protection of the
            mandatory provisions of the law of your country of residence, and you may also bring
            proceedings in the courts of that country. Consumers in the EU may also use the European
            Commission&rsquo;s online dispute resolution platform at{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </Section>

        <Section title="14. Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above and, where the change is material, provide
            reasonable notice. Continued use of the App after changes take effect means you accept
            the updated Terms.
          </p>
        </Section>

        <Section title="15. Contact">
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
