<template>
    <div v-if="pending" class="flex justify-center items-center min-h-screen bg-white">
        <p class="text-gray-400 font-poppins tracking-widest text-sm uppercase">Cargando invitación...</p>
    </div>
    <div v-else-if="!event" class="flex justify-center items-center min-h-screen bg-white">
        <p class="text-gray-400 font-poppins">Evento no encontrado.</p>
    </div>

    <div v-else class="bg-white min-h-screen flex items-center justify-center px-8 py-16">
        <div class="w-full max-w-sm text-center space-y-20">

            <!-- Nombre 1 -->
            <div class="space-y-4">
            <h1 class="font-playfair font-bold text-6xl tracking-widest text-gray-900 uppercase leading-none">
                {{ event.name?.name1 ?? 'OLIVIA' }}
            </h1>
            <!-- "and" en script -->
            <p class="font-dancing text-4xl text-gray-700 my-1 leading-tight">
                and
            </p>
            <!-- Nombre 2 -->
            <h1 class="font-playfair font-bold text-6xl tracking-widest text-gray-900 uppercase leading-none">
                {{ event.name?.name2 ?? 'JAMES' }}
            </h1>
            </div>
            

            <!-- Separador -->
            <hr class="border-gray-900 border-t my-6 mx-auto w-full" />

            <div class='space-y-2'>
                  <!-- Texto de invitación -->
            <p class="font-poppins text-xs tracking-widest uppercase text-gray-600 leading-relaxed">
                {{ event.parents?.introText ?? 'Request the pleasure of your company at their wedding celebration' }}
            </p>


              <template v-for="(grupo, index) in parentGroups" :key="index">
                <!-- Grupo de padres -->
                <div class="text-center font-playfair text-[#6a8e58] dark:text-[#8ab87a] text-xl leading-snug">
                  <p>{{ grupo.fatherName }}</p>
                  <p>{{ grupo.motherName }}</p>
                </div>
  
             </template>
            </div>

      

            <!-- Fecha -->
            <p class="font-playfair font-bold text-lg tracking-wider text-gray-900 mt-6 uppercase">
                {{ formattedDate }}
            </p>

            <!-- Lugar -->
            <p v-if="venue" class="font-poppins text-xs tracking-widest uppercase text-gray-600 mt-2 leading-relaxed">
                {{ venue.placeName }}<br />
                {{ venue.name }}
            </p>

            <!-- "Reception to Follow" en script -->
            <p class="font-dancing text-2xl text-gray-700 mt-8">
                Reception to Follow
            </p>

        </div>
    </div>
</template>

<script setup>
const { event, pending } = useEvent()
provide('event', event)

const formattedDate = computed(() => {
    const raw = event.value?.eventDate
    if (!raw) return '12 de octubre de 20XX, a las 3:00 PM'

    const date = new Date(raw)
    const day = date.getDate()
    const month = date.toLocaleString('es-MX', { month: 'long' })
    const year = date.getFullYear()
    const time = date.toLocaleString('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true })

    return `${day} de ${month} de ${year}, a las ${time}`
})

const parentGroups = computed(() => event?.value?.parents?.parentGroups ?? [])
const venue = computed(() => {
    const locations = event.value?.map?.locations
    return Array.isArray(locations) && locations.length > 0 ? locations[0] : null
})
</script>
