import type { Edition } from '../../data/marketing'

type Pair = readonly [string, string]

/** The per-app text of an edition page. */
export interface EditionText {
  title: string
  description: string
  short: string
  features: readonly Pair[]
  details: readonly string[]
  faq: readonly Pair[]
}

/**
 * Everything an edition page (/parkour, /strength and their /fr, /de, /es
 * versions) shows, plus the search metadata of the landing and edition pages.
 * English is the source: a claim changes in src/data/marketing.ts first, and
 * the translations follow it.
 */
export interface EditionCopy {
  editions: Record<Edition, EditionText>
  sharedFaq: readonly Pair[]
  playCta: string
  availableNote: string
  builtTitle: string
  setupEyebrow: string
  setupTitle: string
  setupLead: string
  exportNote: string
  founderTitle: string
  founderBio: string
  meetMika: string
  weeks: string
  offerEyebrow: string
  offerTitle: string
  offerLead: string
  offerNote: string
  faqTitle: string
  communityLabel: string
  communityTitle: string
  communityLead: string
  exploreOther: (appName: string) => string
  metaTitleTail: string
  metaDescriptionTail: string
  landingTitle: string
  landingDescription: string
}
