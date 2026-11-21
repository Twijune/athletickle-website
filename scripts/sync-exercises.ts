/**
 * Builds src/data/exercises.json, the data behind /exercises/<slug>, from the
 * two apps' exercise libraries. Re-run it whenever either app's
 * exercises.json changes (new clip, rename, new row):
 *
 *   bun scripts/sync-exercises.ts [path/to/PK/exercises.json] [path/to/STR/exercises.json]
 *
 * Defaults to the sibling checkouts in Algoritmii/. The output is committed,
 * because the deploy only sees this repository.
 *
 * Only exercises with a clip get a page. Slugs come from the exercise name,
 * so renaming an exercise moves its page; once the apps link here (their
 * `Link` field), a rename needs a redirect for links already shared.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { ExerciseEntry } from '../src/exercises/exercise'

interface AppRow {
  Name: string
  'Main category': string
  'Info:'?: string
  Video?: string
}

const root = process.cwd()
const [pkPath, strPath] = [
  process.argv[2] ?? path.join(root, '../ParkourTrainingApp/src/data/exercises.json'),
  process.argv[3] ?? path.join(root, '../Athletickle STR/src/data/exercises.json'),
]

// Mirrors CATEGORY_NAMES in the apps' src/utils/labels.ts
const CATEGORY_NAMES: Record<string, string> = {
  LBF: 'Lower body, front',
  LBB: 'Lower body, back',
  UBpush: 'Upper body, push',
  UBpull: 'Upper body, pull',
  Impact: 'Impacts',
  Mid: 'Core',
  Armor: 'Armouring',
}

const CLIP = /^https:\/\/vz-[0-9a-f-]+\.b-cdn\.net\/[0-9a-f-]{36}\/play_\d+p\.mp4$/

function slugify(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const load = async (file: string) => JSON.parse(await readFile(file, 'utf8')) as AppRow[]
const pk = await load(pkPath)
const str = new Map((await load(strPath)).map((row) => [row.Name, row]))

const problems: string[] = []
const bySlug = new Map<string, ExerciseEntry>()

for (const row of pk) {
  const strRow = str.get(row.Name)
  if (strRow) {
    str.delete(row.Name)
    for (const key of ['Video', 'Main category', 'Info:'] as const) {
      if ((strRow[key] ?? '') !== (row[key] ?? '')) {
        problems.push(`${row.Name}: PK and STR disagree on ${key}`)
      }
    }
  }
  if (!row.Video) continue
  if (!CLIP.test(row.Video)) problems.push(`${row.Name}: unexpected Video ${row.Video}`)
  const category = CATEGORY_NAMES[row['Main category']]
  if (!category) problems.push(`${row.Name}: unknown category ${row['Main category']}`)
  const slug = slugify(row.Name)
  if (bySlug.has(slug)) problems.push(`${row.Name}: slug ${slug} taken by ${bySlug.get(slug)!.name}`)

  const entry: ExerciseEntry = {
    slug,
    name: row.Name,
    category,
    video: row.Video,
    poster: row.Video.replace(/play_\d+p\.mp4$/, 'thumbnail.jpg'),
    editions: strRow ? ['parkour', 'strength'] : ['parkour'],
  }
  const info = row['Info:']?.trim()
  if (info) entry.info = info[0].toUpperCase() + info.slice(1)
  bySlug.set(slug, entry)
}
// STR's pool is a subset of PK's; a row only STR has would be dropped silently
for (const name of str.keys()) problems.push(`${name}: in STR but not in PK`)

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}

const entries = [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug))
const out = path.join(root, 'src/data/exercises.json')
await writeFile(out, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
console.log(`wrote ${entries.length} exercise pages to ${path.relative(root, out)}`)
