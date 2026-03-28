export default async function USCityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}) {
  const { state, city } = await params
  return (
    <main>
      <h1>
        City: {city}, {state}
      </h1>
    </main>
  )
}
