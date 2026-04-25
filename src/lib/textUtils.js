export function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function countCharacters(text) {
  return text.length
}

export function countCharactersNoSpaces(text) {
  return text.replace(/\s/g, "").length
}

export function countSentences(text) {
  return text.split(/[.!?]+/).filter(Boolean).length
}

export function countParagraphs(text) {
  return text.split(/\n+/).filter(Boolean).length
}

export function calculateReadingTime(words) {
  return Math.ceil(words / 200)
}

export function calculateSpeakingTime(words) {
  return Math.ceil(words / 150)
}