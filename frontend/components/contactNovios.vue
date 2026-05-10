<template>
    <section class="w-full ">

        <div class="py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
            <div class="w-full flex justify-end -mb-28 -mr-20">
                <NuxtImg src="flowerCorner.webp" class="-scale-y-100 size-40 md:size-60"></NuxtImg>
            </div>
            <div class="flex flex-col  justify-center my-10">
                <h2 class="text-2xl font-dancing text-gray-800 mb-4 md:text-4xl dark:text-white">Contacta a los novios</h2>
                <!-- <p class="text-gray-600 mb-6">¡Tu presencia es el mejor regalo! Pero si deseas contribuir, aquí tienes
                algunas opciones:</p> -->
                <div class="flex flex-col w-full gap-6 mx-auto max-w-2xl my-8">
                    <a class="relative flex gap-4 justify-center bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition duration-300"
                        href="https://wa.me/5213314857062?text=Hola%20Daniel%20y%20Daniela,%20quería%20contactarlos%20por%20su%20boda!">
                        <!-- <GiftIcon class="inline-block w-6 h-6 mr-2" /> -->
                        <NuxtImg class="size-11 absolute top-0 left-0" src="diseno-floral-2.webp"></NuxtImg>

                        <NuxtIcon class="text-white" name="whatsapp"></NuxtIcon>
                        <div class="flex flex-col items-center justify-center">
                            <span class="text-xs">Contacta al Novio</span>
                            <span class="text-xs font-bold">+52 3314857062</span>
                        </div>

                    </a>
                    <a class="relative flex gap-4 justify-center bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition duration-300"
                        href="https://wa.me/5213334001701?text=Hola%20Daniel%20y%20Daniela,%20quería%20contactarlos%20por%20su%20boda!">
                        <!-- <GiftIcon class="inline-block w-6 h-6 mr-2" /> -->
                        <NuxtImg class="size-11 absolute bottom-0 right-0 -scale-y-100 -scale-x-100"
                            src="diseno-floral-2.webp"></NuxtImg>

                        <NuxtIcon class="text-white" name="whatsapp"></NuxtIcon>
                        <div class="flex flex-col items-center justify-center">
                            <span class="text-xs">Contacta a la Novia</span>
                            <span class="text-xs font-bold">+52 3334001701</span>
                        </div>

                    </a>
                </div>
            </div>
            <!-- <div class="text-center mt-10">
            <p class="text-gray-600">Para más información, contacta a los novios.</p>
            <p class="text-gray-600">¡Gracias por ser parte de nuestro día especial!</p>
        </div> -->
        </div>
    </section>

</template>
<script setup>
import { GiftIcon, CreditCardIcon } from '@heroicons/vue/20/solid'
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