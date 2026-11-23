import { FOUNDER_BIO, editions, sharedFaq } from '../../data/marketing'
import { SITE_NAME } from '../../seo/config'
import type { EditionCopy } from './types'

export const en: EditionCopy = {
  editions,
  sharedFaq,
  playCta: 'Get it on Google Play',
  availableNote: 'Available now on Android. Your first four-week block is free.',
  builtTitle: 'Built for your training.',
  setupEyebrow: 'FROM SETUP TO SESSION',
  setupTitle: 'Make the plan yours.',
  setupLead: 'Review your exercises. Swap eligible movements for equivalents before saving. Follow the prescribed sets, reps, effort and rest.',
  exportNote: 'Export your program through your phone’s share menu. Logging is optional; your generated block is ready to follow.',
  founderTitle: 'Experience behind the programming.',
  founderBio: FOUNDER_BIO,
  meetMika: 'Meet Mika',
  weeks: 'WEEKS',
  offerEyebrow: 'YOUR FIRST BLOCK IS FREE',
  offerTitle: 'A complete place to start.',
  offerLead: 'Your first four-week block includes its scheduled deload. Continue into later blocks with a subscription.',
  offerNote: 'The next block has a 21-day pacing gate, including for subscribers. Store pricing and billing terms appear before purchase.',
  faqTitle: 'Before you start.',
  communityLabel: 'COMMUNITY',
  communityTitle: 'Bring your questions. Share your progress.',
  communityLead: 'Meet the founder and other athletes on Discord. Follow updates and share what works—and what needs work.',
  exploreOther: (appName) => `Explore ${appName}`,
  metaTitleTail: 'Structured Training',
  metaDescriptionTail: 'First four-week block free. Now available on Android via Google Play.',
  landingTitle: `${SITE_NAME} — Parkour & Strength Training`,
  landingDescription:
    'Structured training for parkour, strength and muscle mass. Athletickle Parkour and Strength are now available on Android via Google Play.',
}
