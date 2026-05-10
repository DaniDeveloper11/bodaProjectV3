<template>
    <div id="save-date" class="divide-y divide-gray-200 dark:divide-white/10 overflow-hidden rounded-2xl shadow-lg mt-12 md:mt-16 lg:mt-20 dark:shadow-black/30">
      <div class="flex px-4 py-5 sm:px-6 gap-3 items-center justify-center">
        <NuxtImg class="size-8 object-cover" src="t.webp"></NuxtImg>
        <h2 class="text-brand-sage font-dancing text-5xl md:text-6xl text-center">
          Save The Date</h2>
        <NuxtImg class="size-8 object-cover" src="t.webp"></NuxtImg>

      </div>
      <div class="px-4 py-5 sm:p-6">
        <CalendarComponent></CalendarComponent>
      </div>
    </div>
  </template>
  