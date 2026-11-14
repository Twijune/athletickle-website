# Blog batch 1: brief

14 November 2026. Five English blog posts chosen from the DataForSEO first pass. Every agent working on this batch reads this file first. An exercise physiologist edits the posts before they go live, so drafts are marked `draft: true` and never published by this pipeline.

## Why these posts

The site has no Google rankings yet (`2026-11-13-dataforseo-first-pass.md`, repo root). The analysis found low-difficulty searches that match what the apps already do. Each post targets one cluster of those searches and ends with an honest link to the app that fits.

## Sources to read

| What | Where |
|---|---|
| Keyword data and the reasons for each topic | `2026-11-13-dataforseo-first-pass.md` (repo root), section 3 |
| What the apps do and must not be said to do | `docs/marketing/CLAIMS.md`, `src/data/marketing.ts`, `src/i18n/marketingCopy.ts` |
| Banned words and sentence shapes | `/Users/anttivuoriainen/Documents/Athletickle-marketing/slop-blacklist.md` |
| Brand tone | `/Users/anttivuoriainen/Documents/Athletickle-marketing/brand-and-source-material.md` (its Strength store note is out of date: Strength is live on Google Play) |
| Existing posts, for format | `src/content/blog/*/en.md` |
| Per-post product sheet (written by the claim checker) | `/Users/anttivuoriainen/Documents/Athletickle-marketing/Drafts/blog-batch-1/claims-sheet.md` |

The app source code is not available. Product statements must come from the files above, nothing else.

## Voice and language

- British English with Oxford spelling: `-ize` (periodization, organize), but colour, metre, practise (verb) and practice (noun), centre, ageing. Keep "program" for a training program, because the app and site use it.
- Second person to the reader. "We" for Athletickle only in the product section. No first-person founder voice: Mika has not signed these.
- Plain, direct, short sentences. Explain a term the first time it appears. Concrete numbers and worked examples over general statements.
- Sentence case for the title and headings.
- Must pass `python3 -I /Users/anttivuoriainen/Documents/Athletickle-marketing/scripts/check_slop.py <file>` with zero hits. That includes no em-dashes and no semicolons. Spaced en-dashes are flagged, but `3–5` style ranges are fine.

## Format

- File: `src/content/blog/<slug>/en.md`. Frontmatter fields: `title`, `description`, `date: "2026-11-14"` (placeholder, set at publication), `slug` (must equal the folder name), `lang: "en"`, `tags`, `draft: true`. Use double quotes, like the existing posts.
- Title: 60 characters or fewer, with the primary keyword near the start. Description: 120 to 160 characters, plain.
- The page already renders the title as the H1. The body starts with a short intro (two or three short paragraphs that answer the search straight away), then `##` sections, with `###` sections where needed.
- No tables (the blog has no table styling). Lists, bold, blockquotes and links are fine.
- Length: 1,200 to 1,800 words. Long enough to compete, short enough that every section earns its place.
- Tags: lowercase, two or three from `programming`, `training`, `recovery`, `jumping`, `parkour`, `strength`, `running`.

## Evidence and citations

- Every training claim that isn't common gym knowledge gets an inline link to a primary source: PubMed, a DOI or the journal page. Prefer systematic reviews and meta-analyses, then controlled trials.
- Report findings at the strength the paper supports. "One small study found" is fine. Never round a finding up.
- Never invent a study, an author, a number or a quote. If a source can't be found, cut the claim.
- Health and injury: you may report what research found, hedged as the paper hedges it. Never say or imply that Athletickle prevents injury, treats anything or replaces a professional.

## Links and CTA

- Internal links where they help the reader: `/blog/rir-autoregulation`, `/blog/progressive-overload-guide`, other batch posts at `/blog/<slug>`, `/parkour`, `/strength`, `/about`.
- The last `##` section says plainly how Athletickle handles the topic, using only statements from the claims sheet. It ends with the CTA links:
  - Parkour: `[See Athletickle Parkour](/parkour)` and `[get it on Google Play](https://play.google.com/store/apps/details?id=com.athletickle.pk)`
  - Strength: `[See Athletickle Strength](/strength)` and `[get it on Google Play](https://play.google.com/store/apps/details?id=com.athletickle.str)`
  - For a post covering both apps, link both.
- Mention the free first four-week block if it fits ("your first four-week block is free", never "four weeks free", which reads like a timed trial). Don't mention prices, trials or release dates, and don't call the apps pre-launch.
- The checker bans "unlock", which the site uses a lot. Write "becomes available" or "continue into later blocks" instead.
- At most one other product mention in the body, and only where it answers the reader's question.
- Never name competitors. Never name Athletica's athletes, teams or clients.

## The five posts

### 1. `deload-week` (pilot)
- **Primary search:** deload week (3,600/month, KD 0). Also cover "what is a deload", "how often to deload" and "deload week workout".
- **Intent:** someone who's been lifting for a while and has heard of deloads wants to know what one is, whether they need one and how to run one.
- **Angle:** what a deload changes (volume, intensity, or both), planned versus reactive deloads, how often, what a deload week looks like for a typical program, and what the research does and doesn't show.
- **App:** both. Every four-week block includes a deload, planned in advance.
- **Traps:** no promises of recovery, performance or injury outcomes. Don't state exact volume reductions as something the app guarantees.

### 2. `periodization-models`
- **Primary search:** periodization training (1,600, KD 15) and sports periodization (3,600, KD 11–13). Also undulating (1,000), linear (590) and block (390) periodization, all KD 0, and mesocycle (1,900, KD 0) as its own section.
- **Intent:** learning the models and which one suits whom.
- **Angle:** macro, meso and microcycles, then linear, block, and weekly and daily undulating periodization, each with a short example week and what the comparison research shows.
- **App:** both. Four-week blocks (mesocycles) on a 12- or 24-week roadmap. The sequence is planned and visible up front. Detailed later blocks are generated when they become available, and the end-of-block check-in informs the next block.
- **Traps:** don't say the next block is "chosen" at the end of the previous one, because the sequence is planned first. Don't name which periodization model the app or any block type uses. Don't claim peaking, tapering or planning toward a competition. Not every user gets every block type. Don't describe the app's internal model beyond the claims sheet. "Daily undulating periodization" shows 18,100 searches, which is suspect, so don't build the title around it.

### 3. `how-to-jump-higher`
- **Primary search:** how to jump higher (6,600, KD 2), vertical jump training (1,900, KD 0).
- **Intent:** practical. What training makes you jump higher, and how to structure it.
- **Angle:** what jump height depends on (force, rate of force development, technique, body mass), and how strength training, plyometrics and contrast training each contribute, with the research. Add a sample week, and say how long changes take, hedged.
- **App:** Parkour. Eligible programs can include jump-focused blocks, contrast sessions pairing a lift with a direction-matched jump, and speed-style lifting sessions. Experience decides what's available.
- **Traps:** no "add X cm" promises. No separate sprint workouts in the app. The app doesn't teach parkour skills or technique.

### 4. `two-day-full-body-workout`
- **Primary search:** 2 day full body workout (480, KD 0), minimum effective dose (320, KD 5).
- **Intent:** a busy person wants a two-day plan that still works.
- **Angle:** what research says about low-frequency, low-volume training for strength and muscle mass (minimum effective dose), how to build two full-body sessions, and how progression still happens. Include a sample two-day template.
- **App:** Strength. The minimal effective dose mode builds two full-body sessions a week with a reduced volume budget, and progression and deloads stay in the plan. It's chosen when the program is created and stays with that program.
- **Traps:** no promised session length. The mode is not a weekly toggle. No claims about results.

### 5. `strength-training-for-runners`
- **Primary search:** strength training for runners (18,100, KD 6). Also strength training for athletes (2,400, KD 1) and concurrent training (390, KD 0).
- **Intent:** a runner wants to know whether to lift, what to do and how to fit it in.
- **Angle:** what the research says about strength training and running economy and performance, the interference effect in concurrent training, which lifts matter, and how to schedule lifting around running. Show two-day examples.
- **App:** Strength, as a general gym plan that fits alongside running. The two-day mode is the natural fit.
- **Traps:** the app has **no** running or other-sport input. Other sports are a future direction, not a current feature (`CLAIMS.md`). Don't imply the app adjusts for your running. Strength's exercise pool has no impact or plyometric movements, so the product section mustn't mention jumps or plyometrics, even if the body recommends them. Report the injury-risk research only as hedged as the papers are.

## Pipeline and files

Working files go in `/Users/anttivuoriainen/Documents/Athletickle-marketing/Drafts/blog-batch-1/<slug>/`:

1. `01-research.md`, by the hunter: the current top results and what they cover, related questions people ask, gaps, an outline, and a source list with verified links and one-line findings.
2. `../claims-sheet.md`, by the claim checker, shared by all five: what each post may say about the product, and what it must not.
3. `src/content/blog/<slug>/en.md`, by the writer: the draft.
4. `03-redteam.md`, by the red team: claim, science, citation and blacklist problems, with line references and a verdict.
5. `04-reader-<persona>.md`, by the readers: a cold read.
6. The writer revises, and then `05-editor-notes.md` lists the claims and sources the physiologist should check first.

## Lessons from the pilot (`deload-week`)

`src/content/blog/deload-week/en.md` is the approved reference for voice and structure. Read it before writing. Its red-team report at `Drafts/blog-batch-1/deload-week/03-redteam.md` shows the mistakes to avoid.

- **Practical first.** Answer the search, then the how-to with an example, then "is this for you", then a condensed research section, then the product section. Readers skipped research that came before the how-to.
- **Label the source of every rule of thumb:** "common coaching practice", "one trial found", "we could not find". "We could not find" is allowed outside the product section, for absence claims. Never write "no study has" or "only one trial".
- **Credit things correctly.** A definition the authors proposed is not something a panel agreed. A figure from a survey is not from a review. Report survey percentages separately. Never add them up.
- **Name a source once or twice, not ten times.** "The panel agreed" repeated read as machine-written to both readers.
- **Examples must be internally consistent.** Check set counts, totals, and load against RIR (the same weight for the same reps can't suddenly leave more in reserve). Label every sample week as an illustration, not what either app prescribes.
- **Mark where a quoted finding came from.** Say so where a claim rests on an abstract only. Report the study population (trained or untrained, young or old) whenever it limits the finding.
- **Add a short section for the other audience** where it applies (parkour practitioners, runners, people whose main sport isn't the gym), hedged as coaching judgement.
- **Product section:** one shared paragraph, then one line per relevant app, each with its two links. Never describe what a session or block in the app contains beyond the claims sheet.
- **Keep study details out of the how-to sections** (readers in round 2 all said this). In practical sections, give the advice in plain words with at most a short inline link. Study sizes, populations, effect sizes and "abstract only" caveats go in the research section. Notes about where a claim came from ("this comes from the abstract") go in the editor notes, never in the post.
- **Lead with the reader's worry.** Answer the question they searched with in the first paragraphs, plain and specific ("two days builds muscle, more slowly", "lifting won't make you heavier"), before any method.
- **Plain words in the product section.** Avoid internal terms like "volume budget" or "toggle". Say what it means for the reader, still within the claims sheet. You may mention beginner free-weight mode and the demonstration videos ("some movements have no video"), but never pitch the app to people who have never lifted. The Terms (`src/pages/Terms.tsx:91–93`) say it is "built for people who already train" and assumes you know the movements, so say that plainly.
- **Keep illustration labels short:** "Example plan, not an Athletickle program".
- **Editor notes** (`05-editor-notes.md`) list, in priority order, the sentences the physiologist should check first.

## Done means

- `check_slop.py` reports zero hits on the post.
- `bun run build` passes.
- The red team has opened every cited link and confirmed it says what the post says.
- Every product statement traces to the claims sheet.
- `draft: true` is still set.
