<template>
    <div class="flex justify-center items-center min-h-screen">
        <p class="text-brand-sage font-poppins">Cargando invitación...</p>
    </div>
</template>

<script setup>
const { event, pending } = useEvent()
const route = useRoute()

watch([event, pending], ([e, p]) => {
    if (p) return
    if (!e) return

    const slug = route.query.event ? `?event=${route.query.event}` : ''

    if (e.eventType === 'wedding') {
        navigateTo(`/wedding${slug}`)
    } else if (e.eventType === 'quinceañera') {
        navigateTo(`/quinceanera${slug}`)
    } else if (e.eventType === 'birthday') {
        navigateTo(`/birthday${slug}`)
    } else if (e.eventType === 'wedding-minimalist') {
        navigateTo(`/wedding-minimalist${slug}`)
    } 
    else {
        navigateTo(`/wedding${slug}`)
    }
}, { immediate: true })
</script>
