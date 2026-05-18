<template>
  <div id="our-parents" class="divide-y divide-gray-200 dark:divide-white/10 overflow-hidden rounded-2xl shadow-lg my-12 md:my-16 dark:shadow-black/30">
    <div class="px-4 py-5 sm:px-6 flex justify-center text-balance">
      <span
        v-if="introText"
        class="lora text-center mx-auto font-semibold text-2xl dark:text-white"
        v-html="introText"
      ></span>
      <span v-else class="lora text-center mx-auto font-semibold text-2xl dark:text-white">
        Con nuestro amor y con la presencia de Dios entre nosotros y la bendición de nuestros padres:
      </span>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <section class="flex flex-col items-center my-10 px-4">
        <div class="flex flex-col md:flex-row items-center justify-center gap-5">
          <template v-for="(grupo, index) in parentGroups" :key="index">
            <!-- Grupo de padres -->
            <div class="text-center font-playfair text-[#6a8e58] dark:text-[#8ab87a] text-xl leading-snug">
              <p>{{ grupo.fatherName }}</p>
              <p>{{ grupo.motherName }}</p>
            </div>

            <!-- Separador entre grupos (no después del último) -->
            <template v-if="index < parentGroups.length - 1">
              <div class="flex flex-col items-center gap-1 md:hidden">
                <div class="w-px h-6 bg-brand-sage/30"></div>
                <NuxtImg alt="Flor" src="t.webp" class="size-10 object-cover z-20" />
                <div class="w-px h-6 bg-brand-sage/30"></div>
              </div>
              <NuxtImg alt="Flor" src="t.webp" class="size-10 object-cover z-20 hidden md:block" />
            </template>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const event = inject('event')
import { ref, onMounted } from 'vue';
const introText = computed(() => event?.value?.parents?.introText ?? null)
const parentGroups = computed(() => event?.value?.parents?.parentGroups ?? [])
onMounted(async () => {
    console.log('padres',parentGroups)
    });
</script>
