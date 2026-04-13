/**
 * JSON-LD: HowTo schema
 * Used on: Service pages, CityService "How It Works" sections
 */
export function buildHowToSchema(data: {
  name: string
  description: string
  steps: Array<{
    name: string
    text: string
    url?: string
    image?: string
  }>
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string
  }
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    ...(data.totalTime && { totalTime: data.totalTime }),
    ...(data.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: data.estimatedCost.currency,
        value: data.estimatedCost.value,
      },
    }),
    ...(data.url && { url: data.url }),
    step: data.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
  }
}
