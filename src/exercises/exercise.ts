import { createContext } from 'react'
import type { Edition } from '../data/marketing'

/**
 * One exercise demo page, /exercises/<slug>. Generated into
 * src/data/exercises.json by scripts/sync-exercises.ts.
 *
 * The pages are unlisted: noindex, left out of the sitemap, linked from
 * nowhere on the site, and the full list never ships to the browser. Each
 * prerendered page embeds only its own entry (EXERCISE_DATA_ID), which
 * main.tsx reads back for hydration. Only the SSR build imports the full list.
 */
export interface ExerciseEntry {
  slug: string
  name: string
  /** Display name of the app's category, e.g. "Lower body, front". */
  category: string
  /** The app's note on the exercise, e.g. "1 repetition = all 3 directions". */
  info?: string
  /** 720p MP4 on the Bunny Stream CDN, the same file the apps play. */
  video: string
  poster: string
  editions: Edition[]
}

export const EXERCISE_DATA_ID = 'exercise-data'

export const ExerciseContext = createContext<ExerciseEntry | null>(null)

export function exercisePath(slug: string): string {
  return `/exercises/${slug}`
}

export function exerciseSlugFromPath(pathname: string): string | null {
  return /^\/exercises\/([a-z0-9-]+)\/?$/.exec(pathname)?.[1] ?? null
}

/** The <script> a prerendered exercise page carries its entry in. */
export function embedExercise(entry: ExerciseEntry): string {
  const json = JSON.stringify(entry).replaceAll('<', '\\u003c')
  return `<script type="application/json" id="${EXERCISE_DATA_ID}">${json}</script>`
}

export function readEmbeddedExercise(): ExerciseEntry | null {
  const el = document.getElementById(EXERCISE_DATA_ID)
  if (!el?.textContent) return null
  try {
    return JSON.parse(el.textContent) as ExerciseEntry
  } catch {
    return null
  }
}
