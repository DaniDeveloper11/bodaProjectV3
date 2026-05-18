<template>
  <header>
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-3 -p-3">
          <span class="sr-only">D & D</span>
          <NuxtImg sizes="60" :src="logo"></NuxtImg>
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12 bg-white rounded-2xl px-4 py-1">
        <a v-for="item in navigation" :key="item.name" :href="item.href"
          class="text-sm/6 font-semibold text-gray-900">{{ item.name }}</a>
      </div>
      <div class="flex flex-1 items-center justify-end gap-x-6">
        <a v-if="giftUrl" :href="giftUrl" target="_blank"
          class="flex gap-1 rounded-md bg-violet-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <GiftIcon class="h-5"></GiftIcon>
          Mesa de Regalos
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-7" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center gap-x-6">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">D&D</span>
            <NuxtImg sizes="60" :src="logo"></NuxtImg>
          </a>
          <a v-if="giftUrl" :href="giftUrl" target="_blank"
            class="flex gap-2 ml-auto rounded-md bg-violet-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
            <GiftIcon class="h-5"></GiftIcon>
            Mesa de regalos
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false">{{ item.name }}</a>
            </div>
            <div class="flex flex-col gap-3 py-6">
              <a
                v-for="(contacto, i) in contactos"
                :key="i"
                :href="contacto.whatsappUrl"
                target="_blank"
                class="bg-green-500 flex justify-center align-middle gap-3 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div class="flex gap-2 items-center">
                  <NuxtIcon class="text-green" size="14" name="whatsapp"></NuxtIcon>
                  <span class="py-1">{{ contacto.label }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, GiftIcon } from '@heroicons/vue/24/outline'

const event = inject('event')
const config = useRuntimeConfig()

const contactos = computed(() => event?.value?.contacts?.contactList ?? [])

const giftUrl = computed(() => event?.value?.gifts?.giftList?.[0]?.url ?? null)

const logo = computed(() => {
  const url = event?.value?.logo?.url
  if (!url) return '/logoDDr.webp'
  return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
})

const navigation = [
  { name: 'Solicitar Informacion', href: '#informacion' },
  { name: 'Ubicacion', href: '#ubicacion' },
  { name: 'Codigo de Vestimenta', href: '#dressCode' },
  { name: 'Confirma Asistencia', href: '#confirmacion' },
]

const mobileMenuOpen = ref(false)
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
