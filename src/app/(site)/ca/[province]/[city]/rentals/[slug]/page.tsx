export const dynamicParams = true

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ province: string; city: string; slug: string }>
}) {
  const { province, city, slug } = await params
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">{slug}</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Property listing in {city}, {province}.
      </p>
    </main>
  )
}
