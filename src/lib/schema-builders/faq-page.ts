/**
 * JSON-LD: FAQPage schema
 * Used on: CityService pages, FAQ sections
 */
export function buildFaqPageSchema(data: {
  questions: Array<{ question: string; answer: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}
