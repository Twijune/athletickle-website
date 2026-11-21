// Fails when a file contains an absolute path into someone's home directory
// (macOS, Linux or Windows). This repo is public, and such a path publishes a
// username and a private folder layout.
//
//   node scripts/check-local-paths.mjs            every tracked file (CI)
//   node scripts/check-local-paths.mjs --staged   what is about to be committed (pre-commit hook)
//
// To keep a line on purpose, put `allow-local-path` on it.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const staged = process.argv.includes('--staged')
const git = (...args) => execFileSync('git', args, { encoding: 'buffer', maxBuffer: 256 * 1024 * 1024 })
const root = git('rev-parse', '--show-toplevel').toString().trim()

// A real directory name must follow the home root, so placeholders such as
// <name> or $USER in documentation don't trip the check.
const HOME_PATH = /(?:\/(?:Users|home)\/|\b[A-Za-z]:[\\/]Users[\\/])[A-Za-z0-9._-]+(?=[\\/])/
const ALLOW = 'allow-local-path'

const listing = staged
  ? git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z')
  : git('ls-files', '-z')
const files = listing.toString().split('\0').filter(Boolean)

const hits = []
for (const file of files) {
  let bytes
  try {
    // --staged reads the index, so the check sees exactly what the commit will contain
    bytes = staged ? git('show', `:${file}`) : readFileSync(resolve(root, file))
  } catch {
    continue // deleted in the working tree, or a submodule entry
  }
  if (bytes.includes(0)) continue // binary
  bytes.toString('utf8').split('\n').forEach((line, i) => {
    const match = line.match(HOME_PATH)
    if (match && !line.includes(ALLOW)) hits.push(`${file}:${i + 1}: ${match[0]}`)
  })
}

if (hits.length > 0) {
  console.error(`Home-directory paths found in ${staged ? 'staged' : 'tracked'} files:\n`)
  for (const hit of hits) console.error(`  ${hit}`)
  console.error(`\nThis repo is public. Use a repo-relative path or name the folder without its location.`)
  console.error(`If the line is intentional, add "${ALLOW}" to it.`)
  process.exit(1)
}
console.log(`No home-directory paths in ${files.length} ${staged ? 'staged' : 'tracked'} files.`)
