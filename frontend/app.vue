<template>
  <div class="transition-colors duration-500 ease-in-out bg-brand-cream dark:bg-brand-dark">

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <tourButton ref="tourButtonRef" />
    </ClientOnly>

  </div>
</template>

<script setup>
import 'driver.js/dist/driver.css'

const colorMode = useColorMode()
colorMode.value = 'dark'

const { startTour, hasSeenTour } = useTour()
const tourButtonRef = ref(null)

onMounted(() => {
  if (!hasSeenTour()) {
    setTimeout(() => {
      startTour()
      // After tour ends (destroyed callback marks seen), show the button
      // We poll briefly after the delay to sync button visibility
      const interval = setInterval(() => {
        if (hasSeenTour() && tourButtonRef.value) {
          tourButtonRef.value.show()
          clearInterval(interval)
        }
      }, 500)
    }, 1200)
  }
})
</script>

<style>
/* Driver.js popover – brand dark theme */
.tour-popover {
  background-color: #1a1a2e !important;
  color: #faf5ef !important;
  border: 1px solid #c9a96e !important;
  border-radius: 12px !important;
}

.tour-popover .driver-popover-title {
  color: #c9a96e !important;
  font-family: 'Dancing Script', cursive !important;
  font-size: 1.5rem !important;
}

.tour-popover .driver-popover-description {
  color: #faf5ef !important;
  font-family: 'Poppins', sans-serif !important;
}

.tour-popover .driver-popover-next-btn,
.tour-popover .driver-popover-prev-btn,
.tour-popover .driver-popover-done-btn {
  background-color: #ea580c !important;
  color: white !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;
}

.tour-popover .driver-popover-next-btn:hover,
.tour-popover .driver-popover-prev-btn:hover,
.tour-popover .driver-popover-done-btn:hover {
  background-color: #c2410c !important;
}

.tour-popover .driver-popover-close-btn {
  color: #faf5ef !important;
}

.tour-popover .driver-popover-progress-text {
  color: #c9a96e !important;
  font-family: 'Poppins', sans-serif !important;
  font-size: 0.85rem !important;
}
</style>
