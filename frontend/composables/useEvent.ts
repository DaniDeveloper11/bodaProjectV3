export const useEvent = () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const headers = useRequestHeaders(['host'])

  // Dev: ?event=daniela-daniel | Prod: daniela-daniel.tudominio.com
  const slug = computed(() => {
    if (route.query.event) return route.query.event as string
    const host = headers.host || ''
    const sub = host.split('.')[0]
    return (sub && sub !== 'localhost' && sub !== 'www') ? sub : ''
  })

  const { data, pending, error } = useFetch(
    () => `${config.public.strapiUrl}/api/events`,
    {
      params: {
        'filters[slug][$eq]': slug,
        'populate[hero][populate]': '*',
        'populate[name]': '*',
        'populate[parents][populate]': '*',
        'populate[story][populate]': '*',
        'populate[gallery][populate]': '*',
        'populate[map][populate]': '*',
        'populate[timeline][populate]': '*',
        'populate[contacts][populate]': '*',
        'populate[dressCode][populate]': '*',
        'populate[gifts][populate]': '*',
        'populate[recommendedHotels][populate]': '*',
      },
      watch: [slug]
    }
  )

  const event = computed(() => (data.value as any)?.data?.[0] ?? null)

  return { event, pending, error }
}
