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
              v-for="(event, i) in timeline"
              :key="event.id"
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
                    {{ event.time }}
                  </div>
                  <div class="text-xl font-cursive dark:text-white">{{ event.title }}</div>
                </div>
              </div>
              <div class="relative z-10 flex flex-col items-center">
                <div
                  class="bg-white dark:bg-brand-dark border-4 border-brand-rose dark:border-brand-gold/60 rounded-full p-2 shadow-md"
                >
                  <NuxtImg
                    :src="event.src"
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
                    {{ event.time }}
                  </div>
                  <div class="text-xl font-cursive dark:text-white">{{ event.title }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center items-center">
      <NuxtImg src="foto3.webp" class="w-full h-full object-cover"></NuxtImg>
    </div>
  </div>
</template>
<script setup lang="ts">
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
const timeline = [
  {
    id: 0,
    src: "traje-de-boda.webp",
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
    time: "08:00 AM",
    title: "Getting Ready",
  },
  {
    id: 1,
    src: "iglesia.webp",
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
    time: "01:00 PM",
    title: "Misa Religiosa",
  },
  // {
  //   id: 2,
  //   src: "anillos-de-boda.png",
  //   content: "Advanced to phone screening by",
  //   target: "Bethany Blake",
  //   href: "#",
  //   date: "Sep 22",
  //   datetime: "2020-09-22",
  //   icon: HandThumbUpIcon,
  //   iconBackground: "bg-blue-500",
  //   time: "10:00 AM",
  //   title: "Boda Civil",
  // },
  {
    id: 3,
    src: "animar.webp",
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
    time: "03:00 PM",
    title: "Inicio de la recepción",
  },
  {
    id: 4,
    src: "banquete.webp",
    content: "Advanced to interview by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
    time: "04:00 PM",
    title: "Banquete",
  },
  {
    id: 5,
    src: "baile.webp",
    content: "Completed interview with",
    target: "Katherine Snyder",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
    time: "06:00 PM",
    title: "Primer Vals",
  },
  {
    id: 6,
    src: "pista-de-baile.webp",
    content: "Completed interview with",
    target: "Katherine Snyder",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
    time: "06:30 PM",
    title: "Inicio de la fiesta",
  },
  {
    id: 7,
    src: "coche.webp",
    content: "Completed interview with",
    target: "Katherine Snyder",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
    time: "11:00 PM",
    title: "Fin de la recepción ",
  },
];
</script>
