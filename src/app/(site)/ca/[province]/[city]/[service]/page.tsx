export default async function CityServicePage({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}) {
  const { province, city, service } = await params
  return (
    <main>
      <h1>
        {service} in {city}, {province}
      </h1>
    </main>
  )
}
