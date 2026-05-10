<template>
  <div class="lg:flex lg:h-full lg:flex-col">
    <div class="px-4 sm:px-6">
      <h2 class="text-[#6a8e58] font-dancing text-3xl text-center">04/10/2025</h2>
    </div>
    <header class="flex justify-center border-b border-gray-200 px-6 pb-4 pt-2 lg:flex-none">
      <h1 class="text-base font-semibold text-gray-200">
        <time datetime="2025-08" class="text-xl font-lora">Octubre 2025</time>
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
            day.isSelected && 'text-white',
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
import { ref, onMounted, nextTick } from "vue";

const lineHeight = ref(0);
const latestEvent = ref(null);
const days = [
  { date: "2025-07-28", events: [] },
  { date: "2025-07-29", events: [] },
  { date: "2025-07-30", events: [] },
  { date: "2025-08-01", isCurrentMonth: true, events: [] },
  { date: "2025-08-02", isCurrentMonth: true, events: [] },
  {
    date: "2025-08-03",
    isCurrentMonth: true,
    events: [],
  },
  {
    date: "2025-01-04",
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: "Maple syrup museum",
        time: "3PM",
        datetime: "2022-01-22T15:00",
        href: "#",
      },
      {
        id: 5,
        name: "Hockey game",
        time: "7PM",
        datetime: "2022-01-22T19:00",
        href: "#",
      },
    ],
  },
  { date: "2025-01-05", isCurrentMonth: true, events: [] },
  { date: "2025-01-06", isCurrentMonth: true, events: [] },
  {
    date: "2025-01-07",
    isCurrentMonth: true,
    events: [],
  },
  { date: "2025-01-08", isCurrentMonth: true, events: [] },
  { date: "2025-01-09", isCurrentMonth: true, events: [] },
  { date: "2025-01-10", isCurrentMonth: true, events: [] },
  { date: "2025-01-11", isCurrentMonth: true, events: [] },
  {
    date: "2025-01-12",
    isCurrentMonth: true,
    //   isToday: true,
    events: [],
  },
  { date: "2025-01-13", isCurrentMonth: true, events: [] },
  { date: "2025-01-14", isCurrentMonth: true, events: [] },
  { date: "2025-01-15", isCurrentMonth: true, events: [] },
  { date: "2025-01-16", isCurrentMonth: true, events: [] },
  { date: "2025-01-17", isCurrentMonth: true, events: [] },
  { date: "2025-01-18", isCurrentMonth: true, events: [] },
  { date: "2025-01-19", isCurrentMonth: true, events: [] },
  { date: "2025-01-20", isCurrentMonth: true, events: [] },
  { date: "2025-01-21", isCurrentMonth: true, events: [] },
  { date: "2025-01-22", isCurrentMonth: true, events: [] },
  { date: "2025-01-23", isCurrentMonth: true, events: [] },
  { date: "2025-01-24", isCurrentMonth: true, events: [] },
  { date: "2025-01-25", isCurrentMonth: true, events: [] },
  { date: "2025-01-26", isCurrentMonth: true, events: [] },
  { date: "2025-01-27", isCurrentMonth: true, events: [] },
  { date: "2025-01-28", isCurrentMonth: true, events: [] },
  { date: "2025-01-29", isCurrentMonth: true, events: [] },
  { date: "2025-01-30", isCurrentMonth: true, events: [] },
  { date: "2025-01-31", isCurrentMonth: true, events: [] },
  { date: "2025-02-01", events: [] },
  { date: "2025-02-02", events: [] },
  { date: "2025-02-03", events: [] },
  {
    date: "2025-02-04",
    events: [],
  },
  { date: "2025-02-05", events: [] },
  { date: "2025-02-06", events: [] },
  { date: "2025-02-07", events: [] },
];
const selectedDay = days.find((day) => day.isSelected);


onMounted(async () => {
  await nextTick()
  if (latestEvent.value && latestEvent.value[0]) {
    const containerTop = latestEvent.value[0].parentElement.getBoundingClientRect().top;
    const lastEventBottom = latestEvent.value[0].getBoundingClientRect().bottom;
    lineHeight.value = lastEventBottom - containerTop;
  }
})

</script>
