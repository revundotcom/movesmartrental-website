export default async function ProvincePage({
  params,
}: {
  params: Promise<{ province: string }>
}) {
  const { province } = await params
  return (
    <main>
      <h1>Province: {province}</h1>
    </main>
  )
}
