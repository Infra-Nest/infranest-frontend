const missingEnglishTranslations = new Set<string>()

export function recordMissingEnglishTranslation(copy: string): void {
  if (!missingEnglishTranslations.has(copy) && import.meta.env.DEV) console.warn(`Missing English translation: ${copy}`)
  missingEnglishTranslations.add(copy)
}

export function getMissingEnglishTranslations(): string[] {
  return [...missingEnglishTranslations]
}
