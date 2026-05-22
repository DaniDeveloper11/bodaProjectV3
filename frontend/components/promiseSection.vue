<template>
    <div id="promise" class="md:flex justify-center items-center py-12 md:py-16 lg:py-24 px-4 mx-auto gap-8">
        <div class="flex justify-center items-center w-full mx-auto h-[70vh]">
            <NuxtImg :src="imagenStory" class="object-cover"></NuxtImg>
        </div>
        <div class="w-full my-4">
            <h2 class="text-3xl sm:text-4xl md:text-5xl text-left font-playfair text-brand-sage my-2">
                {{ titulo }}
            </h2>
            <div>
                <p v-if="cuerpo" class="lora text-left text-lg mr-14 text-gray-800" v-html="cuerpo"></p>
                <p v-else class="lora text-left text-lg mr-14 text-gray-800">
                    Nos conocimos en el 2015 y desde ese momento sentimos esa
                    conexión. Sin embargo, no fue hasta finales del 2018 donde volvimos a reconectar y el resto es
                    historia. Desde ese momento supimos que éramos el uno para el otro. Cada risa compartida, cada
                    abrazo y cada sueño construido nos llevó hasta aquí. Ahora, con el corazón lleno de amor y emoción,
                    damos el siguiente paso: unir nuestras vidas para siempre.
                </p>
            </div>
            <div class="flex justify-end -mt-28 md:-mt-20 -mr-9">
                <NuxtImg src="flowerCorner.webp" class="size-52"></NuxtImg>
            </div>
        </div>
    </div>
</template>

<script setup>
const event = inject('event')
const config = useRuntimeConfig()

const titulo = computed(() => event?.value?.story?.title ?? 'UNA PROMESA PARA TODA LA VIDA')
const cuerpo = computed(() => event?.value?.story?.body ?? null)
const imagenStory = computed(() => {
    const url = event?.value?.story?.mainImage?.url
    if (!url) return '/foto2.webp'
    return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
})
</script>
