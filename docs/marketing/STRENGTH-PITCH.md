# Athletickle Strength — current pitch

Updated 23 September 2026. Consumer audience: gym users seeking structured strength and muscle training. Both apps are pre-launch. This replaces the previous draft's unsupported competitor and exclusivity claims.

## One line

**Give your strength training a direction.**

## Thirty-second pitch

Choose your weekly frequency, your experience and whether you want to emphasize strength, muscle or both. Athletickle Strength lays out a 12- or 24-week roadmap in four-week blocks, then builds the detailed training one block at a time. Progression and a deload are part of the plan.

Only want two strength sessions a week? Choose the reduced-volume mode when creating your program. Want guidance from your logs? The app can suggest adding load, repeating it or easing back, without pretending to know the exact weight you should lift.

Your first complete four-week block is free. Your programs and logs stay on your phone, without an Athletickle account. Join the pre-launch beta community on Discord.

## Five demonstrable angles

1. **A roadmap you can see.** Three or six four-week blocks; later blocks generated on unlock. Source: ProgramService.generateProgram.
2. **A two-day option.** Minimal effective dose reduces the two-day volume budget and persists with the program. No session-duration guarantee. Source: CreateProgramScreen and prog.json.minimalEffectiveDose.
3. **Choose your emphasis.** Muscle/strength bias and separate upper/lower-body preference. These influence selection and distribution rather than exclude all other work. Source: CreateProgramScreen and VolumeService.
4. **Useful logging without mandatory logging.** Load-direction cues do not rewrite current workouts; no logs do not mean failed sessions. Source: ProgressionService and ProgramDetailScreen.
5. **Local training data.** No Athletickle account or training-data backend. External videos and store operations still need connectivity; premium has three days of offline grace. No cloud backup or device sync.

## Offer and boundaries

The free tier is a complete first block, not a timed store trial. Later blocks require a subscription. The 21-day pacing gate applies to subscribers too. Use actual store pricing when available; no price is asserted in this pitch.

Gym access is assumed; bodyweight preference is not an equipment-free mode. Swap eligible equivalents before saving; saved programs are fixed. The non-impact exercise pool contains 207 movements before further filtering, 204 with nonempty video links; links still need release checks.

Use reps-in-reserve to describe effort-based work, but do not say the app never uses load percentages. Some prescribed work does. Do not promise medical benefits, injury prevention, automatic body monitoring, guaranteed progress or unverified superiority over competitors.

For founder biography, creator briefs and evidence see the website repository's `docs/marketing/` launch kit. Named athlete endorsements and app performance outcomes have not been supplied.
