# Claims and evidence register

Verified against local source on 23 September 2026. Source inspection establishes implementation, not release availability or measured training outcomes. Recheck against the release candidate before store submission.

App roots: `../ParkourTrainingApp` (PK), `../Athletickle STR` (STR), relative to the website repository.

| Claim | Edition | Evidence under app root | Required qualification |
|---|---|---|---|
| 12- or 24-week roadmap | Both | `src/services/ProgramService.ts`, `src/screens/CreateProgramScreen.tsx` | Three or six four-week blocks; only first block is materialized initially |
| First complete four-week block free | Both | `src/screens/CreateProgramScreen.tsx`, subscription context | Later blocks require subscription; both apps are pre-launch |
| 21-day unlock pacing | Both | `UNLOCK_MIN_DAYS` in `src/services/ProgramService.ts` | Also applies to subscribers |
| Two-day reduced-volume mode | STR | `src/data/prog.json` minimalEffectiveDose, Create screen | Selected at creation and persists; no promised workout duration |
| Muscle/strength and upper/lower emphasis | STR | Create screen; `src/services/VolumeService.ts` | A programming bias, not an absolute filter |
| Add / hold / reduce progression cues | STR only | `src/services/ProgressionService.ts`, ProgramDetail screen | Direction, not a prescribed kg value; no current-block rewrite |
| Pre-save swaps | Both | `getSwapCandidates`/`swapExercise` in MesocycleService; ProgramDetail | Eligible equivalent slots only; saved plan fixed; dose preserved |
| Beginner free-weight mode | Both | teachingMode in Create and MesocycleService | Fundamental-lift programming, not technique assessment |
| Exercise demo links | Both | exercises.json Link; ProgramDetail Linking.openURL | External links require internet; not every movement has one |
| No Athletickle account; local training data | Both | StorageService, ProgramService | Discord and external providers are separate; no cloud restore/sync |
| Program export | Both | ProgramDetail handleExport/Share.share | Shared text, not an importable backup |
| Parkour-frequency input | PK | Create screen; VolumeService | Complementary strength/power, not generated technical parkour sessions |
| Optional logging | Both | generation independent of WorkoutLog; logging screen | STR has extra log-based cues; PK does not |
| Scheduled deloads | Both | prog.json; MesocycleService | Avoid exact realized-volume guarantees; integer dosing and special cases apply |
| Coaching background | Founder | Owner's founder-profile.md and supplied public identity | Mika; MSc Exercise Physiology; parkour since 2005, coaching since 2006; Athletica co-founder. Company client counts are not app users. Not an app endorsement or outcomes study |
| Teaching and academic background | Co-founder | Supplied by Antti Vuoriainen, 24 September 2026 | Antti Vuoriainen; M.Ed and M.Sc; parkour teaching in Finland 2008–2024; currently a researcher. Field and institution intentionally unnamed. Not an endorsement or outcomes claim |

Both data files contain 258 exercise rows and 255 nonempty Link fields. STR excludes 51 Impact rows during selection, so its non-impact pool is 207 (204 linked) before other eligibility filters. Count links, not verified videos. Ten distinct block types exist across editions; not every user receives every type. Eccentric overload is a session style, not a separate STR block.

## Do not reuse

- “Join thousands”, “no more plateaus”, “only app”, unsupported competitor superiority or unverified competitor prices.
- Climbing, surfing or snowboarding as currently available sport programs.
- Strength+Cardio or Strength+Mobility tracks as existing products.
- “Every exercise can be swapped”, “every exercise has video”, or “fully offline” without qualifications.
- Session-by-session automatic adaptation, body monitoring or fatigue detection.
- A no-equipment claim based on the bodyweight preference.
- Separate sprint/speed training as a visible PK option; those controls are disabled.
- “Four months”: the available lengths are 12 or 24 weeks.
- Health, medical, rehab, diagnostic or injury-prevention promises, consistent with both repositories' AGENTS.md.

Use the new edition briefs instead of unverified language from older pitch drafts. Exact store prices and release dates are intentionally omitted until confirmed in the stores.

## Founder identity and confidentiality

Use **Mika — Founder of Athletickle** publicly. The profile draft is the editorial source; it is not a public asset. Never publish athlete, team or client names, even in future campaign drafts; avoid uniquely identifying combinations of sport and achievement. The current bio omits the individual indoor-rowing world champion and the unresolved Parkour Akatemia end date. Portrait will be supplied by Mika. The co-founder is credited as **Antti Vuoriainen, M.Ed, M.Sc — Co-founder of Athletickle**; research field and institution stay unnamed.
