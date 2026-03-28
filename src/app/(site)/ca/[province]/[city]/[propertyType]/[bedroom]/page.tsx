export const dynamicParams = true

export default async function BedroomPage({
  params,
}: {
  params: Promise<{
    province: string
    city: string
    propertyType: string
    bedroom: string
  }>
}) {
  const { province, city, propertyType, bedroom } = await params
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">
        {bedroom} {propertyType} in {city}, {province}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Browse {bedroom} {propertyType} listings in {city}.
      </p>
    </main>
  )
}
