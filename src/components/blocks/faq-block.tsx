import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQBlockProps } from '@/types/blocks'

export function FAQBlock({
  questions,
  title = 'Frequently Asked Questions',
  schemaEnabled = true,
}: FAQBlockProps) {
  if (questions.length === 0) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>

      <Accordion>
        {questions.map((item, index) => (
          <AccordionItem key={index} value={String(index)}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {schemaEnabled && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </section>
  )
}
