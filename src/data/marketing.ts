// One invitation for the public site. Creator-specific invites belong in the launch ledger.
export const DISCORD_URL = 'https://discord.gg/PrXwF4QSuf'
export const FOUNDER_NAME = 'Mika'
export const FOUNDER_TITLE = 'Founder of Athletickle'
export const FOUNDER_BIO = 'Athletickle is built by Mika, an exercise physiologist (MSc), parkour athlete since 2005 and coach since 2006. He co-founded Athletica, a coaching company that has worked with thousands of people, from everyday gym-goers to Olympic-level athletes and NHL players. Athletickle brings that programming experience into a more accessible training plan.'

export type Edition = 'parkour' | 'strength'
export const editions = {
  parkour: {
    name: 'Athletickle Parkour', code: 'PK',
    title: 'Strength and power. Built around your parkour.',
    description: 'Give your parkour practice a structured strength-and-power plan. Enter your parkour frequency and complementary training days, then see where your next training blocks are headed.',
    short: 'Complementary strength and power training for parkour athletes.',
    features: [
      ['Your practice counts', 'Your parkour frequency is an input to your complementary training plan. The app programs the strength and power work; you plan your parkour practice.'],
      ['Strength with a purpose', 'Eligible programs can include jump-focused blocks, contrast sessions pairing a lift with a direction-matched jump, and speed-style lifting sessions. Your experience determines the options.'],
      ['Understand the session', 'See sets, reps, effort and rest together. Linked movement demonstrations and an in-app training guide help explain what the plan asks of you.'],
    ],
    details: ['Beginner free-weight mode emphasizes fundamental lifts.', 'Ring and Olympic-lift options reflect your access and experience.', '258 exercise records, filtered to fit your program. Some movements have no video link.', 'A block-end questionnaire informs the next block.'],
    faq: [
      ['Does it teach parkour skills?', 'This edition programs complementary strength and power training. It does not replace parkour coaching or generate your technical parkour practice.'],
      ['Can I schedule separate sprint workouts?', 'Not currently. Separate speed-training controls are not available in the app. Speed-style lifting sessions can still appear in eligible complementary programs.'],
      ['Does it suggest my next weight from workout logs?', 'Parkour lets you log workouts, but the add / hold / reduce load cues currently belong to Athletickle Strength.'],
    ],
  },
  strength: {
    name: 'Athletickle Strength', code: 'STR',
    title: 'Give your strength training a direction.',
    description: 'Structured training for strength and muscle. Choose your emphasis, your weekly frequency and your experience. See your roadmap before starting the first four-week block.',
    short: 'Structured gym training for strength and muscle, with a two-day option.',
    features: [
      ['Two days can be the plan', 'Minimal effective dose builds two full-body sessions a week with a reduced volume budget. Progression and deloads remain part of the plan.'],
      ['Choose your emphasis', 'Bias your roadmap toward muscle mass, maximal strength, or both. Separately choose an upper- or lower-body emphasis, or keep the distribution balanced.'],
      ['A direction for your next lift', 'Log your performance to get cues to add load, repeat it, or ease back. The app does not estimate your one-rep max or choose a kilogram number for you.'],
    ],
    details: ['207 non-impact movements in the exercise pool, before experience and program filters.', 'Eligible plans include heavy sets followed by back-off volume on the same lift.', 'Beginner free-weight mode emphasizes fundamental lifts.', 'Ring and Olympic-lift options reflect your access and experience.'],
    faq: [
      ['Do I have to log every set?', 'No. Your generated four-week block is ready to follow without logs. Logging adds progression cues; an unlogged session is not treated as a failed workout.'],
      ['Is the two-day option a temporary switch?', 'Choose it when creating a program. The mode stays with that program as later blocks unlock; it is not a mid-program weekly toggle.'],
      ['Does the app rewrite my next session automatically?', 'No. Logged performance provides progression cues. Feedback at the end of a block informs the next block; the existing block is not continually rewritten.'],
    ],
  },
} as const

export const sharedFaq = [
  ['What is free, and what requires a subscription?', 'The first complete four-week training block is free. Continuing into later blocks requires a subscription. A 21-day pacing gate applies before the next block can unlock, including for subscribers. Prices and billing terms are shown in the store purchase flow. Both editions are currently pre-launch.'],
  ['How much of the roadmap can I see?', 'Choose three or six four-week blocks: a 12- or 24-week direction. The sequence is visible up front, while detailed later blocks are generated as they unlock.'],
  ['Can I change the exercises?', 'Before saving a program, swap eligible exercises for equivalents. Some slots have no equivalent available. The prescribed dose is retained, and saved programs are fixed.'],
  ['Do I need gym equipment?', 'Yes. Gym access is assumed. A bodyweight preference influences exercise selection; it does not make the program equipment-free.'],
  ['Does it work offline?', 'Program generation and saved training data are local. Linked demonstrations and store operations need connectivity. Premium access has a three-day offline grace period. There is no cloud backup or cross-device sync.'],
  ['Is a Discord account required to train?', 'No. Discord is our community and beta communication channel, separate from the apps. The apps do not require an Athletickle account. Anything you choose to post on Discord is shared there.'],
] as const
