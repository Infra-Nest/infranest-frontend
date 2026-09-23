const missingEnglishTranslations = new Set<string>()

/** Records a missing English translation and warns once during development. */
export function recordMissingEnglishTranslation(copy: string): void {
  if (!missingEnglishTranslations.has(copy) && import.meta.env.DEV) console.warn(`Missing English translation: ${copy}`)
  missingEnglishTranslations.add(copy)
}

/** Returns the user-facing copy still missing an English translation. */
export function getMissingEnglishTranslations(): string[] {
  return [...missingEnglishTranslations]
}
