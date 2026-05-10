<template>
  <div id="hero" class="relative w-screen h-screen overflow-hidden my-5">
    <countDown
      class="absolute top-0 left-1/2 -translate-x-1/2 z-10 pt-4 sm:pt-6"
    ></countDown>
    <NuxtImg
      alt="HeroImage"
      src="fotoHero.webp"
      class="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_25%]"
    />
    <!-- Gradiente sutil para legibilidad del texto -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
    <NamesComponent class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"></NamesComponent>
  </div>
</template>
