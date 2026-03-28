export default async function USCityServicePage({
  params,
}: {
  params: Promise<{ state: string; city: string; service: string }>
}) {
  const { state, city, service } = await params
  return (
    <main>
      <h1>
        {service} in {city}, {state}
      </h1>
    </main>
  )
}
