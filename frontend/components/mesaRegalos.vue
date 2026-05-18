<template>
    <div id="mesa-regalos" class="my-20 max-w-6xl mx-auto">
        <div class="w-full flex justify-end -mb-28 -mr-20">
            <NuxtImg src="flowerCorner.webp" class="-scale-y-100 size-40"></NuxtImg>
        </div>
        <div class="flex flex-col justify-center my-10">
            <h2 class="text-6xl font-dancing text-gray-800 mb-4 dark:text-white">Regalos</h2>
            <p class="text-gray-600 mb-6 dark:text-white">¡Tu presencia es el mejor regalo! Pero si deseas contribuir, aquí tienes
                algunas opciones:</p>
            <div class="flex flex-col w-full gap-6 mx-auto max-w-2xl">
                <a
                    class="relative bg-violet-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-violet-600 transition duration-300 text-center"
                    :href="registryUrl"
                    target="_blank">
                    <NuxtImg class="size-11 absolute top-0 left-0" src="diseno-floral-3.webp"></NuxtImg>
                    Mesa de Regalos
                </a>
                <button
                    class="relative bg-violet-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-violet-600 transition duration-300 text-center"
                    @click="irABanco">
                    <NuxtImg class="size-11 absolute bottom-0 right-0 -scale-y-100 -scale-x-100" src="diseno-floral-3.webp"></NuxtImg>
                    Datos Bancarios
                </button>
            </div>
        </div>
        <div class="text-center mt-10">
            <p class="text-gray-600 dark:text-white">Para más información, contacta a los novios.</p>
            <p class="text-gray-600 dark:text-white">¡Gracias por ser parte de nuestro día especial!</p>
        </div>
    </div>
</template>

<script setup>
const event = inject('event')

const registryUrl = computed(() => {
    const url = event?.value?.gifts?.registryUrl
    return url || 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51992607'
})

const irABanco = () => {
    navigateTo('/banco')
}
</script>
