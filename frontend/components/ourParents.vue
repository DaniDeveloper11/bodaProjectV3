<template>
  <div id="our-parents" class="divide-y divide-gray-200 dark:divide-white/10 overflow-hidden rounded-2xl shadow-lg my-12 md:my-16 dark:shadow-black/30">
    <div class="px-4 py-5 sm:px-6 flex justify-center text-balance">
      <!-- Content goes here -->
      <!-- We use less vertical padding on card headers on desktop than on body sections -->
      <span class="lora text-center mx-auto font-semibold text-2xl dark:text-white">Con nuestro amor y con la presencia de Dios entre
        nosotros y la
        bendición de nuestros padres:</span>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <section class="flex flex-col items-center my-10 px-4">
        <div class="flex flex-col md:flex-row items-center justify-center gap-5">
          <!-- Padres del novio -->
          <div class="text-center font-playfair text-[#6a8e58] dark:text-[#8ab87a] text-xl leading-snug">
            <p>Enrique Orozco Hernandez</p>
            <p>Elizabet González Gutierrez</p>
          </div>

          <!-- Separador móvil -->
          <div class="flex flex-col items-center gap-1 md:hidden">
            <div class="w-px h-6 bg-brand-sage/30"></div>
            <NuxtImg alt="Flor" src="t.webp" class="size-10 object-cover z-20" />
            <div class="w-px h-6 bg-brand-sage/30"></div>
          </div>
          <NuxtImg alt="Flor" src="t.webp" class="size-10 object-cover z-20 hidden md:block" />

          <!-- Padres de la novia -->
          <div class="text-center font-playfair text-[#6a8e58] dark:text-[#8ab87a] text-xl leading-snug">
            <p>Héctor Rene Montes Orendain</p>
            <p>Antonia Villarreal Rangel</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
