<template>
  <div>
    <div class="relative">
      <div class="flex justify-items-start -ml-6">
        <NuxtImg
        src="flowerCorner.webp"
        class="size-48 -scale-y-100 -scale-x-100"
      ></NuxtImg>
      </div>

      <div class="-mt-14">
        <div class="mb-5">
          <h4 class="text-brand-sage font-dancing text-4xl md:text-5xl text-center">
            Wedding Time Line
          </h4>
        </div>

        <div class="relative">
          <div
            class="absolute left-1/2 top-0 h-full w-0.5 bg-brand-rose/60 dark:bg-brand-gold/40 -translate-x-1/2"
            :style="{ height: lineHeight + 'px' }"
          ></div>
          <ul>
            <li
              v-for="(item, i) in timeline"
              :key="item.id"
              class="mb-16 flex items-center w-full"
              :class="i % 2 === 0 ? 'justify-start' : 'justify-end'"
              data-aos="fade-up"
              :ref="i === timeline.length - 1 ? 'latestEvent' : null"
            >
              <div
                class="w-1/2 flex flex-col items-end pr-8"
                v-if="i % 2 === 0"
              >
                <div class="text-right">
                  <div class="text-lg font-semibold text-brand-rose dark:text-brand-gold">
                    {{ item.time }}
                  </div>
                  <div class="text-xl font-cursive dark:text-white">{{ item.title }}</div>
                </div>
              </div>
              <div class="relative z-10 flex flex-col items-center">
                <div
                  class="bg-white dark:bg-brand-dark border-4 border-brand-rose dark:border-brand-gold/60 rounded-full p-2 shadow-md"
                >
                  <NuxtImg
                    :src="item.src"
                    class="w-10 h-10 sm:w-14 sm:h-14 object-contain dark:brightness-110"
                  ></NuxtImg>
                </div>
                <div
                  class="w-3 h-3 bg-white dark:bg-brand-gold border-4 border-brand-rose dark:border-brand-gold rounded-full mt-2"
                ></div>
              </div>
              <div
                class="w-1/2 flex flex-col items-start pl-8"
                v-if="i % 2 !== 0"
              >
                <div class="text-left">
                  <div class="text-lg font-semibold text-brand-rose dark:text-brand-gold">
                    {{ item.time }}
                  </div>
                  <div class="text-xl font-cursive dark:text-white">{{ item.title }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center items-center">
      <NuxtImg :src="bottomImage" class="w-full h-full object-cover"></NuxtImg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, inject, onMounted, nextTick } from "vue";

const eventData = inject<any>('event')
const config = useRuntimeConfig()

const latestEvent = ref<any>(null)
const lineHeight = ref(0)

const iconosFallback = [
  'traje-de-boda.webp', 'iglesia.webp', 'animar.webp',
  'banquete.webp', 'baile.webp', 'pista-de-baile.webp', 'coche.webp'
]

const timeline = computed(() => {
  const items = eventData?.value?.timeline?.events
  if (items?.length) {
    return items.map((item: any, i: number) => ({
      id: i,
      time: item.time,
      title: item.title,
      src: item.iconImage?.url
        ? (item.iconImage.url.startsWith('http') ? item.iconImage.url : `${config.public.strapiUrl}${item.iconImage.url}`)
        : iconosFallback[i % iconosFallback.length]
    }))
  }
  return [
    { id: 0, src: 'traje-de-boda.webp', time: '08:00 AM', title: 'Getting Ready' },
    { id: 1, src: 'iglesia.webp',        time: '01:00 PM', title: 'Misa Religiosa' },
    { id: 2, src: 'animar.webp',         time: '03:00 PM', title: 'Inicio de la recepción' },
    { id: 3, src: 'banquete.webp',       time: '04:00 PM', title: 'Banquete' },
    { id: 4, src: 'baile.webp',          time: '06:00 PM', title: 'Primer Vals' },
    { id: 5, src: 'pista-de-baile.webp', time: '06:30 PM', title: 'Inicio de la fiesta' },
    { id: 6, src: 'coche.webp',          time: '11:00 PM', title: 'Fin de la recepción' },
  ]
})

const bottomImage = computed(() => {
  const url = eventData?.value?.timeline?.bottomImage?.url
  if (!url) return '/foto3.webp'
  return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
})

async function calcularLineaAltura() {
  await nextTick()
  const el = latestEvent.value?.[0] ?? latestEvent.value
  if (el) {
    const containerTop = el.parentElement.getBoundingClientRect().top
    const lastEventBottom = el.getBoundingClientRect().bottom
    lineHeight.value = lastEventBottom - containerTop
  }
}

watch(timeline, calcularLineaAltura)
onMounted(calcularLineaAltura)
</script>
