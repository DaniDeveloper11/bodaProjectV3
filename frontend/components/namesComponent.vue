<template>
  <div class="flex justify-center pb-10 px-4 w-full">
    <span
      class="text-white text-center text-5xl xs:text-6xl sm:text-7xl md:text-8xl leading-tight mx-auto mb-4"
      style="font-family: 'Alex Brush', cursive; text-shadow: 0 2px 16px rgba(0,0,0,0.45);"
    >
      {{ nombre1 }} <br> &amp; <br> {{ nombre2 }}
    </span>
  </div>
</template>

<script setup>
const event = inject('event')
const nombre1 = computed(() => event?.value?.name?.name1 ?? 'Daniela')
const nombre2 = computed(() => event?.value?.name?.name2 ?? 'Daniel')
</script>