<template>
  <div class="lg:flex lg:h-full lg:flex-col">
    <div class="px-4 sm:px-6">
      <h2 class="text-[#6a8e58] font-dancing text-3xl text-center">{{ fechaFormateada }}</h2>
    </div>
    <header class="flex justify-center border-b border-gray-200 px-6 pb-4 pt-2 lg:flex-none">
      <h1 class="text-base font-semibold text-gray-700">
        <time class="text-xl font-lora">{{ tituloMes }}</time>
      </h1>
    </header>
    <div class="shadow ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
      <div
        class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
        <div class="bg-white py-2">
          D<span class="sr-only sm:not-sr-only">on</span>
        </div>
        <div class="bg-white py-2">
          L<span class="sr-only sm:not-sr-only">ue</span>
        </div>
        <div class="bg-white py-2">
          M<span class="sr-only sm:not-sr-only">ed</span>
        </div>
        <div class="bg-white py-2">
          T<span class="sr-only sm:not-sr-only">hu</span>
        </div>
        <div class="bg-white py-2">
          J<span class="sr-only sm:not-sr-only">ri</span>
        </div>
        <div class="bg-white py-2">
          V<span class="sr-only sm:not-sr-only">at</span>
        </div>
        <div class="bg-white py-2">
          S<span class="sr-only sm:not-sr-only">un</span>
        </div>
      </div>
      <div class="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          <div v-for="day in days" :key="day.date" :class="[
            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
            'relative px-3 py-2',
          ]">
            <time :datetime="day.date" :class="day.isToday
                ? 'flex size-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                : undefined
              ">{{ day.date.split("-").pop().replace(/^0/, "") }}</time>
            <ol v-if="day.events.length > 0" class="mt-2">
              <li >
                <a href="" class="group flex">
                  <p class="flex-auto truncate font-dancing text-gray-900 text-center">
                    El Gran Día
                  </p>
                  <heartIcon v-if="day.isSelected" />


                </a>
              </li>

            </ol>
          </div>
        </div>
        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          <button v-for="day in days" :key="day.date" type="button" :class="[
            day.isCurrentMonth ? 'bg-orange-200' : 'bg-gray-50',
            (day.isSelected || day.isToday) && 'font-semibold',
            day.isSelected && 'text-gray-900',
            !day.isSelected && day.isToday && 'text-indigo-600',
            !day.isSelected &&
            day.isCurrentMonth &&
            !day.isToday &&
            'text-gray-900',
            !day.isSelected &&
            !day.isCurrentMonth &&
            !day.isToday &&
            'text-gray-500',
            'relative overflow-hidden flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
          ]">
            <!-- ❤️ Fondo decorativo -->
            <heartIcon v-if="day.isSelected" />

            <time :datetime="day.date" :class="[
              day.isSelected &&
              'flex size-6 items-center justify-center rounded-full',

              'ml-auto relative z-10',
            ]">
              {{ day.date.split("-").pop().replace(/^0/, "") }}
            </time>

            <span class="sr-only">{{ day.events.length }} events</span>

            <span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse relative z-10">
              <span v-for="event in day.events" :key="event.id" class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-400" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/vue/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import heartIcon from "~/ui/icons/heartIcon.vue";
import { computed, inject } from "vue";

const event = inject('event')

const eventDate = computed(() =>
  event?.value?.eventDate ? new Date(event.value.eventDate) : new Date('2026-10-04T13:00:00')
)

const fechaFormateada = computed(() => {
  const d = eventDate.value
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const anio = d.getFullYear()
  return `${dia}/${mes}/${anio}`
})

const tituloMes = computed(() =>
  eventDate.value.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
    .replace(/^\w/, c => c.toUpperCase())
)

const days = computed(() => {
  const fecha = eventDate.value
  const anio = fecha.getFullYear()
  const mes = fecha.getMonth()
  const diaEvento = fecha.getDate()

  const primerDiaDelMes = new Date(anio, mes, 1).getDay()
  const diasEnMes = new Date(anio, mes + 1, 0).getDate()
  const diasEnMesAnterior = new Date(anio, mes, 0).getDate()

  const resultado = []

  // Días del mes anterior
  for (let i = primerDiaDelMes - 1; i >= 0; i--) {
    const d = diasEnMesAnterior - i
    const m = mes === 0 ? 12 : mes
    const a = mes === 0 ? anio - 1 : anio
    resultado.push({ date: `${a}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`, isCurrentMonth: false, events: [] })
  }

  // Días del mes actual
  for (let d = 1; d <= diasEnMes; d++) {
    resultado.push({
      date: `${anio}-${String(mes + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,
      isCurrentMonth: true,
      isSelected: d === diaEvento,
      events: d === diaEvento ? [{ id: 1, name: 'El Gran Día' }] : []
    })
  }

  // Días del mes siguiente para completar la grilla (42 celdas = 6 filas × 7 cols)
  const restantes = 42 - resultado.length
  for (let d = 1; d <= restantes; d++) {
    const m = mes === 11 ? 1 : mes + 2
    const a = mes === 11 ? anio + 1 : anio
    resultado.push({ date: `${a}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`, isCurrentMonth: false, events: [] })
  }

  return resultado
})

</script>
