export const dynamicParams = true

export default async function PropertyTypePage({
  params,
}: {
  params: Promise<{ province: string; city: string; propertyType: string }>
}) {
  const { province, city, propertyType } = await params
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">
        {propertyType} in {city}, {province}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Browse {propertyType} listings in {city}.
      </p>
    </main>
  )
}
