export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  return (
    <main>
      <h1>Service: {service}</h1>
    </main>
  )
}
