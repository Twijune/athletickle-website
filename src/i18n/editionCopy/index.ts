import type { Locale } from '../translations'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import type { EditionCopy } from './types'

export type { EditionCopy, EditionText } from './types'

export const editionCopy: Record<Locale, EditionCopy> = { en, fr, de, es }
