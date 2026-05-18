<template>
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
        <p class="text-brand-sage font-poppins">Cargando invitación...</p>
    </div>
    <div v-else-if="!event" class="flex justify-center items-center min-h-screen">
        <p class="text-gray-400 font-poppins">Evento no encontrado.</p>
    </div>
    <div v-else>
        <!-- Secciones de quinceañera -->
        <headerComponent></headerComponent>
        <heroComponent></heroComponent>
        <SaveDateComponent></SaveDateComponent>
        <googleMap id="ubicacion"></googleMap>
        <timeLine id="fecha"></timeLine>
        <contactNovios id="informacion"></contactNovios>
        <DressCode id="dressCode"></DressCode>
        <confirmComponent class="" id="confirmacion"></confirmComponent>
    </div>
</template>

<script setup>
const { event, pending } = useEvent()
provide('event', event)
</script>
