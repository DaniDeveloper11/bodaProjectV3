<template>
    <section class="w-full">
        <div class="py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
            <div class="w-full flex justify-end -mb-28 -mr-20">
                <NuxtImg src="flowerCorner.webp" class="-scale-y-100 size-40 md:size-60"></NuxtImg>
            </div>
            <div class="flex flex-col justify-center my-10">
                <h2 class="text-2xl font-dancing text-gray-800 mb-4 md:text-4xl dark:text-white">Contacta a los novios</h2>
                <div class="flex flex-col w-full gap-6 mx-auto max-w-2xl my-8">
                    <a
                        v-for="(contacto, i) in contactos"
                        :key="i"
                        class="relative flex gap-4 justify-center bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition duration-300"
                        :href="contacto.whatsappUrl"
                        target="_blank"
                    >
                        <NuxtImg
                            class="size-11 absolute top-0 left-0"
                            src="diseno-floral-2.webp"
                        ></NuxtImg>
                        <NuxtIcon class="text-white" name="whatsapp"></NuxtIcon>
                        <div class="flex flex-col items-center justify-center">
                            <span class="text-xs">{{ contacto.label }}</span>
                            <span class="text-xs font-bold">{{ contacto.phone }}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const event = inject('event')

const contactosFallback = [
    { label: 'Contacta al Novio',  phone: '+52 3314857062', whatsappUrl: 'https://wa.me/5213314857062?text=Hola%20Daniel%20y%20Daniela,%20quería%20contactarlos%20por%20su%20boda!' },
    { label: 'Contacta a la Novia', phone: '+52 3334001701', whatsappUrl: 'https://wa.me/5213334001701?text=Hola%20Daniel%20y%20Daniela,%20quería%20contactarlos%20por%20su%20boda!' },
]

const contactos = computed(() => {
    const lista = event?.value?.contacts?.contactList
    if (lista?.length) return lista
    return contactosFallback
})
</script>
<style>
.nuxt-icon svg {
    width: 1.8em;
    height: 1.8em;
    margin-bottom: 0.125em;
    vertical-align: middle;
    color: white;
}
</style>