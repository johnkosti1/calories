import {TRANSLATIONS} from './en'

type Tr = typeof TRANSLATIONS
export type TranslationKeys = keyof Tr

export function trans<T extends TranslationKeys, O extends Tr[T]>(key: T): O {
  return TRANSLATIONS[key] as O
}
