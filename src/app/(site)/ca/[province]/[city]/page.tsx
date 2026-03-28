export default async function CityPage({
  params,
}: {
  params: Promise<{ province: string; city: string }>
}) {
  const { province, city } = await params
  return (
    <main>
      <h1>
        City: {city}, {province}
      </h1>
    </main>
  )
}
