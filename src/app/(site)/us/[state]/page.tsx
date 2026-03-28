export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  return (
    <main>
      <h1>State: {state}</h1>
    </main>
  )
}
