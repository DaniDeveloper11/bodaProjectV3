<template>
    <div class="text-center text-white space-y-2 py-5 px-4 rounded-2xl backdrop-blur-sm bg-black/20">
      <h2 class="text-3xl font-bold font-dancing">
        {{ isWeddingTime ? '🎉 ¡Es el gran día! ¡Felicidades! 💍' : 'Faltan:' }}
      </h2>
  
      <div v-if="!isWeddingTime" class="flex justify-center gap-6 text-2xl font-semibold">
        <div>
          <span class="block text-4xl">{{ countdown.days }}</span>
          <span class="font-dancing">días</span>
        </div>
        <div>
          <span class="block text-4xl">{{ countdown.hours }}</span>
          <span class="font-dancing">horas</span>
        </div>
        <div>
          <span class="block text-4xl">{{ countdown.minutes }}</span>
          <span class="font-dancing">min</span>
        </div>
        <div>
          <span class="block text-4xl">{{ countdown.seconds }}</span>
          <span class="font-dancing">seg</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'

  const event = inject<any>('event')

  const eventDate = computed(() =>
    new Date((event?.value?.eventDate) ?? '2026-10-04T13:00:00')
  )

  const countdown = ref({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const isWeddingTime = ref(false)
  let intervalId: ReturnType<typeof setInterval>

  const updateCountdown = () => {
    const now = new Date()
    const distance = eventDate.value.getTime() - now.getTime()

    if (distance <= 0) {
      isWeddingTime.value = true
      clearInterval(intervalId)
      return
    }

    isWeddingTime.value = false
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((distance / (1000 * 60)) % 60)
    const seconds = Math.floor((distance / 1000) % 60)

    countdown.value = {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    }
  }

  watch(eventDate, () => {
    clearInterval(intervalId)
    updateCountdown()
    intervalId = setInterval(updateCountdown, 1000)
  })

  onMounted(() => {
    updateCountdown()
    intervalId = setInterval(updateCountdown, 1000)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })
  </script>
  
