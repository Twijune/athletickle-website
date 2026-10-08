# Contact information — launch checklist

Prepared 11 September 2026; updated 28 September 2026 after PRH registration and
8 October 2026 after the D-U-N-S number. Full company details: `Algoritmii/business-details.md`.

- Legal name: **Athletickle Oy**, entered in the Finnish Trade Register 22.09.2026
  (PRH application 2026/472186). Limited company (osakeyhtiö), domicile Jyväskylä.
- Business ID (Y-tunnus): 3654655-8. Prepayment register and VAT-liable from
  11.09.2026 (YTJ, checked 8 October 2026); EU VAT number FI36546558.
- D-U-N-S: 369339103, issued 8 October 2026. The D&B name and address match PRH.
- Country: Finland.
- Public email: info@athletickle.com. As of 8 October 2026 the domain's MX still
  points at Namecheap Email Forwarding (eforward1-5) with the forwarding-only SPF, so
  mail can arrive but cannot be sent as info@. See `Algoritmii/info-email-setup-proton.md`.
- Postal address: the registered address is in the Trade Register extract. By the
  owner's decision it is **not** published in the apps or on the website; it goes only
  into the Play Console / App Store developer profile.
- Dedicated public business phone: pending; do not substitute a personal number.

`src/data/company.ts` holds the name, Business ID, email and legal date, and is
byte-identical in PK, STR and the website. Change all three together.

## Before publication

- Configure the email provider and domain DNS; verify incoming mail and replies sent
  as info@athletickle.com. Code changes do not create a mailbox.
- Add the registered address and a dedicated phone to the store developer profiles.
- Keep Google Payments and D&B legal name/address consistent; complete Google
  organization verification and Apple organization enrollment with D-U-N-S 369339103.
- Complete store billing/release preparation.

The website preserves runtime email-link assembly; this is not guaranteed spam protection.
DNS, provider signup, deployment and publication are separate work.
