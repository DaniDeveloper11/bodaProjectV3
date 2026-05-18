<template>
  <section>

  <div class="mt-12 md:mt-16 lg:mt-20 mx-auto w-full">
    <div>
      <h2 class="text-brand-sage font-dancing text-5xl md:text-6xl text-center md:my-8">Dress Code</h2>
      <p class="text-center text-gray-900 dark:text-white font-lora text-md mt-2 font-medium">
        Queremos asegurarnos que todos se sientan cómodos y en sintonía con la
        celebración
      </p>
    </div>

    <div>
      <h3 class="font-dancing text-center text-3xl my-4 text-gray-900 dark:text-white">Formal</h3>

      <div class="flex justify-center gap-4">
        <div class="flex flex-col items-center">
          <h3 class="tex-center text-lg font-dancing text-gray-900 dark:text-white md:text-4xl">Ellas</h3>
          <p class="text-center text-gray-900 dark:text-white font-lora text-xs mt-2 font-medium md:text-md">
            {{ womenDescription }}
          </p>
          <p v-if="womenRestrictions" class="text-center text-brand-sage font-lora text-xs mt-2 font-medium md:text-sm">
            {{ womenRestrictions }}
          </p>
          <ul class="flex gap-3 justify-center mt-3">
            <li
              v-for="(color, i) in womenColors"
              :key="i"
              class="size-6 md:size-8 rounded-full border-2 border-white/40 shadow-md"
              :style="{ backgroundColor: color }"
            ></li>
          </ul>
        </div>
        <div>
          <NuxtImg :src="mainImage" class="rounded-lg shadow-lg object-cover max-w-60" />
        </div>
        <div class="flex flex-col items-center">
          <h3 class="tex-center text-lg font-dancing text-gray-900 dark:text-white md:text-4xl">Ellos</h3>
          <p class="text-center text-gray-900 dark:text-white font-lora text-xs mt-2 font-medium md:text-md">
            {{ manDescription }}
          </p>
          <p v-if="menRestriction" class="text-center text-brand-sage font-lora text-xs mt-2 font-medium md:text-sm">
            {{ menRestriction }}
          </p>
          <ul class="flex gap-3 justify-center mt-3">
            <li
              v-for="(color, i) in menColors"
              :key="i"
              class="size-6 md:size-8 rounded-full border-2 border-white/40 shadow-md"
              :style="{ backgroundColor: color }"
            ></li>
          </ul>
        </div>
      </div>
      <div class="mt-6 rounded-2xl border border-brand-sage/20 bg-brand-sage/5 dark:bg-brand-sage/10 px-6 py-5 text-center">
        <h2 class="font-dancing text-3xl md:text-4xl text-gray-900 dark:text-white mb-2">Preparate para Bailar</h2>
        <p class="text-brand-sage font-lora text-sm md:text-base mt-1 font-medium">
          La fiesta no para, así que asegúrate de traer zapatos cómodos.
        </p>
        <p class="text-brand-sage font-lora text-sm md:text-base mt-1 font-semibold">
          Sugerimos Tenis
        </p>
      </div>
    </div>

    <div class="mt-10 md:grid md:grid-cols-2 md:gap-8">
      <div>
        <h3 class="text-2xl md:text-3xl font-dancing text-gray-900 dark:text-white mb-1">Algunas ideas para ellas</h3>
        <CarouselDressCode :photos="ellasImages"></CarouselDressCode>
      </div>
      <div class="mt-10 md:mt-0">
        <h3 class="text-2xl md:text-3xl font-dancing text-gray-900 dark:text-white mb-1">Algunas ideas para ellos</h3>
        <CarouselDressCode :photos="ellosImages"></CarouselDressCode>
      </div>
    </div>
    
  </div>
  </section>

</template>
<script setup lang="ts">
const event = inject<any>('event')
const config = useRuntimeConfig()

const dc = computed(() => event?.value?.dressCode)

const womenDescription = computed(() => dc.value?.womenDescription ?? 'Vestidos florales, colores claros o tonos coloridos')
const womenRestrictions = computed(() => dc.value?.womenRestrictions ?? 'No Negro, Lila o Rojo')
const womenColors      = computed(() => dc.value?.womenColors ?? ['#000000', '#ef4444', '#c4b5fd'])

const manDescription = computed(() => dc.value?.manDescription ?? 'Vestimenta elegante')
const menRestriction = computed(() => dc.value?.menRestriction ?? 'No Verde olivo')
const menColors      = computed(() => dc.value?.menColors ?? ['#16a34a'])

const mainImage = computed(() => {
  const url = dc.value?.mainImage?.url
  if (!url) return '/dressCodeImg.webp'
  return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
})

function toUrls(mediaArray: any[]): string[] {
  if (!mediaArray?.length) return []
  return mediaArray.map(img => {
    const url = img.url
    return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
  })
}

const ellasImages = computed(() => toUrls(dc.value?.womenOutfitImages) ?? ['vestidos1.webp', 'vestidos2.webp', 'vestidos3.webp', 'vestidos4.webp'])
const ellosImages = computed(() => toUrls(dc.value?.menOutfitImages)   ?? ['suits1.webp', 'suits2.webp', 'suits3.webp'])
</script>
